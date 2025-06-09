document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.booking-form');
    const steps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.step');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const submitBtn = document.querySelector('.submit-btn');

    let currentStep = 0;

    function initForm() {
        showStep(currentStep);
        updateButtons();
        setupValidation();
    }

    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });

        stepIndicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === stepIndex);
        });

        updateButtons();

        if (stepIndex === steps.length - 2) {
            updateSummary();
        }
    }

    function updateButtons() {
        prevBtn.disabled = currentStep === 0;
        prevBtn.style.backgroundColor = currentStep === 0 ? '#f0f0f0' : '#1e90ff';
        prevBtn.style.color = currentStep === 0 ? '#555' : 'white';

        nextBtn.style.display = (currentStep < steps.length - 2) ? 'flex' : 'none';
        submitBtn.style.display = (currentStep === steps.length - 2) ? 'flex' : 'none';

        checkStepValidity();
    }

    function checkStepValidity() {
        const currentStepElement = steps[currentStep];
        const requiredInputs = currentStepElement.querySelectorAll('[required]');
        let isValid = true;

        requiredInputs.forEach(input => {
            if (!input.value.trim()) isValid = false;
        });

        const selects = currentStepElement.querySelectorAll('select[required]');
        selects.forEach(select => {
            if (select.selectedIndex === 0) isValid = false;
        });

        nextBtn.disabled = !isValid;
        nextBtn.style.opacity = isValid ? '1' : '0.6';
        nextBtn.style.cursor = isValid ? 'pointer' : 'not-allowed';
    }

    function setupValidation() {
        form.querySelectorAll('input, select, textarea').forEach(element => {
            element.addEventListener('input', checkStepValidity);
            element.addEventListener('change', checkStepValidity);
        });
    }

    function nextStep() {
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
        }
    }

    function prevStep() {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    }

    let isSubmitted = false;

    async function submitForm() {
        if (isSubmitted) {
            alert("Вы уже отправили заявку. Повторная отправка невозможна.");
            return;
        }

        let data = {
            type: document.getElementById("flight-type").value,
            date: document.getElementById("flight-date").value,
            time: document.getElementById("flight-time").value,
            count: document.getElementById("participants").value,
            name: document.getElementById("full-name").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            comm: document.getElementById("comment").value
        };

        try {
            const response = await fetch("php/mail.php", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                }
            });

            const result = await response.text();

            if (result.includes("success")) {
                isSubmitted = true;
                currentStep++;
                showStep(currentStep);
            } else {
                alert("Ошибка при отправке. Ответ сервера: " + result);
            }
        } catch (error) {
            alert("Ошибка соединения с сервером.");
            console.error("Ошибка отправки:", error);
        }
    }

    async function sendTelegramMessage() {
        const username = document.getElementById('tg-username').value.trim();
        if (!username || !username.startsWith('@')) {
            alert("Введите Telegram username в формате @username");
            return;
        }

        try {
            const response = await fetch("php/telegram_user_notify.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: username })
            });

            const result = await response.json();
            if (result.status === "success") {
                alert("Уведомление отправлено в Telegram!");
            } else {
                alert(result.message || "Не удалось отправить уведомление.");
            }
        } catch (error) {
            alert("Ошибка при отправке Telegram-уведомления.");
            console.error(error);
        }
    }

    function updateSummary() {
        document.getElementById('booking-number').textContent = Math.floor(1000 + Math.random() * 9000);
        const flightType = document.getElementById('flight-type').options[document.getElementById('flight-type').selectedIndex].text;
        const flightDate = formatDate(document.getElementById('flight-date').value);
        const flightTime = document.getElementById('flight-time').options[document.getElementById('flight-time').selectedIndex].text;
        const participants = document.getElementById('participants').value;
        const fullName = document.getElementById('full-name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const comment = document.getElementById('comment').value || 'Нет комментариев';

        document.getElementById('summary-type').textContent = flightType;
        document.getElementById('summary-date').textContent = flightDate;
        document.getElementById('summary-time').textContent = flightTime;
        document.getElementById('summary-participants').textContent = participants;
        document.getElementById('summary-name').textContent = fullName;
        document.getElementById('summary-phone').textContent = phone;
        document.getElementById('summary-email').textContent = email;
        document.getElementById('summary-comment').textContent = comment;
    }

    function formatDate(dateString) {
        if (!dateString) return 'Не указана';
        const parts = dateString.split('-');
        return (parts.length === 3) ? `${parts[2]}.${parts[1]}.${parts[0]}` : dateString;
    }

    nextBtn.addEventListener('click', nextStep);
    prevBtn.addEventListener('click', prevStep);
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        submitForm();
    });

    const tgButton = document.querySelector('.send-telegram-btn');
    if (tgButton) {
        tgButton.addEventListener('click', sendTelegramMessage);
    }

    initForm();
});