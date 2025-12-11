<?php
session_start();
header('Content-Type: application/json; charset=utf-8');
if (empty($_SESSION['admin_logged'])) {
    echo json_encode(['result' => 'error', 'info' => 'unauthorized']);
    exit;
}
$path = __DIR__ . '/../content/content.json';
$raw = file_get_contents('php://input');
$decoded = json_decode($raw, true);
if (json_last_error() !== JSON_ERROR_NONE || !is_array($decoded)) {
    echo json_encode(['result' => 'error', 'info' => 'bad json']);
    exit;
}
// Бэкап
$backupName = __DIR__ . '/../content/content.' . date('Ymd-His') . '.bak.json';
copy($path, $backupName);
file_put_contents($path, json_encode($decoded, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
echo json_encode(['result' => 'success', 'info' => 'saved']);
