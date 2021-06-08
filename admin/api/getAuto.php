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

if (isset($_POST["nomer"]) && !empty($_POST["nomer"])) {
    $nomer = rawurldecode($_POST["nomer"]);


     function clean($value="") {
        $value = trim($value);
        $value = stripslashes($value);
        $value = strip_tags($value);
        $value = htmlspecialchars($value);
    
        return $value;
    }

    $nomer = clean($nomer);

$query = "SELECT id, nomer, marka FROM inform WHERE nomer ='$nomer'";
$result = mysqli_query($conn, $query); 

if(!($result)) {
    echo "Ошибка сохранения данных";
}

$json_data = Array();

while($row_data = mysqli_fetch_array($result)) {
    $json_data[] = $row_data;
    
}
echo json_encode($json_data);

}


?>