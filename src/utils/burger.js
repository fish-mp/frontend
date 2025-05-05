document.addEventListener("DOMContentLoaded", () => {
    const burgerMenu = document.querySelector('.header__burger img');
    const sidebar = document.querySelector('.sidebar');
    const sidebarClose = document.querySelector('.sidebar__close');
    const sidebarDropdownLinks = document.querySelectorAll('.sidebar__nav-link--dropdown');

    burgerMenu.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    sidebarClose.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });

    sidebarDropdownLinks.forEach(link => {
        link.addEventListener('touchstart', () => {
            const dropdownContent = link.nextElementSibling;
            dropdownContent.style.display = dropdownContent.style.display === 'none' || !dropdownContent.style.display ? 'flex' : 'none';
            link.classList.toggle('active');
        });
    });
});
