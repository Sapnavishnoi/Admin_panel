import { Client } from "./_clientService";

async function getBrands() {
  const result = await new Client({
    path: `/api/brand-mgmt/all?operatorId=demo`,
  }).get();

  return result;
}

async function addBrand(values) {
  const result = await new Client({
    path: "/api/brand-mgmt/add",
    payload: values,
  }).post();

  return result;
}

export { getBrands, addBrand };
