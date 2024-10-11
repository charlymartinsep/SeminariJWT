"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersofDB = exports.userSchema = void 0;
// src/models/user.ts
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false } // Añadir isAdmin con valor por defecto false
});
// Cambiar 'usersofDB' a plural para mayor claridad
exports.usersofDB = (0, mongoose_1.model)('User', exports.userSchema);
