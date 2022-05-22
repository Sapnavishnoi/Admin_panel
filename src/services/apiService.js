import { Client } from "./_clientService";

//Add this to congif file in sidebar link
// "api": {
//   "title": "API",
//   "menu": [
//     {
//       "title": "API",
//       "url": "/api",
//       "serverURL": "/api/api-mgmt/all"
//     },
//     {
//       "title": "Add API",
//       "url": "/api/add",
//       "serverURL": "/api/api-mgmt/add"
//     }
//   ]
// },

async function getApi() {
  const result = await new Client({
    path: "/api/api-mgmt/all",
  }).get();

  return result;
}

async function addApi({ endpoint, name, description }) {
  const result = await new Client({
    path: "/api/api-mgmt/add",
    payload: {
      endPoint: endpoint.trim(),
      name: name.trim(),
      description: description.trim(),
    },
  }).post();

  return result;
}

export { getApi, addApi };
