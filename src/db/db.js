import {Pool} from "pg";
import dotenv  from "dotenv";

dotenv.config()
const pool=new Pool(
  {
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT,
    max:15,
    connectionTimeoutMillis:25000,
    ssl: { rejectUnauthorized: false }
  }
);
//idle---inactivo
// pool.on('error',(err)=>{
//   console.error("Error inesperado en cliente inactivo",{error:err.message})
// })
export default pool



