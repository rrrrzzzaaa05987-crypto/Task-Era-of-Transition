// الشاشات (Cards)
const loginCard = document.getElementById('loginCard');
const registerCard = document.getElementById('registerCard');
const forgotPasswordCard = document.getElementById('forgotPasswordCard');
const verifyCodeCard = document.getElementById('verifyCodeCard');
const resetPasswordCard = document.getElementById('resetPasswordCard');

// الأزرار والنماذج
const showRegisterBtn = document.getElementById('showRegisterBtn');
const showLoginBtn = document.getElementById('showLoginBtn');
const showForgotPasswordBtn = document.getElementById('showForgotPasswordBtn');
const backToLoginBtns = document.querySelectorAll('.backToLogin');

const forgotForm = document.getElementById('forgotForm');
const verifyForm = document.getElementById('verifyForm');
const resetForm = document.getElementById('resetForm');

// عناصر إدخال كلمة المرور الجديدة ومساحات الأخطاء
const newPasswordInput = document.getElementById('newPassword');
const confirmNewPasswordInput = document.getElementById('confirmNewPassword');
const newPasswordError = document.getElementById('newPasswordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

// دالة إخفاء جميع الواجهات
function hideAllCards() {
    loginCard.classList.add('hidden');
    registerCard.classList.add('hidden');
    forgotPasswordCard.classList.add('hidden');
    verifyCodeCard.classList.add('hidden');
    resetPasswordCard.classList.add('hidden');
}

// أزرار التنقل الرئيسية
showRegisterBtn.addEventListener('click', () => {
    hideAllCards();
    registerCard.classList.remove('hidden');
});

showLoginBtn.addEventListener('click', () => {
    hideAllCards();
    loginCard.classList.remove('hidden');
});

showForgotPasswordBtn.addEventListener('click', () => {
    hideAllCards();
    forgotPasswordCard.classList.remove('hidden');
});

backToLoginBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        hideAllCards();
        loginCard.classList.remove('hidden');
    });
});

// 1. عند الضغط على "التالي" في نسيت كلمة المرور -> الانتقال لشاشة التحقق
forgotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    hideAllCards();
    verifyCodeCard.classList.remove('hidden');
    startTimer();
});

// 2. عند الضغط على "المتابعة" بعد أدخال الرمز -> الانتقال لشاشة تعيين كلمة المرور الجديدة
verifyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    hideAllCards();
    resetPasswordCard.classList.remove('hidden');
});

// === دواء وإدارة أخطاء المدخلات ===
function showError(inputElement, errorElement, message) {
    inputElement.classList.remove('border-transparent', 'bg-[#f1f5f9]');
    inputElement.classList.add('border-red-500', 'bg-red-50/30');

    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}

function clearError(inputElement, errorElement) {
    inputElement.classList.remove('border-red-500', 'bg-red-50/30');
    inputElement.classList.add('border-transparent', 'bg-[#f1f5f9]');

    errorElement.textContent = '';
    errorElement.classList.add('hidden');
}

// 3. عند الضغط على "تأكيد" في كلمة المرور الجديدة (التحقق من الخانات والتطابق)
resetForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newPassVal = newPasswordInput.value.trim();
    const confirmPassVal = confirmNewPasswordInput.value.trim();

    let isValid = true;

    // مسح أية أخطاء سابقة
    clearError(newPasswordInput, newPasswordError);
    clearError(confirmNewPasswordInput, confirmPasswordError);

    // التحقق من الحقل الأول (كلمة المرور الجديدة)
    if (newPassVal === '') {
        showError(newPasswordInput, newPasswordError, 'يرجى إدخال كلمة المرور الجديدة');
        isValid = false;
    } else if (newPassVal.length < 6) {
        showError(newPasswordInput, newPasswordError, 'يجب أن تكون كلمة المرور 6 أحرف على الأقل');
        isValid = false;
    }

    // التحقق من الحقل الثاني (تأكيد كلمة المرور)
    if (confirmPassVal === '') {
        showError(confirmNewPasswordInput, confirmPasswordError, 'يرجى تأكيد كلمة المرور');
        isValid = false;
    } else if (newPassVal !== confirmPassVal) {
        showError(confirmNewPasswordInput, confirmPasswordError, 'كلمتا المرور غير متطابقتين');
        isValid = false;
    }

    // إذا كانت البيانات صحيحة
    if (isValid) {
        alert('تم تغيير كلمة المرور بنجاح!');
        newPasswordInput.value = '';
        confirmNewPasswordInput.value = '';

        hideAllCards();
        loginCard.classList.remove('hidden');
    }
});

// إزالة التنبيه الأحمر بمجرد بدء الكتابة والتعديل من المستخدم
newPasswordInput.addEventListener('input', () => clearError(newPasswordInput, newPasswordError));
confirmNewPasswordInput.addEventListener('input', () => clearError(confirmNewPasswordInput, confirmPasswordError));

// التنقل التلقائي بين خانات رمز التحقق
const otpInputs = document.querySelectorAll('.otp-input');
otpInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        if (e.target.value.length === 1 && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            otpInputs[index - 1].focus();
        }
    });
});

// عداد رمز التحقق
function startTimer() {
    let timeLeft = 59;
    const timerElement = document.getElementById('timer');

    const interval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(interval);
            timerElement.textContent = "00:00";
        } else {
            const seconds = timeLeft < 10 ? `0${timeLeft}` : timeLeft;
            timerElement.textContent = `00:${seconds}`;
            timeLeft--;
        }
    }, 1000);
}

// دالة عامة لإظهار وإخفاء كلمة المرور عند الضغط على أيقونة العين
function setupPasswordToggle(inputId, toggleBtnId) {
    const input = document.getElementById(inputId);
    const btn = document.getElementById(toggleBtnId);
    if (input && btn) {
        btn.addEventListener('click', () => {
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            const icon = btn.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }
}

// تفعيل ميزة إظهار كلمة المرور لكل الشاشات
setupPasswordToggle('loginPassword', 'toggleLoginPassword');
setupPasswordToggle('regPassword', 'toggleRegPassword');
setupPasswordToggle('regConfirmPassword', 'toggleRegConfirmPassword');
setupPasswordToggle('newPassword', 'toggleNewPassword');
setupPasswordToggle('confirmNewPassword', 'toggleConfirmNewPassword');