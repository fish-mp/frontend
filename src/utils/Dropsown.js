document.addEventListener("DOMContentLoaded", function() {
    const dropdownButtons = document.querySelectorAll('.header__nav-link--dropdown');
    const blackOverlay = document.querySelector('.header__overlay');

    dropdownButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const targetId = button.getAttribute('data-target');
            const subnav = document.getElementById(targetId);
            const isVisible = subnav.style.display === 'block';
            document.querySelectorAll('.header__subnav').forEach(function(sub) {
                sub.style.display = 'none';
            });
            subnav.style.display = isVisible ? 'none' : 'block';

            blackOverlay.style.display = subnav.style.display === 'block' ? 'block' : 'none';
        });
    });

    document.addEventListener('click', function(event) {
        let isClickInside = false;
        dropdownButtons.forEach(function(button) {
            const targetId = button.getAttribute('data-target');
            const subnav = document.getElementById(targetId);
            if (button.contains(event.target) || subnav.contains(event.target)) {
                isClickInside = true;
            }
        });

        if (!isClickInside) {
            document.querySelectorAll('.header__subnav').forEach(function(subnav) {
                subnav.style.display = 'none';
            });
            blackOverlay.style.display = 'none';
        }
    });

    const subnavLinks = document.querySelectorAll('.header__subnav-link');
    subnavLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            document.querySelectorAll('.header__subnav').forEach(function(subnav) {
                subnav.style.display = 'none';
            });
            blackOverlay.style.display = 'none';
        });
    });

    const burgerButtons = document.querySelectorAll('.header__burger');
    const navMenus = document.querySelectorAll('.header__nav');

    burgerButtons.forEach((burger, index) => {
        burger.addEventListener('click', () => {
            const menu = navMenus[index];
            menu.classList.toggle('active');
            burger.classList.toggle('active');
            blackOverlay.style.display = menu.classList.contains('active') ? 'block' : 'none';
        });
    });
});
