const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator');

class authController {
// Register user
register = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body

        const isUsed = await User.findOne({email})

        if (validator.isEmpty(firstname)) {
            return res.json({
                message: 'Поле First Name не может быть пустым.',
            })
        }

        if (validator.isEmpty(email)) {
            return res.json({
                message: 'Поле Email не может быть пустым.',
            })
        }

        if (!validator.isEmail(email)) {
            return res.json({
                message: 'Введен некорректный Email.',
            })
        }

        if (validator.isEmpty(password)) {
            return res.json({
                message: 'Поле Password не может быть пустым.',
            })
        }

        if (isUsed) {
            return res.json({
                message: 'Данный e-mail уже зарегистрирован.',
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hash,
        })

        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )

        await newUser.save()

        res.json({
            newUser,
            token,
            message: 'Регистрация прошла успешно.',
        })
    } catch (error) {
        res.json({ message: 'Ошибка при создании пользователя.' })
    }
}

// Login user
login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({email})

        if (!user) {
            return res.json({
                message: 'Такого пользователя не существует.',
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.json({
                message: 'Неверный пароль.',
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )

        res.json({
            token,
            user,
            message: 'Вы вошли в систему.',
        })
    } catch (error) {
        res.json({ message: 'Ошибка при авторизации.' })
    }
}

// Get Me
getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            return res.json({
                message: 'Такого юзера не существует.',
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )

        res.json({
            user,
            token,
        })
    } catch (error) {
        res.json({ message: 'Нет доступа.' })
    }
}
}

module.exports = new authController;