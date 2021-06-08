<?php
    // Имя пользователя и его пароль для аутентификации
    $username = '****';
    $password = '****';
    
    if(!isset($_SERVER['PHP_AUTH_USER']) || 
       !isset($_SERVER['PHP_AUTH_PW']) ||
       ($_SERVER['PHP_AUTH_USER'] != $username) ||
       ($_SERVER['PHP_AUTH_PW'] != $password)) {
           // Имя пользователя не действительны для отправки HTTP-заголовков,
           // подтверждающих аутентификацию
           header('HTTP/l.1 401 Unauthorized');
           header('WWW-Authenticate: Basic rеаlm="Страница аутентификации"'); 
           exit('Извините, вы должны ввести правильные имя и пароль');
       }
?>