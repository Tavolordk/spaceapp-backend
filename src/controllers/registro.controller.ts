import { Request, Response } from "express";
import Registro from "../models/registro.model";
import { enviarCorreo } from "../services/mailer.service";
import axios from "axios";

export const crearRegistro = async (req: Request, res: Response) => {
  try {
    const { nombre, correo, telefono, lugar, institucion, edad, rol, captcha } = req.body;

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

    if (!captchaData.success) {
      return res.status(403).json({ error: "Captcha inválido" });
    }

    const nuevoRegistro = new Registro({ nombre, correo, telefono, lugar, institucion, edad, rol });
    await nuevoRegistro.save();
    await enviarCorreo(nuevoRegistro);

    res.status(200).json({ mensaje: "Registro exitoso y correo enviado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar o enviar correo" });
  }
};
