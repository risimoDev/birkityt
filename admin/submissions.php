<?php
session_start();
$config = include __DIR__ . '/../config.php';
if (!isset($_SESSION['admin_logged']) || $_SESSION['admin_logged'] !== true) {
    http_response_code(403);
    echo 'Forbidden';
    exit;
}
include __DIR__ . '/../includes/db.php';
$rows = $pdo->query('SELECT * FROM submissions ORDER BY created_at DESC LIMIT 200')->fetchAll();
?>
<!doctype html>
<html lang="ru">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Заявки</title>
    <link rel="stylesheet" href="../public/css/style.css">
</head>

<body class="bg-mainColor">
    <?php $admin_active = 'submissions';
    include __DIR__ . '/_header.php'; ?>
    <div class="container mx-auto px-4 p-6">
        <h1 class="text-2xl font-bold mb-4">Заявки</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <?php foreach ($rows as $r): ?>
                <div class="card p-4">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-xs text-textColor">#<?= (int) $r['id'] ?></span>
                        <span
                            class="px-2 py-1 text-xs rounded bg-primary/10 text-textColorDark"><?= htmlspecialchars($r['type']) ?></span>
                    </div>
                    <div class="space-y-1 text-sm">
                        <?php if (!empty($r['name'])): ?>
                            <div><span class="text-textColor">Имя:</span> <?= htmlspecialchars($r['name']) ?></div>
                        <?php endif; ?>
                        <?php if (!empty($r['phone'])): ?>
                            <div><span class="text-textColor">Телефон:</span> <?= htmlspecialchars($r['phone']) ?></div>
                        <?php endif; ?>
                        <?php if (!empty($r['email'])): ?>
                            <div><span class="text-textColor">Email:</span> <?= htmlspecialchars($r['email']) ?></div>
                        <?php endif; ?>
                    </div>
                    <div class="mt-3">
                        <?php if ($r['type'] === 'contact'): ?>
                            <div class="text-sm whitespace-pre-wrap break-words">
                                <?= nl2br(htmlspecialchars($r['message'] ?? '')) ?></div>
                        <?php else: ?>
                            <pre
                                class="text-xs overflow-auto max-h-40 bg-white/60 p-2 rounded"><?= htmlspecialchars($r['payload'] ?? '') ?></pre>
                        <?php endif; ?>
                    </div>
                    <div class="mt-3 text-xs text-textColor">Создано: <?= htmlspecialchars($r['created_at']) ?></div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</body>

</html>