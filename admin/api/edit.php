<?php
/* require_once("/service/dbconn.php"); */
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

    if(isset($_POST['id'])&&(!empty($_POST['id']))) {
        $id= $_POST['id'];

        $status_query = "SELECT status FROM inform WHERE id=$id";
        $status = mysqli_query($conn, $status_query);

        $st = [];

        while($row = $status->fetch_assoc()) {
            $st = $row["status"];
        }
        
    }
        if(strcmp($st,"Выдан")== 0 || strcmp($st, "Отказ") == 0) {

            $query = "SELECT * FROM inform WHERE id=$id";
            $result = mysqli_query($conn, $query);
            
            $jsonData = [];
            

            while($row_data = $result->fetch_assoc()) {
                $jsonData[] = $row_data;
                
            }

        } else {
                $edit = "Редактируется";
  
                $query = "SELECT * FROM inform WHERE id=$id";
                $res = mysqli_query($conn, $query);
                
                $jsonData = array();
    
                while($row = $res->fetch_assoc()) {
                    $jsonData[] = $row;
                    
                }

                $sql = "UPDATE inform SET status='$edit' WHERE id='$id'";
                $update_status = mysqli_query($conn, $sql);

            }
        echo json_encode($jsonData, JSON_UNESCAPED_UNICODE);

   
        $result->close();
        $sql->close();
        mysqli_close($conn);
    

?>


