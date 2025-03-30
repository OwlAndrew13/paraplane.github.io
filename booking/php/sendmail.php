<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

// Настройки
$toEmail = 'grafrus26@yandex.ru'; // Ваш реальный email
$subject = 'Новая заявка на полет от ' . date('d.m.Y H:i');

// Получаем данные
$data = json_decode(file_get_contents('php://input'), true);

// Проверка данных
if(empty($data)) {
    echo json_encode(['success' => false, 'message' => 'Нет данных']);
    exit;
}

// Формируем письмо
$message = "<h2>Детали заявки:</h2>";
foreach($data as $key => $value) {
    $message .= "<p><strong>" . htmlspecialchars($key) . ":</strong> " . htmlspecialchars($value) . "</p>";
}

// Заголовки
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";
$headers .= "From: Летай красиво <no-reply@paragliding.local>\r\n";

// Отправка
if(mail($toEmail, $subject, $message, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Заявка отправлена!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Ошибка отправки']);
}
?>