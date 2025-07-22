class CustomAccordionComponent extends HTMLElement {
    constructor() {
        super();
        this.accordions = this.querySelectorAll('.accordion-item');
    }

    connectedCallback() {
        this.accordions.forEach(item => {
            const label = item.querySelector('.accordion-label');
            const content = item.querySelector('.accordion-content');

            label.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');

                this.accordions.forEach(otherItem => {
                    const otherContent = otherItem.querySelector('.accordion-content');

                    if (otherItem !== item) {
                        otherItem.classList.remove('active');

                        otherContent.style.height = otherContent.scrollHeight + 'px';
                        requestAnimationFrame(() => {
                            otherContent.style.height = '0px';
                        });
                    }
                });

                if (isOpen) {
                    item.classList.remove('active');
                    content.style.height = content.scrollHeight + 'px';
                    requestAnimationFrame(() => {
                        content.style.height = '0px';
                    });
                } else {
                    item.classList.add('active');

                    content.style.height = '0px';
                    requestAnimationFrame(() => {
                        content.style.height = content.scrollHeight + 'px';
                    });

                    content.addEventListener('transitionend', () => {
                        if (item.classList.contains('active')) {
                            content.style.height = 'auto';
                        }
                    });
                }
            });
        });
    }
}

customElements.define('custom-accordion-component', CustomAccordionComponent);
