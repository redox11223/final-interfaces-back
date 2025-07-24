import { Router } from "express";
import { mostrarProductos,productoPorId } from "../controllers/productController.js";

const router=Router()

router.get("/",mostrarProductos)
router.get("/:id",productoPorId)

export default router