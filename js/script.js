const burgerIcon = document.querySelector('.header__icon');
burgerIcon.addEventListener('click', function (e) {
    burgerIcon.nextElementSibling.classList.toggle('_active');
    burgerIcon.classList.toggle('_active');

    document.body.classList.toggle('_lock');
});

function ibg() {

    let ibg = document.querySelectorAll(".ibg");

    for (var i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
        }
    }
}
ibg();

(function () {
    //console.log('work');
    let originalPositions = [];
    let da_elements = document.querySelectorAll('[data-da]');
    let da_elements_array = [];
    let da_match_media = [];
    //fill the massives
    if (da_elements.length > 0) {
        let number = 0
        for (let index = 0; index < da_elements.length; index++) {
            const da_element = da_elements[index];
            const da_move = da_element.getAttribute('data-da');
            const da_array = da_move.split(',');
            if (da_array.length == 3) {
                da_element.setAttribute('data-da-index', number);
                //fill the massive with the first positions
                originalPositions[number] = {
                    "parent": da_element.parentNode,
                    "index": index_in_parent(da_element),
                }
                //fill the massive of elements
                da_elements_array[number] = {
                    "element": da_element,
                    "destination": document.querySelector('.' + da_array[0].trim()),
                    "place": da_array[1].trim(),
                    "breakpoint": da_array[2].trim(),
                }
                number++;
            }
        }
        dynamic_adapt_sort(da_elements_array);

        //creating an event in breakpoit
        for (let index = 0; index < da_elements.length; index++) {
            //console.log('work');
            const el = da_elements_array[index];
            const da_breakpoint = el.breakpoint;
            const da_type = "max";

            da_match_media.push(window.matchMedia("(" + da_type + "-width: " + da_breakpoint + "px)"));
            da_match_media[index].addEventListener("change", dynamic_adapt);
        }
    }

    //main function
    function dynamic_adapt(e) {
        for (let index = 0; index < da_elements_array.length; index++) {
            const el = da_elements_array[index];
            const da_element = el.element;
            const da_destination = el.destination;
            const da_place = el.place;
            const da_breakpoint = el.breakpoint;
            const da_classname = "_dynamic_adapt_" + da_breakpoint;

            if (da_match_media[index].matches) {
                //перебрасываем элементы
                if (!da_element.classList.contains(da_classname)) {
                    let actual_index;
                    if (da_place == 'first') {
                        actual_index = index_of_elements(da_destination)[0];
                    } else if (da_place == 'last') {
                        actual_index = index_of_elements(da_destination)[index_of_elements(da_destination).length];
                    } else {
                        actual_index = index_of_elements(da_destination)[da_place];
                    }
                    da_destination.insertBefore(da_element, da_destination.children[actual_index]);
                    da_element.classList.add(da_classname);
                }
            } else {
                //return back
                if (da_element.classList.contains(da_classname)) {
                    dynamic_adapt_back(da_element);
                    da_element.classList.remove(da_classname);
                }
            }
        }
    }

    //calling main function
    dynamic_adapt();

    function dynamic_adapt_back(el) {
        //console.log('work');
        const da_index = el.getAttribute('data-da-index');
        const original_place = originalPositions[da_index];
        const parent_place = original_place['parent'];
        const index_place = original_place['index']
        const actual_index = index_of_elements(parent_place, true)[index_place];
        parent_place.insertBefore(el, parent_place.children[actual_index]);
    }

    //index in parent element
    function index_in_parent(el) {
        //console.log('work');
        var children = Array.prototype.slice.call(el.parentNode.children);
        return children.indexOf(el);
    }

    //функция получения массива индексов элемениов внутри родителя
    function index_of_elements(parent, back) {
        //console.log('work');
        const children = parent.children;
        const children_array = [];
        for (let index = 0; index < children.length; index++) {
            const children_element = children[index];
            if (back) {
                children_array.push(index);
            } else {
                //исключаем перенесённый эдемент
                if (children_element.getAttribute('data-da') == null) {
                    children_array.push(index);
                }
            }
        }
        return children_array;
    }

    //сортировка объекта
    function dynamic_adapt_sort(arr) {
        //console.log('work');
        arr.sort(function (a, b) {
            if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
        });
        arr.sort(function (a, b) {
            if (a.place > b.place) { return 1 } else { return -1 }
        });
    }
}());

const changeImages = document.querySelectorAll('[data-ch]');
const bgImage = document.querySelector('.ibg');
let arr = [];
let arr2 = [];
if (changeImages.length > 0) {
    for (let index = 0; index < changeImages.length; index++) {
        const changeImage = changeImages[index];
        const changePoint = changeImage.getAttribute('data-ch');
        const removePoint = changeImage.getAttribute('data-re');

        arr.push(window.matchMedia('(max-width: ' + changePoint + 'px)'));
        arr[index].addEventListener("change", bgChange);


        arr2.push(window.matchMedia('(min-width: ' + removePoint + 'px)'));
        arr2[index].addEventListener("change", bgChange);
    }

    function bgChange(e) {
        for (let index = 0; index < changeImages.length; index++) {
            if (arr[0].matches && arr2[0].matches) {
                let imageSrc = document.querySelector('.bg_1').getAttribute('src');

                bgImage.style.backgroundImage = 'url(' + imageSrc + ')';
            }
            else if (arr[1].matches && arr2[1].matches && (!arr[0].matches || !arr2[0].matches)) {
                let imageSrc = document.querySelector('.bg_2').getAttribute('src');

                bgImage.style.backgroundImage = 'url(' + imageSrc + ')';
            } else {
                let imageMainSrc = document.querySelector('._bg_main').getAttribute('src');
                bgImage.style.backgroundImage = 'url(' + imageMainSrc + ')';
            }
        }
    }

    bgChange();
}
const selects = document.querySelectorAll('select');
if (selects.length > 0) {
    for (let index = 0; index < selects.length; index++) {
        const select = selects[index];

        function indexes(select) {
            const arr = [];

            for (let i = 0; i < select.options.length; i++) {
                let e = select.options[i];
                arr.push(e.text);
            }

            return arr;
        }

        const result = indexes(select);
        createSelect(result);

        function createSelect(result) {
            let newSelect = document.createElement('div');
            newSelect.classList.add('_select');
            select.insertAdjacentElement('afterend', newSelect);

            let newSelectBody = document.createElement('div');
            newSelectBody.classList.add('_select__body');
            newSelect.insertAdjacentElement('afterbegin', newSelectBody);

            let newSelectSelected = document.createElement('span');
            newSelectSelected.classList.add('_select__selected');
            newSelectSelected.innerHTML = `This week`;

            if (select.classList.contains('req')) {
                newSelectSelected.classList.add('_req');
            }
            newSelect.insertAdjacentElement('beforeend', newSelectSelected);

            for (let i = 0; i < result.length; i++) {
                let newSelectOption = document.createElement('div');
                newSelectOption.classList.add('_select__option');
                newSelectOption.setAttribute("data-value", result.length - i);
                newSelectOption.innerHTML = `${result[result.length - (i + 1)]}`;
                newSelectBody.insertAdjacentElement('afterbegin', newSelectOption);

                if (newSelectOption.classList.contains('_selected')) {
                    newSelectOption.classList.remove('_selected');
                }

                newSelectOption.addEventListener("click", function (e) {
                    newSelectSelected.innerHTML = `${result[result.length - (i + 1)]}`;
                    newSelectSelected.classList.add('_choosed');
                });
            }

            newSelect.addEventListener("click", function (e) {
                newSelect.classList.toggle('_select_active');
                newSelectBody.classList.toggle('_active');
            });

            return newSelectBody;
        }
    }
}
document.addEventListener("click", function (e) {
    const selects = document.querySelectorAll('._select_active');
    if (selects.length > 0) {
        for (let i = 0; i < selects.length; i++) {
            if (!e.target.closest('._select_active')) {
                const select = selects[i];
                select.classList.remove('_select_active');
                select.childNodes[0].classList.remove('_active');
            }
        }
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {

        let error = formValidate(form);

        if (error > 0) {
            e.preventDefault();
        }
    }

    function formClean(e){
        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            
            console.log(input);
            
        }
    }


    function formValidate(form) {
        
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_email')) {
                if (!checkEmail(input)) {
                    error++;
                    formAddError(input);
                }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                error++;
                formAddError(input);
            } else {
                if (input.value === '') {
                    error++;
                    formAddError(input);
                }
            }
        }

        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    function checkEmail(input) {
        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

        if (EMAIL_REGEXP.test(input.value) == false) {
            return 0;
        } else {
            return 1;
        }
    }
});

let sliders = document.querySelectorAll('._swiper');
if (sliders) {
    for (let i = 0; i < sliders.length; i++) {
        let slider = sliders[i];
        if (!slider.classList.contains('swiper-bild')) {
            let slider_items = slider.children;
            if (slider_items) {
                for (let i = 0; i < slider_items.length; i++) {
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
        if (slider.classList.contains('_gallery')) {
            //slider.data('LightGallery').destroy(true);
        }
    }
    slider_bild_callback();
}
function slider_bild_callback(param) { }
const swiper = new Swiper('.swiper', {
    // Optional parameters(horizontal, vertical)
    direction: 'horizontal',
    loop: true,

    //Включение/Выключение
    //перетаскивания на ПК
    simulateTouch: true,
    //Чустривельность свайпа
    touchRatio: 1,
    //Угол срабатывания свайпа
    touchAngle: 50,
    //Курсор перетаскивания
    grabCursor: true,

    //Переключение при клике на слайд
    slideToClickedSlide: false,

    //Навигация по хешу
    hashNavigation: {
        //Отслеживать состояние
        watchState: true,
    },

    //Автовысота
    autoHeight: true,

    //Кол-во слайдов для показа
    slidesPerView: 2.5,
    //Расстояние можду слайдами
    spaceBetween: 46,

    breakpoints: {
        // when window width is >= 320px
        280: {
          slidesPerView: 1,
          spaceBetween: 0
        },
        // when window width is >= 480px
        600: {
          slidesPerView: 2,
          spaceBetween: 16
        },
        992: {
            slidesPerView: 2.5,
            spaceBetween: 32
          },
        1024: {
            slidesPerView: 2.5,
            spaceBetween: 46
        },
    },

    //Отключение функционала
    //Если слайдов меньше чем нужно
    watchOverflow: true,

    //Кол-во пролистываемых слайдов
    slidesPerGroup: 1,

    //Свободный режим
    freeMode: false,

    //Скорость
    speed: 400,

    //Обновить свайпер при изменении элементов слайдера
    observer: true,
    //Обновить свайпер при изменении родительских элементов слайдера
    observeParents: true,
    //Обновить свайпер при изменении дочерних элементов слайдера
    observeSlideChildren: true,
});
const swiperMenu = new Swiper('.body-menu__slider', {
    // Optional parameters(horizontal, vertical)
    direction: 'horizontal',
    loop: true,

    // If we need pagination
    /* pagination: {
      el: '.swiper-pagination',
      //Буллеты
      //clickable: true,
      //Динамическиу буллеты
      //dynamicBullets: true,

      //Фракция
      //type: 'fraction',

      //Progressbar
      type: 'progressbar',
    }, */

    // Navigation arrows
    /* navigation: {
        nextEl: '.slide-page-slider__arrow_next',
        prevEl: '.slide-page-slider__arrow_prev',
    }, */

    // And if we need scrollbar
    /* scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
        dragSize: 1000,
    }, */

    //Включение/Выключение
    //перетаскивания на ПК
    simulateTouch: true,
    //Чустривельность свайпа
    touchRatio: 1,
    //Угол срабатывания свайпа
    touchAngle: 50,
    //Курсор перетаскивания
    grabCursor: true,

    //Переключение при клике на слайд
    slideToClickedSlide: false,

    //Навигация по хешу
    hashNavigation: {
        //Отслеживать состояние
        watchState: true,
    },

    //Автовысота
    autoHeight: true,

    //Кол-во слайдов для показа
    slidesPerView: 1,
    //Расстояние можду слайдами
    spaceBetween: 0,

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

    //Скорость
    speed: 400,

    //Обновить свайпер при изменении элементов слайдера
    observer: true,
    //Обновить свайпер при изменении родительских элементов слайдера
    observeParents: true,
    //Обновить свайпер при изменении дочерних элементов слайдера
    observeSlideChildren: true,
});

const questionButtons = document.querySelectorAll('.item-questions__icon');
const questionContent = document.querySelectorAll('[data-open]');
if(questionButtons.length > 0){
    for(let index = 0; index < questionButtons.length; index++){
        const questionButton = questionButtons[index];
        
        questionButton.addEventListener("click", function(e){
            let questionButtonData = questionButton.getAttribute('data-btn');
            let questionContentData = questionContent[index].getAttribute('data-open');
            
            if(questionButtonData === questionContentData){
                questionButton.classList.toggle('_active');
                questionContent[index].classList.toggle('_active');
            }
            
            e.preventDefault();
        });
    }
}

var slider = document.getElementById('slider');
noUiSlider.create(slider, {
    start: [20],
    connect: false,
    range: {
        'min': 0,
        'max': 1000
    }
});

const filterItems = document.querySelectorAll(".category-filter__item");
if(filterItems.length > 0){
    for (let index = 0; index < filterItems.length; index++){
        const filterItem = filterItems[index];

        filterItem.addEventListener("click", function(e){
            filterItem.classList.toggle("_choosed");
        });
    }
}