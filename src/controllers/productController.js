import {
  getProducts,
  getProductById,
  edit,
  deleteP,
} from "../models/productModel.js";
import { create } from "../models/productModel.js";

export const mostrarProductos = async (req, res) => {
  try {
    const productos = await getProducts();
    res.status(200).json(productos);
  } catch (error) {
    console.error("No se pudieron mostrar los productos", error);
    res.status(500).json({ mensaje: "Error al solicitar los productos" });
  }
};

export const productoPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log("ID recibido:", id);
    if (isNaN(id)) {
      return res.status(400).json({ mensaje: "ID inválido" });
    }
    const producto = await getProductById(id);
    console.log("Producto encontrado:", producto);
    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    res.status(200).json(producto);
  } catch (error) {
    console.error("Error al cargar el producto: ", error);
    res.status(500).json({ mensaje: "Error al solicitar el Producto" });
  }
};

export const createProduct = async (req, res) => {
  const { nombre, precio, descripcion, categoria, imagen_url } = req.body;
  if (!nombre || !precio || !descripcion || !categoria) {
    return res.status(400).json({ message: "Faltan campos requeridos" });
  }
  try {
    const response = await create({
      nombre,
      precio,
      descripcion,
      categoria,
      imagen_url,
    });
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.error("Error en crear producto", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const editProduct = async (req, res) => {
  const { nombre, precio, descripcion, categoria } = req.body;
  const { id_producto } = req.params;
  if (!nombre || !precio || !descripcion || !categoria) {
    return res.status(400).json({ message: "Faltan campos requeridos" });
  }
  try {
    const result = await edit(id_producto, {
      nombre,
      precio,
      descripcion,
      categoria,
    });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(`Error al editar producto:`, error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "ID producto no encontrado" });
  }
  try {
    const result = await deleteP(id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error al eliminar el producto", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
