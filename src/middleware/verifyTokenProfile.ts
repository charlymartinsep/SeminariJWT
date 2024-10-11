import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {verifyUserOwnership} from './verifyUserProfile'
//import { usersofDB } from '../modelos/types_d_users';
import * as userServices from '../services/userServices'

interface IPayload {
    username: string;
    isAdmin: boolean; // Añade el campo isAdmin al payload
    iat: number;
    exp: number;
}

export const TokenValidationProfile = async (req: Request, res: Response, next: NextFunction) => {
    console.log('Verifying token Profile');
    const idUserToCheck = req.params.id
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
        const user = await userServices.getEntries.findByUsername(payload.username);
        const idUser = user?.id;
        console.log(user);
        // Si no es admin, continuar al siguiente middleware
        console.log("No eres admin pero vamos a verificar si puedes realizar la acción");
        verifyUserOwnership(idUserToCheck, idUser, res, next);
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
};
