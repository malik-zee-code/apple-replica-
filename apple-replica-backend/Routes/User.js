import passport from "passport";
import {
  CreateUser,
  LoginUser,
  getUserbyToken,
  getUserWallet,
  updateUserWallet,
  getAllUserWallet,
  GenerateLink,
  ChangeLinkStatus,
  findLinkByUserId,
  getAllLinks,
  getAllUserPercentages,
  ChangePercentage,
  updateAdminWallet,
} from "../Controller/User.js";
import { validateUser } from "../Middleware/User.js";
import express from "express";

const router = express.Router();

router.post("/register", validateUser, CreateUser);
router.post("/inviteRegister", validateUser, CreateUser);
router.get("/links", getAllLinks);

router.post("/login", LoginUser);
router.get(
  "/getUser",
  passport.authenticate("jwt", { session: false }),
  getUserbyToken
);

router.get(
  "/generateLink",
  passport.authenticate("jwt", { session: false }),
  GenerateLink
);

router.get(
  "/getLink/:userId",
  passport.authenticate("jwt", { session: false }),
  findLinkByUserId
);

router.post(
  "/changeStatus/:linkId",
  passport.authenticate("jwt", { session: false }),
  ChangeLinkStatus
);
router.get(
  "/getWallet",
  passport.authenticate("jwt", { session: false }),
  getUserWallet
);

router.patch(
  "/updateWallet/:id",
  passport.authenticate("jwt", { session: false }),
  updateUserWallet
);

router.patch(
  "/updateWallet/admin/change",
  passport.authenticate("jwt", { session: false }),
  updateAdminWallet
);

router.get(
  "/getAllWallet",
  passport.authenticate("jwt", { session: false }),
  getAllUserWallet
);

router.get(
  "/getAllPercentages",
  passport.authenticate("jwt", { session: false }),
  getAllUserPercentages
);

router.post(
  "/changePercentage/:userId",
  passport.authenticate("jwt", { session: false }),
  ChangePercentage
);

export default router;
