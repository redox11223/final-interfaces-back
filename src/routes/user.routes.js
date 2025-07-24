import { Router } from "express";
import { registrarUsuario,login } from "../controllers/userController.js";

const router=Router();

router.post("/registro",registrarUsuario);
router.post("/login",login);



export default router