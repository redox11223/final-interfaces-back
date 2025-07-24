import pool from "../db/db.js";

export const getProducts= async()=>{
    const result= await pool.query(
      `SELECT * FROM producto`
    )
    return result.rows

}

export const getProductById= async(id)=>{
  const result= await pool.query(
    `SELECT * FROM producto WHERE id_producto=$1`,[id]  
  )
  return result.rows[0]
}



