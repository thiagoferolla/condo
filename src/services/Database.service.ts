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

  findAll(): Promise<Bill[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM bills ORDER BY code ASC;",
          [],
          (_, { rows: { _array } }) => {
            resolve(_array as Bill[]);
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
        if (input.parent_id) {
          tx.executeSql(
            `INSERT INTO bills (id, name, parent_id, code, type, accept_entries) VALUES (?, ?, ?, ?, ?, ?);`,
            [
              id,
              input.name,
              input.parent_id,
              input.code,
              input.type,
              input.accept_entries,
            ],
            (_, { rows }) => resolve(rows)
          );
        } else {
          tx.executeSql(
            `INSERT INTO bills (id, name, code, type, accept_entries) VALUES (?, ?, ?, ?, ?);`,
            [id, input.name, input.code, input.type, input.accept_entries],
            (_, { rows }) => {
              this.notifyListeners();
              resolve(rows._array);
            }
          );
        }
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
}
