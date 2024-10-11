"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
exports.createUser = createUser;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.login = login;
exports.profile = profile;
const userServices = __importStar(require("../services/userServices"));
//Importem el middleware 
//import {TokenValidation} from '../middleware/verifyToken'
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getUsers(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Get users");
            const users = yield userServices.getEntries.getAll();
            return res.json(users);
        }
        catch (error) {
            return res.status(500).json({ error: 'Failes to get users' });
        }
    });
}
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, name, email, password, isAdmin } = req.body;
            console.log('creating user');
            const newUser = { username, name, email, password, isAdmin };
            console.log(newUser);
            const user = yield userServices.getEntries.createUser(newUser);
            console.log(user);
            //Retornem token al crear un usuari
            const token = jsonwebtoken_1.default.sign({ username: user.username, }, process.env.SECRET || 'tokentest');
            return res.header('auth-token', token).json(user);
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to create user' });
        }
    });
}
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Get user');
            const id = req.params.id;
            const user = yield userServices.getEntries.findById(id);
            if (!user) {
                return res.status(404).json({ error: `User with id ${id} not found` });
            }
            return res.json(user);
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to get user' });
        }
    });
}
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Get user');
            const id = req.params.id;
            const { username, name, email, password, isAdmin } = req.body;
            const updatedUser = { username, name, email, password, isAdmin };
            const user = yield userServices.getEntries.updateUserById(id, updatedUser);
            if (!user) {
                return res.status(404).json({ error: `User with id ${id} not found` });
            }
            return res.json({
                message: "User updated",
                user
            });
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to update user' });
        }
    });
}
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Delete user');
            // Asegúrate de que el nombre del parámetro coincida con lo que has definido en la ruta
            const id = req.params.ideliminado; // Cambié 'idEliminado' a 'ideliminado'
            // Intenta eliminar el usuario utilizando el servicio
            const user = yield userServices.getEntries.deleteUserById(id);
            if (!user) {
                return res.status(404).json({ error: `User with id ${id} not found` });
            }
            // Devuelve una respuesta de éxito
            return res.json({ message: 'User deleted successfully', user });
        }
        catch (error) {
            console.error('Error deleting user:', error); // Agregado para más detalles sobre el error
            return res.status(500).json({ error: 'Failed to delete user' });
        }
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Acceder a username y password desde req.body
        const { username, password } = req.body;
        console.log('Username:', username); // Cambiado para ver la variable username
        // Asegúrate de que el nombre del campo en el cuerpo coincide con el que envías en la solicitud
        const user = yield userServices.getEntries.findByUsername(username);
        console.log('User:', user); // Cambiado para ver la variable user
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Comparar la contraseña
        if (password === user.password) { // Compara directamente con la contraseña
            // Crear token
            const token = jsonwebtoken_1.default.sign({ username: username, isAdmin: user.isAdmin }, process.env.SECRET || 'tokentest');
            return res.json({
                message: "User logged in",
                token
            });
        }
        return res.status(400).json({ error: 'Incorrect password' });
    });
}
function profile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Get user profile');
            const id = req.params.id; // Obtén el ID del usuario de los parámetros
            // Llama al servicio para encontrar al usuario por su ID
            const user = yield userServices.getEntries.findById(id);
            // Verifica si el usuario existe
            if (!user) {
                return res.status(404).json({ error: `User with id ${id} not found` });
            }
            // Devuelve los datos del usuario
            return res.json(user);
        }
        catch (error) {
            console.error('Error retrieving user profile:', error); // Manejo de errores
            return res.status(500).json({ error: 'Failed to retrieve user profile' });
        }
    });
}
