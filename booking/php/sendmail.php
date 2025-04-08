<?php
header('Content-Type: text/plain');

// Проверка на спам (honeypot)
if (!empty($_POST['honeypot'])) {
    die("ERROR: Спам-заявка");
}

// Проверка обязательных полей
$required = ['phone', 'fullName', 'flightType', 'flightDate'];
foreach ($required as $field) {
    if (empty($_POST[$field])) {
        die("ERROR: Не заполнено обязательное поле: $field");
    }
}

// Фильтрация данных
$data = [];
foreach ($_POST as $key => $value) {
    $data[$key] = htmlspecialchars(strip_tags(trim($value)));
}

// Формирование письма
$message = "Новая заявка на полёт\n\n";
$message .= "Тип полёта: " . $data['flightType'] . "\n";
$message .= "Дата: " . $data['flightDate'] . "\n";
$message .= "Время: " . ($data['flightTime'] ?? 'не указано') . "\n";
$message .= "Количество человек: " . ($data['participants'] ?? 1) . "\n";
$message .= "Имя: " . $data['fullName'] . "\n";
$message .= "Телефон: " . $data['phone'] . "\n";
$message .= "Email: " . ($data['email'] ?? 'не указан') . "\n";
$message .= "Комментарий: " . ($data['comment'] ?? 'нет') . "\n";

// Логирование (для отладки)
file_put_contents(__DIR__ . '/mail_log.txt', date('Y-m-d H:i:s') . "\n" . $message . "\n\n", FILE_APPEND);

// Отправка письма
$to = 'ваша_почта@example.com'; // Замените на ваш email
$subject = 'Новая заявка на полёт';
$headers = "From: no-reply@yourdomain.com\r\n";
$headers .= "Reply-To: " . ($data['email'] ?? 'no-reply@yourdomain.com') . "\r\n";

$sent = mail($to, $subject, $message, $headers);

echo $sent ? "OK" : "ERROR: Не удалось отправить письмо";
?>