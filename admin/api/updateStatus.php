<?php


$ini = parse_ini_file("./app.ini");



$host =$ini['db_host'];
$db = $ini['db_name'];
$table = $ini['db_table'];
$user = $ini['db_user'];
$password= $ini['db_password'];


$conn = mysqli_connect($host, $user, $password, $db);
if(!$conn) {
    echo "Ошибка соединения с базой данных". PHP_EOL;
} 

$status = $_POST['status'];
$id = $_POST['id'];
$keygen = $_POST['keygen'];


    if(isset($id) && !empty($id))  {


        if(isset($status) && !empty($status)) {

            if(isset($keygen) && !empty($keygen)) {

                
    
                $query = "UPDATE inform SET status ='$status', keygen='$keygen' WHERE id='$id'";
                $update = mysqli_query($conn, $query);
                if($update) {
                    $mesKeygen = "новый ключ ".$keygen;
                    echo json_encode($mesKeygen);
                }

            }else {

                /* $result = mysqli_query($conn, $query); */ 
    
                $sql = "UPDATE inform SET status='$status' WHERE id='$id'";
                $update_status = mysqli_query($conn, $sql);
                if($update_status) {
                    $message = "Статус установлен в состояние ".$status;
                    echo json_encode($message);
                }
            }

            

            
    

        } else {
           echo json_encode("Состояние не получено");
        }
       

    }

    

    $result->close();
    $sql->close();
    mysqli_close($conn);

?>
