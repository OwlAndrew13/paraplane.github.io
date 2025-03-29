document.addEventListener('DOMContentLoaded', function() {
    // Элементы формы
    const form = document.querySelector('.booking-form');
    const steps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.step');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const submitBtn = document.querySelector('.submit-btn');
    
    let currentStep = 0;
    
    // Инициализация формы
    function initForm() {
        showStep(currentStep);
        updateButtons();
    }
    
    // Показать текущий шаг
    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });
        
        stepIndicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === stepIndex);
        });
        
        // Показываем/скрываем кнопки
        if (stepIndex === 0) {
            prevBtn.disabled = true;
        } else {
            prevBtn.disabled = false;
        }
        
        if (stepIndex === steps.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'flex';
        } else {
            nextBtn.style.display = 'flex';
            submitBtn.style.display = 'none';
        }
    }
    
    // Обновить состояние кнопок
    function updateButtons() {
        prevBtn.disabled = currentStep === 0;
    }
    
    // Переход к следующему шагу
    function nextStep() {
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
        }
    }
    
    // Переход к предыдущему шагу
    function prevStep() {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    }
    
    // Обработка отправки формы
    function submitForm() {
        // Здесь можно добавить AJAX-запрос или другую логику отправки
        updateSummary();
        nextStep();
        
        // Генерация номера бронирования
        document.getElementById('booking-number').textContent = 
            Math.floor(1000 + Math.random() * 9000);
    }
    
    // Обновление сводки бронирования
    function updateSummary() {
        document.getElementById('summary-type').textContent = 
            document.getElementById('flight-type').options[document.getElementById('flight-type').selectedIndex].text;
        document.getElementById('summary-date').textContent = 
            document.getElementById('flight-date').value;
        document.getElementById('summary-time').textContent = 
            document.getElementById('flight-time').options[document.getElementById('flight-time').selectedIndex].text;
        document.getElementById('summary-participants').textContent = 
            document.getElementById('participants').value;
        document.getElementById('summary-name').textContent = 
            document.getElementById('full-name').value;
        document.getElementById('summary-phone').textContent = 
            document.getElementById('phone').value;
    }
    
    // Обработчики событий
    nextBtn.addEventListener('click', nextStep);
    prevBtn.addEventListener('click', prevStep);
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitForm();
    });
    
    // Инициализация
    initForm();
});