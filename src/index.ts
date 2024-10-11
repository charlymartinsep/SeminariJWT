import express,{RequestHandler} from 'express'
import cors from 'cors'
import userRouter from './routes/user'
import experienciasRouter from './routes/experiencias'
import { run } from './database/mongo_conn'
//Variables d'entorn
import dotenv from 'dotenv';
dotenv.config();

const app = express()
app.use(express.json())
run();

app.use(cors());
app.use(express.json() as RequestHandler);

const PORT = 3000;

app.get('/ping', (_req , res) => {
    console.log('ping recivido correctamente')
    res.send('pinged')
})

app.use('/api/user',userRouter)
app.use('/api/experiencias',experienciasRouter)

app.listen(PORT, () => {
    console.log('el servidor esta escuchando en el puerto '+ PORT)
})