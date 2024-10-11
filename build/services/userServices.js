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
exports.getEntries = void 0;
const types_d_users_1 = require("../modelos/types_d_users");
//import userData from './users.json'
exports.getEntries = {
    // Obtener todos los usuarios
    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield types_d_users_1.usersofDB.find();
    }),
    // Buscar usuario por ID
    findById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield types_d_users_1.usersofDB.findById(id);
    }),
    // Crear un nuevo usuario
    createUser: (entry) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(entry);
        return yield types_d_users_1.usersofDB.create(entry);
    }),
    // Actualizar un usuario por ID
    updateUserById: (id, body) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(body);
        return yield types_d_users_1.usersofDB.findByIdAndUpdate(id, body, { $new: true });
    }),
    // Eliminar un usuario por ID
    deleteUserById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield types_d_users_1.usersofDB.findByIdAndDelete(id);
    }),
    // Buscar usuari per username
    findByUsername: (username) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(username);
        return yield types_d_users_1.usersofDB.findOne({ username: username });
    }),
    addExperiencies: (idUser, idExp) => __awaiter(void 0, void 0, void 0, function* () {
        return yield types_d_users_1.usersofDB.findByIdAndUpdate(idUser, { $addToSet: { experiencies: idExp } });
    }),
    delExperiencies: (idUser, idExp) => __awaiter(void 0, void 0, void 0, function* () {
        return yield types_d_users_1.usersofDB.findByIdAndDelete(idUser, { $pull: { experiencies: idExp } });
    })
};
