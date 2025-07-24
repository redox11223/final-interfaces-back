import pool from "../db/db.js"

export const crearUsuario=async({nombre,email,telefono,password})=>{
  const result= await pool.query(
    `INSERT INTO usuario(nombre,email,telefono,password) VALUES($1,$2,$3,$4) RETURNING *`,
    [nombre,email,telefono,password]
  )
  return result.rows[0]
}

export const usuarioPorNombre=async(nombre)=>{
  const result=await pool.query(
    `SELECT * from usuario WHERE nombre=$1`,[nombre]
  )
  return result.rows[0]
}


