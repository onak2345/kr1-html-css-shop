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
