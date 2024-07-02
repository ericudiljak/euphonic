import express from "express";
import { getUser, updateUser, deleteUser, updateUsers} from "../controllers/user.js";
import { verifyToken, verifyRole } from "../controllers/auth.js";


const router = express.Router()




router.get("/find/:userId", verifyToken, verifyRole(["admin", 'registered', 'artist']), getUser)
router.put("", verifyToken, verifyRole(['admin', 'registered']), updateUser)
router.put("/:userId",verifyToken, verifyRole(['admin', 'registered']), updateUsers);
router.delete("/:userId", verifyToken, verifyRole(["admin"]), deleteUser);
//router.delete('/:userId', deleteUser);


export default router