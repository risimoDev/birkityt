<?php include 'includes/content.php'; ?>
<?php include 'includes/header.php'; ?>
<!--Здесь основной код страницы-->
<section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-20">
            <h1 class="sm:text-4xl text-3xl font-medium title-font mb-5 text-gray-900">
                <?php echo content_get('price.title', 'Прайс-лист'); ?></h1>
            <p class="text-base text-body-color">
                <?php echo content_get('price.description', 'Актуальные цены по материалам, ширине и тиражам.'); ?></p>
        </div>
        <?php
        // Загружаем JSON прайса и передаём в JS
        $pricesPath = __DIR__ . '/data/prices.json';
        $prices = [];
        if (file_exists($pricesPath)) {
            $json = json_decode(file_get_contents($pricesPath), true);
            if (is_array($json))
                $prices = $json;
        }
        ?>

        <div class="flex items-center justify-center gap-3 mb-6">
            <label class="flex items-center gap-2">
                <input type="radio" name="viewMode" value="table" checked>
                Таблица
            </label>
            <label class="flex items-center gap-2">
                <input type="radio" name="viewMode" value="cards">
                Карточки
            </label>
            <label class="flex items-center gap-2">
                <input type="radio" name="viewMode" value="accordion">
                Аккордеон
            </label>
        </div>

        <div id="priceContainer" class="space-y-4"></div>

        <script>
            window.PRICES_DATA = <?php echo json_encode($prices, JSON_UNESCAPED_UNICODE); ?>;
        </script>
        <script src="/public/js/price.js"></script>
        <div class="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
            <a href="/index.php#forma"
                class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Оформить
                заявку</a>
        </div>
    </div>
</section>

<!--Здесь конец основнова кода страницы-->
<?php include 'includes/footer.php'; ?>