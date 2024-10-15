"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
//import { TokenValidation } from '../middleware/verifyToken';
//import {TokenValidationProfile} from '../middleware/verifyTokenProfile'
const verifyJWT_1 = require("../middleware/verifyJWT");
const verifyOwner_1 = require("../middleware/verifyOwner");
const verifyAdmin_1 = require("../middleware/verifyAdmin");
const router = express_1.default.Router();
// Ruta para obtener todos los usuarios
router.get("/", userController_1.getUsers);
// Ruta per crear usuari
router.post("/", userController_1.createUser);
//Ruta per obtenir usuari per id
router.get("/:id", userController_1.getUser);
//Ruta per actialitzar usuari per id
router.put("/update/:id", userController_1.updateUser);
//Ruta per eliminar user per id
router.delete('/delete/:id', verifyJWT_1.TokenValidation, verifyAdmin_1.AdminValidation, userController_1.deleteUser);
//Ruta per fer login
router.post("/login", userController_1.login);
//Ruta per veure el perfil amb token
router.get("/:id/profile", verifyJWT_1.TokenValidation, verifyOwner_1.verifyOwnership, userController_1.profile);
exports.default = router;
