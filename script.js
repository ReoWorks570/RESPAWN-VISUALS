// Вставьте сюда ваши данные из Firebase Console
const firebaseConfig = {
    databaseURL: "ВАШ_DATABASE_URL_ЗДЕСЬ"
};

// Инициализация (упрощенная работа через REST API)
const DB_URL = firebaseConfig.databaseURL + '/reviews.json';

async function saveReview(name, text) {
    const review = { name, text, date: Date.now() };
    await fetch(DB_URL, {
        method: 'POST',
        body: JSON.stringify(review),
        headers: { 'Content-Type': 'application/json' }
    });
}

async function loadReviews() {
    const response = await fetch(DB_URL);
    const data = await response.json();
    if (!data) return [];
    
    return Object.values(data).sort((a, b) => b.date - a.date);
}

// Пример использования при отправке:
async function handleSendReview() {
    const name = document.getElementById('nameInput').value;
    const text = document.getElementById('reviewInput').value;
    
    if (name && text) {
        await saveReview(name, text);
        // Обновляем список на экране после отправки
        renderReviews();
    }
}

// Пример отрисовки (вызывайте при загрузке страницы):
async function renderReviews() {
    const reviews = await loadReviews();
    const container = document.getElementById('reviewsContainer');
    container.innerHTML = '';
    
    reviews.forEach(r => {
        const div = document.createElement('div');
        div.className = 'review-item';
        div.innerHTML = `<strong>${r.name}</strong><p>${r.text}</p>`;
        container.appendChild(div);
    });
}
