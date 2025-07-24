import { crearUsuario,usuarioPorNombre} from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const registrarUsuario=async(req,res)=>{
  const {nombre,email,telefono,password}=req.body
  try {
    const existeUsuario= await usuarioPorNombre(nombre);
    if(existeUsuario) return res.status(409).json({mensaje:'Usuario ya existe'})
    
    const hashed= await bcrypt.hash(password,10)
    const nuevoUsuario= await crearUsuario({nombre,email,telefono,password:hashed})
    res.status(201).json({user:{id:nuevoUsuario.id_usuario,nombre:nuevoUsuario.nombre,email:nuevoUsuario.email,telefono:nuevoUsuario.telefono}})   
  } catch (error) {
    console.error("Error de Registro de usuario: ",error)
    res.status(500).json({message:"Error al registrar el usuario"})
  }
}

export const login=async(req,res)=>{
  const {nombre,password}=req.body
  try {
    const usuario=await usuarioPorNombre(nombre);
    if (!usuario) return res.status(401).json({message:"Usuario no encontrado"})
    const match= await bcrypt.compare(password,usuario.password)
    if(!match) return res.status(401).json({message:"Contraseña incorrecta"})
    
    res.status(200).json({id:usuario.id_usuario, nombre:usuario.nombre})  
  } catch (error) {
    console.error("Error en el login: ",error)
    res.status(500).json({message:"Error en el Login"})
  }

}