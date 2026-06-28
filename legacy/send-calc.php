<?php
include __DIR__ . '/includes/db.php';
// Обработчик калькулятора — принимает JSON и отправляет письмо менеджеру
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
// Обработчик калькулятора — принимает JSON и сохраняет в БД
include __DIR__ . '/includes/db.php';

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
    try {
// Сохраняем в БД
try {
    $stmt = $pdo->prepare('INSERT INTO submissions (type,name,phone,email,payload) VALUES (?,?,?,?,?)');
    $stmt->execute([
        'calculator',
        $name,
        $phone,
        $email,
        json_encode($data_in, JSON_UNESCAPED_UNICODE)
    ]);
    header('Content-Type: application/json');
    echo json_encode(['result' => 'success', 'info' => 'Заявка сохранена']);
} catch (Throwable $e) {
    header('Content-Type: application/json');
    echo json_encode(['result' => 'error', 'info' => 'Ошибка сохранения', 'desc' => $e->getMessage()]);
}
