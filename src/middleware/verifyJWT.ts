import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { handleHttp } from '../utils/error.handle'


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
    if (!token) return handleHttp(res, 'Access denied', 'No token provided');

    try {
        // Obtenemos de nuevo las datos codificadas del token
        const payload = jwt.verify(token, process.env.SECRET || 'tokentest') as IPayload;
        req.user = payload;
        next();

    } catch (error) {
        handleHttp(res, 'Your token is not valid', error); 
    }
};