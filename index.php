<!DOCTYPE html>
<html lang="ru-RU">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Изготовление бирок для одежды на различных тканях и силиконе. Картонные бирки для одежды. Высокое качество и индивидуальный подход. Закажите бирки на birkityt.ru.">
    <meta name="keywords" content="бирки для одежды, тканевые бирки, силиконовые бирки, картонные бирки, изготовление бирок, бирки на заказ, birkityt.ru">
    <meta name="author" content="Birkityt">
    <meta name="robots" content="index, follow">
    <title>БИРКИТУТ - Изготовление бирок для одежды на заказ</title>
    <link rel="canonical" href="https://birkityt.ru">
    <meta property="og:title" content="Birkityt - Изготовление бирок для одежды на заказ">
    <meta property="og:description" content="Изготовление бирок для одежды на различных тканях и силиконе. Картонные бирки для одежды. Высокое качество и индивидуальный подход. Закажите бирки на birkityt.ru.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://birkityt.ru">
    <meta property="og:image" content="https://birkityt.ru/path/to/your/image.jpg">
    <link rel="stylesheet" href="public/css/style.css">
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.13.1/dist/cdn.min.js"></script>
    <script src="public/js/main.js"></script>
    <!-- Yandex.Metrika counter -->
<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(99360339, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        trackHash:true
   });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/99360339" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
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
    // проверяем, что ответ есть
    if (!response.ok) throw (`Ошибка при обращении к серверу: ${response.status}`);
    // проверяем, что ответ действительно JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw ('Ошибка обработки. Ответ не JSON');
    }
    // обрабатываем запрос
    const json = await response.json();
    if (json.result === "success") {
    	// в случае успеха
    	alert(json.info);
    } else { 
    	// в случае ошибки
    	console.log(json);
    	throw (json.info);
    }
  } catch (error) { // обработка ошибки
    alert(error);
  }
}
</script>
</head>
<body class="bg-mainColor"> 
    <nav class="relative px-4 py-4 flex justify-between items-center z-50 ">
      <a class="text-3xl font-bold leading-none" href="/index.php">
        <object class="h-16 w-auto" type="image/svg+xml" data="public/images/logo.svg">
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
      <ul class="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
        <li><a class="text-sm text-gray-400 hover:text-gray-700 font-bold" href="/index.php">Главная</a></li>
        <li class="text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-4 h-4 current-fill" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </li>
        <li><a class="text-sm text-gray-400 hover:text-gray-700" href="/delivery.php">Доставка</a></li>
        <li class="text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-4 h-4 current-fill" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </li>
        <li><a class="text-sm text-gray-400 hover:text-gray-500" href="/price.php">Стоимость</a></li>
        <li class="text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-4 h-4 current-fill" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </li>
        <li><a class="text-sm text-gray-400 hover:text-gray-500" href="/works.php">Наши работы</a></li>
        <li class="text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-4 h-4 current-fill" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </li>
        <li><a class="text-sm text-gray-400 hover:text-gray-500" href="/materials.php">Материалы</a></li>
      </ul>
      <a class="hidden lg:inline-block py-2 px-6 bg-onbutton hover:bg-buttonhover text-sm text-white font-bold rounded-xl transition duration-200" href="https://vk.com/birkityt">Мы в ВК</a>
    </nav>
    <div class="navbar-menu relative z-50 hidden">
      <div class="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
      <nav class="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
        <div class="flex items-center mb-8">
          <a class="mr-auto text-3xl font-bold leading-none" href="/index.php">
            <object class="h-16 w-auto" type="image/svg+xml" data="public/images/logo.svg">
              Ваш браузер не поддерживает данные изображения
            </object>
          </a>
          </a>
          <button class="navbar-close">
            <svg class="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div>
          <ul>
            <li class="mb-1">
              <a class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" href="/index.php">Главная</a>
            </li>
            <li class="mb-1">
              <a class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" href="/delivery.php">Доставка</a>
            </li>
            <li class="mb-1">
              <a class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" href="/price.php">Стоимость</a>
            </li>
            <li class="mb-1">
              <a class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" href="/works.php">Наши работы</a>
            </li>
            <li class="mb-1">
              <a class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" href="/materials.php">Материалы</a>
            </li>
          </ul>
        </div>
        <div class="mt-auto">
          <div class="pt-6">
            <a class="lg:inline-block py-2 px-6 bg-onbutton hover:bg-buttonhover text-sm text-white font-bold rounded-xl transition duration-200" href="https://vk.com/birkityt">Мы в ВК</a>
          </div>
          <p class="my-4 text-xs text-center text-gray-400">
            <span>Copyright ©birkityt.ru 2025</span>
          </p>
        </div>
      </nav>
    </div>
  

  
    <div class="relative isolate px-4 pt-14 lg:px-8">
      <div class="absolute inset-x-0 -top-50 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#b1dda0] to-[#bfe779] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
      </div>
      <div class="mx-auto max-w-2xl py-16 sm:py-48 lg:py-56">
        <div class="text-center">
          <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">Хочешь улучшить <br> свой бренд?</h1>
          <p class="mt-6 text-lg leading-8 text-gray-600">Наши профессиональные дизайнеры помогут вам с подготовкой макета, а мастера выполнят печать на качественной ткани, чтобы ваша продукция выглядела стильно и привлекательно.</p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <a href="/price.php" class="rounded-md bg-onbutton px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-buttonhover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Стоимость</a>
            <a href="/works.php" class="text-sm font-semibold leading-6 text-gray-900">Наши работы <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
      <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#7991a8] to-[#7fa1db] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
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
            Почему именно <u class="text-primary dark:text-primary-400">BIRKITYT</u>?
          </h2>
          <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 ">
            <div class="transition ease-in-out delay-150 max-w-sm rounded-md overflow-hidden sm:shadow-sm shadow-xl hover:shadow-xl cursor-pointer card" >
              <div class="px-6 py-4">
                <object class="h-10 w-10 mx-auto my-4" type="image/svg+xml" data="public/images/icons/clock.svg">
                  <img src="public/images/icons/clock.svg" alt="Быстро">
                </object>
                <hr>
                <p class=" text-base">
                  Мы гарантируем быструю обработку заказа, 
                и в большинстве случаев мы можем выполнить его всего за два дня!
                </p>
              </div>
            </div>
            <div class=" transition ease-in-out delay-150 max-w-sm rounded-md overflow-hidden sm:shadow-sm shadow-xl hover:shadow-xl cursor-pointer card">
              <div class="px-6 py-4 ">
                <object class="h-10 w-10 mx-auto my-4" type="image/svg+xml" data="public/images/icons/design.svg">
                  <img src="public/images/icons/design.svg" alt="Быстро">
                </object>
                <hr>
                <p class=" text-base">
                  Наши профессиональные дизайнеры также помогут вам с подготовкой макета, 
                чтобы ваша продукция выглядела стильно и привлекательно. 
                </p>
              </div>
            </div>
            <div class="transition ease-in-out delay-150 max-w-sm rounded-md overflow-hidden sm:shadow-sm shadow-xl hover:shadow-xl cursor-pointer card">
              <div class="px-6 py-4 ">
                <object class="h-10 w-10 mx-auto my-4" type="image/svg+xml" data="public/images/icons/track.svg">
                  <img class="stroke-2" src="public/images/icons/track.svg" alt="Быстро">
                </object>
                <hr>
                <p class=" text-base">
                  Мы предлагаем доставку по всей России и миру, 
                чтобы вы могли получить наши качественные изделия в любой точке планеты.
                </p>
              </div>
            </div>
          </div>
        </div>

        

<section
class="overflow-hidden px-4 pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]"
>
<div class="container mx-auto">
   <div class="flex flex-wrap items-center justify-between -mx-4">
      <div class="w-full px-4 lg:w-6/12">
         <div class="flex items-center -mx-3 sm:-mx-4">
            <div class="w-full px-3 sm:px-4 xl:w-1/2">
               <div class="py-3 sm:py-4">
                  <img
                     src="public/images/banners/0iCWg4QBUkE.jpg"
                     alt=""
                     class="w-full rounded-2xl"
                     />
               </div>
               <div class="py-3 sm:py-4">
                  <img
                     src="public/images/banners/UPqlF9J6IHo.jpg"
                     alt=""
                     class="w-full rounded-2xl"
                     />
               </div>
            </div>
            <div class="w-full px-3 sm:px-4 xl:w-1/2">
               <div class="relative z-10 my-4">
                  <img
                     src="public/images/banners/jtouETZBAo0.jpg"
                     alt=""
                     class="w-full rounded-2xl"
                     />
                  <span class="absolute -right-7 -bottom-7 z-[-1]">
                     <svg
                        width="134"
                        height="106"
                        viewBox="0 0 134 106"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <circle
                           cx="1.66667"
                           cy="104"
                           r="1.66667"
                           transform="rotate(-90 1.66667 104)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="16.3333"
                           cy="104"
                           r="1.66667"
                           transform="rotate(-90 16.3333 104)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="31"
                           cy="104"
                           r="1.66667"
                           transform="rotate(-90 31 104)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="45.6667"
                           cy="104"
                           r="1.66667"
                           transform="rotate(-90 45.6667 104)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="60.3334"
                           cy="104"
                           r="1.66667"
                           transform="rotate(-90 60.3334 104)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="88.6667"
                           cy="104"
                           r="1.66667"
                           transform="rotate(-90 88.6667 104)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="117.667"
                           cy="104"
                           r="1.66667"
                           transform="rotate(-90 117.667 104)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="74.6667"
                           cy="104"
                           r="1.66667"
                           transform="rotate(-90 74.6667 104)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="103"
                           cy="104"
                           r="1.66667"
                           transform="rotate(-90 103 104)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="132"
                           cy="104"
                           r="1.66667"
                           transform="rotate(-90 132 104)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="1.66667"
                           cy="89.3333"
                           r="1.66667"
                           transform="rotate(-90 1.66667 89.3333)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="16.3333"
                           cy="89.3333"
                           r="1.66667"
                           transform="rotate(-90 16.3333 89.3333)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="31"
                           cy="89.3333"
                           r="1.66667"
                           transform="rotate(-90 31 89.3333)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="45.6667"
                           cy="89.3333"
                           r="1.66667"
                           transform="rotate(-90 45.6667 89.3333)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="60.3333"
                           cy="89.3338"
                           r="1.66667"
                           transform="rotate(-90 60.3333 89.3338)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="88.6667"
                           cy="89.3338"
                           r="1.66667"
                           transform="rotate(-90 88.6667 89.3338)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="117.667"
                           cy="89.3338"
                           r="1.66667"
                           transform="rotate(-90 117.667 89.3338)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="74.6667"
                           cy="89.3338"
                           r="1.66667"
                           transform="rotate(-90 74.6667 89.3338)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="103"
                           cy="89.3338"
                           r="1.66667"
                           transform="rotate(-90 103 89.3338)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="132"
                           cy="89.3338"
                           r="1.66667"
                           transform="rotate(-90 132 89.3338)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="1.66667"
                           cy="74.6673"
                           r="1.66667"
                           transform="rotate(-90 1.66667 74.6673)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="1.66667"
                           cy="31.0003"
                           r="1.66667"
                           transform="rotate(-90 1.66667 31.0003)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="16.3333"
                           cy="74.6668"
                           r="1.66667"
                           transform="rotate(-90 16.3333 74.6668)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="16.3333"
                           cy="31.0003"
                           r="1.66667"
                           transform="rotate(-90 16.3333 31.0003)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="31"
                           cy="74.6668"
                           r="1.66667"
                           transform="rotate(-90 31 74.6668)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="31"
                           cy="31.0003"
                           r="1.66667"
                           transform="rotate(-90 31 31.0003)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="45.6667"
                           cy="74.6668"
                           r="1.66667"
                           transform="rotate(-90 45.6667 74.6668)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="45.6667"
                           cy="31.0003"
                           r="1.66667"
                           transform="rotate(-90 45.6667 31.0003)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="60.3333"
                           cy="74.6668"
                           r="1.66667"
                           transform="rotate(-90 60.3333 74.6668)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="60.3333"
                           cy="30.9998"
                           r="1.66667"
                           transform="rotate(-90 60.3333 30.9998)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="88.6667"
                           cy="74.6668"
                           r="1.66667"
                           transform="rotate(-90 88.6667 74.6668)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="88.6667"
                           cy="30.9998"
                           r="1.66667"
                           transform="rotate(-90 88.6667 30.9998)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="117.667"
                           cy="74.6668"
                           r="1.66667"
                           transform="rotate(-90 117.667 74.6668)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="117.667"
                           cy="30.9998"
                           r="1.66667"
                           transform="rotate(-90 117.667 30.9998)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="74.6667"
                           cy="74.6668"
                           r="1.66667"
                           transform="rotate(-90 74.6667 74.6668)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="74.6667"
                           cy="30.9998"
                           r="1.66667"
                           transform="rotate(-90 74.6667 30.9998)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="103"
                           cy="74.6668"
                           r="1.66667"
                           transform="rotate(-90 103 74.6668)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="103"
                           cy="30.9998"
                           r="1.66667"
                           transform="rotate(-90 103 30.9998)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="132"
                           cy="74.6668"
                           r="1.66667"
                           transform="rotate(-90 132 74.6668)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="132"
                           cy="30.9998"
                           r="1.66667"
                           transform="rotate(-90 132 30.9998)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="1.66667"
                           cy="60.0003"
                           r="1.66667"
                           transform="rotate(-90 1.66667 60.0003)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="1.66667"
                           cy="16.3333"
                           r="1.66667"
                           transform="rotate(-90 1.66667 16.3333)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="16.3333"
                           cy="60.0003"
                           r="1.66667"
                           transform="rotate(-90 16.3333 60.0003)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="16.3333"
                           cy="16.3333"
                           r="1.66667"
                           transform="rotate(-90 16.3333 16.3333)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="31"
                           cy="60.0003"
                           r="1.66667"
                           transform="rotate(-90 31 60.0003)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="31"
                           cy="16.3333"
                           r="1.66667"
                           transform="rotate(-90 31 16.3333)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="45.6667"
                           cy="60.0003"
                           r="1.66667"
                           transform="rotate(-90 45.6667 60.0003)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="45.6667"
                           cy="16.3333"
                           r="1.66667"
                           transform="rotate(-90 45.6667 16.3333)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="60.3333"
                           cy="60.0003"
                           r="1.66667"
                           transform="rotate(-90 60.3333 60.0003)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="60.3333"
                           cy="16.3333"
                           r="1.66667"
                           transform="rotate(-90 60.3333 16.3333)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="88.6667"
                           cy="60.0003"
                           r="1.66667"
                           transform="rotate(-90 88.6667 60.0003)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="88.6667"
                           cy="16.3333"
                           r="1.66667"
                           transform="rotate(-90 88.6667 16.3333)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="117.667"
                           cy="60.0003"
                           r="1.66667"
                           transform="rotate(-90 117.667 60.0003)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="117.667"
                           cy="16.3333"
                           r="1.66667"
                           transform="rotate(-90 117.667 16.3333)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="74.6667"
                           cy="60.0003"
                           r="1.66667"
                           transform="rotate(-90 74.6667 60.0003)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="74.6667"
                           cy="16.3333"
                           r="1.66667"
                           transform="rotate(-90 74.6667 16.3333)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="103"
                           cy="60.0003"
                           r="1.66667"
                           transform="rotate(-90 103 60.0003)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="103"
                           cy="16.3333"
                           r="1.66667"
                           transform="rotate(-90 103 16.3333)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="132"
                           cy="60.0003"
                           r="1.66667"
                           transform="rotate(-90 132 60.0003)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="132"
                           cy="16.3333"
                           r="1.66667"
                           transform="rotate(-90 132 16.3333)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="1.66667"
                           cy="45.3333"
                           r="1.66667"
                           transform="rotate(-90 1.66667 45.3333)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="1.66667"
                           cy="1.66683"
                           r="1.66667"
                           transform="rotate(-90 1.66667 1.66683)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="16.3333"
                           cy="45.3333"
                           r="1.66667"
                           transform="rotate(-90 16.3333 45.3333)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="16.3333"
                           cy="1.66683"
                           r="1.66667"
                           transform="rotate(-90 16.3333 1.66683)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="31"
                           cy="45.3333"
                           r="1.66667"
                           transform="rotate(-90 31 45.3333)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="31"
                           cy="1.66683"
                           r="1.66667"
                           transform="rotate(-90 31 1.66683)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="45.6667"
                           cy="45.3333"
                           r="1.66667"
                           transform="rotate(-90 45.6667 45.3333)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="45.6667"
                           cy="1.66683"
                           r="1.66667"
                           transform="rotate(-90 45.6667 1.66683)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="60.3333"
                           cy="45.3338"
                           r="1.66667"
                           transform="rotate(-90 60.3333 45.3338)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="60.3333"
                           cy="1.66683"
                           r="1.66667"
                           transform="rotate(-90 60.3333 1.66683)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="88.6667"
                           cy="45.3338"
                           r="1.66667"
                           transform="rotate(-90 88.6667 45.3338)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="88.6667"
                           cy="1.66683"
                           r="1.66667"
                           transform="rotate(-90 88.6667 1.66683)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="117.667"
                           cy="45.3338"
                           r="1.66667"
                           transform="rotate(-90 117.667 45.3338)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="117.667"
                           cy="1.66683"
                           r="1.66667"
                           transform="rotate(-90 117.667 1.66683)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="74.6667"
                           cy="45.3338"
                           r="1.66667"
                           transform="rotate(-90 74.6667 45.3338)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="74.6667"
                           cy="1.66683"
                           r="1.66667"
                           transform="rotate(-90 74.6667 1.66683)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="103"
                           cy="45.3338"
                           r="1.66667"
                           transform="rotate(-90 103 45.3338)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="103"
                           cy="1.66683"
                           r="1.66667"
                           transform="rotate(-90 103 1.66683)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="132"
                           cy="45.3338"
                           r="1.66667"
                           transform="rotate(-90 132 45.3338)"
                           fill="#A1B5D8"
                           />
                        <circle
                           cx="132"
                           cy="1.66683"
                           r="1.66667"
                           transform="rotate(-90 132 1.66683)"
                           fill="#A1B5D8"
                           />
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
            <h2
               class="mb-5 text-3xl font-bold text-dark  sm:text-[40px]/[48px]"
               >
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
            <a
               href="javascript:void(0)"
               class="inline-flex items-center justify-center py-3 text-base font-medium text-center text-white border border-transparent rounded-md px-7 bg-primary hover:bg-opacity-90"
               >
            Get Started
            </a>
         </div>
      </div>
   </div>
</div>
</section>
<!-- ====== About Section End -->
<!-- ====== FAQ Section Start -->
<section
   x-data="
   {
   openFaq1: false, 
   openFaq2: false, 
   openFaq3: false, 
   openFaq4: false, 
   openFaq5: false, 
   openFaq6: false
   }
   "
   class="relative z-20 overflow-hidden px-4 pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]"
   >
   <div class="container mx-auto">
      <div class="flex flex-wrap -mx-4">
         <div class="w-full px-4">
            <div class="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">
               <span class="block mb-2 text-lg font-semibold text-primary">
               FAQ
               </span>
               <h2
                  class="text-dark  mb-4 text-3xl font-extrabold sm:text-[40px]/[48px]"
                  >
                  Есть вопрос?<br> Посмотри ответ здесь!
               </h2>
               <p class="text-base text-body-color dark:text-dark-6">
                  Часто задаваемые вопросы, на которые уже есть ответы!
               </p>
            </div>
         </div>
      </div>
      <div class="flex flex-wrap -mx-4">
         <div class="w-full px-4 lg:w-1/2">
            <div
               class="w-full p-4 mb-8 bg-white rounded-lg shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] dark:shadow-[0px_20px_95px_0px_rgba(0,0,0,0.30)] dark:bg-dark-2 sm:p-8 lg:px-6 xl:px-8"
               >
               <button
                  class="flex w-full text-left faq-btn"
                  @click="openFaq1 = !openFaq1"
                  >
                  <div
                     class="bg-primary/5 dark:bg-white/5 text-primary mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg"
                     >
                     <svg
                        :class="openFaq1 && 'rotate-180'"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                           d="M11 15.675C10.7937 15.675 10.6219 15.6062 10.45 15.4687L2.54374 7.69998C2.23436 7.3906 2.23436 6.90935 2.54374 6.59998C2.85311 6.2906 3.33436 6.2906 3.64374 6.59998L11 13.7844L18.3562 6.53123C18.6656 6.22185 19.1469 6.22185 19.4562 6.53123C19.7656 6.8406 19.7656 7.32185 19.4562 7.63123L11.55 15.4C11.3781 15.5719 11.2062 15.675 11 15.675Z"
                           fill="currentColor"
                           />
                     </svg>
                  </div>
                  <div class="w-full">
                     <h4
                        class="mt-1 text-lg font-semibold text-dark "
                        >
                        Какой у вас режим работы?
                     </h4>
                  </div>
               </button>
               <div x-show="openFaq1" class="faq-content pl-[62px]">
                  <p
                     class="py-3 text-base leading-relaxed text-body-color dark:text-dark-6"
                     >
                     С 8:00 до 16:00 по Московскому времени<br> C 10:00 до 18:00 по Пермскому времени <br>ПН-ПТ - Рабочие дни<br> СБ-ВС - Выходные дни
                  </p>
               </div>
            </div>
            <div
               class="w-full p-4 mb-8 bg-white rounded-lg shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] dark:shadow-[0px_20px_95px_0px_rgba(0,0,0,0.30)] dark:bg-dark-2 sm:p-8 lg:px-6 xl:px-8"
               >
               <button
                  class="flex w-full text-left faq-btn"
                  @click="openFaq2 = !openFaq2"
                  >
                  <div
                     class="bg-primary/5 dark:bg-white/5 text-primary mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg"
                     >
                     <svg
                        :class="openFaq2 && 'rotate-180'"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                           d="M11 15.675C10.7937 15.675 10.6219 15.6062 10.45 15.4687L2.54374 7.69998C2.23436 7.3906 2.23436 6.90935 2.54374 6.59998C2.85311 6.2906 3.33436 6.2906 3.64374 6.59998L11 13.7844L18.3562 6.53123C18.6656 6.22185 19.1469 6.22185 19.4562 6.53123C19.7656 6.8406 19.7656 7.32185 19.4562 7.63123L11.55 15.4C11.3781 15.5719 11.2062 15.675 11 15.675Z"
                           fill="currentColor"
                           />
                     </svg>
                  </div>
                  <div class="w-full">
                     <h4
                        class="mt-1 text-lg font-semibold text-dark "
                        >
                        Нужна ли предоплата и в каком размере?
                     </h4>
                  </div>
               </button>
               <div x-show="openFaq2" class="faq-content pl-[62px]">
                  <p
                     class="py-3 text-base leading-relaxed text-body-color dark:text-dark-6"
                     >
                     Да, любая работа начинается с внесения полной предоплаты и утверждения макета
                  </p>
               </div>
            </div>
            <div
               class="w-full p-4 mb-8 bg-white rounded-lg shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] dark:shadow-[0px_20px_95px_0px_rgba(0,0,0,0.30)] dark:bg-dark-2 sm:p-8 lg:px-6 xl:px-8"
               >
               <button
                  class="flex w-full text-left faq-btn"
                  @click="openFaq3 = !openFaq3"
                  >
                  <div
                     class="bg-primary/5 dark:bg-white/5 text-primary mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg"
                     >
                     <svg
                        :class="openFaq3 && 'rotate-180'"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                           d="M11 15.675C10.7937 15.675 10.6219 15.6062 10.45 15.4687L2.54374 7.69998C2.23436 7.3906 2.23436 6.90935 2.54374 6.59998C2.85311 6.2906 3.33436 6.2906 3.64374 6.59998L11 13.7844L18.3562 6.53123C18.6656 6.22185 19.1469 6.22185 19.4562 6.53123C19.7656 6.8406 19.7656 7.32185 19.4562 7.63123L11.55 15.4C11.3781 15.5719 11.2062 15.675 11 15.675Z"
                           fill="currentColor"
                           />
                     </svg>
                  </div>
                  <div class="w-full">
                     <h4
                        class="mt-1 text-lg font-semibold text-dark "
                        >
                        Существует ли минимальная стоимость заказа?
                     </h4>
                  </div>
               </button>
               <div x-show="openFaq3" class="faq-content pl-[62px]">
                  <p
                     class="py-3 text-base leading-relaxed text-body-color dark:text-dark-6"
                     >
                     Да, минимальная стоимость заказа составляет 1000 рублей
                  </p>
               </div>
            </div>
         </div>
         <div class="w-full px-4 lg:w-1/2">
            <div
               class="w-full p-4 mb-8 bg-white rounded-lg shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] dark:shadow-[0px_20px_95px_0px_rgba(0,0,0,0.30)] dark:bg-dark-2 sm:p-8 lg:px-6 xl:px-8"
               >
               <button
                  class="flex w-full text-left faq-btn"
                  @click="openFaq4 = !openFaq4"
                  >
                  <div
                     class="bg-primary/5 dark:bg-white/5 text-primary mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg"
                     >
                     <svg
                        :class="openFaq4 && 'rotate-180'"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                           d="M11 15.675C10.7937 15.675 10.6219 15.6062 10.45 15.4687L2.54374 7.69998C2.23436 7.3906 2.23436 6.90935 2.54374 6.59998C2.85311 6.2906 3.33436 6.2906 3.64374 6.59998L11 13.7844L18.3562 6.53123C18.6656 6.22185 19.1469 6.22185 19.4562 6.53123C19.7656 6.8406 19.7656 7.32185 19.4562 7.63123L11.55 15.4C11.3781 15.5719 11.2062 15.675 11 15.675Z"
                           fill="currentColor"
                           />
                     </svg>
                  </div>
                  <div class="w-full">
                     <h4
                        class="mt-1 text-lg font-semibold text-dark "
                        >
                        Выдерживают ли бирки стирку и химчистку?
                     </h4>
                  </div>
               </button>
               <div x-show="openFaq4" class="faq-content pl-[62px]">
                  <p
                     class="py-3 text-base leading-relaxed text-body-color dark:text-dark-6"
                     >
                     Информацию на этикетки наносят специальными красителями и по определенным технологиям, поэтому они выдерживают достаточное количество стирок
                  </p>
               </div>
            </div>
            <div
               class="w-full p-4 mb-8 bg-white rounded-lg shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] dark:shadow-[0px_20px_95px_0px_rgba(0,0,0,0.30)] dark:bg-dark-2 sm:p-8 lg:px-6 xl:px-8"
               >
               <button
                  class="flex w-full text-left faq-btn"
                  @click="openFaq5 = !openFaq5"
                  >
                  <div
                     class="bg-primary/5 dark:bg-white/5 text-primary mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg"
                     >
                     <svg
                        :class="openFaq5 && 'rotate-180'"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                           d="M11 15.675C10.7937 15.675 10.6219 15.6062 10.45 15.4687L2.54374 7.69998C2.23436 7.3906 2.23436 6.90935 2.54374 6.59998C2.85311 6.2906 3.33436 6.2906 3.64374 6.59998L11 13.7844L18.3562 6.53123C18.6656 6.22185 19.1469 6.22185 19.4562 6.53123C19.7656 6.8406 19.7656 7.32185 19.4562 7.63123L11.55 15.4C11.3781 15.5719 11.2062 15.675 11 15.675Z"
                           fill="currentColor"
                           />
                     </svg>
                  </div>
                  <div class="w-full">
                     <h4
                        class="mt-1 text-lg font-semibold text-dark"
                        >
                        Можно ли посмотреть пробник, до изготовления всего заказа?
                     </h4>
                  </div>
               </button>
               <div x-show="openFaq5" class="faq-content pl-[62px]">
                  <p
                     class="py-3 text-base leading-relaxed text-body-color dark:text-dark-6"
                     >
                     Да, после полной предоплаты и до того как мы начнем печатать всю партию, мы можем изготовить пробную бирку и отправить её фото вам
                  </p>
               </div>
            </div>
            <div
               class="w-full p-4 mb-8 bg-white rounded-lg shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] dark:shadow-[0px_20px_95px_0px_rgba(0,0,0,0.30)] dark:bg-dark-2 sm:p-8 lg:px-6 xl:px-8"
               >
               <button
                  class="flex w-full text-left faq-btn"
                  @click="openFaq6 = !openFaq6"
                  >
                  <div
                     class="bg-primary/5 dark:bg-white/5 text-primary mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg"
                     >
                     <svg
                        :class="openFaq6 && 'rotate-180'"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                           d="M11 15.675C10.7937 15.675 10.6219 15.6062 10.45 15.4687L2.54374 7.69998C2.23436 7.3906 2.23436 6.90935 2.54374 6.59998C2.85311 6.2906 3.33436 6.2906 3.64374 6.59998L11 13.7844L18.3562 6.53123C18.6656 6.22185 19.1469 6.22185 19.4562 6.53123C19.7656 6.8406 19.7656 7.32185 19.4562 7.63123L11.55 15.4C11.3781 15.5719 11.2062 15.675 11 15.675Z"
                           fill="currentColor"
                           />
                     </svg>
                  </div>
                  <div class="w-full">
                     <h4
                        class="mt-1 text-lg font-semibold text-dark "
                        >
                        Сколько времени занимает изготовление заказа?
                     </h4>
                  </div>
               </button>
               <div x-show="openFaq6" class="faq-content pl-[62px]">
                  <p
                     class="py-3 text-base leading-relaxed text-body-color dark:text-dark-6"
                     >
                     Изготовление заказа занимает 2-3 рабочих дня после оплаты, не считая дня оплаты
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
          <div class="lg:w-2/3 md:w-1/2 bg-white rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
            <iframe width="100%" height="100%" class="absolute inset-0" frameborder="0" title="map" marginheight="0" marginwidth="0" scrolling="no" src="https://yandex.ru/map-widget/v1/?um=constructor%3A5a9e66ca8e53422be682486f68b65a31f288f536be5e5ccf37730aab74481305&amp;source=constructor" style="filter: grayscale(1) contrast(1.2) opacity(0.4);"></iframe>
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
            <p class="leading-relaxed mb-5 text-textColor">Мы обязательно проконсультируем по интересующим вас вопросам! </p>
            <div class="relative mb-4">
              <label for="name" class="leading-7 text-sm text-gray-600">Имя</label>
              <input type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300 focus:border-onbutton focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            </div>
            <div class="relative mb-4">
                <label for="tel" class="leading-7 text-sm text-gray-600">Номер телефона</label>
                <input type="tel" id="tel" name="phone" class="w-full bg-white rounded border border-gray-300 focus:border-onbutton focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
              </div>
            <div class="relative mb-4">
              <label for="email" class="leading-7 text-sm text-gray-600">Почта</label>
              <input type="email" id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-onbutton focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            </div>
            <div class="relative mb-4">
              <label for="message" class="leading-7 text-sm text-gray-600">Сообщение</label>
              <textarea id="message" name="message" class="w-full bg-white rounded border border-gray-300 focus:border-onbutton focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
            </div>
            <button type="submit" class="text-white bg-onbutton border-0 py-2 px-6 focus:outline-none hover:bg-buttonhover rounded text-lg">Отправить</button>
            <p class="text-xs text-gray-500 mt-3">Нажимая кнопку отправить вы соглашаетесь с правилами данного сайта</p>
            </form>
          </div>
        </div>
      </section>
      <footer class="text-gray-600 body-font">
        <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 birkityt.ru —
            <a href="#" class="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">Бирки для твоего бренда</a>
          </p>
          <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a href="https://t.me/Birkityt" class="ml-3 text-gray-500">
               <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
                 <path fill="#29b6f6" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"></path><path fill="#fff" d="M33.95,15l-3.746,19.126c0,0-0.161,0.874-1.245,0.874c-0.576,0-0.873-0.274-0.873-0.274l-8.114-6.733 l-3.97-2.001l-5.095-1.355c0,0-0.907-0.262-0.907-1.012c0-0.625,0.933-0.923,0.933-0.923l21.316-8.468 c-0.001-0.001,0.651-0.235,1.126-0.234C33.667,14,34,14.125,34,14.5C34,14.75,33.95,15,33.95,15z"></path><path fill="#b0bec5" d="M23,30.505l-3.426,3.374c0,0-0.149,0.115-0.348,0.12c-0.069,0.002-0.143-0.009-0.219-0.043 l0.964-5.965L23,30.505z"></path><path fill="#cfd8dc" d="M29.897,18.196c-0.169-0.22-0.481-0.26-0.701-0.093L16,26c0,0,2.106,5.892,2.427,6.912 c0.322,1.021,0.58,1.045,0.58,1.045l0.964-5.965l9.832-9.096C30.023,18.729,30.064,18.416,29.897,18.196z"></path>
                 </svg>
             </a>
             <a href="https://vk.com/birkityt" class="ml-3 text-gray-500">
               <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
                 <path fill="#1976d2" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"></path><path fill="#fff" d="M35.937,18.041c0.046-0.151,0.068-0.291,0.062-0.416C35.984,17.263,35.735,17,35.149,17h-2.618 c-0.661,0-0.966,0.4-1.144,0.801c0,0-1.632,3.359-3.513,5.574c-0.61,0.641-0.92,0.625-1.25,0.625C26.447,24,26,23.786,26,23.199 v-5.185C26,17.32,25.827,17,25.268,17h-4.649C20.212,17,20,17.32,20,17.641c0,0.667,0.898,0.827,1,2.696v3.623 C21,24.84,20.847,25,20.517,25c-0.89,0-2.642-3-3.815-6.932C16.448,17.294,16.194,17,15.533,17h-2.643 C12.127,17,12,17.374,12,17.774c0,0.721,0.6,4.619,3.875,9.101C18.25,30.125,21.379,32,24.149,32c1.678,0,1.85-0.427,1.85-1.094 v-2.972C26,27.133,26.183,27,26.717,27c0.381,0,1.158,0.25,2.658,2c1.73,2.018,2.044,3,3.036,3h2.618 c0.608,0,0.957-0.255,0.971-0.75c0.003-0.126-0.015-0.267-0.056-0.424c-0.194-0.576-1.084-1.984-2.194-3.326 c-0.615-0.743-1.222-1.479-1.501-1.879C32.062,25.36,31.991,25.176,32,25c0.009-0.185,0.105-0.361,0.249-0.607 C32.223,24.393,35.607,19.642,35.937,18.041z"></path>
                 </svg>
             </a>
             <a href="https://api.whatsapp.com/send?phone=79526452271" class="ml-3 text-gray-500">
               <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
   <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"></path>
   </svg>
             </a>
          </span>
        </div>
      </footer>
      
</body>
</html>
