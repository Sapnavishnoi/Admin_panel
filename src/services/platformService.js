import { Client } from "./_clientService";

async function getPlatform() {
  const result = await new Client({
    path: "/api/platform-mgmt/all"
  }).get();
  console.log(result,"result_________")
  return result;
}



async function addPlatform({  platform_id, api_key, name, description}) {
    const result = await new Client({
      path: "/api/platform-mgmt/add",
      payload: { apiKey: api_key.trim(), name: name.trim(), description: description.trim(),  code: platform_id.trim() },
    }).post();
    console.log(result,"platform added");
  
    return result;
  }
 


 

export {getPlatform, addPlatform };
