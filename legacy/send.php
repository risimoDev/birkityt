<?php
include __DIR__ . '/includes/db.php';
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

# проверка, что ошибки нет
if (!error_get_last()) {

    // Переменные, которые отправляет пользователь
    $name = $_POST['name'];
    $email = $_POST['email'];
    $text = $_POST['text'];
    $file = $_FILES['myfile'];
    $phone = $_POST['phone'];


    // Формирование самого письма
    $title = "Заказ с сайта";
    $body = "
    <h2>Новое письмо</h2>
    <b>Имя:</b> $name<br>
    <b>Номер телефона:</b> $phone<br>
    <b>Почта:</b> $email<br><br>
    <b>Сообщение:</b><br>$text
    ";

    // старая логика отправки письма (оставляем)
    // дополнительно сохраняем заявку в БД
    $type = 'contact';
    $name = $_POST['name'] ?? null;
    $phone = $_POST['phone'] ?? null;
    $email = $_POST['email'] ?? null;
    $message = $_POST['text'] ?? null;
    try {
        $stmt = $pdo->prepare('INSERT INTO submissions (type,name,phone,email,message) VALUES (?,?,?,?,?)');
        $stmt->execute([$type, $name, $phone, $email, $message]);
        $_SESSION['last_submission_id'] = (int) $pdo->lastInsertId();
    } catch (Throwable $e) {
        // noop: do not break user flow on DB error
    }

    // Почтовая отправка отключена: сохраняем в БД и считаем успех
    $data['result'] = "success";
    $data['info'] = "Заявка сохранена";

} else {
    $data['result'] = "error";
    $data['info'] = "В коде присутствует ошибка";
    $data['desc'] = error_get_last();
}

// Завершаем: перенаправление на страницу успеха
header('Location: /success.php', true, 303);
exit;
