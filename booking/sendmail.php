<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Настройки
$toEmail = 'grafrus26@yandex.ru'; // Замените на ваш реальный email
$subject = 'Новая заявка на полет с сайта';

// Получаем JSON-данные из запроса
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Проверка на спам (пустые скрытые поля)
if (!empty($data['honeypot'])) {
    echo json_encode(['success' => false, 'message' => 'Spam detected']);
    exit;
}

// Формируем тело письма в HTML
$message = "
<html>
<head>
    <title>Новая заявка</title>
    <style>
        body { font-family: Arial, sans-serif; }
        table { border-collapse: collapse; width: 100%; }
        th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <h2>Детали заявки</h2>
    <table>
        <tr><th>Поле</th><th>Значение</th></tr>
        <tr><td>Тип полёта</td><td>{$data['flightType']}</td></tr>
        <tr><td>Дата</td><td>{$data['flightDate']}</td></tr>
        <tr><td>Время</td><td>{$data['flightTime']}</td></tr>
        <tr><td>Количество человек</td><td>{$data['participants']}</td></tr>
        <tr><td>ФИО</td><td>{$data['fullName']}</td></tr>
        <tr><td>Телефон</td><td>{$data['phone']}</td></tr>
        <tr><td>Email</td><td>{$data['email']}</td></tr>
        <tr><td>Комментарий</td><td>{$data['comment']}</td></tr>
        <tr><td>Номер бронирования</td><td>{$data['bookingNumber']}</td></tr>
    </table>
</body>
</html>
";

// Заголовки письма
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";
$headers .= "From: Летай красиво <no-reply@letikrasivo.ru>\r\n";
$headers .= "Reply-To: {$data['email']}\r\n";

// Отправка письма
$mailSent = mail($toEmail, $subject, $message, $headers);

// Ответ для JavaScript
echo json_encode([
    'success' => $mailSent,
    'message' => $mailSent ? 'Заявка успешно отправлена!' : 'Ошибка при отправке заявки.',
    'bookingNumber' => $data['bookingNumber']
]);
?>