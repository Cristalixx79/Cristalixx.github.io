const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if(popupLinks.length > 0){
    for(let index = 0; index < popupLinks.length; index++){
        const popupLink = popupLinks[index];
        popupLink.addEventListener('click', function(e){
            console.log('click');
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const currentPopup = document.getElementById(popupName);
            popupOpen(currentPopup);
            e.preventDefault();
        });
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if(popupCloseIcon.length > 0){
    for(let i = 0; i < popupCloseIcon.length; i++){
        const el = popupCloseIcon[i];
        el.addEventListener('click', function(e){
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(currentPopup){
    if(currentPopup && unlock){
        const activePopup = document.querySelector('.popup.active');
        if(activePopup){
            popupClose(activePopup, false);
        }
        else{
            bodyLock();
        }
        currentPopup.classList.add('active');
        currentPopup.addEventListener('click', function(e){
            if(!e.target.closest('.popup__content')){
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(activePopup, doUnLock = true){
    if(unlock){
        activePopup.classList.remove('active');
        if(doUnLock){
            bodyUnLock();
        }
    }
}

function bodyLock(){
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if(lockPadding.length > 0){
        for(let i = 0; i < lockPadding.length; i++){
            const el = lockPadding[i];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    console.log('bodyLock');

    unlock = false;
    setTimeout(function(){
        unlock = true;
    }, timeout);
}

function bodyUnLock(){
    setTimeout(function(){
        if(lockPadding.length > 0){
            for(let i = 0; i < lockPadding.length; i++){
                const el = lockPadding[i];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function(){
        unlock = true;
    }, timeout);
}

document.addEventListener('click', function(e){
    if(e.number === 27){
        const activePopup = document.querySelector('.popup.active');
        popupClose(activePopup);
    }
});