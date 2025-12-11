<?php
session_start();
if (empty($_SESSION['admin_logged'])) {
    header('Location: /admin/content-editor.php');
    exit;
}
$path = __DIR__ . '/../content/seo.json';
$current = [
    'title' => 'БИРКИТУТ - Изготовление бирок для одежды на заказ',
    'description' => 'Изготовление бирок для одежды на различных тканях и силиконе. Картонные бирки для одежды. Высокое качество и индивидуальный подход. Закажите бирки на birkityt.ru.',
    'keywords' => 'бирки для одежды, тканевые бирки, силиконовые бирки, картонные бирки, изготовление бирок, бирки на заказ, birkityt.ru',
    'canonical' => 'https://birkityt.ru',
    'og_image' => 'https://birkityt.ru/public/images/banners/0iCWg4QBUkE.jpg',
    'theme_color' => '#A1B5D8',
    'favicon' => '/public/images/logo.svg'
];
if (file_exists($path)) {
    $j = json_decode(file_get_contents($path), true);
    if (is_array($j))
        $current = array_merge($current, $j);
}
?><!doctype html>
<html lang="ru">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SEO настройки</title>
    <link rel="stylesheet" href="/public/css/style.css">
</head>

<body class="bg-mainColor">
    <?php $admin_active = 'content';
    include __DIR__ . '/_header.php'; ?>
    <div class="container mx-auto px-4 max-w-4xl my-8 card p-6">
        <h1 class="text-2xl font-bold mb-4">SEO настройки сайта</h1>
        <form action="/admin/save-seo.php" method="post" class="grid gap-4">
            <label class="grid gap-1">
                <span class="text-sm text-textColor">Title</span>
                <input class="border p-2 rounded" type="text" name="title"
                    value="<?= htmlspecialchars($current['title']) ?>" />
            </label>
            <label class="grid gap-1">
                <span class="text-sm text-textColor">Description</span>
                <textarea class="border p-2 rounded" name="description"
                    rows="3"><?= htmlspecialchars($current['description']) ?></textarea>
            </label>
            <label class="grid gap-1">
                <span class="text-sm text-textColor">Keywords</span>
                <input class="border p-2 rounded" type="text" name="keywords"
                    value="<?= htmlspecialchars($current['keywords']) ?>" />
            </label>
            <label class="grid gap-1">
                <span class="text-sm text-textColor">Canonical URL</span>
                <input class="border p-2 rounded" type="url" name="canonical"
                    value="<?= htmlspecialchars($current['canonical']) ?>" />
            </label>
            <label class="grid gap-1">
                <span class="text-sm text-textColor">OG Image URL</span>
                <input class="border p-2 rounded" type="url" name="og_image"
                    value="<?= htmlspecialchars($current['og_image']) ?>" />
            </label>
            <label class="grid gap-1">
                <span class="text-sm text-textColor">Theme Color</span>
                <input class="border p-2 rounded" type="text" name="theme_color"
                    value="<?= htmlspecialchars($current['theme_color']) ?>" />
            </label>
            <label class="grid gap-1">
                <span class="text-sm text-textColor">Favicon (URL)</span>
                <input class="border p-2 rounded" type="text" name="favicon"
                    value="<?= htmlspecialchars($current['favicon']) ?>" />
            </label>
            <div class="mt-2">
                <button class="btn-primary" type="submit">Сохранить</button>
            </div>
        </form>
    </div>
</body>

</html>