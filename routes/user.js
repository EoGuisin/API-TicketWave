const express = require('express');
const router = express.Router();
const User = require('../models/User');

//#region GET
router.get('/User/:cpf/:senha', async (req, res, next) => {
    const { cpf } = req.params;
    const { senha } = req.params;
    
    await User.findAll({
        where: {
            cpf: cpf,
            senha: senha,
        }
    }).then(([data]) => {
        return res.json({
            message: data ? 'Bem vindo ao TicketWave' : 'CPF ou Senha incorretos',
            data: data || null,
            status: data ? 200 : 204,
            error: false,
        })
    }).catch(error => {
        return res.status(400).json({
            error: true,
            message: error,
        })
    })
});

router.get('/User', async (req, res, next) => {
    await User.findAll().then((data) => {
        return res.json({
            message: data ? 'Todos usuários cadastrados no TicketWave' : 'Não cadastros no TicketWave',
            data: data || null,
            status: data ? 200 : 204,
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
async function ExistingUser(cpf) {
    const amount = await User.count({
        where: { cpf: cpf }
    });
    if(amount > 0) return 1;
    else return 0;
};

router.post('/User/Register', async (req, res, next) => {
    const newUser = {
        senha: req.body.senha,
        nome: req.body.nome,
        email: req.body.email,
        cpf: req.body.cpf,
        nascimento: req.body.nascimento,
    };
    let amount = await ExistingUser(req.body.cpf);
    if(amount == 0) {
        await User.create(newUser);
        await User.findAll({
            where: {
                cpf: req.body.cpf,
                senha: req.body.senha,
            }
        }).then(([data]) => {
            return res.json({
                erro: false,
                mensagem: 'Cadastro realizado com sucesso',
                data
            });
        }).catch(error => {
            return res.status(400).json({
                erro: true,
                mensagem: error,
            });
        });
    } else {
        return res.json({
            erro: true,
            mensagem: 'Usuário já cadastrado',
        });
    };
});
//#endregion

//#region DELETE
/*router.delete('/',(req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando o DELETE dentro da rota de usuario'
    });
});*/
//#endregion

module.exports = router;