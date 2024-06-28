import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export const getImageByName = (req: Request, res: Response) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "..", "..", "images", filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send("Archivo no encontrado");
    }
    res.sendFile(filePath);
  });
};

export const uploadImage = (req: Request, res: Response) => {};

export const deleteImage = (req: Request, res: Response) => {};
