<?php
session_start();
$config = file_exists(__DIR__ . '/../config.php') ? include __DIR__ . '/../config.php' : include __DIR__ . '/../config.example.php';
$pass = $config['admin_password'] ?? 'change-me-please';

function is_logged_in()
{
    return !empty($_SESSION['admin_logged']);
}

if (isset($_POST['action']) && $_POST['action'] === 'login') {
    $input = $_POST['password'] ?? '';
    if (hash_equals($GLOBALS['pass'], $input)) {
        $_SESSION['admin_logged'] = true;
        header('Location: /admin/content-editor.php');
        exit;
    } else {
        $error = 'Неверный пароль';
    }
}

if (!is_logged_in()) {
    echo '<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Вход в админку</title><link rel="stylesheet" href="/public/css/style.css"></head><body class="bg-mainColor">';
    echo '<div class="container mx-auto px-4 max-w-md my-24 p-6 card">';
    echo '<h1 class="text-2xl font-bold mb-4">Вход в панель контента</h1>';
    if (!empty($error))
        echo '<p class="text-red-600">' . htmlspecialchars($error) . '</p>';
    echo '<form method="post" class="grid gap-4">';
    echo '<input type="hidden" name="action" value="login">';
    echo '<input type="password" name="password" placeholder="Пароль" class="border p-2 rounded">';
    echo '<button class="btn-primary" type="submit">Войти</button>';
    echo '</form></div></body></html>';
    exit;
}

$path = __DIR__ . '/../content/content.json';
if (!file_exists($path)) {
    http_response_code(500);
    echo 'content.json не найден';
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'save') {
    $raw = $_POST['json'] ?? '';
    // Валидация JSON
    $decoded = json_decode($raw, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        $saveError = 'Ошибка JSON: ' . json_last_error_msg();
    } else {
        // Бэкап
        $backupName = __DIR__ . '/../content/content.' . date('Ymd-His') . '.bak.json';
        copy($path, $backupName);
        // Сохранение с pretty-print
        file_put_contents($path, json_encode($decoded, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
        $saved = true;
    }
}

$current = file_get_contents($path);
?><!doctype html>
<html lang="ru">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Редактор контента</title>
    <link rel="stylesheet" href="/public/css/style.css">
</head>

<body class="bg-mainColor">
    <?php $admin_active = 'editor';
    include __DIR__ . '/_header.php'; ?>
    <div class="container mx-auto px-4 max-w-4xl my-8 card p-6">
        <h1 class="text-2xl font-bold mb-4">Редактор content.json</h1>
        <?php if (!empty($saveError)) {
            echo '<p class="text-red-600">' . htmlspecialchars($saveError) . '</p>';
        } ?>
        <?php if (!empty($saved)) {
            echo '<p class="text-green-700">Сохранено. Создан бэкап.</p>';
        } ?>
        <form method="post">
            <input type="hidden" name="action" value="save">
            <textarea name="json" rows="24" class="w-full p-3 border rounded"
                spellcheck="false"><?php echo htmlspecialchars($current); ?></textarea>
            <div class="mt-4 flex gap-3">
                <button type="submit" class="btn-primary">Сохранить</button>
                <a href="/content/" class="text-sm text-textColor underline">Открыть папку контента</a>
            </div>
        </form>
    </div>
</body>

</html>