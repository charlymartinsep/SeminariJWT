import { connect, connection } from 'mongoose';
//const mongoose = require ('mongoose')
//import mongoose from 'mongoose';

//const connectionString = 'mongodb://localhost:27017/Prueba_1'
export async function run() {
    await connect('mongodb://localhost:27017/Prueba_1')
    .then(()=>{
        console.log('Database connected!!')
    }) .catch((err)=>{
        console.error(err)
    });

}
export function endConn() {
    connection.close()
};
/*
const usersSchema = new Schema<UsersInterface>({
    id: Number,
    name: String,
    mail: String,
    password: String,
    comment: String
})

const usersofDB = model<UsersInterface>('user',usersSchema)*/

/*const user1 = new users({
    id: 6,
    name: 'Gerard',
    mail: 'Derivia',
    password: 'Ignis',
    comment: 'No le caen bien los caballeros'
})
user1.save().then((result)=>{
    console.log(result)
    }) .catch((err)=>{
    console.error(err)
    });*/

/*
usersofDB.find({}).then((result:any)=> {
    run();
    console.log(result)
    connection.close()
})

export default usersofDB;*/
