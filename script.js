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
//Галерея
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    
    let currentIndex = 1; // Индекс активного слайда
    
    // Инициализация слайдера
    function initSlider() {
        updateSlider();
    }
    
    // Обновление слайдера
    function updateSlider() {
        // Скрываем все слайды
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Показываем текущий слайд
        slides[currentIndex].classList.add('active');
        
        // Обновляем точки навигации
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }
    
    // Переход к следующему слайду
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }
    
    // Переход к предыдущему слайду
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    }
    
    // Обработчики событий
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Навигация по точкам
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentIndex = index;
            updateSlider();
        });
    });
    
    // Инициализация
    initSlider();
});
//Отзывы

