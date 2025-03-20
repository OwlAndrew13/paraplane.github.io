// script.js
document.addEventListener('DOMContentLoaded', function () {
    const arrow = document.querySelector('.scroll-arrow');
    if (arrow) {
        arrow.addEventListener('click', () => {
            window.scrollBy({
                top: window.innerHeight - 80, // Прокрутка на высоту экрана минус высота header
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