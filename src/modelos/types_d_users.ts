// src/models/user.ts
import { model, Schema } from "mongoose";

export interface userInterface {
    username: string;
    name: string;
    email: string;
    password: string;
    isAdmin?: boolean;  // Añadir isAdmin como propiedad opcional
}

export type UsersInterfacePublicInfo = Pick<userInterface, 'username' | 'name'>;
export type newUserInfo = Omit<userInterface, 'id'>;

export const userSchema = new Schema<userInterface>({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false } // Añadir isAdmin con valor por defecto false
});

// Cambiar 'usersofDB' a plural para mayor claridad
export const usersofDB = model<userInterface>('User', userSchema);
