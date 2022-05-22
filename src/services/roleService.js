import { Client } from "./_clientService";
import { signOut } from "./authService";

async function getKids(){
    const result = await new Client({ path: `/api/all/kids` }).get();

    return result;
}

//get function for all other components
async function getTagline(){
    const result = await new Client({ path: `/api/home` }).get();

    return result;
}

async function getSlot(){
    const result = await new Client({ path: `/api/slot` }).get();

    return result;
}

async function getPlan(){
    const result = await new Client({ path: `/api/package` }).get();

    return result;
}

async function getLocation(){
    const result = await new Client({ path: `/api/location` }).get();

    return result;
}

async function getCoach(){
    const result = await new Client({ path: `/api/coach/detail` }).get();

    return result;
}

async function getBooking(){
    const result = await new Client({ path: `/api/all/booking` }).get();

    return result;
}

async function deActivateRoleId(roleId){
    const result = await new Client({
        path: '/api/role-mgmt/deactivate',
        payload: {roleId}
    }).put()

    if(result?.message === "Unauthorized") {
        signOut();
        return {Unauthorized: true}
    }

    return {Unauthorized: false}
}

async function addRole({  name, dateOfBirth}) {
    const result = await new Client({
      path: "/api/add/kid",
      payload: { user_id: "626d3f2ada7760f0a736b4ce", dateOfBirth: dateOfBirth.trim(),  name: name.trim() },
    }).post();
  
    return result;
  }
 
  async function addTagline({  name, dateOfBirth}) {
    const result = await new Client({
      path: "/api/add/kid",
      payload: { user_id: "626d3f2ada7760f0a736b4ce", dateOfBirth: dateOfBirth.trim(),  name: name.trim() },
    }).post();
  
    return result;
  }

  async function addSlot({  name, dateOfBirth}) {
    const result = await new Client({
      path: "/api/add/kid",
      payload: { user_id: "626d3f2ada7760f0a736b4ce", dateOfBirth: dateOfBirth.trim(),  name: name.trim() },
    }).post();
  
    return result;
  }
 
  async function addPlan({  name, dateOfBirth}) {
    const result = await new Client({
      path: "/api/add/kid",
      payload: { user_id: "626d3f2ada7760f0a736b4ce", dateOfBirth: dateOfBirth.trim(),  name: name.trim() },
    }).post();
  
    return result;
  }

  async function addRole({  name, dateOfBirth}) {
    const result = await new Client({
      path: "/api/add/kid",
      payload: { user_id: "626d3f2ada7760f0a736b4ce", dateOfBirth: dateOfBirth.trim(),  name: name.trim() },
    }).post();
  
    return result;
  }
 
 
 


export{
    getKids,
    getTagline,
    getSlot,
    getPlan,
    getLocation,
    getCoach,
    getBooking,
    addRole,
    deActivateRoleId
}