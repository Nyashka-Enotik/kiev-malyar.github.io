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

        closeButton.addEventListener("click", function () {
            overlay.remove();
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
