<?php
session_start();
$config = file_exists(__DIR__ . '/../config.php') ? include __DIR__ . '/../config.php' : include __DIR__ . '/../config.example.php';
if (empty($_SESSION['admin_logged'])) {
    header('Location: /admin/content-editor.php');
    exit;
}

$path = __DIR__ . '/../data/prices.json';
if (!file_exists($path)) {
    http_response_code(500);
    echo 'prices.json не найден';
    exit;
}

function validate_prices($decoded)
{
    // Базовая валидация структуры: {Материал: {Ширина: [[max, price], ...]}, ...}
    if (!is_array($decoded))
        return 'Корень JSON должен быть объектом';
    foreach ($decoded as $material => $sizes) {
        if (!is_array($sizes))
            return "Материал '$material' должен содержать объект ширин";
        foreach ($sizes as $size => $tiers) {
            if (!is_array($tiers))
                return "'$material' → '$size' должен быть массивом диапазонов";
            foreach ($tiers as $i => $pair) {
                if (!is_array($pair) || count($pair) !== 2)
                    return "'$material' → '$size' → запись #$i должна быть [макс, цена]";
                if (!is_numeric($pair[0]) || !is_numeric($pair[1]))
                    return "'$material' → '$size' → запись #$i содержит нечисловые значения";
            }
        }
    }
    return null; // ок
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'save') {
    $raw = $_POST['json'] ?? '';
    $decoded = json_decode($raw, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        $saveError = 'Ошибка JSON: ' . json_last_error_msg();
    } else {
        $structError = validate_prices($decoded);
        if ($structError) {
            $saveError = 'Ошибка структуры: ' . $structError;
        } else {
            // Бэкап
            $backupName = __DIR__ . '/../data/prices.' . date('Ymd-His') . '.bak.json';
            copy($path, $backupName);
            file_put_contents($path, json_encode($decoded, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
            $saved = true;
        }
    }
}

$current = file_get_contents($path);
?><!doctype html>
<html lang="ru">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Редактор прайса</title>
    <link rel="stylesheet" href="/public/css/style.css">
</head>

<body class="bg-mainColor">
    <?php $admin_active = 'prices-editor';
    include __DIR__ . '/_header.php'; ?>
    <div class="container mx-auto px-4 max-w-4xl my-8 card p-6">
        <h1 class="text-2xl font-bold mb-4">Редактор data/prices.json</h1>
        <p class="text-sm text-textColor mb-2">Структура: Материал → Ширина/тип → [[макс_количество, цена_за_ед], ...]
        </p>
        <?php if (!empty($saveError)) {
            echo '<p class="text-red-600">' . htmlspecialchars($saveError) . '</p>';
        } ?>
        <?php if (!empty($saved)) {
            echo '<p class="text-green-700">Сохранено. Создан бэкап.</p>';
        } ?>
        <form method="post">
            <input type="hidden" name="action" value="save">
            <textarea name="json" rows="28" class="w-full p-3 border rounded"
                spellcheck="false"><?php echo htmlspecialchars($current); ?></textarea>
            <div class="mt-4 flex gap-3">
                <button type="submit" class="btn-primary">Сохранить</button>
                <a href="/data/" class="text-sm text-textColor underline">Открыть папку прайса</a>
            </div>
        </form>
    </div>
</body>

</html>