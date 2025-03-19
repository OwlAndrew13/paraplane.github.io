// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Находим элемент стрелки
    const arrow = document.querySelector('.hero::after');

    // Если стрелка кликабельна (например, если это отдельный элемент, а не псевдоэлемент)
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('click', () => {
            window.scrollBy({
                top: window.innerHeight - 120, // Прокрутка на высоту экрана минус высота header
                behavior: 'smooth' // Плавная прокрутка
            });
        });
    }
});