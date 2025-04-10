<?php
// Подключение библиотеки
require '../phpmailer/PHPMailer.php';
require '../phpmailer/SMTP.php';
require '../phpmailer/Exception.php';

// Получение данных
$json = file_get_contents('php://input'); // Получение json строки
$data = json_decode($json, true); // Преобразование json

$email = $data['email'];
$type = $data['type'];
$date = $data['date'];
$time = $data['time'];
$count = $data['count'];
$name = $data['name'];
$phone = $data['phone'];
$comm = $data['comm'];

$title = 'Заявка на полет'; // Название письма
$body = '<p>Имя: <strong>'.$name.'</strong></p>'.
'<p>Тип полета: <strong>'.$type.'</strong></p>'.
'<p>Желаемое время: <strong>'.$time.'</strong></p>'.
'<p>Предварительная дата: <strong>'.$date.'</strong></p>'.
'<p>Телефон: <strong>'.$phone.'</strong></p>'.
'<p>Количество человек: <strong>'.$count.'</strong></p>'.
'<p>Почта: <strong>'.$email.'</strong></p>'.
'<p>Пожелания: <strong>'.$comm.'</strong></p>';

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  $mail->isSMTP();
  $mail->CharSet = 'UTF-8';
  $mail->SMTPAuth   = true;

  // Настройки почты отправителя
  $mail->Host       = 'smtp.yandex.com'; // SMTP сервера вашей почты
  $mail->Username   = 'grafrus26@yandex.ru'; // Логин на почте
  $mail->Password   = 'urujepdemwdavohl'; // Пароль на почте
  $mail->SMTPSecure = 'ssl';
  $mail->Port       = 465;

  $mail->setFrom('grafrus26@yandex.ru', 'Заявка с сайта'); // Адрес самой почты и имя отправителя

  // Получатель письма
  $mail->addAddress('grafrus26@yandex.ru');

  // Отправка сообщения
  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

  $mail->send('d');

  // Сообщение об успешной отправке
  echo ('Сообщение успешно отправлено');

} catch (Exception $e) {
  header('HTTP/1.1 400 Bad Request');
  echo('Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}');
}
