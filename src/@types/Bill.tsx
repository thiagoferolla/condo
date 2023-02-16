export type Bill = {
  id: string;
  parent_id: string;
  code: string;
  name: string;
  type: "income" | "expense";
  accept_entries: 0 | 1; //sqlite boolean translates to 0 and 1;
};
