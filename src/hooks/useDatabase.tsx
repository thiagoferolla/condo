import { useContext } from "react";
import { DatabaseContext } from "../providers/DatabaseProvider";

export default function useDatabase() {
  const dbService = useContext(DatabaseContext);

  return dbService.service;
}
