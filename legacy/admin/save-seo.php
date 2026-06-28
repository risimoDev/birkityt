<?php
session_start();
if (empty($_SESSION['admin_logged'])) {
    http_response_code(403);
    echo 'unauthorized';
    exit;
}
$path = __DIR__ . '/../content/seo.json';
$payload = [
    'title' => $_POST['title'] ?? '',
    'description' => $_POST['description'] ?? '',
    'keywords' => $_POST['keywords'] ?? '',
    'canonical' => $_POST['canonical'] ?? '',
    'og_image' => $_POST['og_image'] ?? '',
    'theme_color' => $_POST['theme_color'] ?? '',
    'favicon' => $_POST['favicon'] ?? ''
];
file_put_contents($path, json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
header('Location: /admin/seo.php?ok=1');
