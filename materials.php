<?php include 'includes/content.php'; ?>
<?php include 'includes/header.php'; ?>
<!--Здесь основной код страницы-->
<section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <h1 class="mb-2 text-3xl font-extrabold text-textColorDark text-center">
      <?php echo content_get('materials.title', 'Материалы'); ?>
    </h1>
    <p class="text-center text-textColor mb-12">
      <?php echo content_get('materials.description', 'Каталог доступных материалов для печати и изготовления.'); ?>
    </p>
    <div class="card flex items-start gap-6 lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
      <div class="sm:w-40 sm:h-40 h-24 w-24 sm:mr-4 inline-flex items-center justify-center rounded-lg bg-white shadow flex-shrink-0 overflow-hidden">
        <img class="w-full h-full object-cover" src="/public/images/works/work_693a32b7259757.31293716.webp" alt="Силиконовая бирка" loading="lazy">
      </div>
      <div class="flex-grow sm:text-left text-center mt-2 sm:mt-0">
        <h2 class="text-gray-900 text-lg title-font font-medium mb-2">
          <?php echo content_get('materials.silicone.title', 'Силиконовая бирка'); ?>
        </h2>
        <p class="leading-relaxed text-base text-textColor">
          <?php echo content_get('materials.silicone.text', 'Лента матовая, полупрозрачная, приятная на ощупь, эластичная и элегантная.'); ?>
        </p>
      </div>
    </div>
    <div class="card flex items-start gap-6 lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
      <div class="flex-grow sm:text-left text-center mt-2 sm:mt-0">
        <h2 class="text-gray-900 text-lg title-font font-medium mb-2">
          <?php echo content_get('materials.cotton.title', 'Хлопоковая бирка'); ?>
        </h2>
        <p class="leading-relaxed text-base text-textColor">
          <?php echo content_get('materials.cotton.text', 'Хлопок представлен в нескольких оттенках, таких как белый и молочный. Плотный рельефный материал подойдет для всех видов тканей. Стойкая печать методом сублимации.'); ?>
        </p>
      </div>
      <div class="sm:w-40 sm:h-40 h-24 w-24 sm:ml-4 inline-flex items-center justify-center rounded-lg bg-white shadow flex-shrink-0 overflow-hidden">
        <img class="w-full h-full object-cover" src="/public/images/works/work_693a32b58034e5.65048226.webp" alt="Хлопоковая бирка" loading="lazy">
      </div>
    </div>
    <div class="card flex items-start gap-6 lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
      <div class="sm:w-40 sm:h-40 h-24 w-24 sm:mr-4 inline-flex items-center justify-center rounded-lg bg-white shadow flex-shrink-0 overflow-hidden">
        <img class="w-full h-full object-cover" src="/public/images/works/work_693a32bde64712.94114662.webp" alt="Премиум сатин" loading="lazy">
      </div>
      <div class="flex-grow sm:text-left text-center mt-2 sm:mt-0">
        <h2 class="text-gray-900 text-lg title-font font-medium mb-2">
          <?php echo content_get('materials.satin.title', 'Премиум сатин'); ?>
        </h2>
        <p class="leading-relaxed text-base text-textColor">
          <?php echo content_get('materials.satin.text', 'Высококачественная сатиновая ленточка с тканым краем. Прекрасная основа для стильных этикеток на различную одежду! Смотрится презентабельно и дорого!'); ?>
        </p>
      </div>
    </div>
    <div class="card flex items-start gap-6 lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
      <div class="flex-grow sm:text-left text-center mt-2 sm:mt-0">
        <h2 class="text-gray-900 text-lg title-font font-medium mb-2">
          <?php echo content_get('materials.kiper.title', 'Киперная лента'); ?>
        </h2>
        <p class="leading-relaxed text-base text-textColor">
          <?php echo content_get('materials.kiper.text', 'Белая киперная лента с выраженной текстурой. Лента плотная, но при этом принимает любую форму. Состав — 100% полиэстер.'); ?>
        </p>
      </div>
      <div class="sm:w-40 sm:h-40 h-24 w-24 sm:ml-4 inline-flex items-center justify-center rounded-lg bg-white shadow flex-shrink-0 overflow-hidden">
        <img class="w-full h-full object-cover" src="/public/images/works/work_693a32b6aafd39.89489493.webp" alt="Киперная лента" loading="lazy">
      </div>
    </div>
    <div class="card flex items-start gap-6 lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
      <div class="sm:w-40 sm:h-40 h-24 w-24 sm:mr-4 inline-flex items-center justify-center rounded-lg bg-white shadow flex-shrink-0 overflow-hidden">
        <img class="w-full h-full object-cover" src="/public/images/works/work_693a32be620d36.03962487.webp" alt="Картонная бирка" loading="lazy">
      </div>
      <div class="flex-grow sm:text-left text-center mt-2 sm:mt-0">
        <h2 class="text-gray-900 text-lg title-font font-medium mb-2">
          <?php echo content_get('materials.card.title', 'Картонная бирка'); ?>
        </h2>
        <p class="leading-relaxed text-base text-textColor">
          <?php echo content_get('materials.card.text', 'В одностороннем и двустороннем варианте, подходит для маркировки логотипом, составом и размещения ценников'); ?>
        </p>
      </div>
    </div>
    <a href="https://vk.com/birkityt"><button class="btn-primary flex mx-auto mt-20">Смотреть больше</button></a>
  </div>
</section>

<!--Здесь конец основнова кода страницы-->
<?php include 'includes/footer.php'; ?>