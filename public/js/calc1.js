const products = {
  "Тканные бирки": ["Сатин", "Премиум сатин", "Хлопок", "Имитация хлопка", "Киперная лента", "Нейлон", "Термо-нейлон", "Упаковочная лента"],
  "Силиконовые бирки": ["Силикон прозрачный", "Силикон белый", "Силикон Черный"],
  "Навесные бирки": ["Бирки двусторонние", "Бирки односторонние", "Бирки перламутровые"],
  "Наклейки": ["Матовые наклейки", "Глянцевые наклейки", "Виниловые наклейки"]
};

const prices = {
  "Сатин": { "15мм": 10, "20мм": 15, "30мм": 20, "40мм": 25 },
  "Премиум сатин": { "15мм": 12, "20мм": 17, "30мм": 22, "40мм": 27 },
  "Хлопок": { "15мм": 11, "20мм": 16, "30мм": 21, "40мм": 26 },
  "Имитация хлопка": { "15мм": 13, "20мм": 18, "30мм": 23, "40мм": 28 },
  "Киперная лента": { "15мм": 14, "20мм": 19, "30мм": 24, "40мм": 29 },
  "Нейлон": { "15мм": 15, "20мм": 20, "30мм": 25, "40мм": 30 },
  "Термо-нейлон": { "15мм": 16, "20мм": 21, "30мм": 26, "40мм": 31 },
  "Упаковочная лента": { "15мм": 17, "20мм": 22, "30мм": 27, "40мм": 32 },
  "Силикон прозрачный": { "15мм": 20, "20мм": 25, "30мм": 30, "40мм": 35 },
  "Силикон белый": { "15мм": 21, "20мм": 26, "30мм": 31, "40мм": 36 },
  "Силикон Черный": { "15мм": 22, "20мм": 27, "30мм": 32, "40мм": 37 },
  "Бирки двусторонние": { "15мм": 25, "20мм": 30, "30мм": 35, "40мм": 40 },
  "Бирки односторонние": { "15мм": 24, "20мм": 29, "30мм": 34, "40мм": 39 },
  "Бирки перламутровые": { "15мм": 26, "20мм": 31, "30мм": 36, "40мм": 41 },
  "Матовые наклейки": { "15мм": 30, "20мм": 35, "30мм": 40, "40мм": 45 },
  "Глянцевые наклейки": { "15мм": 31, "20мм": 36, "30мм": 41, "40мм": 46 },
  "Виниловые наклейки": { "15мм": 32, "20мм": 37, "30мм": 42, "40мм": 47 }
};

const lengthPrices = {
  "5см": 5,
  "6см": 6,
  "7см": 7,
  "8см": 8
};

function updateProducts() {
  const productSelect = document.getElementById('productSelect');
  const productOptions = document.getElementById('productOptions');
  const sizeOptions = document.getElementById('sizeOptions');
  productOptions.innerHTML = '';
  sizeOptions.innerHTML = '';

  const selectedProduct = productSelect.value;
  if (selectedProduct) {
      products[selectedProduct].forEach(product => {
          const radio = document.createElement('input');
          radio.type = 'radio';
          radio.name = 'product';
          radio.value = product;
          radio.id = product;
          radio.onchange = updateSizes;

          const label = document.createElement('label');
          label.htmlFor = product;
          label.appendChild(document.createTextNode(product));

          productOptions.appendChild(radio);
          productOptions.appendChild(label);
          productOptions.appendChild(document.createElement('br'));
      });
  }
}

function updateSizes() {
  const productOptions = document.getElementById('productOptions');
  const sizeOptions = document.getElementById('sizeOptions');
  sizeOptions.innerHTML = '';

  const selectedProduct = productOptions.querySelector('input[name="product"]:checked').value;
  Object.keys(prices[selectedProduct]).forEach(size => {
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'size';
      radio.value = size;
      radio.id = size;
      radio.onchange = calculateTotal;

      const label = document.createElement('label');
      label.htmlFor = size;
      label.appendChild(document.createTextNode(size));

      sizeOptions.appendChild(radio);
      sizeOptions.appendChild(label);
      sizeOptions.appendChild(document.createElement('br'));
  });
}

function calculateTotal() {
  const productOptions = document.getElementById('productOptions');
  const sizeOptions = document.getElementById('sizeOptions');
  const lengthOptions = document.getElementById('lengthOptions');
  const quantityInput = document.getElementById('quantity');
  const frayingCheckbox = document.getElementById('fraying');
  const totalCost = document.getElementById('totalCost');

  const selectedProduct = productOptions.querySelector('input[name="product"]:checked')?.value;
  const selectedSize = sizeOptions.querySelector('input[name="size"]:checked')?.value;
  const selectedLength = lengthOptions.querySelector('input[name="length"]:checked')?.value;
  const quantity = parseInt(quantityInput.value);
  const isFraying = frayingCheckbox.checked;

  let total = 0;
  if (selectedProduct && selectedSize && selectedLength) {
      total += prices[selectedProduct][selectedSize];
      total += lengthPrices[selectedLength];
      if (isFraying) {
          total += 3 * quantity;
      }
      total *= quantity;
  }

  totalCost.textContent = total;
}


