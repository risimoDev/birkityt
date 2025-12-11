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
$current = file_get_contents($path);
?><!doctype html>
<html lang="ru">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>UI-редактор прайса</title>
    <link rel="stylesheet" href="/public/css/style.css">
</head>

<body class="bg-mainColor">
    <?php $admin_active = 'prices';
    include __DIR__ . '/_header.php'; ?>
    <div class="container mx-auto px-4 max-w-5xl my-8 card p-6">
        <h1 class="text-2xl font-bold mb-4">UI-редактор data/prices.json</h1>
        <p class="text-sm text-textColor mb-4">Материал → Ширина/тип → Диапазоны (макс, цена)</p>
        <div id="app" class="space-y-6"></div>
    </div>
    <!-- Плавающая панель управления -->
    <div
        class="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t shadow flex items-center gap-3 p-3 z-50">
        <div class="container mx-auto px-4 max-w-5xl flex items-center gap-3">
            <button id="saveBtn" class="btn-primary">Сохранить</button>
            <button id="exportBtn" class="btn-primary">Экспорт JSON</button>
            <label class="btn-primary cursor-pointer">
                Импорт JSON
                <input type="file" id="importFile" accept="application/json" class="hidden">
            </label>
            <span id="status" class="text-sm"></span>
        </div>
    </div>
    <script>
        const data = JSON.parse(<?php echo json_encode($current, JSON_UNESCAPED_UNICODE); ?>);
        const app = document.getElementById('app');

        function el(tag, attrs = {}, children = []) {
            const e = document.createElement(tag);
            Object.entries(attrs).forEach(([k, v]) => {
                if (k === 'class') e.className = v; else if (k === 'value') e.value = v; else e.setAttribute(k, v);
            });
            children.forEach(c => { if (typeof c === 'string') e.appendChild(document.createTextNode(c)); else e.appendChild(c); });
            return e;
        }

        function render() {
            app.innerHTML = '';
            try {
                app.innerHTML = '';
                if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
                    app.innerHTML = '<div class="card p-4 text-center text-red-600">Прайс пуст или не загружен. Проверьте data/prices.json</div>';
                    const addMaterial = el('button', { class: 'btn-primary mt-4', id: 'addMaterial' }, ['+ Материал']);
                    app.appendChild(addMaterial);
                    return;
                }
                // Материалы
                Object.keys(data).forEach(material => {
                    const sizes = data[material];
                    const materialCard = el('div', { class: 'card p-4' }, [
                        el('div', { class: 'flex items-center justify-between mb-2' }, [
                            el('input', { class: 'border p-2 rounded w-1/2', value: material, 'data-type': 'material-name' }),
                            el('div', { class: 'flex gap-2' }, [
                                el('button', { class: 'btn-primary', 'data-action': 'add-size' }, ['+ Ширина/тип']),
                                el('button', { class: 'btn-primary', 'data-action': 'delete-material' }, ['Удалить'])
                            ])
                        ]),
                        el('div', { class: 'mt-2' }, [
                            el('label', { class: 'text-sm text-textColorDark block mb-1' }, ['Примечание материала (колонка "Дополнительно")']),
                            el('textarea', { class: 'border p-2 rounded w-full', rows: '3', 'data-type': 'material-note', value: (sizes && sizes.__note) ? sizes.__note : '' })
                        ])
                    ]);

                    // таблицы ширин
                    Object.keys(sizes || {}).forEach(size => {
                        if (size === '__note') return;
                        const tiers = sizes[size];
                        const table = el('div', { class: 'mt-3 border rounded p-3 bg-white/70' }, [
                            el('div', { class: 'flex items-center justify-between mb-2' }, [
                                el('input', { class: 'border p-2 rounded w-1/2', value: size, 'data-type': 'size-name' }),
                                el('div', { class: 'flex gap-2' }, [
                                    el('button', { class: 'btn-primary', 'data-action': 'add-tier' }, ['+ Диапазон']),
                                    el('button', { class: 'btn-primary', 'data-action': 'delete-size' }, ['Удалить'])
                                ])
                            ]),
                            el('div', { class: 'grid grid-cols-1 gap-2' }, (tiers || []).map(([max, price]) => {
                                return el('div', { class: 'flex gap-2 items-center', 'data-type': 'tier-row' }, [
                                    el('input', { class: 'border p-2 rounded w-28', value: max, type: 'number', min: '1', placeholder: 'Макс' }),
                                    el('input', { class: 'border p-2 rounded w-28', value: price, type: 'number', min: '0', step: '0.01', placeholder: 'Цена' }),
                                    el('button', { class: 'btn-primary', 'data-action': 'delete-tier' }, ['Удалить'])
                                ]);
                            }))
                        ]);
                        materialCard.appendChild(table);
                    });

                    app.appendChild(materialCard);
                });

                // Добавить материал
                const addMaterial = el('button', { class: 'btn-primary mt-4', id: 'addMaterial' }, ['+ Материал']);
                app.appendChild(addMaterial);
            } catch (err) {
                console.error('Render error:', err);
                app.innerHTML = '<div class="card p-4 text-center text-red-600">Ошибка рендера: ' + (err && err.message ? err.message : 'unknown') + '</div>';
            }
            // Материалы
            Object.keys(data).forEach(material => {
                const sizes = data[material];
                const materialCard = el('div', { class: 'card p-4' }, [
                    el('div', { class: 'flex items-center justify-between mb-2' }, [
                        el('input', { class: 'border p-2 rounded w-1/2', value: material, 'data-type': 'material-name' }),
                        el('div', { class: 'flex gap-2' }, [
                            el('button', { class: 'btn-primary', 'data-action': 'add-size' }, ['+ Ширина/тип']),
                            el('button', { class: 'btn-primary', 'data-action': 'delete-material' }, ['Удалить'])
                        ])
                    ]),
                    // Примечание материала
                    el('div', { class: 'mt-2' }, [
                        el('label', { class: 'text-sm text-textColorDark block mb-1' }, ['Примечание материала (колонка "Дополнительно")']),
                        el('textarea', { class: 'border p-2 rounded w-full', rows: '3', 'data-type': 'material-note' }, [(sizes && sizes.__note) ? sizes.__note : ''])
                    ])
                ]);

                // таблицы ширин
                Object.keys(sizes).forEach(size => {
                    const tiers = sizes[size];
                    const table = el('div', { class: 'mt-3 border rounded p-3 bg-white/70' }, [
                        el('div', { class: 'flex items-center justify-between mb-2' }, [
                            el('input', { class: 'border p-2 rounded w-1/2', value: size, 'data-type': 'size-name' }),
                            el('div', { class: 'flex gap-2' }, [
                                el('button', { class: 'btn-primary', 'data-action': 'add-tier' }, ['+ Диапазон']),
                                el('button', { class: 'btn-primary', 'data-action': 'delete-size' }, ['Удалить'])
                            ])
                        ]),
                        el('div', { class: 'grid grid-cols-1 gap-2' }, tiers.map(([max, price]) => {
                            return el('div', { class: 'flex gap-2 items-center', 'data-type': 'tier-row' }, [
                                el('input', { class: 'border p-2 rounded w-28', value: max, type: 'number', min: '1', placeholder: 'Макс' }),
                                el('input', { class: 'border p-2 rounded w-28', value: price, type: 'number', min: '0', step: '0.01', placeholder: 'Цена' }),
                                el('button', { class: 'btn-primary', 'data-action': 'delete-tier' }, ['Удалить'])
                            ]);
                        }))
                    ]);
                    materialCard.appendChild(table);
                });

                app.appendChild(materialCard);
            });

            // Добавить материал
            const addMaterial = el('button', { class: 'btn-primary mt-4', id: 'addMaterial' }, ['+ Материал']);
            app.appendChild(addMaterial);
        }

        function collect() {
            const result = {};
            const cards = app.querySelectorAll('.card');
            cards.forEach(card => {
                const materialNameInput = card.querySelector('input[data-type="material-name"]');
                if (!materialNameInput) return;
                const materialName = materialNameInput.value.trim();
                if (!materialName) return;
                const sizes = {};
                // Примечание
                const noteEl = card.querySelector('[data-type="material-note"]');
                if (noteEl) sizes.__note = noteEl.value;
                card.querySelectorAll('[data-type="size-name"]').forEach(sizeInput => {
                    const sizeName = sizeInput.value.trim();
                    if (!sizeName) return;
                    const container = sizeInput.closest('.border');
                    const tiers = [];
                    container.querySelectorAll('[data-type="tier-row"]').forEach(row => {
                        const inputs = row.querySelectorAll('input');
                        const max = parseInt(inputs[0].value, 10);
                        const price = parseFloat(inputs[1].value);
                        if (!isNaN(max) && !isNaN(price)) tiers.push([max, price]);
                    });
                    sizes[sizeName] = tiers;
                });
                result[materialName] = sizes;
            });
            return result;
        }

        app.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;
            const action = btn.getAttribute('data-action');
            if (action === 'add-size') {
                const materialCard = btn.closest('.card');
                const table = el('div', { class: 'mt-3 border rounded p-3 bg-white/70' }, [
                    el('div', { class: 'flex items-center justify-between mb-2' }, [
                        el('input', { class: 'border p-2 rounded w-1/2', value: '', 'data-type': 'size-name', placeholder: 'Ширина/тип' }),
                        el('div', { class: 'flex gap-2' }, [
                            el('button', { class: 'btn-primary', 'data-action': 'add-tier' }, ['+ Диапазон']),
                            el('button', { class: 'btn-primary', 'data-action': 'delete-size' }, ['Удалить'])
                        ])
                    ])
                ]);
                materialCard.appendChild(table);
            }
            else if (action === 'add-tier') {
                const container = btn.closest('.border');
                const row = el('div', { class: 'flex gap-2 items-center', 'data-type': 'tier-row' }, [
                    el('input', { class: 'border p-2 rounded w-28', value: '', type: 'number', min: '1', placeholder: 'Макс' }),
                    el('input', { class: 'border p-2 rounded w-28', value: '', type: 'number', min: '0', step: '0.01', placeholder: 'Цена' }),
                    el('button', { class: 'btn-primary', 'data-action': 'delete-tier' }, ['Удалить'])
                ]);
                container.querySelector('.grid')?.appendChild(row) || container.appendChild(el('div', { class: 'grid grid-cols-1 gap-2' }, [row]));
            }
            else if (action === 'delete-tier') {
                btn.closest('[data-type="tier-row"]').remove();
            }
            else if (action === 'delete-size') {
                btn.closest('.border').remove();
            }
            else if (action === 'delete-material') {
                btn.closest('.card').remove();
            }
        });

        document.getElementById('saveBtn').addEventListener('click', () => {
            const payload = collect();
            fetch('/admin/save-prices.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }).then(r => r.json()).then(j => {
                const st = document.getElementById('status');
                if (j.result === 'success') { st.textContent = 'Сохранено'; st.className = 'text-green-700'; }
                else { st.textContent = 'Ошибка: ' + j.info; st.className = 'text-red-600'; }
            }).catch(err => {
                const st = document.getElementById('status');
                st.textContent = 'Ошибка сети'; st.className = 'text-red-600';
            });
        });

        // Экспорт JSON
        document.getElementById('exportBtn').addEventListener('click', () => {
            const payload = collect();
            const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a'); a.href = url; a.download = 'prices.export.json'; a.click();
            URL.revokeObjectURL(url);
        });

        // Импорт JSON
        document.getElementById('importFile').addEventListener('change', (e) => {
            const file = e.target.files[0]; if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    const imported = JSON.parse(reader.result);
                    // Перерисовываем с новыми данными
                    Object.keys(data).forEach(k => delete data[k]);
                    Object.assign(data, imported);
                    render();
                    const st = document.getElementById('status');
                    st.textContent = 'Импортировано (не сохранено)'; st.className = 'text-green-700';
                } catch (err) {
                    const st = document.getElementById('status');
                    st.textContent = 'Ошибка импорта: неверный JSON'; st.className = 'text-red-600';
                }
            };
            reader.readAsText(file);
        });

        document.getElementById('app').addEventListener('click', (e) => {
            if (e.target.id === 'addMaterial') {
                const materialCard = el('div', { class: 'card p-4' }, [
                    el('div', { class: 'flex items-center justify-between mb-2' }, [
                        el('input', { class: 'border p-2 rounded w-1/2', value: '', 'data-type': 'material-name', placeholder: 'Материал' }),
                        el('div', { class: 'flex gap-2' }, [
                            el('button', { class: 'btn-primary', 'data-action': 'add-size' }, ['+ Ширина/тип']),
                            el('button', { class: 'btn-primary', 'data-action': 'delete-material' }, ['Удалить'])
                        ])
                    ])
                ]);
                app.insertBefore(materialCard, document.getElementById('addMaterial'));
            }
        });

        render();
    </script>
</body>

</html>