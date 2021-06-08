<?php
/* require_once("/service/dbconn.php"); */
$ini = parse_ini_file("./app.ini");


$host =$ini['db_host'];
$db = $ini['db_name'];
$table = $ini['db_table'];
$user = $ini['db_user'];
$password= $ini['db_password'];


$id = $_POST['id'];
$org = $_POST['org'];
$address = $_POST['address'];
$inn = $_POST['inn'];
$kod = $_POST['kod'];
$transcript = $_POST['transcript'];
$additional = $_POST['additional'];
$ruk = $_POST['ruk'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$nomer = $_POST['nomer'];
$status = $_POST['status'];
$reason = $_POST['reason'];
$keygen = $_POST['keygen'];




$conn = mysqli_connect($host, $user, $password, $db);
if(!$conn) {
    echo "Ошибка соединения с базой данных". PHP_EOL;
} 

if(isset($_POST['id'])&&(!empty($_POST['id']))) {
    
        
 
        $query = "UPDATE inform SET org='$org', address='$address', inn='$inn', kod='$kod',".
        " transcript='$transcript', additional = '$additional', ruk='$ruk', phone='$phone', email='$email', nomer='$nomer',".
        " status='$status', reason = '$reason', keygen = '$keygen' WHERE id='$id' LIMIT 1";
        $result = mysqli_query($conn, $query); 

        if(!($result)) {
            echo "Ошибка сохранения данных";
        }
        

      

        echo json_encode($result);
    
        /* $result->close(); */
        mysqli_close($conn);
    }

?>


