document.addEventListener("DOMContentLoaded", () => {

  const $form = document.querySelector('#priceCalculator');
  const $inputs = $form.querySelectorAll('input, select');
  const $total = $form.querySelector('input[name="totalCost"]');

  const products = {
    "Тканные бирки": ["Сатин", "Премиум сатин", "Хлопок", "Имитация хлопка", "Киперная лента", "Нейлон", "Термо-нейлон", "Упаковочная лента"],
    "Силиконовые бирки": ["Силикон прозрачный", "Силикон белый", "Силикон Черный"],
    "Навесные бирки": ["Бирки двусторонние", "Бирки односторонние", "Бирки перламутровые"],
    "Наклейки": ["Матовые наклейки", "Глянцевые наклейки", "Виниловые наклейки"]
  };

  const prices = {
    "Сатин": { "15мм": 10, "20мм": 12, "30мм": 14, "40мм": 16 },
    "Премиум сатин": { "15мм": 10, "20мм": 12, "30мм": 14, "40мм": 15 },
    "Хлопок": { "15мм": 22, "20мм": 22, "30мм": 22, "40мм": 22 },
    "Имитация хлопка": { "15мм": 13, "20мм": 18, "30мм": 23, "40мм": 28 },
    "Киперная лента": { "15мм": 22, "20мм": 22, "30мм": 22, "40мм": 22 },
    "Нейлон": { "15мм": 6, "20мм": 6, "30мм": 6, "40мм": 6 },
    "Термо-нейлон": { "15мм": 15, "20мм": 15, "30мм": 15, "40мм": 15 },
    "Упаковочная лента": { "15мм": 40, "20мм": 40, "30мм": 40, "40мм": 40 },
    "Силикон прозрачный": { "15мм": 13, "20мм": 15, "30мм": 17, "40мм": 19 },
    "Силикон белый": { "15мм": 13, "20мм": 15, "30мм": 17, "40мм": 19},
    "Силикон Черный": { "15мм": 13, "20мм": 15, "30мм": 17, "40мм": 19 },
    "Бирки двусторонние": { "15мм": 15, "20мм": 15, "30мм": 15, "40мм": 15 },
    "Бирки односторонние": { "15мм": 13, "20мм": 13, "30мм": 13, "40мм": 13 },
    "Бирки перламутровые": { "15мм": 17, "20мм": 17, "30мм": 17, "40мм": 17 },
    "Матовые наклейки": { "15мм": 7, "20мм": 8, "30мм": 9, "40мм": 10 },
    "Глянцевые наклейки": { "15мм": 7, "20мм": 8, "30мм": 9, "40мм": 10 },
    "Виниловые наклейки": { "15мм": 10, "20мм": 10, "30мм": 10, "40мм": 10 }
  };

  const lengthPrices = {
    "5см": 1,
    "6см": 1,
    "7см": 1,
    "8см": 2
  };

  function calculateTotal() {
    const productOptions = document.getElementById('productOptions');
    const sizeOptions = document.getElementById('sizeOptions');
    const lengthOptions = document.getElementById('lengthOptions');
    const quantityInput = document.getElementById('quantity');
    const frayingCheckbox = document.getElementById('fraying');
    const totalCost = document.getElementById('totalCost');

    const selectedProduct = productOptions.querySelector('input[name="productOptions"]:checked')?.value;
    const selectedSize = sizeOptions.querySelector('input[name="sizeOptions"]:checked')?.value;
    const selectedLength = lengthOptions.querySelector('input[name="lengthOptions"]:checked')?.value;
    const quantity = parseInt(quantityInput.value);
    const isFraying = frayingCheckbox.checked;

    let total = 0;
    if (selectedProduct && selectedSize && selectedLength) {
      total += prices[selectedProduct][selectedSize];
      total += lengthPrices[selectedLength];
       if (isFraying) {
        total += (3);

      }
      total *= quantity;
    }

    totalCost.textContent = total;
    $total.value = total;
  }

  function updateSizes() {
    const productOptions = document.getElementById('productOptions');
    const sizeOptions = document.getElementById('sizeOptions');

    //const title = document.createElement('p');
    //title.setAttribute('for', 'sizeOptions');
    //title.setAttribute('style', 'width: 300px;');
    //title.appendChild(document.createTextNode('Размер:') );

    sizeOptions.innerHTML = '';
    //sizeOptions.appendChild();

    const selectedProduct = productOptions.querySelector('input[name="productOptions"]:checked').value;

    Object.keys(prices[selectedProduct]).forEach(size => {
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'sizeOptions';
      radio.value = size;
      radio.id = size;
      radio.onchange = calculateTotal;

      const label = document.createElement('label');
      label.htmlFor = size;
      label.appendChild(document.createTextNode(size));

      sizeOptions.appendChild(radio);
      sizeOptions.appendChild(label);
      //sizeOptions.appendChild(document.createElement('br'));
    });
  }


  document.querySelector('#productSelect')
    .addEventListener('change', (event) => {

      const selectedProduct = event.target.value;

      if (!selectedProduct) {
        return;
      }

      const productSelect = document.getElementById('productSelect');
      const productOptions = document.getElementById('productOptions');
      const sizeOptions = document.getElementById('sizeOptions');

      productOptions.innerHTML = '';
      sizeOptions.innerHTML = '';

      products[selectedProduct].forEach(product => {
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'productOptions';
        radio.value = product;
        radio.id = product;
        radio.onchange = updateSizes;

        const label = document.createElement('label');
        label.htmlFor = product;
        label.appendChild(document.createTextNode(product));

        productOptions.appendChild(radio);
        productOptions.appendChild(label);
        // productOptions.appendChild(document.createElement('br'));
      });
    });


  $form .addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    fetch('/send-calc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((res) => {
      if (res.redirected) {
        window.location.href = res.url;
      }
    })
    .catch((err) => {
      console.error(err);
    });
  });


  for (const input of $inputs) {
    input.addEventListener('input', calculateTotal);
  }

});
