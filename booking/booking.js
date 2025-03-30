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
        setupValidation();
    }
    
    // Показать текущий шаг
    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });
        
        stepIndicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === stepIndex);
        });
        
        updateButtons();
        
        // Если это последний шаг - обновляем сводку
        if (stepIndex === steps.length - 1) {
            updateSummary();
        }
    }
    
    // Обновить состояние кнопок
    function updateButtons() {
        // Кнопка "Назад"
        if (currentStep === 0) {
            prevBtn.disabled = true;
            prevBtn.style.backgroundColor = '#f0f0f0';
            prevBtn.style.color = '#555';
        } else {
            prevBtn.disabled = false;
            prevBtn.style.backgroundColor = '#1e90ff';
            prevBtn.style.color = 'white';
        }
        
        // Кнопки "Далее" и "Отправить"
        if (currentStep === steps.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'flex';
        } else {
            nextBtn.style.display = 'flex';
            submitBtn.style.display = 'none';
        }
        
        // Проверяем валидность текущего шага
        checkStepValidity();
    }
    
    // Проверка валидности текущего шага
    function checkStepValidity() {
        const currentStepElement = steps[currentStep];
        const requiredInputs = currentStepElement.querySelectorAll('[required]');
        let isValid = true;
        
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
            }
        });
        
        // Для select проверяем, что выбран не placeholder
        const selects = currentStepElement.querySelectorAll('select[required]');
        selects.forEach(select => {
            if (select.selectedIndex === 0) {
                isValid = false;
            }
        });
        
        // Блокируем/разблокируем кнопку "Далее"
        nextBtn.disabled = !isValid;
        
        // Меняем стиль кнопки
        if (isValid) {
            nextBtn.style.opacity = '1';
            nextBtn.style.cursor = 'pointer';
        } else {
            nextBtn.style.opacity = '0.6';
            nextBtn.style.cursor = 'not-allowed';
        }
    }
    
    // Настройка валидации
    function setupValidation() {
        // Проверка при изменении полей
        form.querySelectorAll('input, select, textarea').forEach(element => {
            element.addEventListener('input', checkStepValidity);
            element.addEventListener('change', checkStepValidity);
        });
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
async function submitForm() {
    // Собираем данные формы
    const formData = {
        flightType: document.getElementById('flight-type').options[document.getElementById('flight-type').selectedIndex].text,
        flightDate: formatDate(document.getElementById('flight-date').value),
        flightTime: document.getElementById('flight-time').options[document.getElementById('flight-time').selectedIndex].text,
        participants: document.getElementById('participants').value,
        fullName: document.getElementById('full-name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        comment: document.getElementById('comment').value || 'Нет комментариев',
        bookingNumber: 'PL-' + Math.floor(1000 + Math.random() * 9000)
    };

    // Обновляем сводку
    updateSummary(formData);
    
    try {
        // Показываем индикатор загрузки
        nextBtn.disabled = true;
        nextBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        
        // Отправляем данные на сервер
        const response = await fetch('/php/sendmail.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
        body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Показываем номер бронирования
            document.getElementById('booking-number').textContent = formData.bookingNumber;
            // Переходим на шаг подтверждения
            currentStep++;
            showStep(currentStep);
        } else {
            alert('Ошибка: ' + result.message);
        }
    } catch (error) {
        alert('Произошла ошибка при отправке: ' + error.message);
    } finally {
        // Восстанавливаем кнопку
        nextBtn.disabled = false;
        nextBtn.innerHTML = 'Далее <i class="fas fa-arrow-right"></i>';
    }
}




    
    // Обновление сводки бронирования
    function updateSummary() {
        // Получаем все введенные данные
        document.getElementById('booking-number').textContent = Math.floor(1000 + Math.random() * 9000); 
        const flightType = document.getElementById('flight-type').options[document.getElementById('flight-type').selectedIndex].text;
        const flightDate = formatDate(document.getElementById('flight-date').value);
        const flightTime = document.getElementById('flight-time').options[document.getElementById('flight-time').selectedIndex].text;
        const participants = document.getElementById('participants').value;
        const fullName = document.getElementById('full-name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const comment = document.getElementById('comment').value || 'Нет комментариев';
        
        // Обновляем сводку
        document.getElementById('summary-type').textContent = flightType;
        document.getElementById('summary-date').textContent = flightDate;
        document.getElementById('summary-time').textContent = flightTime;
        document.getElementById('summary-participants').textContent = participants;
        document.getElementById('summary-name').textContent = fullName;
        document.getElementById('summary-phone').textContent = phone;
        document.getElementById('summary-email').textContent = email;
        document.getElementById('summary-comment').textContent = comment;
    }
    
    // Форматирование даты (из YYYY-MM-DD в DD.MM.YYYY)
    function formatDate(dateString) {
        if (!dateString) return 'Не указана';
        
        const parts = dateString.split('-');
        if (parts.length === 3) {
            return `${parts[2]}.${parts[1]}.${parts[0]}`;
        }
        return dateString;
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
