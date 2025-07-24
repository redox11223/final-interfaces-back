import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import productRouter from "./routes/product.routes.js"
import orderRouter from "./routes/order.routes.js"
import pool from "./db/db.js"


(async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ Conexión exitosa a PostgreSQL:", res.rows[0].now);
  } catch (error) {
    console.error("❌ Error al conectar a PostgreSQL:", error.message);
  }
})();


dotenv.config()
const app=express()
const PORT=process.env.PORT||4000

app.use(express.json())
app.use(express.static('public'))
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:5173',
      'https://final-interfaces-front.vercel.app'
    ];

    // Permitir requests sin "origin" (como Postman o curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('❌ No permitido por CORS'));
    }
  },
  credentials: true
}));

app.use('/api/usuario',userRouter)
app.use('/api/producto',productRouter )
app.use('/api/orden',orderRouter)


console.log("Iniciando servidor...")
app.listen(PORT, () => {
  console.log("Servidor escuchando en el puerto:", PORT);
}).on('error', (err) => {
  console.error("Error al intentar iniciar el servidor:", err.message);
});




