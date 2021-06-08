<?php
$ini = parse_ini_file("./app.ini");

$host =$ini['db_host'];
$db = $ini['db_name'];
$table = $ini['db_table'];
$user = $ini['db_user'];
$password= $ini['db_password'];


$id = $_POST['id'];
    //Запрос на создание записи в таблице

    $conn = mysqli_connect($host, $user, $password, $db);
    if(!$conn) {
        echo "Ошибка соединения с базой данных". PHP_EOL;
    } 
    
        if(isset($_POST['id'])&&(!empty($_POST['id']))) {
            
            /* $result['id'] = $id; */
     
            $query = "SELECT keygen, email FROM inform WHERE id='$id'";
            $result = mysqli_query($conn, $query); 
    
            
            $jsonData = array();
    
            while($row = $result->fetch_assoc()) {
                $jsonData[] = $row;
                
            }
    
            echo json_encode($jsonData, JSON_UNESCAPED_UNICODE);
            foreach ($jsonData as $jsonData => $value) {
                
                $keygen = $value['keygen'];
                $email = $value['email'];
            }
            
            $to = $email;


$subject = "Спецпропуск для проезда в Салехард";

$message = ' <p>Для получения пропуска пройдите по ссылке<p><a href=http://app.salekhard.org/quest.php?keygen='.$keygen.'>Пропуск для авто</a>';

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n".
			'From: propusk@salekhard.webtm.ru' . "\r\n" .
    		'Reply-To: propusk@salekhard.webtm.ru' . "\r\n" .
    		'X-Mailer: PHP/' . phpversion();






 

mail($to, $subject, $message, $headers);
            
   
            
            $result->close();
            mysqli_close($conn);
        }


    







?>