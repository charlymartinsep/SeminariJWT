"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserOwnership = void 0;
const verifyUserOwnership = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdToDelete = req.params.ideliminado; // ID del usuario que se quiere eliminar
    const currentUserId = req.params.idUser; // Asumiendo que `username` es el ID del usuario
    // Comprueba si el usuario que intenta eliminar es el mismo que está intentando eliminar
    if (currentUserId === userIdToDelete) {
        return next(); // Permite el acceso si es el propietario o si es admin
    }
    return res.status(403).json({ message: 'Forbidden: You do not have permission to perform this action.' });
});
exports.verifyUserOwnership = verifyUserOwnership;
