import { Router } from "express";
import {
  // loginAdmin,
  signupAdmin,
  getLoginAdmin,
  getProductData,
  signup,
  getLogin,
  signupGroups,
  getGroups,
  getProducts,
  activateBms,
  updateProductActivatedPostgres,
  loggedGetAdmin,
  turnOnOrOffBms,
  loggedGetUser,
  loggedGetAllUsersOfAdmin,
  loggedGetAllGroupsOfAdmin,
  loggedUpdateAdmin,
  loggedUpdateUsers,
  loggedUpdateGroup,
  loggedDeleteAdmin,
  loggedDeleteUser,
  loggedDeleteGroup,
  transferProductBetweenAdmins,
  platformEmployeesCreateProduct,
} from "../controllers/logincontroller.js";

const router = Router();

// Routes
router.post("/admin/signup", signupAdmin); //create admin, it requires one serial_code
router.post("/admin", getLoginAdmin); //login of admin to get token
router.post("/signup", signup); //admin or user with permission to can create an user
router.post("/", getLogin); //login of user to get token
router.post("/productdata", getProductData);//returns data from product, authenticated; filtered type_product, serial_code and timestamps
router.post("/groups/signup", signupGroups); // admin or user with permission can create a group, idAdmin is an integer of id of either the ADMIN or the USER
router.post("/groups", getGroups); // anyone with token can read groups related to its company, idAdminOrUser is an integer of id of either the ADMIN or the USER
router.post("/products", getProducts); // anyone with token can read products related to its company, idAdminOrUser is an integer of id of either the ADMIN or the USER
router.post("/activatebms", activateBms); // activate bms on aws iot core and ESP32
router.post("/updateproductactivatedpostgres", updateProductActivatedPostgres); // update bms in postgresql to activated
router.post("/loggedgetadmin", loggedGetAdmin); // get admin postgres data only if logged admin or user with permission to pay
router.post("/turnonoroffbms", turnOnOrOffBms); //turn on or off the bms; admin or user with permission to send command
router.post("/loggedgetuser", loggedGetUser); // get user data; admin or user with permission to send command
router.post("/loggedgetallusersofadmin", loggedGetAllUsersOfAdmin); // get users data; all users created by Admin or coworkers of User; admin or user with permission to send command
router.post("/loggedgetallgroupsofadmin", loggedGetAllGroupsOfAdmin); // get users data; all groups created by Admin or coworkers of User; admin or user with permission to send command
router.post("/loggedupdateadmin", loggedUpdateAdmin); //update admin only if admin logged in
router.post("/loggedupdateusers", loggedUpdateUsers); //update user only if user or its admin logged in
router.post("/loggedupdategroup", loggedUpdateGroup); //update user only if user or its admin logged in
router.post("/loggeddeleteadmin", loggedDeleteAdmin); //update admin only if admin logged in
router.post("/loggeddeleteuser", loggedDeleteUser); //update user only if user or its admin logged in
router.post("/loggeddeletegroup", loggedDeleteGroup); //update user only if user or its admin logged in
router.post("/transferproductbetweenadmins", transferProductBetweenAdmins); //admin resets its product, so a new ADMIN can register/signup and get the Product with the Serial cODE
router.post("/platformemployeescreateproduct", platformEmployeesCreateProduct); //admin (employee of the Platform) can create products throught here

export default router;
