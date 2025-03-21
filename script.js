// Активная стрелка
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
// Шапка
document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.main-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(194, 225, 246, 0.9)'; /* Полупрозрачный фон */
            header.style.borderBottom = '2px solid #1e90ff'; // Добавляем границу
        } else {
            header.style.borderBottom = 'none'; // Убираем границу
            header.style.backgroundColor = '#c2e1f6'; /* Полностью непрозрачный фон */
        }
    });
});
