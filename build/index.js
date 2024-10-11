"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const experiencias_1 = __importDefault(require("./routes/experiencias"));
const mongo_conn_1 = require("./database/mongo_conn");
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, mongo_conn_1.run)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = 3000;
app.get('/ping', (_req, res) => {
    console.log('ping recivido correctamente');
    res.send('pinged');
});
app.use('/api/user', user_1.default);
app.use('/api/experiencias', experiencias_1.default);
app.listen(PORT, () => {
    console.log('el servidor esta escuchando en el puerto ' + PORT);
});
