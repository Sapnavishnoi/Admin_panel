import { Client } from "./_clientService";

async function getOperators() {
  const result = await new Client({
    path: `/api/operator-mgmt/all?platformId=0`,
  }).get();

  return result;
}

async function addOperator(values) {
  const result = await new Client({
    path: "/api/operator-mgmt/add",
    payload: values,
  }).post();

  return result;
}

export { getOperators, addOperator };
