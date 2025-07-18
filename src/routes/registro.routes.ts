import { Router } from "express";
import { crearRegistro } from "../controllers/registro.controller";

const router = Router();

router.post("/", crearRegistro);

export default router;
