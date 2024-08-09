import { goldskyUrl, goldskyQuery } from "../app/client";

export default async function fetchTransactions(): Promise<Action[]> {
  return fetch(goldskyUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: goldskyQuery }),
  })
    .then((res) => res.json())
    .then(({ data }) => data.actions);
}
