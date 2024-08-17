import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { addList, getLists,deleteList,updateList } from "../controllers/list.js";

const router = express.Router();
 router.post("/:userId/lists/create", verifyToken, addList);
 router.get("/:userId/lists", verifyToken, getLists);
 router.put("/:userId/lists/update/:listId", verifyToken, updateList);
router.delete("/:userId/lists/delete/:listId", verifyToken, deleteList);

export default router;

