import { View, Text } from "dripsy";
import { Bill } from "../../@types/Bill";
import BillCard from "../BillCard";

const mockBills: Bill[] = [
  {
    id: "bf50c169-58a9-4520-a680-751d49356730",
    code: "1",
    parent_id: "",
    type: "income",
    name: "Receitas",
    accept_entries: 0,
  },
  {
    id: "e02bc322-a709-4f91-a2b2-060fcd88d623",
    code: "1.1",
    parent_id: "bf50c169-58a9-4520-a680-751d49356730",
    type: "income",
    name: "Taxa condominial",
    accept_entries: 1,
  },
  {
    id: "e0615db0-3bcc-4d73-a4f1-892201f0cf5d",
    code: "1.2",
    parent_id: "bf50c169-58a9-4520-a680-751d49356730",
    type: "income",
    name: "Reserva de dependência",
    accept_entries: 1,
  },
  {
    id: "31e36c5b-9b99-4258-8a5b-fefb25bb1e5c",
    code: "1.3",
    parent_id: "bf50c169-58a9-4520-a680-751d49356730",
    type: "income",
    name: "Multas",
    accept_entries: 1,
  },
  {
    id: "08004dda-709d-41c1-936f-9dee8e9daebf",
    code: "1.4",
    parent_id: "bf50c169-58a9-4520-a680-751d49356730",
    type: "income",
    name: "Juros",
    accept_entries: 1,
  },
  {
    id: "28c44954-262f-47a0-992f-c5d9985c9298",
    code: "1.5",
    parent_id: "bf50c169-58a9-4520-a680-751d49356730",
    type: "income",
    name: "Multa condominial",
    accept_entries: 1,
  },
  {
    id: "86ba26b0-59c7-4ee3-a9de-986e1bd647e7",
    code: "1.6",
    parent_id: "bf50c169-58a9-4520-a680-751d49356730",
    type: "income",
    name: "Água",
    accept_entries: 1,
  },
  {
    id: "47d143bd-fa01-450a-a448-990c1dd461dc",
    code: "1.7",
    parent_id: "bf50c169-58a9-4520-a680-751d49356730",
    type: "income",
    name: "Gás",
    accept_entries: 1,
  },
  {
    id: "5f583a83-1283-4855-858b-453e8c745c2e",
    code: "1.8",
    parent_id: "bf50c169-58a9-4520-a680-751d49356730",
    type: "income",
    name: "Luz e energia",
    accept_entries: 1,
  },
  {
    id: "c10ee610-de87-4803-b53f-bfbf4b611c65",
    code: "1.9",
    parent_id: "bf50c169-58a9-4520-a680-751d49356730",
    type: "income",
    name: "Fundo de reserva",
    accept_entries: 1,
  },
  {
    id: "a0a103c1-5f50-40b7-b8a1-317dc751cb96",
    code: "1.10",
    parent_id: "bf50c169-58a9-4520-a680-751d49356730",
    type: "income",
    name: "Fundo de obras",
    accept_entries: 1,
  },
  {
    id: "42e90838-185f-4a95-a551-3d72dd4e21c0",
    code: "1.11",
    parent_id: "bf50c169-58a9-4520-a680-751d49356730",
    type: "income",
    name: "Correção monetária",
    accept_entries: 1,
  },
  {
    id: "8a10e565-81f7-437c-b32e-9513ee8ffb7a",
    code: "1.12",
    parent_id: "bf50c169-58a9-4520-a680-751d49356730",
    type: "income",
    name: "Transferência entre contas",
    accept_entries: 1,
  },
  {
    id: "5e558492-3fae-4221-988b-843a5f2dd7b0",
    code: "1.13",
    parent_id: "bf50c169-58a9-4520-a680-751d49356730",
    type: "income",
    name: "Pagamento duplicado",
    accept_entries: 1,
  },
  {
    id: "cabee8fa-3d6f-41a8-95e1-97913bed5a98",
    code: "1.14",
    parent_id: "bf50c169-58a9-4520-a680-751d49356730",
    type: "income",
    name: "Cobrança",
    accept_entries: 1,
  },
  {
    id: "9cfe4daa-f32f-49b2-8959-6870a02da932",
    code: "1.15",
    parent_id: "bf50c169-58a9-4520-a680-751d49356730",
    type: "income",
    name: "Crédito",
    accept_entries: 1,
  },
  {
    id: "3ecdaa82-4957-4091-b3ed-902ec72933ac",
    code: "1.16",
    parent_id: "bf50c169-58a9-4520-a680-751d49356730",
    type: "income",
    name: "Água mineral",
    accept_entries: 1,
  },
  {
    id: "236e78c3-3bce-4744-9f7c-998d0dd7845f",
    code: "1.17",
    parent_id: "bf50c169-58a9-4520-a680-751d49356730",
    type: "income",
    name: "Estorno taxa de resgate",
    accept_entries: 1,
  },
  {
    id: "e7f75e0a-5dec-4328-bf6c-716209003187",
    code: "1.18",
    parent_id: "bf50c169-58a9-4520-a680-751d49356730",
    type: "income",
    name: "Acordo",
    accept_entries: 1,
  },
  {
    id: "ec26f9ab-6539-4cf5-b040-214ce100a23f",
    code: "1.19",
    parent_id: "bf50c169-58a9-4520-a680-751d49356730",
    type: "income",
    name: "Honorários",
    accept_entries: 1,
  },
];

export default function BillsList() {
  const bills = mockBills;

  return (
    <View>
      <View
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "$md",
          marginBottom: "$sm",
          marginX: "$sm",
        }}
      >
        <Text
          sx={{
            color: "$highlight",
            fontSize: "$lg",
          }}
        >
          Listagem
        </Text>

        <Text
          sx={{
            color: "$muted",
            fontSize: "$sm",
          }}
        >
          {bills.length} registros
        </Text>
      </View>

      {mockBills.map((b) => (
        <BillCard bill={b} />
      ))}
    </View>
  );
}
