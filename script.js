let currentProductId = 'web';
let currentSubTier = 'site';
let currentLang = 'ru';
let currentCurr = 'KZT';

const rates = { KZT: 1, RUB: 0.20, USD: 0.0021, EUR: 0.0019 };
const symbols = { KZT: '₸', RUB: '₽', USD: '$', EUR: '€' };

// Резервное хранилище на случай блокировки LocalStorage в инкогнито
let memoryStorage = {};

function safeGetStorage(key) {
    try {
        return localStorage.getItem(key);
    } catch(e) {
        return memoryStorage[key] || null;
    }
}

function safeSetStorage(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch(e) {
        memoryStorage[key] = value;
    }
}

const translations = {
    ru: {
        fromText: "от",
        heroTitle: "Имбовые сайты и дизайн",
        heroSubtitle: "Выбирай услугу под свои задачи. Премиальный дизайн, адаптивность под любые устройства и плавная анимация.",
        filterAll: "Все услуги", filterWeb: "Веб-разработка", filterDesign: "Брендинг",
        moreBtn: "Подробнее", backBtn: "← Назад к списку", priceTag: "Стоимость услуги",
        reviewsTitle: "Отзывы клиентов", sendReview: "Отправить отзыв", footerRights: "Все права защищены.",
        placeholderName: "Ваше имя", placeholderReview: "Ваш отзыв...",
        tgButton: "Обсудить со мной в Telegram (@lgma_570)",
        noReviews: "Пока нет отзывов. Будьте первыми!",
        processTag: "Как мы работаем",
        processTitle: "От стратегии до запуска",
        processDescWeb: "Ведём проект пошагово: каждый этап заканчивается приёмкой. Сроки и стоимость фиксируем до старта, а на финише передаём исходный код, доступы и обучаем работе с сайтом.",
        processDescLogo: "Создаём логотип поэтапно: от глубокого анализа бренда и скетчей до финальной детализации и передачи всех векторных исходников.",
        step1TitleWeb: "Аналитика и стратегия", step1TextWeb: "Изучаем задачи, аудиторию и конкурентов, фиксируем цели и структуру сайта.",
        step2TitleWeb: "Прототип и дизайн", step2TextWeb: "Проектируем интерфейс под конверсию, создаём уникальный визуальный стиль.",
        step3TitleWeb: "Разработка", step3TextWeb: "Чистая верстка, программирование, интеграция интерактивных элементов и анимаций.",
        step4TitleWeb: "Оптимизация", step4TextWeb: "Настраиваем адаптивность под любые устройства, скорость загрузки и базовое SEO.",
        step5TitleWeb: "Запуск", step5TextWeb: "Перенос на хостинг, проверка работы, передача исходников и полная поддержка.",
        step1TitleLogo: "Анализ и бриф", step1TextLogo: "Изучаем специфику вашего бизнеса, целевую аудиторию и пожелания по стилю.",
        step2TitleLogo: "Концепты", step2TextLogo: "Разрабатываем несколько уникальных вариантов дизайна логотипа на выбор.",
        step3TitleLogo: "Доработка", step3TextLogo: "Утверждаем лучший вариант и дорабатываем детали по вашим правкам.",
        step4TitleLogo: "Гайдлайн", step4TextLogo: "Формируем правила использования логотипа на различных носителях.",
        step5TitleLogo: "Передача", step5TextLogo: "Высылаем полный комплект исходных файлов во всех векторных форматах.",
        infoTag: "О студии",
        infoTitle: "Разрабатываем цифровые продукты высочайшего качества",
        infoText: "Respawn Visuals — это современный подбор решений для вашего бизнеса или личного бренда. Мы создаём быстрые сайты с чистой версткой и выразительным дизайном, а также разрабатываем уникальные логотипы, выделяющие вас среди конкурентов. Каждая деталь доводится до идеала: от плавной анимации элементов до удобства работы на смартфонах.",
        infoFeat1Title: "100% Адаптив", infoFeat1Desc: "Идеальный вид на смартфонах, планшетах и широких мониторах.",
        infoFeat2Title: "Высокая скорость", infoFeat2Desc: "Чистый оптимизированный код для мгновенной загрузки страниц.",
        infoFeat3Title: "Прозрачный процесс", infoFeat3Desc: "Сроки и цена фиксируются заранее. Работа сдаётся поэтапно.",
        tiers: {
            site: { name: "Сайт", price: 20000, desc: "Базовый адаптивный сайт с чистым дизайном.", features: ["Адаптивная верстка (ПК, планшеты, телефоны)", "Современный и чистый дизайн в темной стилистике", "Быстрая оптимизация кода и высокая скорость загрузки", "Прямая поддержка и обсуждение правок"] },
            sitePlus: { name: "Сайт+", price: 35000, desc: "Расширенный функционал и интерактивные анимации.", features: ["Всё, что входит в тариф 'Сайт'", "Плавные интерактивные анимации при наведении", "Интерактивные элементы интерфейса и формы обратной связи", "Расширенная SEO-оптимизация"] },
            siteUltra: { name: "Сайт Ультра", price: 60000, desc: "Премиум-решение с уникальной графикой и максимальной кастомизацией.", features: ["Всё, что входит в тариф 'Сайт+'", "Эксклюзивный индивидуальный дизайн и айдентика", "Продвинутые интерактивные скрипты и высокая сложность", "Приоритетная разработка и техподдержка 24/7"] },
            logo: { name: "Логотип", price: 10000, desc: "Базовый стильный логотип для вашего проекта.", features: ["1 уникальная концепция логотипа", "Подбор фирменной цветовой гаммы", "Базовые исходники для соцсетей и веба"] },
            logoPlus: { name: "Логотип+", price: 18000, desc: "Несколько вариантов концептов и расширенный набор файлов.", features: ["Всё из тарифа 'Логотип'", "3 уникальных концепта на выбор", "Исходные векторные файлы (AI, EPS, SVG, PNG)", "Варианты адаптации под аватарки и баннеры"] },
            logoUltra: { name: "Логотип Ультра", price: 30000, desc: "Максимальный пакет с глубокой проработкой и бренд-гайдом.", features: ["Всё из тарифа 'Логотип+'", "Неограниченные правки на этапе согласования", "Мини-гайдлайн по использованию стиля", "Приоритетная разработка за 24-48 часов"] }
        },
        cards: {
            web: { name: "Создание сайтов", tag: "Web Dev & UI", sub: "Полноценный адаптивный сайт с интерактивными элементами и высокой производительностью.", basePrice: 20000 },
            branding: { name: "Логотипы", tag: "Logo & Design", sub: "Уникальные логотипы, иконки и фирменный стиль для вашего проекта.", basePrice: 10000 }
        }
    },
    en: {
        fromText: "from",
        heroTitle: "Imba Websites & Design",
        heroSubtitle: "Choose a service for your tasks. Premium design, responsiveness across all devices, and smooth animations.",
        filterAll: "All Services", filterWeb: "Web Dev", filterDesign: "Logos",
        moreBtn: "Details", backBtn: "← Back to list", priceTag: "Service Price",
        reviewsTitle: "Client Reviews", sendReview: "Submit Review", footerRights: "All rights reserved.",
        placeholderName: "Your name", placeholderReview: "Your review...",
        tgButton: "Discuss with me on Telegram (@lgma_570)",
        noReviews: "No reviews yet. Be the first!",
        processTag: "How we work",
        processTitle: "From strategy to launch",
        processDescWeb: "We guide the project step-by-step. Deadlines and costs are fixed before starting, and at the finish we hand over the source code and accesses.",
        processDescLogo: "Creating a logo step-by-step: from deep brand analysis and sketches to final detailing and source files.",
        step1TitleWeb: "Analytics & Strategy", step1TextWeb: "Studying tasks, audience, and competitors, establishing site goals and structure.",
        step2TitleWeb: "Prototype & Design", step2TextWeb: "Designing interface for high conversion, creating unique visual identity.",
        step3TitleWeb: "Development", step3TextWeb: "Clean markup, coding, integration of interactive elements and animations.",
        step4TitleWeb: "Optimization", step4TextWeb: "Configuring multi-device adaptability, loading speed, and basic SEO.",
        step5TitleWeb: "Launch", step5TextWeb: "Hosting deployment, final check, source code handover and support.",
        step1TitleLogo: "Analysis & Brief", step1TextLogo: "Exploring your business specifics, audience, and style preferences.",
        step2TitleLogo: "Concepts", step2TextLogo: "Developing several unique logo design options to choose from.",
        step3TitleLogo: "Revision", step3TextLogo: "Approving the best option and refining details based on your feedback.",
        step4TitleLogo: "Guidelines", step4TextLogo: "Setting up rules for logo usage across different media.",
        step5TitleLogo: "Handover", step5TextLogo: "Sending a full set of source files in all vector formats.",
        infoTag: "About Us",
        infoTitle: "We develop high-quality digital products",
        infoText: "Respawn Visuals offers modern solutions for your business or personal brand. We build fast websites with clean code and striking design, as well as unique logos that stand out from competitors.",
        infoFeat1Title: "100% Adaptive", infoFeat1Desc: "Flawless view on phones, tablets, and wide monitors.",
        infoFeat2Title: "High Speed", infoFeat2Desc: "Clean optimized code for instant page loading.",
        infoFeat3Title: "Transparent Process", infoFeat3Desc: "Fixed timelines and costs upfront. Phased delivery.",
        tiers: {
            site: { name: "Website", price: 20000, desc: "Basic adaptive website with clean design.", features: ["Adaptive layout", "Modern dark design", "Fast optimization", "Direct support"] },
            sitePlus: { name: "Website+", price: 35000, desc: "Extended functionality and interactive animations.", features: ["Everything in 'Website'", "Smooth hover animations", "Interactive UI elements & forms", "Advanced SEO optimization"] },
            siteUltra: { name: "Website Ultra", price: 60000, desc: "Premium solution with unique graphics and max customization.", features: ["Everything in 'Website+'", "Exclusive custom design & identity", "Advanced scripts & high complexity", "Priority dev & 24/7 support"] },
            logo: { name: "Logo", price: 10000, desc: "Basic stylish logo for your project.", features: ["1 unique logo concept", "Brand color palette", "Basic source files for web"] },
            logoPlus: { name: "Logo+", price: 18000, desc: "Multiple concept options and expanded file set.", features: ["Everything in 'Logo'", "3 unique concepts to choose from", "Vector files (AI, EPS, SVG, PNG)", "Avatar and banner adaptations"] },
            logoUltra: { name: "Logo Ultra", price: 30000, desc: "Maximum package with deep elaboration and brand guide.", features: ["Everything in 'Logo+'", "Unlimited revisions during approval", "Mini style guide", "Priority development in 24-48 hours"] }
        },
        cards: {
            web: { name: "Website Creation", tag: "Web Dev & UI", sub: "Individual interface development for any of your tasks.", basePrice: 20000 },
            branding: { name: "Logos", tag: "Logo & Design", sub: "Unique logos, icons, and branding for your project.", basePrice: 10000 }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const currDropdown = document.getElementById('currDropdown');
    const langDropdown = document.getElementById('langDropdown');

    if(document.getElementById('currBtn')) {
        document.getElementById('currBtn').addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.remove('active');
            currDropdown.classList.toggle('active');
        });
    }

    if(document.getElementById('langBtn')) {
        document.getElementById('langBtn').addEventListener('click', (e) => {
            e.stopPropagation();
            currDropdown.classList.remove('active');
            langDropdown.classList.toggle('active');
        });
    }

    document.addEventListener('click', () => {
        if(currDropdown) currDropdown.classList.remove('active');
        if(langDropdown) langDropdown.classList.remove('active');
    });

    if(currDropdown) {
        currDropdown.querySelectorAll('.mini-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const curr = item.getAttribute('data-curr');
                const label = item.getAttribute('data-label');
                
                currDropdown.querySelectorAll('.mini-item').forEach(b => b.classList.remove('active'));
                item.classList.add('active');
                
                setCurrency(curr, label);
                currDropdown.classList.remove('active');
            });
        });
    }

    if(langDropdown) {
        langDropdown.querySelectorAll('.mini-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const lang = item.getAttribute('data-lang');
                const label = item.getAttribute('data-label');
                
                langDropdown.querySelectorAll('.mini-item').forEach(b => b.classList.remove('active'));
                item.classList.add('active');
                
                setLanguage(lang, label);
                langDropdown.classList.remove('active');
            });
        });
    }
});

function setLanguage(lang, label) {
    currentLang = lang;
    document.getElementById('langLabel').innerText = label;
    document.body.removeAttribute('dir');

    const t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.innerText = t[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) el.setAttribute('placeholder', t[key]);
    });

    const grid = document.getElementById('servicesGrid');
    const cards = grid.children;
    const keys = ['web', 'branding'];
    const currentSymbol = symbols[currentCurr];
    const fromWord = t.fromText || 'от';

    for (let i = 0; i < cards.length; i++) {
        const k = keys[i];
        if (t.cards[k]) {
            cards[i].querySelector('.card-tag').innerText = t.cards[k].tag;
            cards[i].querySelector('.card-name').innerText = t.cards[k].name;
            cards[i].querySelector('.card-desc').innerText = t.cards[k].sub;
        }
    }

    const baseWeb = translations.ru.tiers.site.price;
    const convertedWeb = Math.round(baseWeb * rates[currentCurr]);
    cards[0].querySelector('.card-price').innerText = `${fromWord} ${convertedWeb.toLocaleString()} ${currentSymbol}`;

    const baseLogo = translations.ru.tiers.logo.price;
    const convertedLogo = Math.round(baseLogo * rates[currentCurr]);
    cards[1].querySelector('.card-price').innerText = `${fromWord} ${convertedLogo.toLocaleString()} ${currentSymbol}`;

    if (document.getElementById('detailPage').classList.contains('active')) {
        updateDetailContent(currentProductId);
        renderReviews(currentProductId);
    }
}

function setCurrency(curr, label) {
    currentCurr = curr;
    document.getElementById('currLabel').innerText = label;

    const grid = document.getElementById('servicesGrid');
    const cards = grid.children;
    const t = translations[currentLang];
    const fromWord = t.fromText || 'от';

    const baseWeb = translations.ru.tiers.site.price;
    const convertedWeb = Math.round(baseWeb * rates[curr]);
    cards[0].querySelector('.card-price').innerText = `${fromWord} ${convertedWeb.toLocaleString()} ${symbols[curr]}`;

    const baseLogo = translations.ru.tiers.logo.price;
    const convertedLogo = Math.round(baseLogo * rates[curr]);
    cards[1].querySelector('.card-price').innerText = `${fromWord} ${convertedLogo.toLocaleString()} ${symbols[curr]}`;

    if (document.getElementById('detailPage').classList.contains('active')) {
        updateDetailPrice();
        renderSubOptions();
    }
}

function filterCards(cat, evt) {
    if (evt && evt.target) {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        evt.target.classList.add('active');
    }

    const cards = document.getElementById('servicesGrid').children;
    for (let card of cards) {
        if (cat === 'all' || card.getAttribute('data-category') === cat) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    }
}

function openDetails(productId) {
    currentProductId = productId;
    currentSubTier = (productId === 'web') ? 'site' : 'logo';
    document.getElementById('mainPage').classList.remove('active');
    document.getElementById('detailPage').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    updateDetailContent(productId);
    renderReviews(productId);
}

function closeDetails() {
    document.getElementById('detailPage').classList.remove('active');
    document.getElementById('mainPage').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateDetailContent(productId) {
    const t = translations[currentLang];
    const data = t.cards[productId];
    if (!data) return;

    document.getElementById('detailTag').innerText = data.tag;
    document.getElementById('detailTitle').innerText = data.name;
    
    renderSubOptions();
    updateSubTierDetails(currentSubTier);

    if (productId === 'web') {
        document.getElementById('processDescText').innerText = t.processDescWeb;
        document.getElementById('step1Title').innerText = t.step1TitleWeb;
        document.getElementById('step1Text').innerText = t.step1TextWeb;
        document.getElementById('step2Title').innerText = t.step2TitleWeb;
        document.getElementById('step2Text').innerText = t.step2TextWeb;
        document.getElementById('step3Title').innerText = t.step3TitleWeb;
        document.getElementById('step3Text').innerText = t.step3TextWeb;
        document.getElementById('step4Title').innerText = t.step4TitleWeb;
        document.getElementById('step4Text').innerText = t.step4TextWeb;
        document.getElementById('step5Title').innerText = t.step5TitleWeb;
        document.getElementById('step5Text').innerText = t.step5TextWeb;
    } else {
        document.getElementById('processDescText').innerText = t.processDescLogo;
        document.getElementById('step1Title').innerText = t.step1TitleLogo;
        document.getElementById('step1Text').innerText = t.step1TextLogo;
        document.getElementById('step2Title').innerText = t.step2TitleLogo;
        document.getElementById('step2Text').innerText = t.step2TextLogo;
        document.getElementById('step3Title').innerText = t.step3TitleLogo;
        document.getElementById('step3Text').innerText = t.step3TextLogo;
        document.getElementById('step4Title').innerText = t.step4TitleLogo;
        document.getElementById('step4Text').innerText = t.step4TextLogo;
        document.getElementById('step5Title').innerText = t.step5TitleLogo;
        document.getElementById('step5Text').innerText = t.step5TextLogo;
    }
}

function renderSubOptions() {
    const t = translations[currentLang];
    const grid = document.getElementById('subOptionsGrid');
    grid.innerHTML = '';

    const tiersKeys = (currentProductId === 'web') 
        ? ['site', 'sitePlus', 'siteUltra'] 
        : ['logo', 'logoPlus', 'logoUltra'];

    tiersKeys.forEach(key => {
        const tier = t.tiers[key];
        const base = translations.ru.tiers[key].price;
        const converted = Math.round(base * rates[currentCurr]);

        const card = document.createElement('div');
        card.className = `sub-option-card ${currentSubTier === key ? 'active' : ''}`;
        card.onclick = () => selectSubTier(key);

        card.innerHTML = `
            <div>
                <div class="sub-option-title">${tier.name}</div>
                <div class="card-desc" style="margin-bottom: 0; font-size: 13px;">${tier.desc}</div>
            </div>
            <div class="sub-option-price">${converted.toLocaleString()} ${symbols[currentCurr]}</div>
        `;
        grid.appendChild(card);
    });
}

function selectSubTier(tierKey) {
    currentSubTier = tierKey;
    renderSubOptions();
    updateSubTierDetails(tierKey);
}

function updateSubTierDetails(tierKey) {
    const t = translations[currentLang];
    const tierData = t.tiers[tierKey];

    document.getElementById('detailSub').innerText = tierData.desc;
    updateDetailPrice();

    const list = document.getElementById('detailFeaturesList');
    list.innerHTML = '';
    tierData.features.forEach(feat => {
        const li = document.createElement('li');
        li.innerText = feat;
        list.appendChild(li);
    });
}

function updateDetailPrice() {
    const base = translations.ru.tiers[currentSubTier].price;
    const converted = Math.round(base * rates[currentCurr]);
    document.getElementById('detailPrice').innerText = `${converted.toLocaleString()} ${symbols[currentCurr]}`;
}

function getStoredReviews() {
    const data = safeGetStorage('respawn_reviews');
    if(!data) return {};
    try {
        return JSON.parse(data);
    } catch(e) {
        return {};
    }
}

function saveReviewsData(reviewsObj) {
    safeSetStorage('respawn_reviews', JSON.stringify(reviewsObj));
}

function renderReviews(productId) {
    const listEl = document.getElementById('reviewsList');
    const allReviews = getStoredReviews();
    const productReviews = allReviews[productId] || [];
    const t = translations[currentLang];

    if (productReviews.length === 0) {
        listEl.innerHTML = `<p style="color: var(--text-muted); font-size: 14px;" data-i18n="noReviews">${t.noReviews}</p>`;
        return;
    }

    listEl.innerHTML = '';
    [...productReviews].reverse().forEach(rev => {
        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
            <div class="review-author">${escapeHtml(rev.author)}</div>
            <div class="review-text">${escapeHtml(rev.text)}</div>
        `;
        listEl.appendChild(card);
    });
}

function submitReview(event) {
    event.preventDefault();
    const authorInput = document.getElementById('reviewAuthor');
    const textInput = document.getElementById('reviewText');

    const author = authorInput.value.trim();
    const text = textInput.value.trim();

    if (!author || !text) return;

    const allReviews = getStoredReviews();
    if (!allReviews[currentProductId]) {
        allReviews[currentProductId] = [];
    }
    
    allReviews[currentProductId].push({ author, text, date: Date.now() });
    saveReviewsData(allReviews);

    authorInput.value = '';
    textInput.value = '';
    renderReviews(currentProductId);
}

function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}