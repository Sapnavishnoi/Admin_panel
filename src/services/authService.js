import { Client } from "./_clientService";
import sessionHelper from "./sessionHelper";

async function signIn({ email, password }) {
  
  const result = await new Client({
   
    path: "/api/auth/login",
    payload: { email: email.trim(), password: password.trim() },
  }).post();

  if (result.validate === false) {
    throw new Error(result.error || "Invalid credential provided.");
  }

  sessionHelper.onSignIn(result);
  // await onCreateSession();

  return true;
}

// async function onCreateSession() {
//   try{
//     const ops = [
//       new Client({ path: `/api/user/allowed-links` }).get(),
//       new Client({ path: `/api/platform-mgmt/active-all` }).get(),
//       new Client({ path: `/api/operator-mgmt/active-all` }).get(),
//       new Client({ path: `/api/brand-mgmt/active-all` }).get(),
//     ];
  
//     const response = await Promise.all(ops);
//     sessionHelper.onCreateSession({
//       allowedLinks: response[0],
//       platformActiveAll: response[1],
//       operatorActiveAll: response[2],
//       brandActiveAll: response[3]
//     })
//   } catch(e){
//     signOut();
//   }
// }

async function restore(){
    if(!sessionHelper.isLoggedIn()) return {error: true};
    sessionHelper.setUserInfo();
    // await onCreateSession();

    return {error: false};
}

function signOut() {
  localStorage.removeItem("userInfo");
  sessionHelper.onSignOut();
}

// export { signIn, signOut, restore, onCreateSession };
export { signIn, signOut, restore};
