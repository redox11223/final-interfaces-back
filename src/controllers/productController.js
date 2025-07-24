import { getProducts ,getProductById} from "../models/productModel.js";


export const mostrarProductos=async(req,res)=>{
  try {
    const productos=await getProducts();
    res.status(200).json(productos)
  } catch (error) {
    console.error("No se pudieron mostrar los productos",error)
    res.status(500).json({mensaje:'Error al solicitar los productos'})
  }
}

export const productoPorId=async(req,res)=>{
  try {
    const id=parseInt(req.params.id);
    console.log("ID recibido:", id);
    if(isNaN(id)){
      return res.status(400).json({mensaje:"ID inválido"})
    }  
    const producto=await getProductById(id);
    console.log("Producto encontrado:", producto)
    if(!producto){
      return res.status(404).json({mensaje:"Producto no encontrado"})
    }
    res.status(200).json(producto)
    
  } catch (error) {
    console.error("Error al cargar el producto: ",error)
    res.status(500).json({mensaje:"Error al solicitar el Producto"})
  }
}

