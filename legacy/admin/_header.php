<?php
// Унифицированный хедер для страниц админки
// Использование: $admin_active = 'content|prices|submissions|upload|editor|prices-editor'; include __DIR__.'/_header.php';
if (session_status() === PHP_SESSION_NONE)
    session_start();
$active = $admin_active ?? '';
?>
<nav class="relative px-4 py-4 flex justify-between items-center z-50 ">
    <a class="text-3xl font-bold leading-none" href="/">
        <object class="h-16 w-auto" type="image/svg+xml" data="/public/images/logo.svg">Логотип</object>
    </a>
    <!-- Десктоп-меню: всегда видно на md+ -->
    <div class="hidden md:flex gap-2 flex-wrap md:items-center">
        <a class="btn-primary py-2 <?= $active === 'content' ? 'ring-2 ring-primary' : '' ?>"
            href="/admin/content-ui.php">Контент</a>
        <a class="btn-primary py-2 <?= $active === 'editor' ? 'ring-2 ring-primary' : '' ?>"
            href="/admin/content-editor.php">Контент JSON</a>
        <a class="btn-primary py-2 <?= $active === 'prices' ? 'ring-2 ring-primary' : '' ?>"
            href="/admin/prices-ui.php">Прайс</a>
        <a class="btn-primary py-2 <?= $active === 'prices-editor' ? 'ring-2 ring-primary' : '' ?>"
            href="/admin/prices-editor.php">Прайс JSON</a>
        <a class="btn-primary py-2 <?= $active === 'submissions' ? 'ring-2 ring-primary' : '' ?>"
            href="/admin/submissions.php">Заявки</a>
        <a class="btn-primary py-2 <?= $active === 'upload' ? 'ring-2 ring-primary' : '' ?>"
            href="/admin/upload-work.php">Загрузки работ</a>
        <a class="btn-primary py-2 <?= $active === 'seo' ? 'ring-2 ring-primary' : '' ?>" href="/admin/seo.php">SEO</a>
        <a class="btn-primary py-2" href="/">На сайт</a>
    </div>
    <!-- Мобильное меню: кнопка + выпадающий список -->
    <div class="md:hidden">
        <button id="adminNavToggle" class="btn-primary" aria-controls="adminNavPanel" aria-expanded="false"
            aria-label="Открыть меню">Меню</button>
        <div id="adminNavPanel" class="absolute left-0 right-0 top-full mt-2 hidden">
            <div class="card p-3 mx-4 space-y-2">
                <a class="btn-primary block text-center py-2 <?= $active === 'content' ? 'ring-2 ring-primary' : '' ?>"
                    href="/admin/content-ui.php">Контент</a>
                <a class="btn-primary block text-center py-2 <?= $active === 'editor' ? 'ring-2 ring-primary' : '' ?>"
                    href="/admin/content-editor.php">Контент JSON</a>
                <a class="btn-primary block text-center py-2 <?= $active === 'prices' ? 'ring-2 ring-primary' : '' ?>"
                    href="/admin/prices-ui.php">Прайс</a>
                <a class="btn-primary block text-center py-2 <?= $active === 'prices-editor' ? 'ring-2 ring-primary' : '' ?>"
                    href="/admin/prices-editor.php">Прайс JSON</a>
                <a class="btn-primary block text-center py-2 <?= $active === 'submissions' ? 'ring-2 ring-primary' : '' ?>"
                    href="/admin/submissions.php">Заявки</a>
                <a class="btn-primary block text-center py-2 <?= $active === 'upload' ? 'ring-2 ring-primary' : '' ?>"
                    href="/admin/upload-work.php">Загрузки работ</a>
                <a class="btn-primary block text-center py-2 <?= $active === 'seo' ? 'ring-2 ring-primary' : '' ?>"
                    href="/admin/seo.php">SEO</a>
                <a class="btn-primary block text-center py-2" href="/">На сайт</a>
            </div>
        </div>
    </div>
</nav>
<script>
    // Простой гамбургер для админки
    (function () {
        const btn = document.getElementById('adminNavToggle');
        const panel = document.getElementById('adminNavPanel');
        if (!btn || !panel) return;
        btn.addEventListener('click', function () {
            const isHidden = panel.classList.contains('hidden');
            if (isHidden) { panel.classList.remove('hidden'); btn.setAttribute('aria-expanded', 'true'); }
            else { panel.classList.add('hidden'); btn.setAttribute('aria-expanded', 'false'); }
        });
        // Закрытие по клику вне панели
        document.addEventListener('click', function (e) {
            if (!panel.classList.contains('hidden')) {
                const within = panel.contains(e.target) || btn.contains(e.target);
                if (!within) { panel.classList.add('hidden'); btn.setAttribute('aria-expanded', 'false'); }
            }
        });
    })();
</script>