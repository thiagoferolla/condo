import { createContext, useEffect, useState } from "react";
import DatabaseService from "../services/Database.service";

export const DatabaseContext = createContext<{
  service: DatabaseService | null;
}>({ service: null });

type DatabaseProviderProps = {
  children: React.ReactNode;
};

export default function DatabaseServiceProvider({
  children,
}: DatabaseProviderProps) {
  const [databaseService, setDatabaseService] = useState<{
    service: DatabaseService | null;
  }>({ service: null });

  useEffect(() => {
    const db = new DatabaseService();

    setDatabaseService({ service: db });

    db.createTables();
  }, []);

  return (
    <DatabaseContext.Provider value={databaseService}>
      {children}
    </DatabaseContext.Provider>
  );
}
