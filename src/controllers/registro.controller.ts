import { Request, Response } from "express";
import Registro from "../models/registro.model";
import { enviarCorreo } from "../services/mailer.service";
import axios from "axios";

export const crearRegistro = async (req: Request, res: Response) => {
  try {
    const { nombre, correo, telefono, lugar, institucion, edad, rol, captcha } = req.body;

    console.log("🧪 Captcha recibido:", captcha);

    if (!captcha) {
      return res.status(400).json({ error: "Captcha no enviado" });
    }

    const captchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
    const captchaResponse = await axios.post(
      captchaVerifyUrl,
      new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET || "",
        response: captcha,
      })
    );

    const captchaData = captchaResponse.data;
    console.log("🔍 captchaData:", captchaData);

    if (!captchaData.success) {
      return res.status(403).json({ error: "Captcha inválido", score: captchaData.score });
    }

    // 🔐 Solo si el captcha es válido, guardar registro
    const nuevoRegistro = new Registro({ nombre, correo, telefono, lugar, institucion, edad, rol });
    await nuevoRegistro.save();
    await enviarCorreo(nuevoRegistro);

    return res.status(200).json({ mensaje: "✅ Registro exitoso y correo enviado" });
  } catch (error: any) {
    console.error("❌ Error en backend:", error.message || error);
    return res.status(500).json({ error: "Error al registrar o enviar correo" });
  }
};
