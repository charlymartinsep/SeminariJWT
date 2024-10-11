import { usersofDB } from '../modelos/types_d_users'
//import userData from './users.json'

export const getEntries = {
    // Obtener todos los usuarios
    getAll: async()=>{
        return await usersofDB.find();
        },
     // Buscar usuario por ID
        findById: async(id:string)=>{
            return await usersofDB.findById(id);
        },
        // Crear un nuevo usuario
        createUser: async(entry:object)=>{
            console.log(entry);
            return await usersofDB.create(entry);
        },
        // Actualizar un usuario por ID
        updateUserById: async(id:string,body:object)=>{
            console.log(body);
            return await usersofDB.findByIdAndUpdate(id,body,{$new:true});
        },
        // Eliminar un usuario por ID
        deleteUserById: async(id:string)=>{
            return await usersofDB.findByIdAndDelete(id);
        },
        // Buscar usuari per username
        findByUsername: async(username:string) => {
            console.log(username);
            return await usersofDB.findOne({username: username});
        }, 
        addExperiencies: async(idUser:string,idExp:string)=>{
            return await usersofDB.findByIdAndUpdate(idUser,{$addToSet:{experiencies:idExp}});
        },
        delExperiencies: async(idUser:string,idExp:string)=>{
            return await usersofDB.findByIdAndDelete(idUser,{$pull:{experiencies:idExp}});
        }
}