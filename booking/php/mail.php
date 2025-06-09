<?php
header('Content-Type: application/json');

// Настройки Telegram
$bot_token = '8163934327:AAEWGZQFhBs7TenJpokQulACiNCW2Tlj9KQ';  // <-- замени
$chat_id = '-4918043398';  // <-- замени на свой

// Чтение данных из формы
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Подготовка сообщения
$message = "📨 *Новая заявка на полет*\n";
$message .= "👤 Имя: " . $data['name'] . "\n";
$message .= "📞 Телефон: " . $data['phone'] . "\n";
$message .= "📧 Email: " . $data['email'] . "\n";
$message .= "🪂 Тип полета: " . $data['type'] . "\n";
$message .= "📅 Дата: " . $data['date'] . "\n";
$message .= "🕓 Время: " . $data['time'] . "\n";
$message .= "👥 Участников: " . $data['count'] . "\n";
$message .= "💬 Комментарий: " . ($data['comm'] ?: 'Нет') . "\n";
$message .= "🕒 Время заявки: " . date("Y-m-d H:i:s");

// Отправка сообщения в Telegram (вам)
file_get_contents("https://api.telegram.org/bot$bot_token/sendMessage?" . http_build_query([
    'chat_id' => $chat_id,
    'text' => $message,
    'parse_mode' => 'Markdown'
]));

// Можно дополнительно отправить клиенту подтверждение, если будет username

echo json_encode(['status' => 'success']);
