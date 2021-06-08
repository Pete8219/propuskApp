<?php
$ini = parse_ini_file("/app.ini");

//$host =$ini['db_host'];
$host = '******';
$db = '******';
$table = $ini['db_table'];
$user = '******';
$password= '******';



//Получаем переменные из массива POST

$org = $_POST['org'];
$address = $_POST['address'];
$inn = $_POST['inn'];
$kod = $_POST['kod'];
$transcript = $_POST['desc'];
$ruk = $_POST['ruk'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$marka = $_POST['marka'];
$nomer = $_POST['nomer'];
$status = 'Обработка';



//Функция очистки переменных

function clean($value="") {
    $value = trim($value);
    $value = stripslashes($value);
    $value = strip_tags($value);
    $value = htmlspecialchars($value);

    return $value;
}



    $org = clean($org);
    $address = clean($address);
    $inn = clean($inn);
    $kod = clean($kod);
    $transcript = clean($transcript);
    $ruk = clean($ruk);
    $phone = clean($phone);
    $email = clean($email);
    $marka = clean($marka);
    $nomer = clean($nomer);

    

    if(!empty($org)&& !empty($address) && !empty($inn) && !empty($ruk) && !empty($phone) && !empty($email) 
    && !empty($marka) && !empty($nomer)) {

        $email_validate = filter_var($email, FILTER_VALIDATE_EMAIL);

        if($email_validate) {


            try {
                // Открываем соединение, указываем адрес сервера, имя бд, имя пользователя и пароль
                $db = new PDO("mysql:host=$host;dbname=$db", $user, $password,array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));
                // Устанавливаем атрибут сообщений об ошибках (выбрасывать исключения)
                $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
             
              
            
            $statement = $db->prepare('SELECT * FROM inform WHERE nomer = ?');
            
            $statement->execute([$_POST['nomer']]);
            $result = $statement->fetch();
            
            if($result){
                $row['message'] = "Автомобилю с таким госномером уже выдан пропуск";
                echo json_encode($row['message']);
            }
            
            
            else {
                
            
                  //создаем ассоциативный массив для подстановки в запрос
                $data = array (
                    'org' => $org,
                    'address' => $address,
                    'inn' => $inn,
                    'kod' => $kod,
                    'transcript' => $transcript,
                    'ruk' => $ruk,
                    'phone' => $phone,
                    'email' => $email,
                    'marka' => $marka,
                    'nomer' => $nomer,
                    'status' => $status
                );
            
                //Запрос на создание записи в таблице
            
                $query = "INSERT INTO inform (org,address,inn,kod,transcript,ruk,phone,email,marka,nomer,status)".
                " VALUES (:org,:address,:inn,:kod,:transcript,:ruk,:phone,:email,:marka,:nomer,:status)";
                $stmt = $db-> prepare($query);
                //выполение запроса
                $res = $stmt->execute($data);
            	
            	$message = [];
                $message["text"] = "После рассмотрения заявки на Ваш электронный адрес будет выслано уведомление";
            
                echo ($message["text"]);
            	
             
            	}
            }
            
            catch(PDOException $e) {
                echo "Ошибка записи в базу данных: ". $e->getMessage();
            }
            
            $db = null;



        } else {
            $err["text"] = "Введенные данные некорректны";
            echo json_encode($err["text"]);
        }

    } else {
        $text["err"] = "Пожалуйста заполните пустые поля";
        echo json_encode($text["err"]);
    }
    
    

?>