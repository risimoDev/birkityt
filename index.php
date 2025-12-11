<?php include 'includes/content.php'; ?>
<?php include 'includes/header.php'; ?>

<div class="relative isolate px-4 pt-14 lg:px-8">
   <div class="absolute inset-x-0 -top-50 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
      <div
         class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#b1dda0] to-[#bfe779] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
         style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
      </div>
   </div>
   <div class="mx-auto max-w-2xl py-16 sm:py-48 lg:py-56">
      <div class="text-center">
         <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            <?php echo content_get('index.hero.title'); ?></h1>
         <p class="mt-6 text-lg leading-8 text-gray-600"><?php echo content_get('index.hero.text'); ?></p>
         <div class="mt-10 flex items-center justify-center gap-x-6">
            <a href="/price.php" class="btn-primary"><?php echo content_get('index.cta.price', 'Стоимость'); ?></a>
            <a href="/works.php"
               class="text-sm font-semibold leading-6 text-gray-900"><?php echo content_get('index.cta.works', 'Наши работы'); ?>
               <span aria-hidden="true">→</span></a>
         </div>
      </div>
   </div>
   <div
      class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      aria-hidden="true">
      <div
         class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#7991a8] to-[#7fa1db] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
         style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
      </div>
   </div>
</div>
</div>
<div class="container my-24 mx-auto md:px-6">
   <!-- Section: Design Block -->
   <!-- <section class="mb-32 text-center px-4">
          <h2 class="mb-16 text-3xl font-extrabold text-textColorDark">
            Почему именно <u class="text-primary dark:text-primary-400">BIRKITYT</u>?
          </h2>
          <div class="grid gap-x-6 md:grid-cols-3 lg:gap-x-12">
            <div class="mb-12 md:mb-0">
              <div class="mb-6 inline-block rounded-md bg-onbutton p-4 text-primary">
                <object class="h-6 w-6" type="image/svg+xml" data="images/icons/clock.svg">
                  <img src="images/icons/clock.svg" alt="Быстро">
                </object>
              </div>
              <h5 class="mb-4 text-lg font-bold text-textColorDark">Скорость работы</h5>
              <p class="text-textColor">
                Мы гарантируем быструю обработку заказа, 
                и в большинстве случаев мы можем выполнить его всего за два дня!
              </p>
            </div>
      
            <div class="mb-12 md:mb-0">
              <div class="mb-6 inline-block rounded-md bg-onbutton p-4 text-primary">
                <object class="h-6 w-6" type="image/svg+xml" data="images/icons/design.svg">
                  <img src="images/icons/design.svg" alt="Быстро">
                </object>
              </div>
              <h5 class="mb-4 text-lg font-bold text-textColorDark">Подготовка макета</h5>
              <p class="text-textColor">
                Наши профессиональные дизайнеры также помогут вам с подготовкой макета, 
                чтобы ваша продукция выглядела стильно и привлекательно. 
                
              </p>
            </div>
      
            <div class="mb-12 md:mb-0">
              <div class="mb-6 inline-block rounded-md bg-onbutton p-4 text-primary">
                <object class="h-7 w-7" type="image/svg+xml" data="images/icons/track.svg">
                  <img class="stroke-2" src="images/icons/track.svg" alt="Быстро">
                </object>
              </div>
              <h5 class="mb-4 text-lg font-bold text-textColorDark">Быстрая доставка</h5>
              <p class="text-textColor">
                Мы предлагаем доставку по всей России и миру, 
                чтобы вы могли получить наши качественные изделия в любой точке планеты.
              </p>
            </div>
          </div>
        </section>
        <!-- ====== About Section Start -->
   <div class="container mx-auto sm:mb-[300px] mb-[100px] flex flex-wrap justify-center">
      <h2 class="mb-16 text-3xl font-extrabold text-textColorDark text-center">
         <?php echo content_get('index.why.title'); ?>
      </h2>
      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 ">
         <div
            class="transition ease-in-out delay-150 max-w-sm rounded-md overflow-hidden sm:shadow-sm shadow-xl hover:shadow-xl cursor-pointer card">
            <div class="px-6 py-4">
               <object class="h-10 w-10 mx-auto my-4" type="image/svg+xml" data="public/images/icons/clock.svg">
                  <img src="public/images/icons/clock.svg" alt="Быстро">
               </object>
               <hr>
               <p class=" text-base"><?php echo content_get('index.why.fast'); ?></p>
            </div>
         </div>
         <div
            class=" transition ease-in-out delay-150 max-w-sm rounded-md overflow-hidden sm:shadow-sm shadow-xl hover:shadow-xl cursor-pointer card">
            <div class="px-6 py-4 ">
               <object class="h-10 w-10 mx-auto my-4" type="image/svg+xml" data="public/images/icons/design.svg">
                  <img src="public/images/icons/design.svg" alt="Быстро">
               </object>
               <hr>
               <p class=" text-base"><?php echo content_get('index.why.design'); ?></p>
            </div>
         </div>
         <div
            class="transition ease-in-out delay-150 max-w-sm rounded-md overflow-hidden sm:shadow-sm shadow-xl hover:shadow-xl cursor-pointer card">
            <div class="px-6 py-4 ">
               <object class="h-10 w-10 mx-auto my-4" type="image/svg+xml" data="public/images/icons/track.svg">
                  <img class="stroke-2" src="public/images/icons/track.svg" alt="Быстро">
               </object>
               <hr>
               <p class=" text-base"><?php echo content_get('index.why.delivery'); ?></p>
            </div>
         </div>
      </div>
   </div>



   <section class="overflow-hidden px-4 pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]">
      <div class="container mx-auto">
         <div class="flex flex-wrap items-center justify-between -mx-4">
            <div class="w-full px-4 lg:w-6/12">
               <div class="flex items-center -mx-3 sm:-mx-4">
                  <div class="w-full px-3 sm:px-4 xl:w-1/2">
                     <div class="py-3 sm:py-4">
                        <img src="public/images/banners/0iCWg4QBUkE.jpg" alt="Пример печати на ткани" loading="lazy"
                           class="w-full rounded-2xl" />
                     </div>
                     <div class="py-3 sm:py-4">
                        <img src="public/images/banners/UPqlF9J6IHo.jpg" alt="Процесс подготовки макета" loading="lazy"
                           class="w-full rounded-2xl" />
                     </div>
                  </div>
                  <div class="w-full px-3 sm:px-4 xl:w-1/2">
                     <div class="relative z-10 my-4">
                        <img src="public/images/banners/jtouETZBAo0.jpg" alt="Готовые изделия с бирками" loading="lazy"
                           class="w-full rounded-2xl" />
                        <span class="absolute -right-7 -bottom-7 z-[-1]">
                           <svg width="134" height="106" viewBox="0 0 134 106" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <circle cx="1.66667" cy="104" r="1.66667" transform="rotate(-90 1.66667 104)"
                                 fill="#A1B5D8" />
                              <circle cx="16.3333" cy="104" r="1.66667" transform="rotate(-90 16.3333 104)"
                                 fill="#A1B5D8" />
                              <circle cx="31" cy="104" r="1.66667" transform="rotate(-90 31 104)" fill="#A1B5D8" />
                              <circle cx="45.6667" cy="104" r="1.66667" transform="rotate(-90 45.6667 104)"
                                 fill="#A1B5D8" />
                              <circle cx="60.3334" cy="104" r="1.66667" transform="rotate(-90 60.3334 104)"
                                 fill="#A1B5D8" />
                              <circle cx="88.6667" cy="104" r="1.66667" transform="rotate(-90 88.6667 104)"
                                 fill="#A1B5D8" />
                              <circle cx="117.667" cy="104" r="1.66667" transform="rotate(-90 117.667 104)"
                                 fill="#A1B5D8" />
                              <circle cx="74.6667" cy="104" r="1.66667" transform="rotate(-90 74.6667 104)"
                                 fill="#A1B5D8" />
                              <circle cx="103" cy="104" r="1.66667" transform="rotate(-90 103 104)" fill="#A1B5D8" />
                              <circle cx="132" cy="104" r="1.66667" transform="rotate(-90 132 104)" fill="#A1B5D8" />
                              <circle cx="1.66667" cy="89.3333" r="1.66667" transform="rotate(-90 1.66667 89.3333)"
                                 fill="#A1B5D8" />
                              <circle cx="16.3333" cy="89.3333" r="1.66667" transform="rotate(-90 16.3333 89.3333)"
                                 fill="#A1B5D8" />
                              <circle cx="31" cy="89.3333" r="1.66667" transform="rotate(-90 31 89.3333)"
                                 fill="#A1B5D8" />
                              <circle cx="45.6667" cy="89.3333" r="1.66667" transform="rotate(-90 45.6667 89.3333)"
                                 fill="#A1B5D8" />
                              <circle cx="60.3333" cy="89.3338" r="1.66667" transform="rotate(-90 60.3333 89.3338)"
                                 fill="#A1B5D8" />
                              <circle cx="88.6667" cy="89.3338" r="1.66667" transform="rotate(-90 88.6667 89.3338)"
                                 fill="#A1B5D8" />
                              <circle cx="117.667" cy="89.3338" r="1.66667" transform="rotate(-90 117.667 89.3338)"
                                 fill="#A1B5D8" />
                              <circle cx="74.6667" cy="89.3338" r="1.66667" transform="rotate(-90 74.6667 89.3338)"
                                 fill="#A1B5D8" />
                              <circle cx="103" cy="89.3338" r="1.66667" transform="rotate(-90 103 89.3338)"
                                 fill="#A1B5D8" />
                              <circle cx="132" cy="89.3338" r="1.66667" transform="rotate(-90 132 89.3338)"
                                 fill="#A1B5D8" />
                              <circle cx="1.66667" cy="74.6673" r="1.66667" transform="rotate(-90 1.66667 74.6673)"
                                 fill="#A1B5D8" />
                              <circle cx="1.66667" cy="31.0003" r="1.66667" transform="rotate(-90 1.66667 31.0003)"
                                 fill="#A1B5D8" />
                              <circle cx="16.3333" cy="74.6668" r="1.66667" transform="rotate(-90 16.3333 74.6668)"
                                 fill="#A1B5D8" />
                              <circle cx="16.3333" cy="31.0003" r="1.66667" transform="rotate(-90 16.3333 31.0003)"
                                 fill="#A1B5D8" />
                              <circle cx="31" cy="74.6668" r="1.66667" transform="rotate(-90 31 74.6668)"
                                 fill="#A1B5D8" />
                              <circle cx="31" cy="31.0003" r="1.66667" transform="rotate(-90 31 31.0003)"
                                 fill="#A1B5D8" />
                              <circle cx="45.6667" cy="74.6668" r="1.66667" transform="rotate(-90 45.6667 74.6668)"
                                 fill="#A1B5D8" />
                              <circle cx="45.6667" cy="31.0003" r="1.66667" transform="rotate(-90 45.6667 31.0003)"
                                 fill="#A1B5D8" />
                              <circle cx="60.3333" cy="74.6668" r="1.66667" transform="rotate(-90 60.3333 74.6668)"
                                 fill="#A1B5D8" />
                              <circle cx="60.3333" cy="30.9998" r="1.66667" transform="rotate(-90 60.3333 30.9998)"
                                 fill="#A1B5D8" />
                              <circle cx="88.6667" cy="74.6668" r="1.66667" transform="rotate(-90 88.6667 74.6668)"
                                 fill="#A1B5D8" />
                              <circle cx="88.6667" cy="30.9998" r="1.66667" transform="rotate(-90 88.6667 30.9998)"
                                 fill="#A1B5D8" />
                              <circle cx="117.667" cy="74.6668" r="1.66667" transform="rotate(-90 117.667 74.6668)"
                                 fill="#A1B5D8" />
                              <circle cx="117.667" cy="30.9998" r="1.66667" transform="rotate(-90 117.667 30.9998)"
                                 fill="#A1B5D8" />
                              <circle cx="74.6667" cy="74.6668" r="1.66667" transform="rotate(-90 74.6667 74.6668)"
                                 fill="#A1B5D8" />
                              <circle cx="74.6667" cy="30.9998" r="1.66667" transform="rotate(-90 74.6667 30.9998)"
                                 fill="#A1B5D8" />
                              <circle cx="103" cy="74.6668" r="1.66667" transform="rotate(-90 103 74.6668)"
                                 fill="#A1B5D8" />
                              <circle cx="103" cy="30.9998" r="1.66667" transform="rotate(-90 103 30.9998)"
                                 fill="#A1B5D8" />
                              <circle cx="132" cy="74.6668" r="1.66667" transform="rotate(-90 132 74.6668)"
                                 fill="#A1B5D8" />
                              <circle cx="132" cy="30.9998" r="1.66667" transform="rotate(-90 132 30.9998)"
                                 fill="#A1B5D8" />
                              <circle cx="1.66667" cy="60.0003" r="1.66667" transform="rotate(-90 1.66667 60.0003)"
                                 fill="#A1B5D8" />
                              <circle cx="1.66667" cy="16.3333" r="1.66667" transform="rotate(-90 1.66667 16.3333)"
                                 fill="#A1B5D8" />
                              <circle cx="16.3333" cy="60.0003" r="1.66667" transform="rotate(-90 16.3333 60.0003)"
                                 fill="#A1B5D8" />
                              <circle cx="16.3333" cy="16.3333" r="1.66667" transform="rotate(-90 16.3333 16.3333)"
                                 fill="#A1B5D8" />
                              <circle cx="31" cy="60.0003" r="1.66667" transform="rotate(-90 31 60.0003)"
                                 fill="#A1B5D8" />
                              <circle cx="31" cy="16.3333" r="1.66667" transform="rotate(-90 31 16.3333)"
                                 fill="#A1B5D8" />
                              <circle cx="45.6667" cy="60.0003" r="1.66667" transform="rotate(-90 45.6667 60.0003)"
                                 fill="#A1B5D8" />
                              <circle cx="45.6667" cy="16.3333" r="1.66667" transform="rotate(-90 45.6667 16.3333)"
                                 fill="#A1B5D8" />
                              <circle cx="60.3333" cy="60.0003" r="1.66667" transform="rotate(-90 60.3333 60.0003)"
                                 fill="#A1B5D8" />
                              <circle cx="60.3333" cy="16.3333" r="1.66667" transform="rotate(-90 60.3333 16.3333)"
                                 fill="#A1B5D8" />
                              <circle cx="88.6667" cy="60.0003" r="1.66667" transform="rotate(-90 88.6667 60.0003)"
                                 fill="#A1B5D8" />
                              <circle cx="88.6667" cy="16.3333" r="1.66667" transform="rotate(-90 88.6667 16.3333)"
                                 fill="#A1B5D8" />
                              <circle cx="117.667" cy="60.0003" r="1.66667" transform="rotate(-90 117.667 60.0003)"
                                 fill="#A1B5D8" />
                              <circle cx="117.667" cy="16.3333" r="1.66667" transform="rotate(-90 117.667 16.3333)"
                                 fill="#A1B5D8" />
                              <circle cx="74.6667" cy="60.0003" r="1.66667" transform="rotate(-90 74.6667 60.0003)"
                                 fill="#A1B5D8" />
                              <circle cx="74.6667" cy="16.3333" r="1.66667" transform="rotate(-90 74.6667 16.3333)"
                                 fill="#A1B5D8" />
                              <circle cx="103" cy="60.0003" r="1.66667" transform="rotate(-90 103 60.0003)"
                                 fill="#A1B5D8" />
                              <circle cx="103" cy="16.3333" r="1.66667" transform="rotate(-90 103 16.3333)"
                                 fill="#A1B5D8" />
                              <circle cx="132" cy="60.0003" r="1.66667" transform="rotate(-90 132 60.0003)"
                                 fill="#A1B5D8" />
                              <circle cx="132" cy="16.3333" r="1.66667" transform="rotate(-90 132 16.3333)"
                                 fill="#A1B5D8" />
                              <circle cx="1.66667" cy="45.3333" r="1.66667" transform="rotate(-90 1.66667 45.3333)"
                                 fill="#A1B5D8" />
                              <circle cx="1.66667" cy="1.66683" r="1.66667" transform="rotate(-90 1.66667 1.66683)"
                                 fill="#A1B5D8" />
                              <circle cx="16.3333" cy="45.3333" r="1.66667" transform="rotate(-90 16.3333 45.3333)"
                                 fill="#A1B5D8" />
                              <circle cx="16.3333" cy="1.66683" r="1.66667" transform="rotate(-90 16.3333 1.66683)"
                                 fill="#A1B5D8" />
                              <circle cx="31" cy="45.3333" r="1.66667" transform="rotate(-90 31 45.3333)"
                                 fill="#A1B5D8" />
                              <circle cx="31" cy="1.66683" r="1.66667" transform="rotate(-90 31 1.66683)"
                                 fill="#A1B5D8" />
                              <circle cx="45.6667" cy="45.3333" r="1.66667" transform="rotate(-90 45.6667 45.3333)"
                                 fill="#A1B5D8" />
                              <circle cx="45.6667" cy="1.66683" r="1.66667" transform="rotate(-90 45.6667 1.66683)"
                                 fill="#A1B5D8" />
                              <circle cx="60.3333" cy="45.3338" r="1.66667" transform="rotate(-90 60.3333 45.3338)"
                                 fill="#A1B5D8" />
                              <circle cx="60.3333" cy="1.66683" r="1.66667" transform="rotate(-90 60.3333 1.66683)"
                                 fill="#A1B5D8" />
                              <circle cx="88.6667" cy="45.3338" r="1.66667" transform="rotate(-90 88.6667 45.3338)"
                                 fill="#A1B5D8" />
                              <circle cx="88.6667" cy="1.66683" r="1.66667" transform="rotate(-90 88.6667 1.66683)"
                                 fill="#A1B5D8" />
                              <circle cx="117.667" cy="45.3338" r="1.66667" transform="rotate(-90 117.667 45.3338)"
                                 fill="#A1B5D8" />
                              <circle cx="117.667" cy="1.66683" r="1.66667" transform="rotate(-90 117.667 1.66683)"
                                 fill="#A1B5D8" />
                              <circle cx="74.6667" cy="45.3338" r="1.66667" transform="rotate(-90 74.6667 45.3338)"
                                 fill="#A1B5D8" />
                              <circle cx="74.6667" cy="1.66683" r="1.66667" transform="rotate(-90 74.6667 1.66683)"
                                 fill="#A1B5D8" />
                              <circle cx="103" cy="45.3338" r="1.66667" transform="rotate(-90 103 45.3338)"
                                 fill="#A1B5D8" />
                              <circle cx="103" cy="1.66683" r="1.66667" transform="rotate(-90 103 1.66683)"
                                 fill="#A1B5D8" />
                              <circle cx="132" cy="45.3338" r="1.66667" transform="rotate(-90 132 45.3338)"
                                 fill="#A1B5D8" />
                              <circle cx="132" cy="1.66683" r="1.66667" transform="rotate(-90 132 1.66683)"
                                 fill="#A1B5D8" />
                           </svg>
                        </span>
                     </div>
                  </div>
               </div>
            </div>
            <div class="w-full px-4 lg:w-1/2 xl:w-5/12">
               <div class="mt-10 lg:mt-0">
                  <span class="block mb-4 text-lg font-semibold text-primary">
                     О нас
                  </span>
                  <h2 class="mb-5 text-3xl font-bold text-dark  sm:text-[40px]/[48px]">
                     Уже 7 лет на рынке производстава бирок
                  </h2>
                  <p class="mb-5 text-base text-body-color dark:text-dark-6">
                     Получите готовый комплект для вашего бренда уже через 5 дней!
                     В ассортименте более 20 видов изготавливаемой продукции.
                     Каждый второй клиент - поставщик на маркетплейсы.
                     Разрабатываем логотипы, готовим макеты и
                     доставляем по всему миру СДЕК или Почтой России!
                  </p>
                  <p class="mb-8 text-base text-body-color dark:text-dark-6">
                     Разрабатываем макеты и
                     доставляем по всему миру СДЕК или Почтой России!
                  </p>
                  <a href="javascript:void(0)"
                     class="inline-flex items-center justify-center py-3 text-base font-medium text-center text-white border border-transparent rounded-md px-7 bg-primary hover:bg-opacity-90">
                     Get Started
                  </a>
               </div>
            </div>
         </div>
      </div>
   </section>
   <!-- ====== About Section End -->
   <!-- ====== FAQ Section Start -->
   <section x-data="
   {
   openFaq1: false, 
   openFaq2: false, 
   openFaq3: false, 
   openFaq4: false, 
   openFaq5: false, 
   openFaq6: false
   }
   " class="relative z-20 overflow-hidden px-4 pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]">
      <div class="container mx-auto">
         <div class="flex flex-wrap -mx-4">
            <div class="w-full px-4">
               <div class="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">
                  <span class="block mb-2 text-lg font-semibold text-primary">
                     <?php echo content_get('faq.title', 'FAQ'); ?>
                  </span>
                  <h2 class="text-dark  mb-4 text-3xl font-extrabold sm:text-[40px]/[48px]">
                     <?php echo content_get('faq.subtitle', 'Есть вопрос?<br> Посмотри ответ здесь!'); ?>
                  </h2>
                  <p class="text-base text-body-color dark:text-dark-6">
                     <?php echo content_get('faq.description', 'Часто задаваемые вопросы, на которые уже есть ответы!'); ?>
                  </p>
               </div>
            </div>
         </div>
         <div class="flex flex-wrap -mx-4">
            <div class="w-full px-4 lg:w-1/2">
               <div
                  class="w-full p-4 mb-8 bg-white rounded-lg shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] dark:shadow-[0px_20px_95px_0px_rgba(0,0,0,0.30)] dark:bg-dark-2 sm:p-8 lg:px-6 xl:px-8">
                  <button class="flex w-full text-left faq-btn" @click="openFaq1 = !openFaq1">
                     <div
                        class="bg-primary/5 dark:bg-white/5 text-primary mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg">
                        <svg :class="openFaq1 && 'rotate-180'" width="22" height="22" viewBox="0 0 22 22" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                           <path
                              d="M11 15.675C10.7937 15.675 10.6219 15.6062 10.45 15.4687L2.54374 7.69998C2.23436 7.3906 2.23436 6.90935 2.54374 6.59998C2.85311 6.2906 3.33436 6.2906 3.64374 6.59998L11 13.7844L18.3562 6.53123C18.6656 6.22185 19.1469 6.22185 19.4562 6.53123C19.7656 6.8406 19.7656 7.32185 19.4562 7.63123L11.55 15.4C11.3781 15.5719 11.2062 15.675 11 15.675Z"
                              fill="currentColor" />
                        </svg>
                     </div>
                     <div class="w-full">
                        <h4 class="mt-1 text-lg font-semibold text-dark ">
                           <?php echo content_get('faq.q1', 'Какой у вас режим работы?'); ?>
                        </h4>
                     </div>
                  </button>
                  <div x-show="openFaq1" class="faq-content pl-[62px]">
                     <p class="py-3 text-base leading-relaxed text-body-color dark:text-dark-6">
                        <?php echo content_get('faq.a1', 'С 8:00 до 16:00 по Московскому времени<br> C 10:00 до 18:00 по Пермскому времени <br>ПН-ПТ - Рабочие дни<br> СБ-ВС - Выходные дни'); ?>
                     </p>
                  </div>
               </div>
               <div
                  class="w-full p-4 mb-8 bg-white rounded-lg shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] dark:shadow-[0px_20px_95px_0px_rgba(0,0,0,0.30)] dark:bg-dark-2 sm:p-8 lg:px-6 xl:px-8">
                  <button class="flex w-full text-left faq-btn" @click="openFaq2 = !openFaq2">
                     <div
                        class="bg-primary/5 dark:bg-white/5 text-primary mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg">
                        <svg :class="openFaq2 && 'rotate-180'" width="22" height="22" viewBox="0 0 22 22" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                           <path
                              d="M11 15.675C10.7937 15.675 10.6219 15.6062 10.45 15.4687L2.54374 7.69998C2.23436 7.3906 2.23436 6.90935 2.54374 6.59998C2.85311 6.2906 3.33436 6.2906 3.64374 6.59998L11 13.7844L18.3562 6.53123C18.6656 6.22185 19.1469 6.22185 19.4562 6.53123C19.7656 6.8406 19.7656 7.32185 19.4562 7.63123L11.55 15.4C11.3781 15.5719 11.2062 15.675 11 15.675Z"
                              fill="currentColor" />
                        </svg>
                     </div>
                     <div class="w-full">
                        <h4 class="mt-1 text-lg font-semibold text-dark ">
                           <?php echo content_get('faq.q2', 'Нужна ли предоплата и в каком размере?'); ?>
                        </h4>
                     </div>
                  </button>
                  <div x-show="openFaq2" class="faq-content pl-[62px]">
                     <p class="py-3 text-base leading-relaxed text-body-color dark:text-dark-6">
                        <?php echo content_get('faq.a2', 'Да, любая работа начинается с внесения полной предоплаты и утверждения макета'); ?>
                     </p>
                  </div>
               </div>
               <div
                  class="w-full p-4 mb-8 bg-white rounded-lg shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] dark:shadow-[0px_20px_95px_0px_rgba(0,0,0,0.30)] dark:bg-dark-2 sm:p-8 lg:px-6 xl:px-8">
                  <button class="flex w-full text-left faq-btn" @click="openFaq3 = !openFaq3">
                     <div
                        class="bg-primary/5 dark:bg-white/5 text-primary mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg">
                        <svg :class="openFaq3 && 'rotate-180'" width="22" height="22" viewBox="0 0 22 22" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                           <path
                              d="M11 15.675C10.7937 15.675 10.6219 15.6062 10.45 15.4687L2.54374 7.69998C2.23436 7.3906 2.23436 6.90935 2.54374 6.59998C2.85311 6.2906 3.33436 6.2906 3.64374 6.59998L11 13.7844L18.3562 6.53123C18.6656 6.22185 19.1469 6.22185 19.4562 6.53123C19.7656 6.8406 19.7656 7.32185 19.4562 7.63123L11.55 15.4C11.3781 15.5719 11.2062 15.675 11 15.675Z"
                              fill="currentColor" />
                        </svg>
                     </div>
                     <div class="w-full">
                        <h4 class="mt-1 text-lg font-semibold text-dark ">
                           <?php echo content_get('faq.q3', 'Существует ли минимальная стоимость заказа?'); ?>
                        </h4>
                     </div>
                  </button>
                  <div x-show="openFaq3" class="faq-content pl-[62px]">
                     <p class="py-3 text-base leading-relaxed text-body-color dark:text-dark-6">
                        <?php echo content_get('faq.a3', 'Да, минимальная стоимость заказа составляет 1000 рублей'); ?>
                     </p>
                  </div>
               </div>
            </div>
            <div class="w-full px-4 lg:w-1/2">
               <div
                  class="w-full p-4 mb-8 bg-white rounded-lg shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] dark:shadow-[0px_20px_95px_0px_rgba(0,0,0,0.30)] dark:bg-dark-2 sm:p-8 lg:px-6 xl:px-8">
                  <button class="flex w-full text-left faq-btn" @click="openFaq4 = !openFaq4">
                     <div
                        class="bg-primary/5 dark:bg-white/5 text-primary mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg">
                        <svg :class="openFaq4 && 'rotate-180'" width="22" height="22" viewBox="0 0 22 22" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                           <path
                              d="M11 15.675C10.7937 15.675 10.6219 15.6062 10.45 15.4687L2.54374 7.69998C2.23436 7.3906 2.23436 6.90935 2.54374 6.59998C2.85311 6.2906 3.33436 6.2906 3.64374 6.59998L11 13.7844L18.3562 6.53123C18.6656 6.22185 19.1469 6.22185 19.4562 6.53123C19.7656 6.8406 19.7656 7.32185 19.4562 7.63123L11.55 15.4C11.3781 15.5719 11.2062 15.675 11 15.675Z"
                              fill="currentColor" />
                        </svg>
                     </div>
                     <div class="w-full">
                        <h4 class="mt-1 text-lg font-semibold text-dark ">
                           <?php echo content_get('faq.q4', 'Выдерживают ли бирки стирку и химчистку?'); ?>
                        </h4>
                     </div>
                  </button>
                  <div x-show="openFaq4" class="faq-content pl-[62px]">
                     <p class="py-3 text-base leading-relaxed text-body-color dark:text-dark-6">
                        <?php echo content_get('faq.a4', 'Информацию на этикетки наносят специальными красителями и по определенным технологиям, поэтому они выдерживают достаточное количество стирок'); ?>
                     </p>
                  </div>
               </div>
               <div
                  class="w-full p-4 mb-8 bg-white rounded-lg shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] dark:shadow-[0px_20px_95px_0px_rgba(0,0,0,0.30)] dark:bg-dark-2 sm:p-8 lg:px-6 xl:px-8">
                  <button class="flex w-full text-left faq-btn" @click="openFaq5 = !openFaq5">
                     <div
                        class="bg-primary/5 dark:bg-white/5 text-primary mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg">
                        <svg :class="openFaq5 && 'rotate-180'" width="22" height="22" viewBox="0 0 22 22" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                           <path
                              d="M11 15.675C10.7937 15.675 10.6219 15.6062 10.45 15.4687L2.54374 7.69998C2.23436 7.3906 2.23436 6.90935 2.54374 6.59998C2.85311 6.2906 3.33436 6.2906 3.64374 6.59998L11 13.7844L18.3562 6.53123C18.6656 6.22185 19.1469 6.22185 19.4562 6.53123C19.7656 6.8406 19.7656 7.32185 19.4562 7.63123L11.55 15.4C11.3781 15.5719 11.2062 15.675 11 15.675Z"
                              fill="currentColor" />
                        </svg>
                     </div>
                     <div class="w-full">
                        <h4 class="mt-1 text-lg font-semibold text-dark">
                           <?php echo content_get('faq.q5', 'Можно ли посмотреть пробник, до изготовления всего заказа?'); ?>
                        </h4>
                     </div>
                  </button>
                  <div x-show="openFaq5" class="faq-content pl-[62px]">
                     <p class="py-3 text-base leading-relaxed text-body-color dark:text-dark-6">
                        <?php echo content_get('faq.a5', 'Да, после полной предоплаты и до того как мы начнем печатать всю партию, мы можем изготовить пробную бирку и отправить её фото вам'); ?>
                     </p>
                  </div>
               </div>
               <div
                  class="w-full p-4 mb-8 bg-white rounded-lg shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] dark:shadow-[0px_20px_95px_0px_rgba(0,0,0,0.30)] dark:bg-dark-2 sm:p-8 lg:px-6 xl:px-8">
                  <button class="flex w-full text-left faq-btn" @click="openFaq6 = !openFaq6">
                     <div
                        class="bg-primary/5 dark:bg-white/5 text-primary mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg">
                        <svg :class="openFaq6 && 'rotate-180'" width="22" height="22" viewBox="0 0 22 22" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                           <path
                              d="M11 15.675C10.7937 15.675 10.6219 15.6062 10.45 15.4687L2.54374 7.69998C2.23436 7.3906 2.23436 6.90935 2.54374 6.59998C2.85311 6.2906 3.33436 6.2906 3.64374 6.59998L11 13.7844L18.3562 6.53123C18.6656 6.22185 19.1469 6.22185 19.4562 6.53123C19.7656 6.8406 19.7656 7.32185 19.4562 7.63123L11.55 15.4C11.3781 15.5719 11.2062 15.675 11 15.675Z"
                              fill="currentColor" />
                        </svg>
                     </div>
                     <div class="w-full">
                        <h4 class="mt-1 text-lg font-semibold text-dark ">
                           <?php echo content_get('faq.q6', 'Сколько времени занимает изготовление заказа?'); ?>
                        </h4>
                     </div>
                  </button>
                  <div x-show="openFaq6" class="faq-content pl-[62px]">
                     <p class="py-3 text-base leading-relaxed text-body-color dark:text-dark-6">
                        <?php echo content_get('faq.a6', 'Изготовление заказа занимает 2-3 рабочих дня после оплаты, не считая дня оплаты'); ?>
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!--<div class="absolute bottom-0 right-0 z-[-1]">
      <svg
         width="1440"
         height="886"
         viewBox="0 0 1440 886"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         >
         <path
            opacity="0.5"
            d="M193.307 -273.321L1480.87 1014.24L1121.85 1373.26C1121.85 1373.26 731.745 983.231 478.513 729.927C225.976 477.317 -165.714 85.6993 -165.714 85.6993L193.307 -273.321Z"
            fill="url(#paint0_linear)"
            />
         <defs>
            <linearGradient
               id="paint0_linear"
               x1="1308.65"
               y1="1142.58"
               x2="602.827"
               y2="-418.681"
               gradientUnits="userSpaceOnUse"
               >
               <stop stop-color="#A1B5D8" stop-opacity="0.36" />
               <stop offset="1" stop-color="#F5F2FD" stop-opacity="0" />
               <stop offset="1" stop-color="#F5F2FD" stop-opacity="0.096144" />
            </linearGradient>
         </defs>
      </svg>-->
</div>
</section>
<!-- ====== FAQ Section End -->


<!-- Section: Design Block -->
</div>
<section class="text-gray-600 body-font relative" id="forma">
   <div class="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
      <div
         class="lg:w-2/3 md:w-1/2 bg-white rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
         <iframe width="100%" height="100%" class="absolute inset-0" frameborder="0" title="map" marginheight="0"
            marginwidth="0" scrolling="no"
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A5a9e66ca8e53422be682486f68b65a31f288f536be5e5ccf37730aab74481305&amp;source=constructor"
            style="filter: grayscale(1) contrast(1.2) opacity(0.4);"></iframe>
         <div class="bg-white relative flex flex-wrap py-6 rounded shadow-md">
            <div class="lg:w-1/2 px-6">
               <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs">Адрес</h2>
               <p class="mt-1">г.Пермь, Кронштадская 39А</p>
            </div>
            <div class="lg:w-1/2 px-6 mt-4 lg:mt-0">
               <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs">Почта</h2>
               <a class="text-indigo-500 leading-relaxed">k.redkousov@inbox.ru</a>
               <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">Телефон</h2>
               <p class="leading-relaxed">+7 (952) 645-22-71</p>
            </div>
         </div>
      </div>
      <div class="lg:w-1/3 md:w-1/2 bg-mainColor flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
         <form enctype="multipart/form-data" method="post" id="form" onsubmit="submitForm(event)" action="send.php">
            <h2 class="text-textColor text-lg mb-1 font-medium title-font">Свяжитесь с нами</h2>
            <p class="leading-relaxed mb-5 text-textColor">Мы обязательно проконсультируем по интересующим вас вопросам!
            </p>
            <div class="relative mb-4">
               <label for="name" class="leading-7 text-sm text-gray-600">Имя</label>
               <input type="text" id="name" name="name"
                  class="w-full bg-white rounded border border-gray-300 focus:border-onbutton focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            </div>
            <div class="relative mb-4">
               <label for="tel" class="leading-7 text-sm text-gray-600">Номер телефона</label>
               <input type="tel" id="tel" name="phone"
                  class="w-full bg-white rounded border border-gray-300 focus:border-onbutton focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            </div>
            <div class="relative mb-4">
               <label for="email" class="leading-7 text-sm text-gray-600">Почта</label>
               <input type="email" id="email" name="email"
                  class="w-full bg-white rounded border border-gray-300 focus:border-onbutton focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            </div>
            <div class="relative mb-4">
               <label for="message" class="leading-7 text-sm text-gray-600">Сообщение</label>
               <textarea id="message" name="message"
                  class="w-full bg-white rounded border border-gray-300 focus:border-onbutton focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
            </div>
            <button type="submit"
               class="text-white bg-onbutton border-0 py-2 px-6 focus:outline-none hover:bg-buttonhover rounded text-lg">Отправить</button>
            <p class="text-xs text-gray-500 mt-3">Нажимая кнопку отправить вы соглашаетесь с правилами данного сайта</p>
         </form>
      </div>
   </div>
</section>
<?php include 'includes/footer.php'; ?>