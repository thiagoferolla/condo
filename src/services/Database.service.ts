import * as SQLite from "expo-sqlite";
import uuid from "react-native-uuid";
import { Bill } from "../@types/Bill";

export default class DatabaseService {
  public db: SQLite.WebSQLDatabase;
  private listeners: (() => void)[];

  constructor() {
    this.db = SQLite.openDatabase("ucondo.db");

    this.listeners = [];
  }

  findById(id: string): Promise<Bill> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM bills WHERE id = ?;",
          [id],
          (_, { rows: { _array } }) => {
            if (!_array.length) {
              reject(new Error("Bill not found"));
              return;
            }

            resolve(_array[0] as Bill);
          }
        );
      }, reject);
    });
  }

  searchBills(term: string): Promise<Bill[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM bills WHERE UPPER(name) LIKE ? OR code LIKE ? ORDER BY code ASC;",
          ["%" + term.toUpperCase() + "%", "%" + term + "%"],
          (_, { rows: { _array } }) => {
            resolve(this.orderBills(_array) as Bill[]);
          }
        );
      }, reject);
    });
  }

  findAll(): Promise<Bill[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM bills ORDER BY code ASC;",
          [],
          (_, { rows: { _array } }) => {
            resolve(this.orderBills(_array) as Bill[]);
          }
        );
      }, reject);
    });
  }

  createBill(input: {
    name: string;
    parent_id?: string;
    code: string;
    type: string;
    accept_entries: 0 | 1;
  }) {
    const id = uuid.v4() as string;

    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO bills (id, name, parent_id, code, type, accept_entries) VALUES (?, ?, ?, ?, ?, ?);`,
          [
            id,
            input.name,
            input.parent_id || null,
            input.code,
            input.type,
            input.accept_entries,
          ],
          (_, { rows }) => resolve(rows)
        );
      }, reject);
    });
  }

  updateBill(
    id: string,
    input: {
      name: string;
      parent_id?: string;
      code: string;
      type: string;
      accept_entries: 0 | 1;
    }
  ) {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          `UPDATE bills SET name = ?, parent_id = ?, code = ?, type = ?, accept_entries = ? WHERE id = ?;`,
          [
            input.name,
            input.parent_id || null,
            input.code,
            input.type,
            input.accept_entries,
            id,
          ],
          (_, { rows }) => resolve(rows)
        );
      }, reject);
    });
  }

  deleteBill(id: string) {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          `DELETE FROM bills WHERE id = ?;`,
          [id],
          (_, { rows }) => {
            this.notifyListeners();
            resolve(rows._array);
          }
        );
      }, reject);
    });
  }

  createTables() {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          `
          CREATE TABLE IF NOT EXISTS bills 
          (
            id TEXT PRIMARY KEY NOT NULL,
            name TEXT NOT NULL,
            parent_id TEXT,
            code TEXT NOT NULL UNIQUE,
            type TEXT NOT NULL,
            accept_entries BOOLEAN NOT NULL
          );
        `,
          [],
          () => resolve(true)
        );
      }, reject);
    });
  }

  addEventListener(listeners: () => void) {
    this.listeners.push(listeners);
  }

  notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }

  private orderBills(bills: Bill[]) {
    return bills.sort((a, b) => {
      const aCodeDigits = a.code.split(".");
      const bCodeDigits = b.code.split(".");

      for (
        let i = 0;
        i < Math.max(aCodeDigits.length, bCodeDigits.length);
        i++
      ) {
        if (!aCodeDigits[i]) {
          return -1;
        } else if (!bCodeDigits[i]) {
          return 1;
        }

        if (parseInt(aCodeDigits[i]) > parseInt(bCodeDigits[i])) {
          return 1;
        }
      }

      return -1;
    });
  }
}
