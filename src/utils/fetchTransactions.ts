import { goldskyUrl } from "../app/client";

export default async function fetchTransactions(
  query: string
): Promise<Action> {
  return fetch(goldskyUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then(({ data }) => {
      return data.actions;
    });
}
