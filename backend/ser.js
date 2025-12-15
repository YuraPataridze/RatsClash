// settings
const express = require('express')
const fs = require('fs')
const cors = require('cors')
const path = require('path')

const app = express()
const PORT = 3000
const DB_FILE = path.join(__dirname, 'db.json')

app.use(cors())
app.use(express.json())

// read db
function readDB() {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'))
}

function writeDB(db) {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2))
}

// authorisation
app.post('/api/enter', (req, res) => {
    const { user_code } = req.body

    if (!user_code) {
        return res.status(400).json({ message: 'Invalid user code' })
    }

    const db = readDB()
    const user = db.users[user_code]

    if (!user) {
        return res.status(404).json({ message: 'User NOT FOUND' })
    }

    res.json({
        status: 'ok',
        user_name: user_code,
        coins: user.coins,
        earnPerClick: user.earnPerClick,
        coinsToLevUp: user.coinsToLevUp,
        coinsPerSec: user.coinsPerSec,
        level: user.level,
        progressBarVal: user.progressBarVal,
        maxProgressVal: user.maxProgressVal
    })
})

// get data
app.post('/api/coins/get', (req, res) => {
    const { user_code } = req.body

    if (!user_code || typeof user_code !== 'string') {
        return res.status(400).json({ message: 'Неверный код' })
    }

    const db = readDB()
    const user = db.users[user_code]

    if (!user) {
        return res.status(401).json({ message: 'Неверный код' })
    }

    res.json({
        coins: user.coins,
        earnPerClick: user.earnPerClick,
        coinsToLevUp: user.coinsToLevUp,
        coinsPerSec: user.coinsPerSec,
        level: user.level,
        progressBarVal: user.progressBarVal,
        maxProgressVal: user.maxProgressVal
    })
})

// update data
app.post('/api/game/update', (req, res) => {
    const {
        user_code,
        coins,
        earnPerClick,
        coinsToLevUp,
        coinsPerSec,
        level,
        progressBarVal,
        maxProgressVal
    } = req.body

    if (!user_code) {
        return res.status(400).json({ message: 'Нет user_code' })
    }

    const db = readDB()
    const user = db.users[user_code]

    if (!user) {
        return res.status(401).json({ message: 'Неверный код' })
    }

    if (typeof coins === 'number') user.coins = coins
    if (typeof earnPerClick === 'number') user.earnPerClick = earnPerClick
    if (typeof coinsToLevUp === 'number') user.coinsToLevUp = coinsToLevUp
    if (typeof coinsPerSec === 'number') user.coinsPerSec = coinsPerSec
    if (typeof level === 'number') user.level = level
    if (typeof progressBarVal === 'number') user.progressBarVal = progressBarVal
    if (typeof maxProgressVal === 'number') user.maxProgressVal = maxProgressVal

    writeDB(db)

    res.json({
        status: 'success',
        user
    })
})

// start
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`)
})
