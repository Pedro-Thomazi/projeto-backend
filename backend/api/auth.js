const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')


module.exports = app => {
    const signin = async (req, res) => {
        if (!req.body.email || !req.body.password) {   // Se email e senha estiverem vazios
            return res.status(400).send('Informe o seu usuário e sua senha!')
        }

        const user = await app.db('users')
            .where({ email: req.body.email })
            .first()

        if (!user) return res.status(400).send('Usuário não encontrado!')  // Se o usuário não existir

        const isMatch = bcrypt.compareSync(req.body.password, user.password)  // Se uma senha é igual a outra
        if (!isMatch) return res.status(401).send('Email/Senha inválidos!')   // Erro 401 = Não autorizado

        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: now, // Emitido em ...
            exp: now + (60 * 60 * 24 * 3)  // Expira em (seg * min * hora * dia)
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }

    const validateToken = async (req, res) => {
        const userData = req.body || null
        try {
            if (userData) {
                const token = jwt.decode(userData.token, authSecret)
                if (new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        }
        catch (e) {
            // Problema com o token
        }

        res.send(false)
    }

    return { signin, validateToken }
}