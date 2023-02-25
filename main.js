// Hamburger menu open/close
const hamburder = document.getElementsByClassName('main-header__hamburger')[0];
const navigation = document.getElementsByClassName('main-header__nav')[0];
const navigationListLinks = document.body.querySelectorAll('.main-header__list-item');
let isActive = false;

navigation && navigation.addEventListener('transitionend', () => {
    hamburder.removeAttribute('disabled');
    if (isActive) return;
    navigation.classList.remove('is-active');
}, { passive: true });

hamburder && hamburder.addEventListener('click', () => {
    hamburder.setAttribute('disabled', true);
    if (!isActive) {
        isActive = true;
        document.body.style.overflow = 'hidden';
        hamburder.classList.add('is-active');
        navigation.classList.add('is-active');
    } else {
        menuCLose();
    }
}, { passive: true });

for (const navigationListLink of navigationListLinks) {
    navigationListLink.addEventListener('click', () => {
        menuCLose();
    }, { passive: true });
}

function menuCLose() {
    isActive = false;
    hamburder.classList.remove('is-active');
    navigation.classList.remove('is-active');
    document.body.style.overflow = '';

}

// Обробка кліків на зображеннях
const gallery = document.querySelector(".page-photo");
gallery.addEventListener("click", function (event) {
    if (event.target.tagName === "IMG") {
        const overlay = document.createElement("div");
        overlay.classList.add("photo-overlay");

        const closeButton = document.createElement("button");
        closeButton.classList.add("close-button");
        closeButton.innerHTML = "&times;";
        overlay.appendChild(closeButton);

        const img = document.createElement("img");
        img.src = event.target.src;
        img.alt = event.target.alt;

        overlay.appendChild(img);
        document.body.appendChild(overlay);

        document.addEventListener("click", function(event) {
            if (event.target.tagName !== "IMG" || event.target.className === "close-button") {
                overlay.remove();
            }
        });
    }
});


var swiper = new Swiper(".swiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
        el: ".reviews-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".reviews-button-next",
        prevEl: ".reviews-button-prev",
    }
});

const header = document.querySelector(".main-header");
// Додати прослуховувач подій для відстеження скролінгу сторінки
window.addEventListener("scroll", () => {
    // Отримати поточне положення прокрутки сторінки
    const scrollPosition = window.scrollY;
    // Перевірити, чи прокрутка вище, ніж висота шапки
    if (scrollPosition > header.offsetHeight) {
        // Якщо так, додати CSS клас, який закріплює шапку зверху
        header.classList.add("sticky");
    } else {
        // Якщо ні, видалити CSS клас закріплення
        header.classList.remove("sticky");
    }
});

function getQueryVariable(variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i< vars.length;i++) {
        var pair = vars[i].split("=");
        sessionStorage.setItem("pair", pair[1]);
        if(pair[0] == variable) {return pair[1];}
    }
    return(false);
}
if(getQueryVariable('utm_source')){
    sessionStorage.setItem("utm_source", getQueryVariable('utm_source'));
}
if(getQueryVariable('utm_medium')){
    sessionStorage.setItem("utm_medium", getQueryVariable('utm_medium'));
}
if(getQueryVariable('utm_campaign')){
    sessionStorage.setItem("utm_campaign", getQueryVariable('utm_campaign'));
}
if(getQueryVariable('utm_content')){
    sessionStorage.setItem("utm_content", getQueryVariable('utm_content'));
}
if(getQueryVariable('utm_term')){
    sessionStorage.setItem("utm_term", getQueryVariable('utm_term'));
}


for (const contactForm of document.getElementsByClassName('contact-form')) {
    var addinput = document.createElement('input');
    addinput.type="hidden";
    addinput.className ="check";
    addinput.name="check";
    addinput.value="";
    contactForm.firstElementChild.prepend(addinput);

    if (sessionStorage.getItem("utm_source")) {
        let utm_name = "utm_source";
        utm_function(utm_name);
    }
    if (sessionStorage.getItem("utm_medium")) {
        let utm_name = "utm_medium";
        utm_function(utm_name);
    }
    if (sessionStorage.getItem("utm_campaign")) {
        let utm_name = "utm_campaign";
        utm_function(utm_name);
    }
    if (sessionStorage.getItem("utm_content")) {
        let utm_name = "utm_content";
        utm_function(utm_name);
    }
    if (sessionStorage.getItem("utm_term")) {
        let utm_name = "utm_term";
        utm_function(utm_name);
    }

    function utm_function(utm_name){
        let utm_input = document.createElement('input');
        utm_input.type="hidden";
        utm_input.className =utm_name;
        utm_input.name=utm_name;
        utm_input.value=sessionStorage.getItem(utm_name);
        contactForm.firstElementChild.prepend(utm_input);
    }

    contactForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const contactFormFieldset = this.getElementsByClassName('contact-form-fieldset')[0];
        contactFormFieldset.style.pointerEvents = 'none';
        const submitBtn = this.getElementsByClassName('submit-btn')[0];
        submitBtn.innerHTML = '<img src="/img/icon-loading.svg" width="44" height="10" alt="">';

        const response = await fetch('/send.php', {
            method: this.method,
            body: new FormData(this)
        }).catch(console.error);

        const status = response.ok ? 'success' : 'error';
        if (status === 'success') {
            if (typeof dataLayer === 'object') {
                const googleAnal = {
                    'Реклама_консультация': {
                        'eventCategory': 'Заполнение формы Реклама_консультация',
                        'eventAction': 'Успешно заполнена форма Реклама_консультация',
                        'event': 'VirtualPageview'
                    },
                    'default': {
                        'eventCategory': 'При отправке формы произошла ошибка',
                        'eventAction': 'Ошибка',
                        'event': 'VirtualPageview'
                    }
                };
                dataLayer.push(googleAnal[this.querySelector('[name="title"]').value || 'default']);
            }

            window.location.href = '/thanks-you.html';
        } else {
            this.reset();
            submitBtn.innerHTML = submitBtn.dataset.value;
            contactFormFieldset.removeAttribute('style');

            const formAlert = this.querySelector('.form-alert.' + status);
            formAlert.style.display = 'flex';

            const scrollWidth = window.innerWidth - document.body.offsetWidth;
            document.body.setAttribute("style", "overflow: hidden; padding-right: " + scrollWidth + "px;");

            const formWindow = this.getElementsByClassName('form-window')[0];
            formWindow.style.display = 'block';
            requestAnimationFrame(() => {
                formWindow.style.opacity = 1;
            });

            const formWindowClose = function (event) {
                if (event.target === formWindow || event.target === formAlert.getElementsByClassName('close-btn')[0]) {
                    formWindow.removeEventListener('click', formWindowClose);
                    formWindow.removeAttribute('style');
                    document.body.removeAttribute('style');
                }
            }
            formWindow.addEventListener('click', formWindowClose, { passive: true });
        }
    }, { passive: false });
}

