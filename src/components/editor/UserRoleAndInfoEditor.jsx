// import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import { makeStyles } from "@mui/styles";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import ContentShell from "../ContentShell";
// import FormTextInput from "../FormTextInput";
// import FormMultiSelectInput from "../FormMultiSelectInput";
// import { useSnackbar } from "../../hooks/useSnackbar";
// import { getRoles } from "../../services/roleService";
// import sessionHelper from "../../services/sessionHelper";
// import { updateUserInfo, updateUserAccess } from "../../services/userService";
// import configData from "../../config/config.json";

// const useStyles = makeStyles((theme) => ({
//   container: {
//     width: "100%",
//     // display: "flex",
//     // flexDirection: "column"
//   },
//   fieldConatiner: {
//     width: 280,
//   },
//   actionContainer: {
//     display: "flex",
//     justifyContent: "flex-end",
//     width: "100% !important",
//   },
//   cancelButton: {
//     color: theme.palette.button.secondaryTextColor,
//     marginRight: `10px !important`,
//     textTransform: "none !important",
//   },
//   submitButton: {
//     color: theme.palette.common.white,
//     backgroundColor: `${theme.palette.button.backgroundColor} !important`,
//     textTransform: "none !important",
//   },
// }));

// const userInfovalidationSchema = Yup.object().shape({
//   name: Yup.string().required("Required"),
//   email: Yup.string().email("Enter a valid email").required("Required"),
//   password: Yup.string()
//     .min(6)
// });

// const userAccessValidationSchema = Yup.object().shape({
//   name: Yup.string().required("Required"),
//   email: Yup.string().email("Enter a valid email").required("Required"),
//   allowedPlatforms: Yup.array().min(1).required("Required"),
//   allowedOperators: Yup.array().min(1).required("Required"),
//   allowedBrands: Yup.array().min(1).required("Required"),
//   role: Yup.array().min(1).required("Required"),
// });

// const userInfoInitialValues = {
//   name: "",
//   email: "",
//   password: "",
// };

// const userAccessInitialValues = {
//   name: "",
//   email: "",
//   allowedPlatforms: [],
//   allowedOperators: [],
//   allowedBrands: [],
//   role: [],
// };

// const UserInfo = () => {
//   const classes = useStyles();

//   return (
//     <Box className={classes.container}>
//       <Box className={classes.fieldConatiner}>
//         <FormTextInput id="name" name="name" label="Name" />
//       </Box>
//       <Box className={classes.fieldConatiner}>
//         <FormTextInput id="email" name="email" label="Email" />
//       </Box>
//       <Box className={classes.fieldConatiner}>
//         <FormTextInput id="password" name="password" label="Password" />
//       </Box>
//     </Box>
//   );
// };

// const UserAccessInfo = ({ filterOptions }) => {
//   const classes = useStyles();

//   return (
//     <Box className={classes.container}>
//       <Box className={classes.fieldConatiner}>
//         <FormTextInput id="name" name="name" label="Name" />
//       </Box>
//       <Box className={classes.fieldConatiner}>
//         <FormTextInput id="email" name="email" label="Email" />
//       </Box>
//       <Box className={classes.fieldConatiner}>
//         <FormMultiSelectInput
//           id="allowedPlatforms"
//           name="allowedPlatforms"
//           label="Allowed Platforms"
//           options={filterOptions.allowedPlatforms}
//         />
//       </Box>
//       <Box className={classes.fieldConatiner}>
//         <FormMultiSelectInput
//           id="allowedOperators"
//           name="allowedOperators"
//           label="Allowed Operators"
//           options={filterOptions.allowedOperators}
//         />
//       </Box>
//       <Box className={classes.fieldConatiner}>
//         <FormMultiSelectInput
//           id="allowedBrands"
//           name="allowedBrands"
//           label="Allowed Brands"
//           options={filterOptions.allowedBrands}
//         />
//       </Box>
//       <Box className={classes.fieldConatiner}>
//         <FormMultiSelectInput
//           id="role"
//           name="role"
//           label="Roles"
//           options={filterOptions.role}
//         />
//       </Box>
//     </Box>
//   );
// };

// const UserRoleAndInfoEditor = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { showSnackbar } = useSnackbar();
//   const classes = useStyles();

//   const formtype = location.pathname.split("/").slice(-1)[0];

//   const [initialValues, setInitialValues] = React.useState(
//     formtype === "edit" ? userInfoInitialValues : userAccessInitialValues
//   );
//   const [loading, setLoading] = React.useState(true);
//   const [filterOptions, setFilterOptions] = React.useState({
//     allowedPlatforms: sessionHelper.allowedPlatforms.map((data) => {
//       return { label: data, id: data };
//     }),
//     allowedOperators: sessionHelper.allowedOperators.map((data) => {
//       return { label: data, id: data };
//     }),
//     allowedBrands: sessionHelper.allowedBrands.map((data) => {
//       return { label: data, id: data };
//     }),
//     role: [],
//   });

//   const submitForm = async (values) => {
//     const userData = JSON.parse(localStorage.getItem("updateUser"));
//     setLoading(true);
//     try {
//       const result =
//         formtype === "edit"
//           ? await updateUserInfo({ ...values, userId: userData._id })
//           : await updateUserAccess({
//               ...values,
//               userId: userData._id,
//               allowedRegions: sessionHelper.allowedRegions,
//               role: values?.role?.join(",") || ""
//           });

//       if (result.Unauthorized) navigate(configData.routes.signIn);
//       setLoading(false);
//       showSnackbar("Updated Successfuly", "success");
//     } catch (e) {
//       showSnackbar(e.message || "Something went wrong.");
//       setLoading(false);
//     }
//     console.log(values);
//   };

//   const onCancel = () => navigate(configData.routes.user.home);

//   React.useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem("updateUser"));

//     async function fetchData() {
//       try {
//         const result = await getRoles();
//         setFilterOptions({
//           ...filterOptions,
//           role: result.map((data) => {
//             return {
//               label: data?.role || "",
//               id: data?.role || "",
//             };
//           }),
//         });

//         setLoading(false);
//       } catch (e) {
//         showSnackbar(e.message || "Something went wrong.");
//         setLoading(false);
//       }
//     }

//     if (formtype === "edit") {
//       setInitialValues({
//         name: userData?.name || "",
//         email: userData?.email || "",
//         password: userData?.password || "",
//       });

//       setLoading(false);
//     } else {
//       setInitialValues({
//         ...initialValues,
//         name: userData?.name || "",
//         email: userData?.email || "",
//         allowedBrands: userData?.allowedBrands || [],
//         allowedOperators: userData?.allowedOperators || [],
//         allowedPlatforms: userData?.allowedPlatforms || [],
//         role: userData?.role ? [userData.role] : [],
//       });

//       fetchData();
//     }
//   }, []);

//   return (
//     <ContentShell
//       title={formtype === "edit" ? "Update Details:" : "Update Roles:"}
//       loading={loading}
//     >
//       <Formik
//         initialValues={initialValues}
//         validationSchema={
//           formtype === "edit"
//             ? userInfovalidationSchema
//             : userAccessValidationSchema
//         }
//         onSubmit={submitForm}
//       >
//         <Form>
//           {formtype === "edit" ? (
//             <UserInfo />
//           ) : (
//             <UserAccessInfo filterOptions={filterOptions} />
//           )}
//           <Box className={classes.actionContainer}>
//             <Button
//               variant="text"
//               onClick={onCancel}
//               className={classes.cancelButton}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="contained"
//               type="submit"
//               className={classes.submitButton}
//             >
//               Save
//             </Button>
//           </Box>
//         </Form>
//       </Formik>
//     </ContentShell>
//   );
// };

// export default UserRoleAndInfoEditor;
