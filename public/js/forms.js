// Перенесённая функция отправки форм из index.php
async function submitForm(event) {
    event.preventDefault(); // отключаем перезагрузку/перенаправление страницы
    try {
        // Формируем запрос
        const response = await fetch(event.target.action, {
            method: 'POST',
            body: new FormData(event.target)
        });
        // если был редирект — переходим на адрес
        if (response.redirected) {
            window.location.href = response.url || '/success.php';
            return;
        }
        // проверяем, что ответ есть
        if (!response.ok) throw (`Ошибка при обращении к серверу: ${response.status}`);
        // анализируем тип содержимого
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('text/html')) {
            window.location.href = '/success.php';
            return;
        }
        if (contentType.includes('application/json')) {
            const json = await response.json();
            if (json.result === "success") {
                window.location.href = '/success.php';
            } else {
                console.log(json);
                throw (json.info || 'Ошибка отправки');
            }
            return;
        }
        // неизвестный формат — безопасный переход на success
        window.location.href = '/success.php';
    } catch (error) { // обработка ошибки
        alert(error);
    }
}

// Экспорт для модульной загрузки (если потребуется)
if (typeof window !== 'undefined') window.submitForm = submitForm;
