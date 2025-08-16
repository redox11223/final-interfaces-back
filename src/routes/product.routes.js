import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  mostrarProductos,
  productoPorId,
} from "../controllers/productController.js";

const router = Router();

router.get("/", mostrarProductos);
router.get("/:id", productoPorId);
router.post("/", createProduct);
router.put("/:id", editProduct);
router.delete("/:id", deleteProduct);

export default router;
