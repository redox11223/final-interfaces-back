import { insertarOrden } from "../models/orderModel.js";

export const confirmarOrden=async(req,res)=>{
  const {id_usuario,carrito,delivery,metodo_pago}= req.body
  if(!carrito||carrito.length===0) res.status(400).json({message:"El carrito esta vacio"})
  try {
    await insertarOrden(id_usuario,carrito,delivery,metodo_pago)

  } catch (error) {
    console.error("Error al confirmar Orden: ",error)
    res.status(500).json({message:"Error al procesar la orden"})
  }  
}