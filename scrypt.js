let items = [];
let page = 1;
let maxPage = 0;
let global = 1;

const title = document.getElementById('title');
const cards = document.getElementById('cards');
const showMoreBtn = document.getElementById('showMoreBtn');

const navProducts = document.getElementById('navProducts');
const navCategories = document.getElementById('navCategories');
const navUsers = document.getElementById('navUsers');

navProducts.addEventListener('click', () => {
  if (!navProducts.classList.contains('selected')) {
    fetchProducts(1);
  }
});

navCategories.addEventListener('click', () => {
  if (!navCategories.classList.contains('selected')) {
    fetchProducts(2);
  }
});

navUsers.addEventListener('click', () => {
  if (!navUsers.classList.contains('selected')) {
    fetchProducts(3);
  }
});

showMoreBtn.addEventListener('click', () => {
  addPage();
});

const productCardGen = (info) => {
  const main = document.createElement('div');
  const img = document.createElement('div');
  const price = document.createElement('p');
  const title = document.createElement('p');

  main.classList.add('card');
  img.classList.add('card_image');
  img.style.backgroundImage = `url(${info.images[0]})`;
  price.textContent = `${info.price}$`;
  title.textContent = info.title;

  main.append(img, price, title);

  return main;
};

const categoriesCardGen = (info) => {
  const main = document.createElement('div');
  const img = document.createElement('div');
  const name = document.createElement('p');

  main.classList.add('card');
  img.classList.add('card_image');
  img.style.backgroundImage = `url(${info.image})`;
  name.textContent = info.name;

  main.append(img, name);

  return main;
};

const usersCardGen = (info) => {
  const main = document.createElement('div');
  const img = document.createElement('div');
  const email = document.createElement('p');
  const name = document.createElement('p');

  const avatar = info.avatar ?? './images/catFinger.jpg';

  main.classList.add('card');
  img.classList.add('card_image');
  img.style.backgroundImage = `url(${avatar})`;
  // img.style.backgroundImage = `url(./images/catFinger.jpg)`;
  email.textContent = info.email;
  name.textContent = info.name;

  main.append(img, email, name);

  return main;
};

const fetchProducts = async (type) => {
  localStorage.setItem('type', type);

  page = 1;
  items = [];
  cards.innerHTML = '';
  global = type;

  navProducts.classList.remove('selected');
  navCategories.classList.remove('selected');
  navUsers.classList.remove('selected');

  let url;
  switch (type) {
    case 1:
      url = 'https://api.escuelajs.co/api/v1/products';
      navProducts.classList.add('selected');
      title.textContent = 'Products';
      break;
    case 2:
      url = 'https://api.escuelajs.co/api/v1/categories';
      navCategories.classList.add('selected');
      title.textContent = 'Categories';
      break;
    case 3:
      url = 'https://api.escuelajs.co/api/v1/users';
      navUsers.classList.add('selected');
      title.textContent = 'Users';
      break;
  }

  fetch(url)
    .then(async response => {
      items = await response.json();
      maxPage = Math.ceil(items.length / 4);
      addPage();
    });
};

const addPage = (type = global) => {
  if (page <= maxPage) {
    const offset = (page - 1) * 4;
    showMoreBtn.textContent = page++ === maxPage ? 'Скрыть' : 'Показать еще';
    for (const item of items.slice(offset, offset + 4)) {
      switch (type) {
        case 1:
          cards.append(productCardGen(item));
          break;
        case 2:
          cards.append(categoriesCardGen(item));
          break;
        case 3:
          cards.append(usersCardGen(item));
          break;
      }
    }
  } else {
    page = 1;
    cards.innerHTML = '';
    showMoreBtn.textContent = 'Показать еще';
    addPage();
  }
};

const type = localStorage.getItem('type') ?? 1;

fetchProducts(Number(type));






























