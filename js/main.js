'use strict';
const products = [{
        id: 1,
        title: 'Notebook',
        price: 1000
    },
    {
        id: 2,
        title: 'Mouse',
        price: 100
    },
    {
        id: 3,
        title: 'Keyboard',
        price: 250
    },
    {
        id: 4,
        title: 'Gamepad',
        price: 150
    },
];

const renderProduct = (title, price, imgname = 'computer.jpg') =>
    `<div class="product-item">
        <h3>${title}</h3>
        <img src="${imgname}" alt="Image" class="product-item-image">
        <p>${price} руб.</p>
        <button class="by-btn">Добавить</button>
    </div>`;

const renderProducts = (list) => {
    const productList = list.map(item => renderProduct(item.title, item.price)).join('');

    console.log(productList);
    document.querySelector('.products').innerHTML = productList;
}

renderProducts(products);