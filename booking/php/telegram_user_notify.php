
<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$username = ltrim(trim($data['username']), '@'); // удаляем @, если есть

$lines = file("telegram_users.txt", FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

$chat_id = null;
for ($i = 0; $i < count($lines); $i++) {
    if (strpos($lines[$i], "username: @$username") !== false) {
        for ($j = $i - 1; $j >= 0; $j--) {
            if (strpos($lines[$j], "chat_id:") === 0) {
                $chat_id = trim(str_replace("chat_id:", "", $lines[$j]));
                break 2;
            }
        }
    }
}

if (!$chat_id) {
    echo json_encode(["status" => "not_found", "message" => "Пользователь не найден. Сначала напишите боту."]);
    exit;
}

$bot_token = '8163934327:AAEWGZQFhBs7TenJpokQulACiNCW2Tlj9KQ';
$text = "🪂 Спасибо за бронирование полета! Ваша заявка получена. Мы свяжемся с вами в ближайшее время.";

$response = file_get_contents("https://api.telegram.org/bot$bot_token/sendMessage?" . http_build_query([
    'chat_id' => $chat_id,
    'text' => $text
]));

echo json_encode(["status" => "success"]);
