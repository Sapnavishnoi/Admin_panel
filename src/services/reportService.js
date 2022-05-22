import { Client } from "./_clientService";
import sessionHelper from "./sessionHelper";

async function getDailySummary({
  startDate = "",
  endDate = "",
  platformId = null,
  operatorId = null,
  brand = null,
}) {
  let path = `/api/bo/day-wise-summary?startDate=${startDate}&enDate=${endDate}`;

  if (platformId) path = path + `&platformId=${platformId}`;
  if (operatorId) path = path + `&operatorId=${operatorId}`;
  if (brand) path = path + `&brand=${brand}`;
  // const result = await new Client({ path: `/api/bo/day-wise-summary` }).get();

  // return result;
  return {
    data: [],
    formOptions: {
      platform: sessionHelper.platformActiveAll.map((data) => {
        return {
          label: data?.name?.trim() || "N/A",
          id: data?.name || "",
          code: data?.code || ""
        };
      }),
      operator: sessionHelper.operatorActiveAll.map((data) => {
        return {
          label: data?.name?.trim() || "N/A",
          id: data?.name || "",
          code: data?.code || ""
        };
      }),
      brand: sessionHelper.brandActiveAll.map((data) => {
        return {
          label: data?.name?.trim() || "N/A",
          id: data?.name || "",
          code: data?.code || ""
        };
      }),
    },
  };
}

export { getDailySummary };
