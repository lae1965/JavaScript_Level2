const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        products: [],
        cartsList: [],
        imgCatalog: 'https://via.placeholder.com/200x150',
        seachLine: '',
        isVisibleCart: false,
        show: false,
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                });
        },
        addProduct(product) {
            console.log(product);
        },
        filterGood() {
            const regExp = new RegExp(this.seachLine, 'i');
            const filter = this.products.filter(product => regExp.test(product.product_name));
            for (const item of this.products) {
                const productBlock = document.querySelector(`.product-item[data-id="${item.id_product}"]`)
                if (filter.includes(item)) productBlock.classList.remove('invisible');
                else productBlock.classList.add('invisible');
            }
        }
    },
    beforeCreated() {

    },
    created() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                this.products = data;
                //this.products = []; //Для проверки вывода сообщения об отсутствии товаров
            });
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                this.cartsList = data.contents;
                //this.cartsList = []; //Для проверки вывода сообщения об отсутствии товаров в корзине
            });
    },
    beforeMount() {

    },
    mounted() {

    },
    beforeUpdate() {

    },
    updated() {

    },
    beforeDestroy() {

    },
    destroyed() {

    },
});