import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IPayload {
    username: string;
    isAdmin: boolean; // Añade el campo isAdmin al payload
    iat: number;
    exp: number;
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    console.log('Verifying token');
    // Recoge el token escrito en el header
    const token = req.header('auth-token');
    console.log('Token:', token); // Imprime el token en la consola
    // Comprobamos 
    if (!token) return res.status(401).json('Access denied');

    try {
        // Obtenemos de nuevo las datos codificadas del token
        const payload = jwt.verify(token, process.env.SECRET || 'tokentest') as IPayload;
        console.log(payload.isAdmin);
        // Si es admin, llamamos a next sin bloqueos
        if (payload.isAdmin === true) {
            console.log("Eres admin");
            return next();
        }
        // Si no es admin, continuar al siguiente middleware
        console.log("No eres admin pero vamos a verificar si puedes realizar la acción");
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
};

export const verifyUserOwnership = async (req: Request, res: Response, next: NextFunction) => {
    const userIdToDelete = req.params.ideliminado; // ID del usuario que se quiere eliminar
    const currentUserId = req.params.idUser; // Asumiendo que `username` es el ID del usuario

    // Comprueba si el usuario que intenta eliminar es el mismo que está intentando eliminar
    if (currentUserId === userIdToDelete) {
        return next(); // Permite el acceso si es el propietario o si es admin
    }

    return res.status(403).json({ message: 'Forbidden: You do not have permission to perform this action.' });
};


