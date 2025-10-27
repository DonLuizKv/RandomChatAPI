import multer from 'multer';
import fs from 'fs';
import cloudinary from '../../../Infra/cloudinary.js';
import { NextFunction, Request, Response } from 'express';

// Extender el tipo de Request para incluir cloudinaryData
declare global {
    namespace Express {
        interface Request {
            cloudinaryData?: {
                url: string;
                public_id: string;
                format: string;
                bytes: number;
            };
        }
    }
}

const upload = multer({ dest: 'uploads/' });

// Middleware de Multer
export const uploadMiddleware = upload.single('file');

// Middleware de Cloudinary
export const uploadToCloudinary = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se subió ningún archivo' });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'uploads',
        });

        // Eliminar archivo temporal
        try {
            fs.unlinkSync(req.file.path);
        } catch (unlinkError) {
            console.error('Error al eliminar archivo temporal:', unlinkError);
            // Continuar aunque falle la eliminación
        }

        // Guardar datos de Cloudinary en el request
        req.cloudinaryData = {
            url: result.secure_url,
            public_id: result.public_id,
            format: result.format,
            bytes: result.bytes,
        };

        next();
    } catch (error) {
        console.error('Error en uploadToCloudinary:', error);
        res.status(500).json({ error: 'Error al subir archivo a Cloudinary' });
    }
};