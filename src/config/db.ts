import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "configuracion.env" });
console.log("🌐 URI de conexión:", process.env.MONGO_URI);

export const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ Conectado a MongoDB Atlas");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    process.exit(1);
  }
};
