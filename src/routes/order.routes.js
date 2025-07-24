import { Router } from "express";
import { confirmarOrden } from "../controllers/orderController.js";

const router=Router()

router.post("/confirmar",confirmarOrden)

export default router