import { Request, Response } from "express";
import Registro from "../models/registro.model";
import { enviarCorreo } from "../services/mailer.service";

export const crearRegistro = async (req: Request, res: Response) => {
  try {
    const nuevoRegistro = new Registro({
      nombre: req.body.nombre,
      correo: req.body.correo,
      telefono: req.body.telefono,
      lugar: req.body.lugar,
      institucion: req.body.institucion,
      edad: req.body.edad,
      rol: req.body.rol
    });

    await nuevoRegistro.save();
    await enviarCorreo(nuevoRegistro);
    res.status(200).json({ mensaje: "Registro exitoso y correo enviado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar o enviar correo" });
  }
};

