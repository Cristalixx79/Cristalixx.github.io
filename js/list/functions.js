//меню - бургер
const burgerIcon = document.querySelector('.menu__icon');

burgerIcon.addEventListener('click', function (e){
    burgerIcon.nextElementSibling.classList.toggle('_active');
    burgerIcon.classList.toggle('_active');

    document.body.classList.toggle('_lock');
});

//проверка на мобильное устройство
const isMobile = {
    Android: function (){
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function (){
        return navigator.userAgent.match(/BlackBerry/i);
    },
    IOS: function (){
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function (){
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function (){
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function (){
        return (
            isMobile.Android()||
            isMobile.BlackBerry()||
            isMobile.IOS()||
            isMobile.Opera()||
            isMobile.Windows());
    }
};

//проверка на мобилу + стрелочка
if(isMobile.any()){
    document.body.classList.add('_touch');

    let menuArrows = document.querySelectorAll('.menu__arrow');
    if(menuArrows.length > 0){
        for(let i = 0; i < menuArrows.length; i++){
            const menuArrow = menuArrows[i];
            menuArrow.addEventListener("click", function(e){
                menuArrow.parentElement.classList.toggle('_active');
            });
        }
    }

}else{
    document.body.classList.add('_pc');
}

//ibg
function ibg(){

    let ibg=document.querySelectorAll(".ibg");
    
    for (var i = 0; i < ibg.length; i++) {
        if(ibg[i].querySelector('img')){
            ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
        }
    }
}
    
ibg();

//прокрутка по сайту(навигация)
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');

if(menuLinks.length > 0){
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', onMenuLinkClick);
    });

    function onMenuLinkClick(e){
        const menuLink = e.target;
        if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('.header').offsetHeight;

            if(burgerIcon.classList.contains('_active')){
                burgerIcon.classList.remove('_active');
                burgerIcon.nextElementSibling.classList.remove('_active');
                document.body.classList.remove('_lock');
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth",
            });
            e.preventDefault();
        }
    }
}