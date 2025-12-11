<?php
session_start();
$config = include __DIR__ . '/../config.php';
if (!isset($_SESSION['admin_logged']) || $_SESSION['admin_logged'] !== true) {
    http_response_code(403);
    echo 'Forbidden';
    exit;
}
?>
<!doctype html>
<html lang="ru">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Загрузить работу</title>
    <link rel="stylesheet" href="../public/css/style.css">
</head>

<body class="bg-mainColor">
    <?php $admin_active = 'upload';
    include __DIR__ . '/_header.php'; ?>
    <div class="container mx-auto px-4 p-6">
        <h1 class="text-2xl font-bold mb-4">Загрузить работу</h1>
        <form action="save-work.php" method="post" enctype="multipart/form-data" class="space-y-4 max-w-xl mx-auto">
            <div>
                <label class="block mb-1">Заголовок</label>
                <input type="text" name="title" class="border p-2 w-full" />
            </div>
            <div>
                <label class="block mb-1">Описание</label>
                <textarea name="description" class="border p-2 w-full" rows="3"></textarea>
            </div>
            <div>
                <label class="block mb-1">Изображение</label>
                <input type="file" name="image" accept="image/*" class="border p-2 w-full" />
            </div>
            <button class="btn-primary w-full sm:w-auto" type="submit">Загрузить</button>
        </form>
        <hr class="my-8">
        <h2 class="text-xl font-bold mb-4">Загруженные работы</h2>

        <?php include __DIR__ . '/../includes/db.php';
        $page = max(1, (int) ($_GET['page'] ?? 1));
        $perPage = 6;
        $offset = ($page - 1) * $perPage;
        $items = [];
        $total = 0;
        try {
            $total = (int) $pdo->query('SELECT COUNT(*) AS c FROM works')->fetch()['c'];
            $stmt = $pdo->prepare('SELECT * FROM works ORDER BY created_at DESC LIMIT :limit OFFSET :offset');
            $stmt->bindValue(':limit', $perPage, PDO::PARAM_INT);
            $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
            $stmt->execute();
            $items = $stmt->fetchAll();
        } catch (Throwable $e) {
        }
        if (!$items)
            echo '<p class="text-textColor">Пока нет загруженных работ.</p>';
        ?>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <?php foreach ($items as $w): ?>
                <div class="card p-3">
                    <div class="aspect-square bg-gray-100 rounded mb-2 overflow-hidden">
                        <?php $img = $w['image_webp'] ?: $w['image_original'];
                        if ($img && $img[0] !== '/')
                            $img = '/' . $img; ?>
                        <img src="<?= htmlspecialchars($img) ?>" alt="<?= htmlspecialchars($w['title'] ?: 'Работа') ?>"
                            class="object-cover w-full h-full">
                    </div>
                    <form action="update-work.php" method="post" class="space-y-2 mb-2">
                        <input type="hidden" name="id" value="<?= (int) $w['id'] ?>">
                        <label class="block">
                            <span class="text-sm text-textColorDark">Название</span>
                            <input type="text" name="title" value="<?= htmlspecialchars($w['title'] ?: '') ?>"
                                class="mt-1 w-full border rounded px-3 py-2">
                        </label>
                        <label class="block">
                            <span class="text-sm text-textColorDark">Описание</span>
                            <textarea name="description" rows="3"
                                class="mt-1 w-full border rounded px-3 py-2"><?= htmlspecialchars($w['description'] ?: '') ?></textarea>
                        </label>
                        <button class="btn-primary w-full" type="submit">Сохранить</button>
                    </form>
                    <form action="delete-work.php" method="post" onsubmit="return confirm('Удалить работу?');">
                        <input type="hidden" name="id" value="<?= (int) $w['id'] ?>">
                        <button class="btn-primary w-full" type="submit">Удалить</button>
                    </form>
                </div>
            <?php endforeach; ?>
        </div>
        <?php
        $pages = max(1, (int) ceil($total / $perPage));
        if ($pages > 1):
            ?>
            <div class="flex items-center justify-center gap-2 mt-6">
                <?php for ($p = 1; $p <= $pages; $p++): ?>
                    <?php if ($p === $page): ?>
                        <span class="px-3 py-1 rounded bg-primary/20 text-textColorDark"><?= $p ?></span>
                    <?php else: ?>
                        <a class="px-3 py-1 rounded btn-primary" href="/admin/upload-work.php?page=<?= $p ?>"><?= $p ?></a>
                    <?php endif; ?>
                <?php endfor; ?>
            </div>
        <?php endif; ?>
    </div>
</body>

</html>