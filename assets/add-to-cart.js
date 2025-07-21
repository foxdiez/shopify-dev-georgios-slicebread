class AddToCart extends HTMLElement {
    constructor() {
        super();

        this.atcButton = this.querySelector('button');
        this._loading = false;
    }

    set loading(value) {
        this._loading = value;

        if (value) {
            this.atcButton.classList.add('is-loading');
        } else {
            setTimeout(() => {
                this.atcButton.classList.remove('is-loading');
            }, 1000);
        }
    }

    get loading() {
        return this._loading;
    }

    connectedCallback() {
        this.atcButton.addEventListener('click', () => {
            if (this.getAttribute('data-product-id')) {
                const productId = this.getAttribute('data-product-id');
                this.addProductToCart(productId);
            }
        });
    }

    addProductToCart(productId, quantity = 1) {
        this.loading = true;

        fetch('/cart/add.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                id: productId,
                quantity: quantity
            })
        })
        .then(response => {
            if (!response.ok) throw new Error('Failed to add item to cart');
            return response.json();
        })
        .then(data => {
            this.loading = false;
        })
        .catch(error => {
            console.warn('Add to cart error:', error);
            this.loading = false;
        });
    }
}

if (!customElements.get('add-to-cart')) {
  customElements.define('add-to-cart', AddToCart);
}
