import express from "express";
import {
  OPTVerification,
  followWritter,
  getWriter,
  resendOTP,
  updateUser,
  getAllUsers,
  updateUserLock,
  deleteUser,
  createContact,
  sendEmailResponse,
  updatePolicy,
  getPolicyContent,
} from "../controllers/userController.js";
import userAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/verify/:userId/:otp", OPTVerification);
router.post("/resend-link/:id", resendOTP);

// user routes
router.post("/follower/:id", userAuth, followWritter);
router.put("/update-user", userAuth, updateUser);

router.get("/get-user/:id?", getWriter);

router.post("/admin-users", userAuth, getAllUsers);
router.patch("/update-user-lock/:id", userAuth, updateUserLock);
router.delete("/delete-user/:id", userAuth, deleteUser);

//contact
router.post("/contact", createContact);
router.post("/reply-email/:id", sendEmailResponse);

//Policy
router.patch("/policy/:id", userAuth, updatePolicy);
router.post("/admin-policy", userAuth, getPolicyContent);

export default router;
