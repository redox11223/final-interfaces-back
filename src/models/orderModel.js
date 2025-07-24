import pool from "../db/db.js";

export const insertarOrden=async({id_usuario,carrito,delivery,metodo_pago})=>{
  const client= await pool.connect()
  try {
    await client.query('BEGIN');
    for(const item of carrito){
      await client.query(
        `INSERT INTO orden(id_usuario,id_producto,delivery,metodo_pago) VALUES($1,$2,$3,$4)`,
        [id_usuario,item.id,delivery,metodo_pago]
      )
    }
    await client.query('COMMIT');
    return {success:true}
  } catch (error) {
    await client.query('ROLLBACK')
    throw error;  
  } finally{
    client.release()
  }  
}
