<?php
// Simple PDO connector using config.php
$config = include __DIR__ . '/../config.php';
$dsn = sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', $config['db_host'], $config['db_name']);
try {
    $pdo = new PDO($dsn, $config['db_user'], $config['db_pass'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo 'DB connection error';
    if (isset($_GET['debug'])) {
        echo ' ' . htmlspecialchars($e->getMessage());
    }
    exit;
}
