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
exports.run = run;
exports.endConn = endConn;
const mongoose_1 = require("mongoose");
//const mongoose = require ('mongoose')
//import mongoose from 'mongoose';
//const connectionString = 'mongodb://localhost:27017/Prueba_1'
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, mongoose_1.connect)('mongodb://localhost:27017/Prueba_1')
            .then(() => {
            console.log('Database connected!!');
        }).catch((err) => {
            console.error(err);
        });
    });
}
function endConn() {
    mongoose_1.connection.close();
}
;
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
