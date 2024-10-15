import { Request, Response } from "express";
import { userInterface } from "../modelos/types_d_users";
import * as userServices from "../services/userServices";


import jwt from 'jsonwebtoken'


export async function getUsers(_req: Request, res: Response): Promise<Response> {
   try {
    console.log("Get users");
    const users = await userServices.getEntries.getAll();
    // Encriptar las contraseñas de los usuarios antes de devolverlos
    for (let user of users) {
        user.password = await user.encryptPassword(user.password);
     }
    return res.json(users);
   } catch (error) {
    return res.status(500).json({ error:'Failes to get users'});
   }
}

export async function createUser(req: Request, res: Response): Promise<Response> {
    try {
        const { username, name, email, password,isAdmin } = req.body as userInterface;
        console.log('creating user');
        const newUser: Partial<userInterface> = { username, name, email, password, isAdmin };
        console.log(newUser);
        const user = await userServices.getEntries.createUser(newUser);
        user.password = await user.encryptPassword(user.password);
        console.log(user);
        //Retornem token al crear un usuari
        const token: string = jwt.sign({username: user.username,}, process.env.SECRET || 'tokentest')
        return res.header('auth-token', token).json(user); 
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create user' });
    }
}

export async function getUser(req: Request, res: Response): Promise<Response> {
    try {
        console.log('Get user');
        const id = req.params.id;
        const user = await userServices.getEntries.findById(id);
        if(!user) {
            return res.status(404).json({ error: `User with id ${id} not found` });
        }
        user.password = await user.encryptPassword(user.password);
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get user' });
    }
}

export async function updateUser(req: Request, res: Response): Promise<Response> {
    try{
        console.log('Get user');
        const id = req.params.id;
        const { username, name, email, password, isAdmin } = req.body as userInterface;
        const updatedUser: Partial<userInterface> = { username, name, email, password, isAdmin };
        const user = await userServices.getEntries.updateUserById(id, updatedUser);

        if(!user) {
            return res.status(404).json({ error: `User with id ${id} not found` });
        }
        user.password = await user.encryptPassword(user.password);
        return res.json({
            message: "User updated",
            user
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update user' });
    }
}

export async function deleteUser(req: Request, res: Response): Promise<Response> {
    try {
        console.log('Delete user');
        // Asegúrate de que el nombre del parámetro coincida con lo que has definido en la ruta
        const id = req.params.id; // Cambié 'idEliminado' a 'ideliminado'
        
        // Intenta eliminar el usuario utilizando el servicio
        const user = await userServices.getEntries.deleteUserById(id);
        
        if (!user) {
            return res.status(404).json({ error: `User with id ${id} not found` });
        }
        user.password = await user.encryptPassword(user.password);
        // Devuelve una respuesta de éxito
        return res.json({ message: 'User deleted successfully', user });
    } catch (error) {
        console.error('Error deleting user:', error); // Agregado para más detalles sobre el error
        return res.status(500).json({ error: 'Failed to delete user' });
    }
}

export async function login(req: Request, res: Response): Promise<Response> {
    // Acceder a username y password desde req.body
    const { username, password } = req.body;

    console.log('Username:', username); // Cambiado para ver la variable username
    // Asegúrate de que el nombre del campo en el cuerpo coincide con el que envías en la solicitud
    const user = await userServices.getEntries.findByUsername(username);

    console.log('User:', user); // Cambiado para ver la variable user
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    // Comparar la contraseña
    if (password === user.password) { // Compara directamente con la contraseña
        // Crear token
        const token: string = jwt.sign({ username: username, isAdmin : user.isAdmin }, process.env.SECRET || 'tokentest');
        user.password = await user.encryptPassword(user.password);
        return res.json({
            message: "User logged in",
            token
        });
    }
    return res.status(400).json({ error: 'Incorrect password' });
}

export async function profile(req: Request, res: Response): Promise<Response> {
    try {
        console.log('Get user profile');
        const id = req.params.id; // Obtén el ID del usuario de los parámetros

        // Llama al servicio para encontrar al usuario por su ID
        const user = await userServices.getEntries.findById(id);

        // Verifica si el usuario existe
        if (!user) {
            return res.status(404).json({ error: `User with id ${id} not found` });
        }
        user.password = await user.encryptPassword(user.password);
        // Devuelve los datos del usuario
        return res.json(user);
    } catch (error) {
        console.error('Error retrieving user profile:', error); // Manejo de errores
        return res.status(500).json({ error: 'Failed to retrieve user profile' });
    }
}

