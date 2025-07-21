class MainProductGallery extends HTMLElement {
  constructor() {
    super();

    this.swiperGalleryPagination = new Swiper('.swiper-main-product-gallery--pagination', {
      direction: 'horizontal',
      slidesPerView: 'auto',
      watchSlidesProgress: true,
      breakpoints: {
        1000: {
          direction: 'vertical',
        }
      }
    });

    this.swiperGallery = new Swiper('.swiper-main-product-gallery', {
      direction: 'horizontal',
      slidesPerView: 1,
      speed: 600,
      zoom: true,
      zoom: {
        maxRatio: 3,
        minRatio: 1,
      },
      thumbs: {
        swiper: this.swiperGalleryPagination,
      },
      breakpoints: {
        1000: {
          direction: 'vertical',
        }
      }
    });

    this.paginationSlides = this.querySelectorAll('.swiper-main-product-gallery--pagination .swiper-slide');
  }

  connectedCallback() {
    this.addEventListener('click', () => {
      this.swiperGallery.on('transitionEnd', () => {
        this.activeSlideCheck();
      });
    });
  }

  activeSlideCheck() {
    this.paginationSlides.forEach(paginationSlide => {
      if (paginationSlide.classList.contains('swiper-slide-thumb-active')) {
        paginationSlide.classList.add('is-selected');
      }
      else {
        paginationSlide.classList.remove('is-selected');
      }
    });
  }
}

if (!customElements.get('main-product-gallery')) {
  customElements.define('main-product-gallery', MainProductGallery);
}