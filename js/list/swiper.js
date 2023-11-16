let sliders = document.querySelectorAll('._swiper');
if(sliders){
    for(let i = 0; i < sliders.length; i++){
        let slider = sliders[i];
        if(!slider.classList.contains('swiper-bild')){
            let slider_items = slider.children;
            if(slider_items){
                for(let i = 0; i < slider_items.length; i++){
                    let el = slider_items[i];
                    el.classList.add('swiper-slide');
                }
            }
            let slider_content = slider.innerHTML;
            let slider_wrapper = document.createElement('div');
            slider_wrapper.classList.add('swiper-wrapper');
            slider_wrapper.innerHTML = slider_content;
            slider.innerHTML = '';
            slider.appendChild(slider_wrapper);
            slider.classList.add('swiper-bild')
        }
        if(slider.classList.contains('_gallery')){
            //slider.data('LightGallery').destroy(true);
        }
    }
    slider_bild_callback();
}
function slider_bild_callback(param){}

const swiper = new Swiper('._swiper', {
    // Optional parameters(horizontal, vertical)
    direction: 'horizontal',
    loop: true,
  
    // If we need pagination
    /* pagination: {
      el: '.swiper-pagination',
      //Буллеты
      clickable: true,
      //Динамическиу буллеты
      dynamicBullets: true,

      //Фракция
      //type: 'fraction',

      //Progressbar
      //type: 'progressbar',
    }, */
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    /* scrollbar: {
      el: '.swiper-scrollbar',
      //Возможность перетаскивать скролл
      draggable: true,
    }, */

    //Включение/Выключение
    //перетаскивания на ПК
    simulateTouch: true,
    //Чустривельность свайпа
    touchRatio: 1,
    //Угол срабатывания свайпа
    touchAngle: 45,
    //Курсор перетаскивания
    grabCursor: true,

    //Переключение при клике на слайд
    slideToClickedSlide: false,

    //Навигация по хешу
    hashNavigation: {
        //Отслеживать состояние
        watchState: true,
    },

    //Управление клавиатурой
    /* keyboard: {
        //Включить/Выключить
        enabled: true,
        //Включить/Выключить
        //Только когда слайдер
        //В пределах вьюпорта
        onlyInViewport: true,
        //Включить/Выключить
        //Управление клавиатурой
        //pageUp, pageDown
        pageUpDown: true,
    }, */

    //Управление колесом мыши
    mousewheel: {
        //Чуствительность
        sensitivity: 1,
        //Класс обЪекта на котором
        //Будет срабатывать прокрутка мышью
        //eventsTarget: ".swiper",
    },

    //Автовысота
    autoHeight: true,

    //Кол-во слайдов для показа
    slidesPerView: 1,
    //Расстояние можду слайдами
    spaceBetween: 30,

    /* breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        // when window width is >= 480px
        768: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        // when window width is >= 640px
        992: {
          slidesPerView: 2,
          spaceBetween: 40
        }
    }, */

    //Отключение функционала
    //Если слайдов меньше чем нужно
    watchOverflow: true,

    //Кол-во пролистываемых слайдов
    slidesPerGroup: 1,

    //Активный слайд по центру
    //centeredSlides: false,

    //Стартовый слайд(номер)
    //initialSlide: 1,

    //Свободный режим
    freeMode: false,

    //Автопрокрутка
    /* autoplay: {
        //Пауза между прокруткой(mc)
        delay: 1000,
        //Закончить на последнем слайде
        stopOnLastSlide: true,
        //Отключить после ручного переключения
        disableOnInteraction: false,
    }, */

    //Скорость
    speed: 500,

    //Эффект переключентя слайдов
    //Смена прозрачности
    //effect: 'fade',

    //Дополнение к fade
    /* fadeEffect: {
        //Паралеоьная смена прозрачности
        crossFade: true,
    }, */

    //Эффект переключентя слайдов
    //Переворот
    //effect: 'flip',

    //Дополнения к flip
    /* flipEffect: {
        //Тень
        //slideShadows: true,
        //Показ только активного слайда
        limitRotation: true,
    }, */

    //Эффект переключентя слайдов
    //Куб
    //effect: 'cube',

    //Дополнения к cube
    /* cubeEffect: {
        //Настройки тени
        slideShadows: true,
        shadow: true,
        shadowOffset: 20,
        shadowScale: 0.94,
    }, */

    //Эффект переключентя слайдов
    //Поток
    //effect: 'coverflow',

    //Дополнения к coverflow
    /* coverflowEffect: {
        //Угол
        rotate: 20,
        //Наложение
        stretch: 50,
        //Тень
        slideShadows: true,
    }, */

    //Zoom
    /* zoom: {
        //Максимальное увеличение
        maxRatio: 3,
        //Минимальное увеличение
        minRatio: 1,
    }, */

    //Обновить свайпер при изменении элементов слайдера
    observer: true,
    //Обновить свайпер при изменении родительских элементов слайдера
    observeParents: true,
    //Обновить свайпер при изменении дочерних элементов слайдера
    observeSlideChildren: true,
  });