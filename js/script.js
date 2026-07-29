// 1. Selectors (تحديد العناصر من الـ DOM)
const hostingBtn = document.getElementById('hostingBtn');
const designBtn = document.getElementById('designBtn');

const hostingCards = document.getElementById('hostingCards');
const designCards = document.getElementById('designCards');

// الكلاسات الخاصة بحالة الزر النشط والغير نشط
const activeClasses = ['bg-gradient-to-r', 'from-[#1d2558]', 'to-[#3e8e8c]', 'text-white', 'border-transparent'];
const inactiveClasses = ['bg-transparent', 'text-gray-600', 'border-gray-300'];

// 2. Action Functions (الأفعال التي ستُنفذ)

// فعل إظهار قسم الاستضافة
function activateHosting() {
    // إظهار بطاقات الاستضافة وإخفاء بطاقات التصميم
    hostingCards.classList.remove('hidden');
    designCards.classList.add('hidden');

    // تغيير تنسيق زر الاستضافة ليصبح نشطاً
    hostingBtn.classList.add(...activeClasses);
    hostingBtn.classList.remove(...inactiveClasses);

    // تغيير تنسيق زر التصميم ليصبح غير نشط
    designBtn.classList.remove(...activeClasses);
    designBtn.classList.add(...inactiveClasses);
}

// فعل إظهار قسم التصميم
function activateDesign() {
    // إظهار بطاقات التصميم وإخفاء بطاقات الاستضافة
    designCards.classList.remove('hidden');
    hostingCards.classList.add('hidden');

    // تغيير تنسيق زر التصميم ليصبح نشطاً
    designBtn.classList.add(...activeClasses);
    designBtn.classList.remove(...inactiveClasses);

    // تغيير تنسيق زر الاستضافة ليصبح غير نشط
    hostingBtn.classList.remove(...activeClasses);
    hostingBtn.classList.add(...inactiveClasses);
}

// 3. Event Listeners (ربط الأحداث مع الأفعال)
hostingBtn.addEventListener('click', activateHosting);
designBtn.addEventListener('click', activateDesign);



 