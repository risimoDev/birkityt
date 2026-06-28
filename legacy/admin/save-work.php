<?php
session_start();
if (!isset($_SESSION['admin_logged']) || $_SESSION['admin_logged'] !== true) {
    http_response_code(403);
    echo 'Forbidden';
    exit;
}
include __DIR__ . '/../includes/db.php';

$title = trim($_POST['title'] ?? '');
$description = trim($_POST['description'] ?? '');
$file = $_FILES['image'] ?? null;

if (!$file || $file['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo 'Файл не загружен';
    exit;
}

$origName = $file['name'];
$tmp = $file['tmp_name'];
$ext = strtolower(pathinfo($origName, PATHINFO_EXTENSION));
$allowed = ['jpg', 'jpeg', 'png'];
if (!in_array($ext, $allowed, true)) {
    http_response_code(400);
    echo 'Поддерживаются только JPG/PNG';
    exit;
}

$uploadsDir = __DIR__ . '/../public/images/works';
if (!is_dir($uploadsDir)) {
    mkdir($uploadsDir, 0777, true);
}

$base = uniqid('work_', true);
$origPath = $uploadsDir . '/' . $base . '.' . $ext;
$webpPath = $uploadsDir . '/' . $base . '.webp';

// Move original
if (!move_uploaded_file($tmp, $origPath)) {
    http_response_code(500);
    echo 'Не удалось сохранить оригинал';
    exit;
}

// Convert to WebP via GD
function convert_to_webp($srcPath, $dstPath)
{
    $info = getimagesize($srcPath);
    if (!$info)
        return false;
    $mime = $info['mime'] ?? '';
    if ($mime === 'image/jpeg') {
        $im = imagecreatefromjpeg($srcPath);
    } elseif ($mime === 'image/png') {
        $im = imagecreatefrompng($srcPath);
        imagepalettetotruecolor($im);
        imagealphablending($im, true);
        imagesavealpha($im, true);
    } else {
        return false;
    }
    $ok = imagewebp($im, $dstPath, 85);
    imagedestroy($im);
    return $ok;
}

if (!convert_to_webp($origPath, $webpPath)) {
    // If conversion fails, keep original but still record
    $webpRel = null;
} else {
    $webpRel = '/public/images/works/' . basename($webpPath);
}
$origRel = '/public/images/works/' . basename($origPath);

$stmt = $pdo->prepare('INSERT INTO works (title, description, image_webp, image_original) VALUES (?,?,?,?)');
$stmt->execute([$title ?: null, $description ?: null, $webpRel ?: '', $origRel]);

header('Location: upload-work.php?ok=1');
