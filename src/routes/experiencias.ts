import express from 'express'
import * as experienciasServices from '../services/experienciasServices'

//import toNewUser from '../extras/utils'

const router = express.Router()

router.get('/', async(_req, res) => {
    const data = await experienciasServices.getEntries.getAll()
    return res.json(data);
})

router.get('/:id', async(req, res) => {
    const data = await experienciasServices.getEntries.findById(req.params.id)
    return res.json(data);
})

router.get('/user/:id', async(req, res) => {
    const data = await experienciasServices.getEntries.findUserById(req.params.id)
    return res.json(data);
})

router.post('/', async(req, res) => {
    const data = await experienciasServices.getEntries.create(req.body)
    return res.json(data);
})

router.post('/addParticipant/:idExp/:idPart', async(req, res) => {
    const data = await experienciasServices.getEntries.addParticipant(req.params.idExp,req.params.idPart)
    return res.json(data);
})

router.put('/:id', async(req, res) => {
    const data = await experienciasServices.getEntries.update(req.params.id,req.body)
    return res.json(data);
})

router.delete('/:id', async(req, res) => {
    const data = await experienciasServices.getEntries.delete(req.params.id)
    return res.json(data);
})

router.delete('/delParticipant/:idExp/:idPart', async(req, res) => {
    const data = await experienciasServices.getEntries.delParticipant(req.params.idExp,req.params.idPart)
    return res.json(data);
})

export default router