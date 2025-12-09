const express = require('express');
const fs = require('fs'); // Модуль для работы с файлами
const cors = require('cors'); // Модуль для разрешения запросов с браузера
const path = require('path');

const app = express();
const PORT = 3000; // Порт, на котором будет работать сервер
const DB_FILE = path.join(__dirname, 'db.json');

// --- НАСТРОЙКИ ---
app.use(cors()); // Разрешаем фронтенду стучаться сюда
app.use(express.json()); // Учим сервер понимать JSON, который придет с фронта

// если файла нет, создадим его с 0 монет
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ 
        users: [
        { username: "admin", password: "111", coins: 999999 }, // Богатый админ
        { username: "player", password: "123", coins: 0 }      // Обычный игрок
    ]
     }));
}

// Фронтенд делает запрос сюда, чтобы узнать текущий счет
app.get('/api/coins', (req, res) => {
    // Превращаем текст в объект JS и отправляем
    const json = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    res.json(json);
});

// Фронтенд присылает сюда новое количество монет
app.post('/api/coins', (req, res) => {
    const { coins } = req.body; // Получаем число из запроса

    if (typeof coins !== 'number') {
        return res.status(400).json({ error: 'Нужно прислать число!' });
    }

    // 1. Записываем новые данные в файл
    fs.writeFileSync(DB_FILE, JSON.stringify({ coins: coins }));
    
    // 2. Отвечаем, что всё ок
    console.log(`Сохранено монет: ${coins}`);
    res.json({ status: 'success', saved: coins });
});

app.listen(PORT, () => {
    console.log(`🚀 Сервер работает на http://localhost:${PORT}`);
});