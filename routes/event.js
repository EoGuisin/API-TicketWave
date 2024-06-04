const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

//#region GET
function IncreasingID(a, b) {
    if(a > b) return -1;
    if(a < b) return 1;
    return 0;
}

router.get('/Events', async (req, res, next) => {    
    await Event.findAll().then((data) => {
        let modified_data = data.map(item => {
            return {
                id: item.id,
                name: item.nome,
                date: item.data,
                area: item.area,
                address: {
                    cep: item.cep,
                    publicPlace: item.logradouro,
                    complement: item.complemento,
                    neighborhood: item.bairro,
                    locality: item.localidade,
                    uf: item.uf,
                },
                description: item.descricao,
                map: [Number(item.latitude), Number(item.longitude)],
                attractions: item.atracoes,
            };
        });
        modified_data.sort(IncreasingID);
        return res.json({
            message: modified_data ? 'Esses são todos os eventos' : 'Não foi encontrado eventos',
            content: modified_data || null,
            status: modified_data ? 200 : 204,
            error: false,
        })
    }).catch(error => {
        return res.status(400).json({
            error: true,
            message: error,
        })
    })
});
//#endregion

//#region POST
router.post('/Event/Register', async (req, res, next) => {
    const newEvent = {
        name: req.body.nome,
        date: req.body.data,
        area: req.body.area,
        cep: req.body.cep,
        publicPlace: req.body.logradouro,
        complement: req.body.complemento,
        neighborhood: req.body.bairro,
        locality: req.body.localidade,
        uf: req.body.uf,
        description: req.body.descricao,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        attractions: req.body.atracoes,
    };
    await Event.create(newEvent);
    await Event.findAll()
        .then((data) => {
            let last = data.map(item => {
                return {
                    id: item.id,
                    name: item.nome,
                    date: item.data,
                    area: item.area,
                    address: {
                        cep: item.cep,
                        publicPlace: item.logradouro,
                        complement: item.complemento,
                        neighborhood: item.bairro,
                        locality: item.localidade,
                        uf: item.uf,
                    },
                    description: item.descricao,
                    map: [item.latitude, item.longitude],
                    attractions: item.atracoes,
                };
            });
            let modified_last = last[last.length - 1];
            return res.json({
                error: false,
                message: 'Cadastro realizado com sucesso',
                data: modified_last,
            });
        }).catch(error => {
            return res.status(400).json({
                error: true,
                message: error,
            });
        });
});
//#endregion

module.exports = router;