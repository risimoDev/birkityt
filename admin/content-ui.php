<?php
session_start();
$config = file_exists(__DIR__ . '/../config.php') ? include __DIR__ . '/../config.php' : include __DIR__ . '/../config.example.php';
if (empty($_SESSION['admin_logged'])) {
    header('Location: /admin/content-editor.php');
    exit;
}
$path = __DIR__ . '/../content/content.json';
if (!file_exists($path)) {
    http_response_code(500);
    echo 'content.json не найден';
    exit;
}
$current = json_decode(file_get_contents($path), true);
?><!doctype html>
<html lang="ru">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>UI-редактор контента</title>
    <link rel="stylesheet" href="/public/css/style.css">
</head>

<body class="bg-mainColor">
    <?php $admin_active = 'content';
    include __DIR__ . '/_header.php'; ?>
    <div class="container mx-auto px-4 max-w-5xl my-8 card p-6">
        <h1 class="text-2xl font-bold mb-4">UI-редактор content.json</h1>
        <p class="text-sm text-textColor mb-4">Ключ → значение. Добавляйте новые ключи при необходимости.</p>
        <form id="contentForm" class="space-y-3">
            <div id="rows" class="grid grid-cols-1 gap-3"></div>

        </form>
    </div>
    <!-- Плавающая панель управления -->
    <div
        class="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t shadow flex items-center gap-3 p-3 z-50">
        <div class="container mx-auto px-4 max-w-5xl flex items-center gap-3">
            <button type="button" id="addRow" class="btn-primary">+ Добавить ключ</button>
            <button type="submit" form="contentForm" class="btn-primary">Сохранить</button>
            <button type="button" id="exportBtn" class="btn-primary">Экспорт JSON</button>
            <label class="btn-primary cursor-pointer">
                Импорт JSON
                <input type="file" id="importFile" accept="application/json" class="hidden">
            </label>
            <span id="status" class="text-sm"></span>
        </div>
    </div>
    <script>
        const data = <?php echo json_encode($current, JSON_UNESCAPED_UNICODE); ?>;
        const rows = document.getElementById('rows');
        function row(key = '', value = '') {
            const wrap = document.createElement('div'); wrap.className = 'grid grid-cols-1 md:grid-cols-2 gap-2 items-start';
            const keyInput = document.createElement('input'); keyInput.className = 'border p-2 rounded'; keyInput.placeholder = 'Ключ'; keyInput.value = key;
            const valueInput = document.createElement('textarea'); valueInput.className = 'border p-2 rounded'; valueInput.rows = 3; valueInput.placeholder = 'Значение'; valueInput.value = value;
            const del = document.createElement('button'); del.type = 'button'; del.className = 'btn-primary'; del.textContent = 'Удалить'; del.addEventListener('click', () => wrap.remove());
            const controls = document.createElement('div'); controls.className = 'flex gap-2'; controls.appendChild(del);
            const col1 = document.createElement('div'); col1.appendChild(keyInput);
            const col2 = document.createElement('div'); col2.appendChild(valueInput); col2.appendChild(controls);
            wrap.appendChild(col1); wrap.appendChild(col2);
            return wrap;
        }
        Object.entries(data).forEach(([k, v]) => rows.appendChild(row(k, v)));
        document.getElementById('addRow').addEventListener('click', () => rows.appendChild(row()));
        document.getElementById('contentForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const payload = {};
            rows.querySelectorAll('.grid').forEach(w => {
                const inputs = w.querySelectorAll('input,textarea');
                const key = inputs[0].value.trim(); const val = inputs[1].value;
                if (key) payload[key] = val;
            });
            fetch('/admin/save-content.php', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
            }).then(r => r.json()).then(j => {
                const st = document.getElementById('status');
                if (j.result === 'success') { st.textContent = 'Сохранено'; st.className = 'text-green-700'; }
                else { st.textContent = 'Ошибка: ' + j.info; st.className = 'text-red-600'; }
            }).catch(() => { const st = document.getElementById('status'); st.textContent = 'Ошибка сети'; st.className = 'text-red-600'; });
        });

        // Экспорт JSON
        document.getElementById('exportBtn').addEventListener('click', () => {
            const payload = {};
            rows.querySelectorAll('.grid').forEach(w => {
                const inputs = w.querySelectorAll('input,textarea');
                const key = inputs[0].value.trim(); const val = inputs[1].value;
                if (key) payload[key] = val;
            });
            const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url; a.download = 'content.export.json'; a.click();
            URL.revokeObjectURL(url);
        });

        // Импорт JSON
        document.getElementById('importFile').addEventListener('change', (e) => {
            const file = e.target.files[0]; if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    const imported = JSON.parse(reader.result);
                    rows.innerHTML = '';
                    Object.entries(imported).forEach(([k, v]) => rows.appendChild(row(k, v)));
                    document.getElementById('status').textContent = 'Импортировано (не сохранено)';
                    document.getElementById('status').className = 'text-green-700';
                } catch (err) {
                    document.getElementById('status').textContent = 'Ошибка импорта: неверный JSON';
                    document.getElementById('status').className = 'text-red-600';
                }
            };
            reader.readAsText(file);
        });
    </script>
</body>

</html>