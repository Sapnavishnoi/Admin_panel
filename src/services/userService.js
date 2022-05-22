import { Client } from "./_clientService";
import { signOut } from "./authService";

async function getUsers() {
  const result = await new Client({ path: `/api/get/user` }).get();

  return result;
}



async function addUser({
  email,
  name,
  password,
  mobile_number,
  secondaryMobileNumber

  
}) {
  const result = await new Client({
    path: "/api/auth/register",
    payload: {
      email: email.trim(),
      name: name.trim(),
      password: password.trim(),
      mobile_number: mobile_number.trim(),      
      secondaryMobileNumber: secondaryMobileNumber.trim()
      
    },
  }).post();

  return result;
}

async function deActivateUserId(userId) {
  const result = await new Client({
    path: "/api/user-mgmt/deactivate",
    payload: { userId },
  }).put();

  if (result?.message === "Unauthorized") {
    signOut();
    return { Unauthorized: true };
  }

  return { Unauthorized: false };
}

async function updateUserAccess(values) {
  const result = await new Client({
    path: "/api/user-mgmt/access",
    payload: values,
  }).put();

  if (result?.message === "Unauthorized") {
    signOut();
    return { Unauthorized: true };
  }

  return { Unauthorized: false };
}

async function updateUserInfo(values) {
  const result = await new Client({
    path: "/api/user-mgmt/user",
    payload: values,
  }).put();

  if (result?.message === "Unauthorized") {
    signOut();
    return { Unauthorized: true };
  }

  return { Unauthorized: false };
}

export {
  getUsers,
  addUser,
  deActivateUserId,
  updateUserAccess,
  updateUserInfo,
};
