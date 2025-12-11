<?php include 'includes/content.php'; ?>
<?php include 'includes/header.php'; ?>
<!--Здесь основной код страницы-->
<section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <h1 class="mb-2 text-3xl font-extrabold text-textColorDark text-center">
      <?php echo content_get('materials.title', 'Материалы'); ?></h1>
    <p class="text-center text-textColor mb-12">
      <?php echo content_get('materials.description', 'Каталог доступных материалов для печати и изготовления.'); ?></p>
    <div class="card flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
      <div
        class="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
        <img class="rounded-lg" src="public/images/img/PTgAc54G72o.jpg" alt="Силиконовая бирка" loading="lazy">
      </div>
      <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
        <h2 class="text-gray-900 text-lg title-font font-medium mb-2">
          <?php echo content_get('materials.silicone.title', 'Силиконовая бирка'); ?></h2>
        <p class="leading-relaxed text-base">
          <?php echo content_get('materials.silicone.text', 'Лента матовая, полупрозрачная, приятная на ощупь, эластичная и элегантная.'); ?>
        </p>
      </div>
    </div>
    <div class="card flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
      <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
        <h2 class="text-gray-900 text-lg title-font font-medium mb-2">
          <?php echo content_get('materials.cotton.title', 'Хлопоковая бирка'); ?></h2>
        <p class="leading-relaxed text-base">
          <?php echo content_get('materials.cotton.text', 'Хлопок представлен в нескольких оттенках, таких как белый и молочный. Плотный рельефный материал подойдет для всех видов тканей. Стойкая печать методом сублимации.'); ?>
        </p>
      </div>
      <div
        class="sm:w-32 sm:order-none order-first sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
        <img class="rounded-lg" src="public/images/img/aBr_aQkt6qM.jpg" alt="Хлопоковая бирка" loading="lazy">
      </div>
    </div>
    <div class="card flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
      <div
        class="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
        <img class="rounded-lg" src="public/images/img/nyUyBzU4mIQ.jpg" alt="Премиум сатин" loading="lazy">
      </div>
      <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
        <h2 class="text-gray-900 text-lg title-font font-medium mb-2">
          <?php echo content_get('materials.satin.title', 'Премиум сатин'); ?></h2>
        <p class="leading-relaxed text-base">
          <?php echo content_get('materials.satin.text', 'Высококачественная сатиновая ленточка с тканым краем. Прекрасная основа для стильных этикеток на различную одежду! Смотрится презентабельно и дорого!'); ?>
        </p>
      </div>
    </div>
    <div class="card flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
      <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
        <h2 class="text-gray-900 text-lg title-font font-medium mb-2">
          <?php echo content_get('materials.kiper.title', 'Киперная лента'); ?></h2>
        <p class="leading-relaxed text-base">
          <?php echo content_get('materials.kiper.text', 'Белая киперная лента с выраженной текстурой. Лента плотная, но при этом принимает любую форму. Состав — 100% полиэстер.'); ?>
        </p>
      </div>
      <div
        class="sm:w-32 sm:order-none order-first sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
        <img class="rounded-lg" src="public/images/img/PL1FRRvOmHU.jpg" alt="Киперная лента" loading="lazy">
      </div>
    </div>
    <div class="card flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
      <div
        class="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
        <img class="rounded-lg" src="public/images/img/nz2eRBg7V-o.jpg" alt="Картонная бирка" loading="lazy">
      </div>
      <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
        <h2 class="text-gray-900 text-lg title-font font-medium mb-2">
          <?php echo content_get('materials.card.title', 'Картонная бирка'); ?></h2>
        <p class="leading-relaxed text-base">
          <?php echo content_get('materials.card.text', 'В одностороннем и двустороннем варианте, подходит для маркировки логотипом, составом и размещения ценников'); ?>
        </p>
      </div>
    </div>
    <a href="https://vk.com/birkityt"><button class="btn-primary flex mx-auto mt-20">Смотреть больше</button></a>
  </div>
</section>

<!--Здесь конец основнова кода страницы-->
<?php include 'includes/footer.php'; ?>