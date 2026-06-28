<?php
// Пример конфигурации — скопируйте в config.php и заполните реальные значения.
// Файл не должен попадать в систему контроля версий.

return [
    'smtp_host' => 'smtp.example.com',
    'smtp_user' => 'user@example.com',
    'smtp_pass' => 'supersecretpassword',
    'smtp_secure' => 'ssl', // 'ssl' или 'tls'
    'smtp_port' => 465,
    'from_address' => 'no-reply@example.com',
    'from_name' => 'Birkityt',
    'to_address' => 'orders@example.com'
    ,
    // Мини-панель администрирования
    'admin_password' => '123123123'
    ,
    // MySQL database settings
    'db_host' => '127.0.0.1',
    'db_user' => 'root',
    'db_pass' => '',
    'db_name' => 'birkityt'
];

// Альтернативно можно использовать переменные окружения:
// SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_SECURE, SMTP_PORT, FROM_ADDRESS, FROM_NAME, TO_ADDRESS
