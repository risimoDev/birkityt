<?php
session_start();
$config = include __DIR__ . '/../config.php';
if (!isset($_SESSION['admin_logged']) || $_SESSION['admin_logged'] !== true) {
    http_response_code(403);
    echo 'Forbidden';
    exit;
}
require __DIR__ . '/../includes/db.php';
$id = (int) ($_POST['id'] ?? 0);
$title = trim((string) ($_POST['title'] ?? ''));
$description = trim((string) ($_POST['description'] ?? ''));
if ($id <= 0) {
    http_response_code(400);
    echo 'Invalid ID';
    exit;
}
try {
    $stmt = $pdo->prepare('UPDATE works SET title = :title, description = :description WHERE id = :id');
    $stmt->execute([
        ':title' => $title,
        ':description' => $description,
        ':id' => $id,
    ]);
} catch (Throwable $e) {
    // Optionally log error
}
header('Location: /admin/upload-work.php');
exit;
