<?php

//В переменную $token нужно вставить токен, который нам прислал @botFather
$token = "6041689515:AAG9FpOav86RAWUCgh6HxF1HEWJD7c_sC18";

//Сюда вставляем chat_id
$chat_id = "-686363484";

//Определяем переменные для передачи данных из нашей формы
if ($_POST['title'] == 'Реклама_консультація') {
    $form_name = ($_POST['form_name']);
    $phone = ($_POST['phone']);

//Собираем в массив то, что будет передаваться боту
    $arr = array(
        'Имя:' => $form_name,
        'Телефон:' => $phone
    );

//Настраиваем внешний вид сообщения в телеграме
    foreach($arr as $key => $value) {
        $txt .= "<b>".$key."</b> ".$value."%0A";
    };

//Передаем данные боту
    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

//Выводим сообщение об успешной отправке
    if ($sendToTelegram) {
        alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
    }

//А здесь сообщение об ошибке при отправке
    else {
        alert('Что-то пошло не так. ПОпробуйте отправить форму ещё раз.');
    }
}

?>