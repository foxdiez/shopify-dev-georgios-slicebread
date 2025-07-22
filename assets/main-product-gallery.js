class MainProductGallery extends HTMLElement {
  constructor() {
    super();

    this.swiperGalleryPagination = new Swiper('.swiper-main-product-gallery--pagination', {
      direction: 'horizontal',
      slidesPerView: 5,
      watchSlidesProgress: true,
      breakpoints: {
        1000: {
          direction: 'vertical',
          slidesPerView: 5,
        }
      }
    });

    this.swiperGallery = new Swiper('.swiper-main-product-gallery', {
      direction: 'horizontal',
      slidesPerView: 1,
      speed: 600,
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

    this.swiperGallery.on('slideChange', () => {
      const activeIndex = this.swiperGallery.activeIndex;
      const paginationSwiper = this.swiperGalleryPagination;
      const visibleSlides = paginationSwiper.params.slidesPerView;
      const currentStart = paginationSwiper.activeIndex;

      if (activeIndex <= currentStart + visibleSlides - 1) {
        paginationSwiper.slideTo(activeIndex);
      }
    });
  }
}

if (!customElements.get('main-product-gallery')) {
  customElements.define('main-product-gallery', MainProductGallery);
}
