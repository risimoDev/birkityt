const { check } = require("express-validator");

const squareInput = document.querySelector('#widthInput')
const squareRange = document.querySelector('#width')
const productType = document.getElementById("productType");
const materialContainer = document.getElementById("materialContainer");
const sizeContainer = document.getElementById("sizeContainer");
const widthInput = document.getElementById("width");
const osypanieInput = document.getElementById("osypanie");
const quantityInput = document.getElementById("quantity");
const totalPrice = document.getElementById("totalPrice");

const prices = {
  tkan: {
    'Сатин': { "15мм": 10, "20мм": 20, "30мм": 30, "40мм": 40 },
    'Сатин Премиум': { "15мм": 12, "20мм": 22, "30мм": 32, "40мм": 42 },
    'Хлопок': { "15мм": 15, "20мм": 25, "30мм": 35, "40мм": 45 },
    'Иммитация хлопка': { "15мм": 13, "20мм": 23, "30мм": 33, "40мм": 43 },
    'Киперная лента': { "15мм": 18, "20мм": 28, "30мм": 38, "40мм": 48 },
    'Нейлон': { "15мм": 11, "20мм": 21, "30мм": 31, "40мм": 41 },
    'Термонейлон': { "15мм": 14, "20мм": 24, "30мм": 34, "40мм": 44 },
    'Упаковочная лента': { "15мм": 9, "20мм": 19, "30мм": 29, "40мм": 39 },
  },
  silicon: {
    'Силикон прозрачный': { "15мм": 20, "20мм": 30, "30мм": 40, "40мм": 50 },
    'Силикон белый': { "15мм": 18, "20мм": 28, "30мм": 38, "40мм": 48 },
    'Силикон черный': { "15мм": 22, "20мм": 32, "30мм": 42, "40мм": 52 },
  },
  naves: {
    'Бирки двусторонние': { "15мм": 25, "20мм": 35, "30мм": 45, "40мм": 55 },
    'Бирки односторонние': { "15мм": 20, "20мм": 30, "30мм": 40, "40мм": 50 },
    'Бирки перламутровые': { "15мм": 30, "20мм": 40, "30мм": 50, "40мм": 60 },
  },
  sticker: {
    'Матовые наклейки': { "3x3см": 10, "4x4см": 20, "5x5см": 30, "6x6см": 40 },
    'Глянцевые наклейки': { "3x3см": 10, "4x4см": 20, "5x5см": 30, "6x6см": 40 },
    'Виниловые наклейки': { "5x5см": 12},
  },
};

productType.addEventListener("change", (e) => {
  const selectedProduct = e.target.value;
  materialContainer.innerHTML = "";
  sizeContainer.innerHTML = "";

  if (selectedProduct) {
    const materials = Object.keys(prices[selectedProduct]);
    materials.forEach((material) => {
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "material";
      radio.value = material;
      radio.id = material;
      materialContainer.appendChild(radio);

      const label = document.createElement("label");
      label.htmlFor = material;
      label.innerText = material;
      materialContainer.appendChild(label);
    });

    materialContainer.addEventListener("change", (e) => {
      sizeContainer.innerHTML = "";
      const selectedMaterial = e.target.value;
      const sizes = Object.keys(prices[selectedProduct][selectedMaterial]);
      sizes.forEach((size) => {
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "size";
        radio.value = size;
        radio.id = size;
        sizeContainer.appendChild(radio);

        const label = document.createElement("label");
        label.htmlFor = size;
        label.innerText = size;
        sizeContainer.appendChild(label);
      });
      
    });
  }
});


const calculatePrice = () => {
  const selectedProduct = productType.value;
  const selectedMaterial = materialContainer.querySelector(
    'input[name="material"]:checked'
  ).value;
  const selectedSize = sizeContainer.querySelector(
    'input[name="size"]:checked'
  ).value;
  const width = widthInput.value;
  const quantity = quantityInput.value;
  const osypanieInput =  osypanieInput.checked;
  const osypanieInputchecked =  osypanieInput.value;

  let basePrice = prices[selectedProduct][selectedMaterial][selectedSize];
  let additionalPrice = Math.floor((width - 50) / 35) * 50;
  let totalPrice = ((basePrice + additionalPrice) * quantity) * checkbox.checked;

  return totalPrice;
  
};

// Обработчик события изменения выбора материала
materialContainer.addEventListener("change", (e) => {
  calculateAndDisplayPrice();
});

// Обработчик события изменения выбора размера
sizeContainer.addEventListener("change", (e) => {
  calculateAndDisplayPrice();
});

// Обработчик события изменения значения ширины и количества
widthInput.addEventListener("input", (e) => {
  calculateAndDisplayPrice();
});

quantityInput.addEventListener("input", (e) => {
  calculateAndDisplayPrice();
});

// Функция расчета и отображения цены
const calculateAndDisplayPrice = () => {
  const totalPrice = calculatePrice(); // Рассчитываем общую цену

  // Получаем элемент для отображения результата
  const resultElement = document.getElementById("result");
  // Устанавливаем текстовое содержимое элемента с рассчитанной ценой
  resultElement.innerText = `Общая цена: ${totalPrice} рублей`;
};

