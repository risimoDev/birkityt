<?php include 'includes/header.php'; ?>
  

  
    <div class="relative isolate px-4 pt-14 lg:px-8">
      <div class="absolute inset-x-0 -top-50 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#b1dda0] to-[#bfe779] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
      </div>
      <div class="mx-auto w-[99%] sm:w-[50%] h-auto grid grid-cols-1 justify-center border-2 rounded-[44px] shadow-3xl bg-mainColor">
        <div class="grid grid-cols-1 px-4 pt-[4rem] w-[98%] sm:w-[80%] mx-auto my-5">
            <div class="container mx-auto">
                <form class="w-[220px] lg:w-[300px] mx-auto" id="priceCalculator" action="/send-calc" method="POST" class="mx-auto">
                    <div class="container">

                        <label class="containerF" for="productSelect">Выберите продукт:</label>
                        <select id="productSelect" name="productSelect">
                            <option value="">--Выберите продукт--</option>
                            <option value="Тканные бирки">Тканные бирки</option>
                            <option value="Силиконовые бирки">Силиконовые бирки</option>
                            <option value="Навесные бирки">Навесные бирки</option>
                            <option value="Наклейки">Наклейки</option>
                        </select>
                
                        <div class="containerF grid grid-cols-2" id="productOptions"></div>
                        <p>Ширина изделия:</p>
                        <div class="containerF grid grid-cols-2"id="sizeOptions"></div>
                
                        <label class="container">Длина изделия:</label>
                        <div class="containerF grid grid-cols-2" id="lengthOptions">
                            <input id="length5" type="radio" name="lengthOptions" value="5см" />
                            <label for="length5">5см</label>
                            <input id="length6" type="radio" name="lengthOptions" value="6см" />
                            <label for="length6">6см</label>
                            <input id="length7" type="radio" name="lengthOptions" value="7см" /> 
                            <label for="length7">7см</label>
                            <input id="length8" type="radio" name="lengthOptions" value="8см" /> 
                            <label for="length8">8см</label>
                        </div>
                
                        <label>
                          Обработка от осыпания <input type="checkbox" id="fraying" name="fraying" />
                        </label>
                
                        <label for="quantity">Количество:</label>
                        <input type="number" id="quantity" name="quantity" value="1" min="1" />
                
                        <div id="contactDetails">

                            <label for="name">ФИО:</label>
                            <input type="text" id="name" name="name" />

                            <label for="phone">Номер телефона:</label>
                            <input type="text" id="phone" name="phone" />

                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email" />

                            <label for="message">Сообщение:</label>
                            <textarea id="message" name="message"></textarea>
                
                            <label>Способ связи:</label>
                            <select id="contactMethod" name="contactMethod">
                                <option value="Telegram">Telegram</option>
                                <option value="Номер телефона">Номер телефона</option>
                                <option value="Email">Email</option>
                            </select>
                        </div>
                
                        <div>
                            <label>Примерная стоимость:</label>
                            <span id="totalCost">0</span> руб.
                        </div>

                        <input type="hidden" name="totalCost" value="0" />
                
                        <button type="submit">Отправить заказ</button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
      <script src="js/calc.js"></script>
<?php include 'includes/footer.php'; ?>
  
