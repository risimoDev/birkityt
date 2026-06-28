document.addEventListener("DOMContentLoaded", () => {

  const $form = document.querySelector('#priceCalculator');
  const $inputs = $form.querySelectorAll('input, select');
  const $total = $form.querySelector('input[name="totalCost"]');

  // Данные прайса подгружаем из JSON, чтобы совпадало с price.php
  let priceData = null;
  fetch('/data/prices.json')
    .then(r => r.json())
    .then(json => { priceData = json; })
    .catch(() => { priceData = {}; });

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
    if (selectedProduct && selectedSize && selectedLength && priceData) {
      // Определяем цену за штуку по диапазону количества
      const tiers = priceData[selectedProduct]?.[selectedSize];
      if (Array.isArray(tiers)) {
        let unit = 0;
        for (const [maxQty, price] of tiers) {
          if (quantity <= maxQty) { unit = price; break; }
          unit = price; // если больше всех диапазонов — берём последний
        }
        total += unit;
        total += lengthPrices[selectedLength] || 0;
        if (isFraying) { total += 3; }
        total *= quantity;
      }
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
    const sizes = priceData[selectedProduct] ? Object.keys(priceData[selectedProduct]) : [];
    sizes.forEach(size => {
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

      // Список материалов берём из ключей JSON соответствующей группы
      const groupMap = {
        "Тканные бирки": ["Премиум сатин", "Имитация хлопка", "Хлопок", "Киперная лента"],
        "Силиконовые бирки": ["Силикон"],
        "Навесные бирки": ["Картон белый"]
      };
      const list = groupMap[selectedProduct] || Object.keys(priceData || {});
      list.forEach(product => {
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


  $form.addEventListener('submit', (event) => {
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
