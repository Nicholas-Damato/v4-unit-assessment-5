const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const { username, password } = req.body
        const [foundUser] = await db.user.find_user_by_username(username)
        if (foundUser) {
            return res.status(409).send('That username is taken')
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const [createUser] = await db.user.create_user(username, hash, `https://robohash.org/${username}.png`)
        req.session.user = createUser
        res.status(200).send(req.session.user)
    },
    login: async (req, res) => {
        const db = req.app.get('db')
        const { username, password } = req.body
        const [foundUser] = await db.user.find_user_by_username(username)
        if (!foundUser) {
            return res.status(401).send('Username is not found')
        }
        const compare = bcrypt.compareSync(password, foundUser.password)
        if (compare) {
            req.session.user = foundUser
            return res.status(200).send(req.session.user)
        }
        return res.status(401).send('Password is incorrect')
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getUser: (req, res) => {
        if (!req.session.user) {
            return res.status(401).send('User not found')
        }
        return res.status(200).send(req.session.user)
    }
}