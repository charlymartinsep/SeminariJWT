import { Request, Response, NextFunction } from 'express';


export const verifyUserOwnership = async (req: Request, res: Response, next: NextFunction) => {
    const userIdToDelete = req.params.ideliminado; // ID del usuario que se quiere eliminar
    const currentUserId = req.params.idUser; // Asumiendo que `username` es el ID del usuario

    // Comprueba si el usuario que intenta eliminar es el mismo que está intentando eliminar
    if (currentUserId === userIdToDelete) {
        return next(); // Permite el acceso si es el propietario o si es admin
    }

    return res.status(403).json({ message: 'Forbidden: You do not have permission to perform this action.' });
};