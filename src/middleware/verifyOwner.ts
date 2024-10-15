import { Request, Response, NextFunction } from 'express';
import * as userServices from "../services/userServices";
import { handleHttp } from '../utils/error.handle'

export const verifyOwnership = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('verficant usuari')
        const userIdToActOn = req.params.id; // ID del usuario objetivo
        const username = req.user?.username; // Verificamos si req.user existe

        const user = await userServices.getEntries.findByUsername(username);
        const currentUserId = user?.id;
        console.log(user);

        console.log(userIdToActOn, currentUserId);

        // Comprueba si el usuario actual tiene permiso
        if (currentUserId === userIdToActOn) {
            // Si tiene permiso, pasamos al siguiente middleware
            console.log('vamos a hacer next');
            return next(); 
        }
        return res.json('no eres propietario');

    } catch (error) {
        handleHttp(res, 'Internal server error', error); 
    }
};
