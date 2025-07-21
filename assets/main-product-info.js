class MainProductInfo extends HTMLElement {
    constructor() {
        super();

        this.mainProductGallery = this.querySelector('[data-main-product-gallery]');
        this.mainProductForm = this.querySelector('[data-main-product-form]');
        this.mainProductDetails = this.querySelector('[data-main-product-details]');
        this._loading = false;
    }

    set loading(value) {
        this._loading = value;

        if (value) {
            this.classList.add('is-loading');
        } else {
            setTimeout(() => {
                this.classList.remove('is-loading');
            }, 1000);
        }
    }

    get loading() {
        return this._loading;
    }

    connectedCallback() {
        this.mainProductForm.addEventListener('click', (event) => {
            if (event.target.classList.contains('color-swatch-selector') && event.target.getAttribute('data-product-id') && event.target.getAttribute('data-product-handle')) {
                const productID = event.target.getAttribute('data-product-id');
                const productHandle = event.target.getAttribute('data-product-handle');

                this.updateSections(productID, productHandle);
            }
        });

        this.redirectVariantUrl();
    }

    updateSections(productID, productHandle) {
        const sectionsToRender = ['main-product-info'];
        this.loading = true;

        fetch(`/products/${productHandle}?sections=${sectionsToRender.join(',')}&variant=${productID}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(sections => {
            if (!sections['main-product-info']) return;

            const parser = new DOMParser();
            const doc = parser.parseFromString(sections['main-product-info'], 'text/html');

            const updatedMainProductGallery = doc.querySelector('[data-main-product-gallery]');
            if (!updatedMainProductGallery) return;

            const updatedMainProductForm = doc.querySelector('[data-main-product-form]');
            if (!updatedMainProductForm) return;

            const updatedMainProductDetails = doc.querySelector('[data-main-product-details]');

            this.querySelector('[data-main-product-gallery]').innerHTML = updatedMainProductGallery.innerHTML;
            this.querySelector('[data-main-product-form]').innerHTML = updatedMainProductForm.innerHTML;

            if (updatedMainProductDetails) {
                this.querySelector('[data-main-product-details]').innerHTML = updatedMainProductDetails.innerHTML;
            }

            this.loading = false;

            this.redirectVariantUrl();
        })
        .catch(error => {
            this.loading = false;
        });
    }

    async redirectVariantUrl() {
        this.querySelector('[data-product-related-variants-selector]').addEventListener('change', (event) => {
            const selectedName = event.target.value;
            const rawVariantData = this.querySelector('[data-product-related-variants-selector]').getAttribute('data-product-related-variants-info');

            if (!selectedName || !rawVariantData) return;

            let variantData;

            try {
                variantData = JSON.parse(rawVariantData);
            } catch (e) {
                return;
            }

            const formElement = this.querySelector('main-product-form');
            const currentColorSwatch = formElement?.dataset.productColorSwatch;

            const matched = variantData.find(item =>
                item.variant_name === selectedName && item.color_swatch === currentColorSwatch
            );

            if (matched && matched.handle) {
                window.location.href = `/products/${matched.handle}`;
            }
        });
    }
}

customElements.define('main-product-info', MainProductInfo);