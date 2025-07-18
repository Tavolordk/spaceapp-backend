import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { IRegistro } from "../models/registro.model";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

export const enviarCorreo = async (registro: IRegistro) => {
  await transporter.sendMail({
    from: `"Registro Space Apps Atoyac" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: "📬 Nuevo registro de participante",
    html: `
      <div style="background-color: #EDE0D4; padding: 24px; font-family: 'Segoe UI', sans-serif; border-radius: 12px; color: #264653; max-width: 600px; margin: auto;">
        <h2 style="color: #1D3557; border-bottom: 2px solid #7F4F24; padding-bottom: 8px;">📌 Detalles del Registro</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 8px; font-weight: bold;">👤 Nombre:</td>
            <td style="padding: 8px;">${registro.nombre}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">📧 Correo:</td>
            <td style="padding: 8px;">${registro.correo}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">🔢 Teléfono:</td>
            <td style="padding: 8px;">${registro.telefono}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">📍 Lugar de origen:</td>
            <td style="padding: 8px;">${registro.lugar}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">🎓 Institución:</td>
            <td style="padding: 8px;">${registro.institucion}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">🧠 Rol:</td>
            <td style="padding: 8px;">${registro.rol}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">🔢 Edad:</td>
            <td style="padding: 8px;">${registro.edad}</td>
          </tr>
        </table>
        <p style="margin-top: 24px; font-size: 0.9em; color: #6B705C;">
          Este correo fue generado automáticamente por el sistema de registro del evento <strong>NASA Space Apps Challenge Atoyac 2025</strong>.
        </p>
      </div>
    `
  });
};
