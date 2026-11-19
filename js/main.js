// ===== ПР15: типы данных, операторы, функции =====
console.log('Файл main.js подключён');
console.log(product);
console.table(product);

// Форматирование цены: возвращает строку
function formatPrice(price) {
  return `${price.toLocaleString('ru-RU')} руб.`;
}

// Размер скидки (арифметические операторы)
function calculateDiscount(price, discountPercent) {
  return price * discountPercent / 100;
}

// Итоговая цена с учётом скидки
function calculateFinalPrice(price, discountPercent) {
  const discountValue = calculateDiscount(price, discountPercent);
  return price - discountValue;
}

// Статус товара (оператор сравнения и логические операторы)
function getProductStatus(product) {
  if (product.isAvailable && product.price > 0) {
    return 'В наличии';
  }
  return 'Нет в наличии';
}

// Краткое описание товара
function createProductSummary(product) {
  const finalPrice = calculateFinalPrice(product.price, product.discountPercent);
  const status = getProductStatus(product);
  return `${product.title}: ${formatPrice(finalPrice)}, статус: ${status}.`;
}

// Вывод результатов функций в консоль
const discountValue = calculateDiscount(product.price, product.discountPercent);
const finalPrice = calculateFinalPrice(product.price, product.discountPercent);
const isHighRated = product.rating >= 4.5 && product.discountPercent > 0;
const productSummary = createProductSummary(product);

console.log('Цена:', formatPrice(product.price));
console.log('Размер скидки:', formatPrice(discountValue));
console.log('Итоговая цена:', formatPrice(finalPrice));
console.log('Статус:', getProductStatus(product));
console.log('Высокий рейтинг и есть скидка:', isHighRated);
console.log(productSummary);

// Безопасный вывод на страницу через textContent (на страницах без блока элементов нет)
const messageElement = document.querySelector('.js-message');
const productOutputElement = document.querySelector('.product-output');

if (messageElement) {
  messageElement.textContent = 'JavaScript подключён корректно.';
}

if (productOutputElement) {
  productOutputElement.textContent = productSummary;
}

// ===== Модальное окно заявки и кнопка «Наверх» =====
const orderDialog = document.querySelector('.order-dialog');

if (orderDialog) {
  const productField = orderDialog.querySelector('#dialog-product');
  const productLabel = orderDialog.querySelector('.order-dialog__product');
  let lastTrigger = null;

  document.querySelectorAll('.product-card__order').forEach((button) => {
    button.addEventListener('click', () => {
      lastTrigger = button;
      productField.value = button.dataset.product;
      productLabel.textContent = button.dataset.product;
      orderDialog.showModal();
    });
  });

  orderDialog.querySelector('.order-dialog__close').addEventListener('click', () => orderDialog.close());
  orderDialog.addEventListener('close', () => {
    if (lastTrigger) {
      lastTrigger.focus();
    }
  });
}

const backToTop = document.querySelector('.back-to-top');

if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.hidden = window.scrollY < 400;
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0 }));
}

// ===== Отправка форм заявки: проверка и сообщение пользователю =====
document.querySelectorAll('form.order-form').forEach((form) => {
  const status = form.querySelector('.order-form__status');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      if (status) {
        status.className = 'order-form__status order-form__group--wide order-form__status--error';
        status.textContent = 'Проверьте поля формы: есть незаполненные или некорректные значения.';
      }
      return;
    }

    const name = form.elements.name.value.trim();
    form.reset();
    if (status) {
      status.className = 'order-form__status order-form__group--wide order-form__status--success';
      status.textContent = `Спасибо, ${name}! Заявка отправлена (учебная имитация).`;
    }
  });
});
