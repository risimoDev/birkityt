<?php
// Обработчик калькулятора — принимает JSON и отправляет письмо менеджеру
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

$raw = file_get_contents('php://input');
$data_in = json_decode($raw, true);

if (!$data_in) {
    header('Content-Type: application/json');
    echo json_encode(['result' => 'error', 'info' => 'Неверный JSON']);
    exit;
}

// Небольшая валидация
$name = $data_in['name'] ?? '';
$phone = $data_in['phone'] ?? '';
$email = $data_in['email'] ?? '';
$product = $data_in['productSelect'] ?? '';
$total = $data_in['totalCost'] ?? '';

$body = "<h2>Новый заказ с калькулятора</h2>";
$body .= "<b>Продукт:</b> " . htmlspecialchars($product) . "<br>";
$body .= "<b>Имя:</b> " . htmlspecialchars($name) . "<br>";
$body .= "<b>Телефон:</b> " . htmlspecialchars($phone) . "<br>";
$body .= "<b>Email:</b> " . htmlspecialchars($email) . "<br>";
$body .= "<b>Ориентировочная сумма:</b> " . htmlspecialchars($total) . "<br>";
$body .= "<pre>" . htmlspecialchars(json_encode($data_in, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) . "</pre>";

// Загрузка конфига (ENV or config.php)
$config = [];
if (file_exists(__DIR__ . '/config.php')) {
    $cfg = include __DIR__ . '/config.php';
    if (is_array($cfg))
        $config = $cfg;
}

$smtp_host = getenv('SMTP_HOST') ?: ($config['smtp_host'] ?? null);
$smtp_user = getenv('SMTP_USER') ?: ($config['smtp_user'] ?? null);
$smtp_pass = getenv('SMTP_PASS') ?: ($config['smtp_pass'] ?? null);
$smtp_secure = getenv('SMTP_SECURE') ?: ($config['smtp_secure'] ?? null);
$smtp_port = getenv('SMTP_PORT') ?: ($config['smtp_port'] ?? null);
$from_address = getenv('FROM_ADDRESS') ?: ($config['from_address'] ?? null);
$from_name = getenv('FROM_NAME') ?: ($config['from_name'] ?? 'Birkityt');
$to_address = getenv('TO_ADDRESS') ?: ($config['to_address'] ?? null);

if (!$smtp_host || !$smtp_user || !$smtp_pass || !$to_address) {
    header('Content-Type: application/json');
    echo json_encode(['result' => 'error', 'info' => 'SMTP не настроен. Настройте config.php или переменные окружения.']);
    exit;
}

$mail = new PHPMailer\PHPMailer\PHPMailer();
$mail->isSMTP();
$mail->CharSet = 'UTF-8';
$mail->SMTPAuth = true;
$mail->Host = $smtp_host;
$mail->Username = $smtp_user;
$mail->Password = $smtp_pass;
if ($smtp_secure)
    $mail->SMTPSecure = $smtp_secure;
if ($smtp_port)
    $mail->Port = (int) $smtp_port;
if ($from_address)
    $mail->setFrom($from_address, $from_name);
$mail->addAddress($to_address);
$mail->isHTML(true);
$mail->Subject = 'Заказ с калькулятора — birkityt.ru';
$mail->Body = $body;

if ($mail->send()) {
    header('Content-Type: application/json');
    echo json_encode(['result' => 'success', 'info' => 'Заказ отправлен менеджеру']);
} else {
    header('Content-Type: application/json');
    echo json_encode(['result' => 'error', 'info' => 'Ошибка при отправке письма', 'desc' => $mail->ErrorInfo]);
}
