'use strict';
// Домашнее задание №1
//
// class CartItem extends ProductItem {
//     // Свойства 
//     num;            // Количество выбранного товара данного наименования
//     productPrice;   // Цена выбранного товара данного наименования (this.price * this.num)
// 
//     // Методы
//     calcPrice() { return this.price * this.num; } 
// }
// 
// class CartList {
//     // Свойства
//     container; // Селлектор тега HTML, внутри которого будет находиться корзина
//     _goods; // Массив, в который товары, сохраненные в корзине, загрузятся с сервера  
//     _allProducts; // Рабочий массив для манипуляции с товарами в корзине 
//     totalNum; // Общее количество наименований в корзине
//     totalPrice; // Общая стоимость товаров в корзине  
// 
//     // Методы
//     _fetchGoods() {} // Запрашивает сервер сохраненное в прошлый раз состояние корзины и помещает выбранные ранее товары в _goods
//     _render() {} // Формирует HTML
//     calcTotalPrice() {} // Возвращает общую сумму товара в корзине (может быть приватным, зависит от общего интерфейса) 
//     insert2cart(product) {} // Добавляет товар в корзину (public)
//     delFromCart(product) {} // Удаляет товар из корзины (public)         
//     incrimentItem(product) {} // Увеличивает на 1 количество данного товара в корзине (public)         
//     decrimentItem(product) {} // Уменьшает на 1 количество данного товара в корзине (public)         
// 
// }



class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    getHTMLString() {
        return `<div class="product-item" data-id="${this.id}">
            <img src="${this.img}" alt="Some img">
            <div class="desc">
                <h3>${this.title}</h3>
                <p>${this.price} \u20bd</p>
                <button class="buy-btn">Купить</button>
            </div>
        </div>`;
    }
}

class ProductList {
    constructor(container = '.products') {
        this.container = document.querySelector(container);
        this._goods = [];
        this._allProducts = [];

        this._fetchGoods();
        this._render();
    }

    _fetchGoods() {
        this._goods = [{
                id: 1,
                title: 'Notebook',
                price: 20000
            },
            {
                id: 2,
                title: 'Mouse',
                price: 1500
            },
            {
                id: 3,
                title: 'Keyboard',
                price: 5000
            },
            {
                id: 4,
                title: 'Gamepad',
                price: 4500
            },
        ];
    }

    _render() {
        for (const product of this._goods) {
            const productObject = new ProductItem(product);
            this._allProducts.push(productObject);
            this.container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
        }
    }

    // Домашнее задание №2
    calcTotalPrice() {
        let totalPrice = 0;
        for (const product of this._allProducts) totalPrice += product.price;

        return totalPrice;
    }
}

const list = new ProductList();
alert(`Всего в интернет-магазине товаров на сумму ${list.calcTotalPrice()} рублей.`); // Артем, я не понимаю почему в данном случае alert выводится до выведения содержимого верстки