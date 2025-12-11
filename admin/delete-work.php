<?php
session_start();
if (empty($_SESSION['admin_logged'])) {
    http_response_code(403);
    echo 'unauthorized';
    exit;
}
include __DIR__ . '/../includes/db.php';
$id = (int) ($_POST['id'] ?? 0);
if ($id <= 0) {
    header('Location: /admin/upload-work.php?err=bad');
    exit;
}
try {
    $stmt = $pdo->prepare('SELECT image_webp, image_original FROM works WHERE id=?');
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    if ($row) {
        $pdo->prepare('DELETE FROM works WHERE id=?')->execute([$id]);
        foreach (['image_webp', 'image_original'] as $k) {
            $rel = $row[$k] ?? null;
            if ($rel) {
                $path = __DIR__ . '/../' . ltrim($rel, '/');
                if (is_file($path))
                    @unlink($path);
            }
        }
    }
} catch (Throwable $e) { /* ignore */
}
header('Location: /admin/upload-work.php?ok=1');
