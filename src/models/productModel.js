import pool from "../db/db.js";

export const getProducts = async () => {
  const result = await pool.query(`SELECT * FROM producto`);
  return result.rows;
};

export const getProductById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM producto WHERE id_producto=$1`,
    [id]
  );
  return result.rows[0];
};

export const create = async ({
  nombre,
  precio,
  descripcion,
  categoria,
  imagen_url,
}) => {
  try {
    const result = await pool.query(
      `INSERT INTO producto(nombre, precio, descripcion, categoria, imagen_url) VALUES($1,$2,$3,$4,$5) RETURNING *`,
      [nombre, precio, descripcion, categoria, imagen_url]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al crear el producto: ${error.message}`);
  }
};

export const edit = async (
  id_producto,
  { nombre, precio, descripcion, categoria }
) => {
  try {
    const result = await pool.query(
      `UPDATE producto 
      SET nombre=$2,precio=$3,descripcion=$4,categoria=$5
      WHERE id_producto=$1 RETURNING *`,
      [id_producto, nombre, precio, descripcion, categoria]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al actualizar producto: ${error.message}`);
  }
};
export const deleteP = async (id_producto) => {
  try {
    const result = await pool.query(
      `DELETE FROM producto WHERE id_producto=$1 RETURNING *`,
      [id_producto]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al eliminar el producto: ${error.message}`);
  }
};
