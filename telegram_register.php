
<?php
header('Content-Type: application/json');

// Чтение данных от Telegram
$content = file_get_contents("php://input");
$update = json_decode($content, true);

// Проверка что это сообщение
if (!isset($update["message"])) {
    echo json_encode(["status" => "no_message"]);
    exit;
}


$message = $update["message"];
$chat_id = $message["chat"]["id"];
$username = isset($message["from"]["username"]) ? $message["from"]["username"] : null;
$first_name = $message["from"]["first_name"] ?? '';
$timestamp = date("Y-m-d H:i:s");

// Сохраняем chat_id и username
$entry = "chat_id: $chat_id
username: @$username
first_name: $first_name
date: $timestamp
---
";
file_put_contents("telegram_users.txt", $entry, FILE_APPEND);

// Ответ пользователю
if (isset($update["message"]["text"]) && $update["message"]["text"] === "/start notify") {
    file_get_contents("https://api.telegram.org/bot8163934327:AAEWGZQFhBs7TenJpokQulACiNCW2Tlj9KQ/sendMessage?" . http_build_query([
        'chat_id' => $chat_id,
        'text' => "Спасибо за заявку! Мы за 2 дня напомним вам о полёте ☀️"
    ]));
}

echo json_encode(["status" => "registered"]);
