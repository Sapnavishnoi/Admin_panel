import { Client } from "./_clientService";
import { signOut } from "./authService";
import { timelineConnectorClasses } from "@mui/lab";

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
 
  async function addTagline({  title, tagLine}) {
    const result = await new Client({
      path: "/api/create/home",
      payload: { title: title.trim(),  tagLine: tagLine.trim() },
    }).post();
  
    return result;
  }

  async function addSlot({planId, timing, totalSlot, amount, month, slotName}) {
    const result = await new Client({
      path: "/api/create/slot",
      payload: {
        slotName: slotName.trim(),
      planId: planId.trim(),      
      timing: timing.trim(),
      totalSlot:totalSlot.trim(),
      amount: amount.trim(),
      month: month.trim() },
    }).post();
  
    return result;
  }
 
  async function addPlan({ month, plan_name, days}) {
    const result = await new Client({
      path: "/api/add/pacakage",
      payload: {month: month.trim(),  plan_name: plan_name.trim(), days: days.trim() },
    }).post();
  
    return result;
  }

  async function addCoach({ profile, name, rating, bio}) {
    const result = await new Client({
      path: "/api/add/coach",
      payload: { profile: profile.trim(),  name: name.trim(), rating: rating.trim(), bio:bio.trim() },
    }).post();
  
    return result;
  }

  async function addLocation({ addressLine1, addressLine2, city, country, pincode, lat, long}) {
    const result = await new Client({
      path: "/api/create/location",
      payload: { addressLine1: addressLine1.trim(),  addressLine2: addressLine2.trim(), city: city.trim(), country: country.trim()
      ,pincode: pincode.trim(), lat:lat.trim(), long:long.trim() },
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
    deActivateRoleId,
    addTagline,
    addSlot,
    addPlan,
    addCoach,
    addLocation

}