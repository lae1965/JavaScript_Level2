const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Домашнее задание №1
// let getRequest = (url) => {
//     return new Promise((success, failure) => {
//         let xhr = new XMLHttpRequest();
//         xhr.open('GET', url, true);
//         xhr.onreadystatechange = () => {
//             if (xhr.readyState === 4) {
//                 if (xhr.status !== 200) failure('Error!!!');
//                 else success(xhr.responseText);
//             }
//         }
//         xhr.send();
//     });
// }


class Item {
    constructor(item, img) {
        this.id_product = item.id_product;
        this.product_name = item.product_name;
        this.price = item.price;
        this.img = img;
    }
}

class List {
    constructor(url, container, type = classTypes) {
        this.container = document.querySelector(container);
        this.url = url;
        this.type = type;
        this.goods = [];
        this.allProducts = [];
        this.filtered = [];
        this._setClick();
    }

    _getJson(url) {
        return fetch(url)
            .then(response => response.json())
            .catch(() => {
                console.log('Error!!!');
            });
    }

    render() {
        for (const item of this.goods) {
            const newItem = new this.type[this.constructor.name](item);
            this.allProducts.push(newItem);
            this.container.insertAdjacentHTML('beforeend', newItem.render());
        }
    }

    filter(value) {
        const regExp = new RegExp(value, 'i');
        this.filtered = this.allProducts.filter(product => regExp.test(product.product_name));
        for (const el of this.allProducts) {
            const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
            if (this.filtered.includes(el)) block.classList.remove('invisible');
            else block.classList.add('invisible');
        }
    }
}

class CatalogItem extends Item {
    constructor(catalogItem, img = 'https://via.placeholder.com/200x150') {
        super(catalogItem, img);
    }

    render() {
        return `<div class="product-item" data-id="${this.id_product}">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.product_name}</h3>
                        <p>${this.price} ₽</p>
                        <button class="buy-btn" data-id="${this.id_product}" data-name="${this.product_name}" 
                            data-price="${this.price}">Купить</button>
                    </div>
                </div>`;

    }
}

class CartItem extends Item {
    constructor(cartItem, img = 'https://via.placeholder.com/200x150') {
        super(cartItem, img);
        this.quantity = cartItem.quantity;
    }

    render() {
        return `<div class="cart-item" data-id="${this.id_product}">
                    <div class="product-bio">
                        <img src="${this.img}" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">${this.product_name}</p>
                            <p class="product-quantity">Количество: ${this.quantity}</p>
                            <p class="product-single-price">${this.price} за ед.</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">${this.quantity*this.price} ₽</p>
                        <button class="del-btn" data-id="${this.id_product}">&times;</button>
                    </div>
                </div>`
    }
}

class CatalogList extends List {
    constructor(cart, url = `${API}/catalogData.json`, container = '.products') {
        super(url, container);
        this.cart = cart;

        this._getJson(url)
            .then(data => {
                this.goods = data;
                this.render()
            });
    }

    _setClick() {
        this.container.addEventListener('click', el => {
            if (el.target.classList.contains('buy-btn')) this.cart.addToCart(el.target);
        });
        document.querySelector('.search-form').addEventListener('submit', el => {
            el.preventDefault();
            this.filter(document.querySelector('.search-field').value);
        });
    }
}

class CartList extends List {
    constructor(url = `${API}/getBasket.json`, container = '.cart-block') {
        super(url, container);

        this._getJson(url)
            .then(data => {
                this.goods = data.contents;
                this.render();
            });
    }

    _setClick() {
        this.container.addEventListener('click', el => {
            if (el.target.classList.contains('del-btn')) this.delFromCart(el.target);
        });

        document.querySelector('.btn-cart').addEventListener('click', () => {
            this.container.classList.toggle('invisible');
        });
    }

    addToCart(element) {
        this._getJson(`${API}/addToBasket.json`)
            .then(data => {
                if (data.result == 1) {
                    let elementId = +element.dataset['id'];
                    let findProductInCart = this.allProducts.find(product => product.id_product == elementId);
                    if (findProductInCart) {
                        findProductInCart.quantity++;
                        this._updateCart(findProductInCart);
                    } else {
                        this.goods = [{
                            id_product: elementId,
                            price: +element.dataset['price'],
                            product_name: element.dataset['name'],
                            quantity: 1
                        }];
                        this.render();
                    }
                } else console.log('Error!');
            });
    }

    delFromCart(element) {
        this._getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if (data.result == 1) {
                    let elementId = +element.dataset['id'];
                    let findProductInCart = this.allProducts.find(product => product.id_product == elementId);
                    if (findProductInCart.quantity > 1) {
                        findProductInCart.quantity--;
                        this._updateCart(findProductInCart);
                    } else {
                        this.allProducts.splice(this.allProducts.indexOf(findProductInCart), 1);
                        document.querySelector(`.cart-item[data-id="${elementId}"]`).remove();
                    }
                } else console.log('Error!');
            });
    }

    _updateCart(product) {
        let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
        block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
        block.querySelector('.product-price').textContent = `${product.quantity * product.price} ₽`;
    }

}

const classTypes = {
    CatalogList: CatalogItem,
    CartList: CartItem
};

cart = new CartList();
new CatalogList(cart);