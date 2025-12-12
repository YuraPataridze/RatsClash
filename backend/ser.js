const express = require('express')
const fs = require('fs') // Модуль для работы с файлами
const cors = require('cors')// Модуль для разрешения запросов с браузера
const path = require('path')

const app = express()
const PORT = 3000; // Порт, на котором будет работать сервер
const DB_FILE = path.join(__dirname, 'db.json')

// --- НАСТРОЙКИ ---
app.use(cors()); // Разрешаем фронтенду стучаться сюда
app.use(express.json()) // Учим сервер понимать JSON, который придет с фронта

// если файла нет, создадим его с 0 монет
if (!fs.existsSync(DB_FILE)) {
    console.log('There is no DB file. Creating...')
    fs.writeFileSync(DB_FILE, JSON.stringify({ 
        users: [
        { username: "admin", password: "111", coins: 999999 }, // Богатый админ
        { username: "player", password: "123", coins: 0 }      // Обычный игрок
    ]
     }));
}

// authorisation
app.post('/api/enter', (req, res) => {
    const { user_code } = req.body

    if (!user_code) {
        console.log('No user code sent')
        return res.status(400).json({ error: 'Нужен код!' })
    }

    const db_data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'))

    if (!db_data.users[user_code]) {
        console.log('User code not found')
        return res.status(401).json({ error: 'Код неверный' })
    }

    res.json({
        status: "ok",
        code: code,
        coins: db_data.users[user_code].coins
    })
})

// get coins(need code)
app.post('/api/coins/get', (req, res) => {
    const {user_code} = req.body

    if (!user_code || typeof user_code !== "string") {
        return res.status(400).json({ message: 'Неверный код' })
    }

    const db_data = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"))

    if (!db_data.users[user_code]) {
        return res.status(401).json({ message: 'Неверный код' })
    }

    return res.status(200).json({ coins: db_data.users[user_code].coins })
})

// update coins
app.post('/api/coins/set', (req, res) => {
    const { user_code, new_coins } = req.body

    if (typeof new_coins !== 'number') {
        return res.status(400).json({ message: "new_coins должен быть числом" })
    }

    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'))

    if (!db.users[user_code]) {
        return res.status(401).json({ message: 'Неверный код' })
    }

    db.users[user_code].coins = new_coins

    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2))

    res.json({ status: "success", coins: new_coins })
});


app.listen(PORT, () => {
    console.log(`🚀 Сервер работает на http://localhost:${PORT}`);
})