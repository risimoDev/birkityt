(function () {
    var data = window.PRICES_DATA || {};
    var container = document.getElementById('priceContainer');
    var radios = document.querySelectorAll('input[name="viewMode"]');

    function fmtPrice(p) { return (Number(p).toFixed(2).replace('.', ',') + 'р'); }

    function renderTable() {
        container.innerHTML = '';
        Object.keys(data).forEach(function (material) {
            var sizes = data[material] || {};
            var note = sizes.__note || '';
            var wrap = document.createElement('div'); wrap.className = 'mt-2 flex justify-center';
            var html = '';
            html += '<div class="w-full max-w-4xl overflow-x-auto">';
            html += '<table class="w-full bg-white border border-gray-300 rounded-2xl">';
            html += '<thead class="sticky top-0"><tr class="bg-gray-200 text-gray-700">' +
                '<th class="py-2 px-4 border-b">Материал</th>' +
                '<th class="py-2 px-4 border-b">Характеристики</th>' +
                '<th class="py-2 px-4 border-b">Количество</th>' +
                '<th class="py-2 px-4 border-b">Цена</th>' +
                '<th class="py-2 px-4 border-b">Дополнительно</th>' +
                '</tr></thead><tbody class="divide-y">';
            // Подсчёт строк для rowspan
            var totalRows = 0;
            Object.keys(sizes).forEach(function (sizeName) { if (sizeName !== '__note') totalRows += (sizes[sizeName] || []).length; });
            if (totalRows === 0) {
                // Плейсхолдер-строка, если у материала нет ни одного диапазона
                html += '<tr class="hover:bg-gray-50">';
                html += '<td class="py-2 px-4 align-top">' + material + '</td>';
                html += '<td class="py-2 px-4 text-gray-400">—</td>';
                html += '<td class="py-2 px-4 text-gray-400">—</td>';
                html += '<td class="py-2 px-4 text-gray-400">—</td>';
                html += '<td class="py-2 px-4 align-top">' + (note || '') + '</td>';
                html += '</tr>';
            } else {
                var materialCellPrinted = false;
                var noteCellPrinted = false;
                Object.keys(sizes).forEach(function (sizeName) {
                    if (sizeName === '__note') return;
                    var tiers = sizes[sizeName] || [];
                    tiers.forEach(function (row, idx) {
                        var max = row[0], price = row[1];
                        html += '<tr class="hover:bg-gray-50">';
                        if (!materialCellPrinted) {
                            html += '<td class="py-2 px-4 align-top" rowspan="' + totalRows + '">' + material + '</td>';
                            materialCellPrinted = true;
                        }
                        // Характеристики (sizeName) печатаем один раз с rowspan по количеству диапазонов
                        if (idx === 0) {
                            html += '<td class="py-2 px-4 align-top" rowspan="' + tiers.length + '">' + sizeName + '</td>';
                        }
                        html += '<td class="py-2 px-4">' + max + '</td>';
                        html += '<td class="py-2 px-4 font-semibold">' + fmtPrice(price) + '</td>';
                        if (!noteCellPrinted) {
                            html += '<td class="py-2 px-4 align-top" rowspan="' + totalRows + '">' + (note || '') + '</td>';
                            noteCellPrinted = true;
                        }
                        html += '</tr>';
                    });
                });
            }
            html += '</tbody></table>';
            html += '</div>';
            wrap.innerHTML = html;
            container.appendChild(wrap);
        });
    }

    function renderCards() {
        container.innerHTML = '';
        var grid = document.createElement('div'); grid.className = 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4';
        Object.keys(data).forEach(function (material) {
            var sizes = data[material] || {};
            var note = sizes.__note || '';
            var card = document.createElement('div'); card.className = 'card p-4 flex flex-col';
            var h = '';
            h += '<div class="mb-2">';
            h += '<div class="font-bold text-textColorDark text-lg">' + material + '</div>';
            if (note) h += '<div class="text-xs text-textColor mt-1 line-clamp-2">' + note + '</div>';
            h += '</div>';
            Object.keys(sizes).forEach(function (sizeName) {
                if (sizeName === '__note') return;
                var tiers = sizes[sizeName] || [];
                h += '<div class="mt-2">';
                h += '<div class="text-sm font-semibold">' + sizeName + '</div>';
                h += '<div class="flex flex-wrap gap-2 mt-1">';
                tiers.forEach(function (row) {
                    var max = row[0], price = row[1];
                    h += '<span class="px-2 py-1 rounded bg-primary/10 text-textColorDark text-xs">' + max + ' — ' + fmtPrice(price) + '</span>';
                });
                h += '</div></div>';
            });
            h += '<div class="mt-3"><a href="/index.php#forma" class="btn-primary inline-block">Оформить заявку</a></div>';
            card.innerHTML = h;
            grid.appendChild(card);
        });
        container.appendChild(grid);
    }

    function renderAccordion() {
        container.innerHTML = '';
        Object.keys(data).forEach(function (material) {
            var sizes = data[material] || {};
            var note = sizes.__note || '';
            var block = document.createElement('div'); block.className = 'card overflow-hidden';
            var header = document.createElement('button'); header.className = 'w-full text-left px-4 py-3 flex items-center justify-between';
            header.innerHTML = '<span class="font-semibold">' + material + '</span>' + (note ? '<span class="text-xs text-textColor ml-2 line-clamp-1">' + note + '</span>' : '') + '<svg class="w-4 h-4 text-textColor ml-3" viewBox="0 0 20 20"><path d="M5 8l5 5 5-5" fill="currentColor"/></svg>';
            var body = document.createElement('div'); body.className = 'px-4 pb-4 hidden';
            Object.keys(sizes).forEach(function (sizeName) {
                if (sizeName === '__note') return;
                var tiers = sizes[sizeName] || [];
                var sec = document.createElement('div'); sec.className = 'mt-3';
                sec.innerHTML = '<div class="text-sm font-semibold">' + sizeName + '</div>';
                var list = document.createElement('div'); list.className = 'grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1';
                tiers.forEach(function (row) {
                    var max = row[0], price = row[1];
                    var item = document.createElement('div'); item.className = 'bg-white/80 border rounded px-2 py-1 text-sm';
                    item.textContent = max + ' — ' + fmtPrice(price);
                    list.appendChild(item);
                });
                sec.appendChild(list);
                body.appendChild(sec);
            });
            header.addEventListener('click', function () { body.classList.toggle('hidden'); });
            block.appendChild(header);
            block.appendChild(body);
            container.appendChild(block);
        });
    }

    function render(mode) {
        if (mode === 'cards') renderCards();
        else if (mode === 'accordion') renderAccordion();
        else renderTable();
    }

    radios.forEach(function (r) { r.addEventListener('change', function () { if (this.checked) render(this.value); }); });
    render('table');
})();
