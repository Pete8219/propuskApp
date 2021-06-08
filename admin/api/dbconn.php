<?php

$host ="localhost";
$db = "******";
$table = "*****";
$user = "*****";
$password= "******";


$conn = mysqli_connect($host, $user, $password, $db);
if(!$conn) {
    echo "Ошибка соединения с базой данных". PHP_EOL;
}





?>