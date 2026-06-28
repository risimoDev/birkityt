<!DOCTYPE html>
<html lang="ru-RU">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description"
        content="Изготовление бирок для одежды на различных тканях и силиконе. Картонные бирки для одежды. Высокое качество и индивидуальный подход. Закажите бирки на birkityt.ru.">
    <meta name="keywords"
        content="бирки для одежды, тканевые бирки, силиконовые бирки, картонные бирки, изготовление бирок, бирки на заказ, birkityt.ru">
    <meta name="author" content="Birkityt">
    <meta name="robots" content="index, follow">
    <?php
    $seo = [];
    $seoPath = __DIR__ . '/../content/seo.json';
    if (file_exists($seoPath)) {
        $data = json_decode(file_get_contents($seoPath), true);
        if (is_array($data))
            $seo = $data;
    }
    $seo_title = $seo['title'] ?? 'БИРКИТУТ - Изготовление бирок для одежды на заказ';
    $seo_description = $seo['description'] ?? 'Изготовление бирок для одежды на различных тканях и силиконе. Картонные бирки для одежды. Высокое качество и индивидуальный подход. Закажите бирки на birkityt.ru.';
    $seo_keywords = $seo['keywords'] ?? 'бирки для одежды, тканевые бирки, силиконовые бирки, картонные бирки, изготовление бирок, бирки на заказ, birkityt.ru';
    $seo_canonical = $seo['canonical'] ?? 'https://birkityt.ru';
    $seo_og_image = $seo['og_image'] ?? 'https://birkityt.ru/public/images/banners/0iCWg4QBUkE.jpg';
    $seo_theme = $seo['theme_color'] ?? '#A1B5D8';
    $seo_favicon = $seo['favicon'] ?? '/public/images/logo.svg';
    echo "<title>{$seo_title}</title>\n";
    echo "<link rel=\"canonical\" href=\"{$seo_canonical}\">\n";
    echo "<meta name=\"description\" content=\"" . htmlspecialchars($seo_description, ENT_QUOTES) . "\">\n";
    echo "<meta name=\"keywords\" content=\"" . htmlspecialchars($seo_keywords, ENT_QUOTES) . "\">\n";
    echo "<meta property=\"og:title\" content=\"" . htmlspecialchars($seo_title, ENT_QUOTES) . "\">\n";
    echo "<meta property=\"og:description\" content=\"" . htmlspecialchars($seo_description, ENT_QUOTES) . "\">\n";
    echo "<meta property=\"og:type\" content=\"website\">\n";
    echo "<meta property=\"og:url\" content=\"{$seo_canonical}\">\n";
    echo "<meta property=\"og:image\" content=\"{$seo_og_image}\">\n";
    echo "<meta name=\"theme-color\" content=\"{$seo_theme}\">\n";
    echo "<link rel=\"icon\" type=\"image/svg+xml\" href=\"{$seo_favicon}\">\n";
    ?>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/public/css/style.css">
    <link rel="stylesheet" href="/public/css/works.css">
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.13.1/dist/cdn.min.js"></script>
    <script src="/public/js/main.js"></script>
    <script src="/public/js/works.js"></script>
    <script defer src="/public/js/forms.js"></script>
    <?php if (!empty($page_head))
        echo $page_head; ?>
    <script type="text/javascript">
        (function (m, e, t, r, i, k, a) {
            m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) };
            m[i].l = 1 * new Date();
            for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
            k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
        })
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym(99360339, "init", {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            trackHash: true
        });
    </script>
    <noscript>
        <div><img src="https://mc.yandex.ru/watch/99360339" style="position:absolute; left:-9999px;" alt="" /></div>
    </noscript>
    <!-- /Yandex.Metrika counter -->
    <script>
        async function submitForm(event) {
            event.preventDefault(); // отключаем перезагрузку/перенаправление страницы
            try {
                // Формируем запрос
                const response = await fetch(event.target.action, {
                    method: 'POST',
                    body: new FormData(event.target)
                });
                // если был редирект — переходим на адрес
                if (response.redirected) {
                    window.location.href = response.url || '/success';
                    return;
                }
                // проверяем, что ответ есть
                if (!response.ok) throw (`Ошибка при обращении к серверу: ${response.status}`);
                // проверяем, что ответ действительно JSON
                const contentType = response.headers.get('content-type') || '';
                // Если сервер вернул HTML (редирект на success.php), переходим на success
                if (contentType.includes('text/html')) {
                    window.location.href = '/success';
                    return;
                }
                // Иначе ожидаем JSON, как для AJAX-обработчиков
                if (contentType.includes('application/json')) {
                    const json = await response.json();
                    if (json.result === "success") {
                        window.location.href = '/success';
                    } else {
                        console.log(json);
                        throw (json.info || 'Ошибка отправки');
                    }
                } else {
                    // неизвестный формат — безопасный переход на success
                    window.location.href = '/success';
                }
            } catch (error) { // обработка ошибки
                alert(error);
            }
        }
    </script>
    <script>
        // Скрытый вход в админку: только с главной страницы по сочетанию клавиш
        (function () {
            try {
                var isHome = location.pathname === '/' || location.pathname === '/index.php';
                if (!isHome) return;
                var keys = new Set();
                var handler = function (e) {
                    keys.add(e.key.toLowerCase());
                    // Непопулярная комбинация: Ctrl + Alt + Shift + U
                    var goAdmin = (e.ctrlKey && e.altKey && e.shiftKey && keys.has('u'));
                    if (goAdmin) {
                        // Сбрасываем
                        keys.clear();
                        // Переход на авторизацию админ-панели
                        window.location.href = '/admin/content-ui';
                    }
                };
                var clearHandler = function () { keys.clear(); };
                window.addEventListener('keydown', handler);
                window.addEventListener('keyup', clearHandler);
                window.addEventListener('blur', clearHandler);
            } catch (e) { /* noop */ }
        })();
    </script>
</head>

<body class="bg-mainColor">
    <nav class="relative px-4 py-4 flex justify-between items-center z-50 ">
        <a class="text-3xl font-bold leading-none" href="/">
            <object class="h-16 w-auto" type="image/svg+xml" data="/public/images/logo.svg">
                Ваш браузер не поддерживает данные изображения
            </object>
        </a>
        <div class="lg:hidden">
            <button class="navbar-burger flex items-center text-onbutton p-3">
                <svg class="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Mobile menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                </svg>
            </button>
        </div>
        <ul
            class="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
            <li><a class="text-sm text-gray-400 hover:text-gray-700 font-bold" href="/index.php">Главная</a></li>
            <li class="text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-4 h-4 current-fill"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
            </li>
            <li><a class="text-sm text-gray-400 hover:text-gray-700" href="/delivery.php">Доставка</a></li>
            <li class="text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-4 h-4 current-fill"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
            </li>
            <li><a class="text-sm text-gray-400 hover:text-gray-500" href="/price.php">Стоимость</a></li>
            <li class="text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-4 h-4 current-fill"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
            </li>
            <li><a class="text-sm text-gray-400 hover:text-gray-500" href="/works.php">Наши работы</a></li>
            <li class="text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-4 h-4 current-fill"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
            </li>
            <li><a class="text-sm text-gray-400 hover:text-gray-500" href="/materials.php">Материалы</a></li>
        </ul>
        <a class="hidden lg:inline-block btn-primary" href="https://vk.com/birkityt">Мы в ВК</a>
    </nav>
    <div class="navbar-menu relative z-50 hidden">
        <div class="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
        <nav
            class="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
            <div class="flex items-center mb-8">
                <a class="mr-auto text-3xl font-bold leading-none" href="/index.php">
                    <object class="h-16 w-auto" type="image/svg+xml" data="public/images/logo.svg">
                        Ваш браузер не поддерживает данные изображения
                    </object>
                </a>
                </a>
                <button class="navbar-close">
                    <svg class="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>
            </div>
            <div>
                <ul>
                    <li class="mb-1">
                        <a class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                            href="/index.php">Главная</a>
                    </li>
                    <li class="mb-1">
                        <a class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                            href="/delivery.php">Доставка</a>
                    </li>
                    <li class="mb-1">
                        <a class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                            href="/price.php">Стоимость</a>
                    </li>
                    <li class="mb-1">
                        <a class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                            href="/works.php">Наши работы</a>
                    </li>
                    <li class="mb-1">
                        <a class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                            href="/materials.php">Материалы</a>
                    </li>
                </ul>
            </div>
            <div class="mt-auto">
                <div class="pt-6">
                    <a class="lg:inline-block btn-primary" href="https://vk.com/birkityt">Мы в ВК</a>
                </div>
                <p class="my-4 text-xs text-center text-gray-400">
                    <span>Copyright ©birkityt.ru 2025</span>
                </p>
            </div>
        </nav>
    </div>