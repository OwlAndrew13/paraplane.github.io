// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Находим элемент стрелки
    const arrow = document.querySelector('.hero::after');

    // Если стрелка кликабельна (например, если это отдельный элемент, а не псевдоэлемент)
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('click', () => {
            window.scrollBy({
                top: window.innerHeight - 50, // Прокрутка на высоту экрана минус высота header
                behavior: 'smooth' // Плавная прокрутка
            });
        });
    }
});
// script.js
document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.main-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)'; /* Полупрозрачный фон */
        } else {
            header.style.backgroundColor = '#121212'; /* Полностью непрозрачный фон */
        }
    });
});