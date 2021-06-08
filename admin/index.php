<?php
require_once("./auth.php"); 

require("./api/dbconn.php");

if(isset($_GET['page'])) {
	$page = $_GET['page'];
} else {
	$page = 1;
}

if(isset($_GET['status'])){
	$status = $_GET['status'];
}


if(isset($status) && !empty($status)) {
	/* $nomer_auto = trim($_POST['nomer_auto']); */
	$sql = "SELECT * FROM inform WHERE  status='$status'";

}elseif(isset($_POST['nomer_auto'])&&(!empty($_POST['nomer_auto']))) {


	$nomer_auto = trim($_POST['nomer_auto']);
	$sql = "SELECT * FROM inform WHERE nomer LIKE '%$nomer_auto%'";

}else {
	$limit = 10;

	$number = ($page * $limit) - $limit;

	$query = "SELECT COUNT(*) FROM inform";

	$res_count = mysqli_query($conn, $query);
	$row = mysqli_fetch_row($res_count);
	$total = $row[0];
	$str_page = ceil($total/$limit);


	$sql = "SELECT * FROM inform LIMIT $number, $limit ";

}



$result = mysqli_query($conn, $sql);


?>

<!DOCTYPE html>
<html lang="en">

<head>
 <title>Поиск номера по базе</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
  <link rel="stylesheet" href="./style.css">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
</head>
<body>
	<style>
		@media only screen and (max-device-width: 560px) { 
		
		}

		// Medium devices (tablets, 768px and up)
		@media (max-width: 768px) { 
		
		}
		
		// Large devices (desktops, 992px and up)
		@media (max-width: 992px) { 
			
			div.container {width:992px};
		}
		
		// Extra large devices (large desktops, 1200px and up)
		@media (min-width: 1200px) {
			div.container {width:1200px};
			
		}
	</style>
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalCenterTitle">Сообщение</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        
      </div>
      <div class="modal-footer">
        <button type="button" class="closeModal btn btn-primary" data-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
</div>
	


<div class="container" >



			<nav class="navbar  navbar-expand-lg navbar-dark bg-dark">
			<a class="navbar-brand" href="./index.php" style="margin-right:2em;">
    <img src="./images/89.png" width="30" height="30" alt="" style="margin-right:1em;">Спецпропуск v1.0
  </a>
  <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item">
        <a class="work nav-link" href="./index.php?status=Обработка">В обработке <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="success nav-link" href="./index.php?status=Выдан">Выдано</a>
      </li>
      <li class="nav-item">
        <a class="fail nav-link" href="./index.php?status=Отказ">Отказано</a>
	  </li>
	  <li class="nav-item active">
        <a class="fail nav-link" href="./index.php">Сбросить фильтр</a>
      </li>
    </ul>

							


			<form class="form-inline" method="POST" action="">
				<input class="form-control mr-sm-2" type="search" name="nomer_auto" placeholder="Госномер авто" aria-label="Search">
				<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Искать</button>
			</form>
		</nav>
		
		<nav class="navbar navbar-light bg-light">
  <form class="form-inline" name="delForm">
	<button class="delete btn btn-danger btn-sm" name="delete_row[]" onclick="delRecord()" type="button">Удалить записи</button>
	<!-- <button class="success btn btn-outline-primary btn-sm" type="button">На обработке</button>
	<button class="success btn btn-outline-success btn-sm" type="button">Выдано</button>
	<button class="success btn btn-outline-warning btn-sm" type="button">Отказано</button> -->

	
    
  </form>
</nav>


	
  
	<div class="result-table">	
		<table class="table table-striped" border="1" cellpadding="10px" width="95%" align="center" style="font-size:0.8em;">
			<thead class="thead-dark" align="center">	 
				<tr>
					<th></th>
					<th>Организация</th>
					
					<th>Номер авто</th>
					<th>Марка авто</th>
					<th>ИНН</th>
					<th>ОКВЭД</th>
					<th>Статус</th>
				</tr> 
			</thead>	
			
				<?php
				$i =1;
				while ($data = mysqli_fetch_array($result)) {
					
					?>
			
				<tr>
					<td><?php echo"<input type=\"checkbox\"  class=\"check\" name=\"delete_row[]\" value=\"{$data['id']}\"><span class=\"num_id\">{$i}</span>";?></td>
					<td><?php echo"<a href='edit.php?id={$data['id']}' onclick=\"edit({$data['id']});return false;\">".$data['org']."</a>";?></td>
					<td><?php echo $data['nomer'];?></td>
					<td><?php echo $data['marka'];?></td>
					<td><?php echo $data['inn'];?></td>
					<td><?php echo $data['kod'];?></td>
					<td><?php echo $data['status'];?></td>
				</tr>
					
				<?php 
				$i++;
				}?> 
		</table> 
	</div>
 
	

 <nav >
  <ul class="pagination justify-content-center ">

	<?php
	for ($i = 1; $i <=$str_page; $i++) {
		echo "<li class=\"page-item\"><a class=\"page-link\" href = index.php?page=".$i.">".$i."</a></li>"; 
	}
?>
</ul>
</nav>




<div class="editRecord"  style="display:none">
	<form name="editPass" class="editPass" action="">
		<div class="form-group">
			<label for="organization">Полное название организации, индивидуального предпринимателя*</label>
            <input class="org form-control field" type="text" name="org">      
            <label>Адрес, местонахождения*</label>
            <input class="address form-control field"  type="text" name="address">  
            <label>ИНН*</label>
			<input class="inn form-control field" type="text"  name="inn"> 
			<label>ОКВЭД</label>
			<input class="kod form-control field" type="text"  name="kod"> 
			<label>Вид деятельности</label>
			<input class="transcript form-control field" type="text"  name="transcript"> 
			<label>Дополнительные виды деятельности</label>
			<textarea class="additional form-control field" name="additional" rows="3"></textarea>     
            <label>ФИО руководителя*</label>
            <input class="ruk form-control field" type="text" name="ruk">      
            <label>Контактный телефон руководителя*</label>
            <input class="phone form-control field" type="text" name="phone">  
            <label>Электронный адрес руководителя*</label>
            <input class="email form-control field"  type="email" name="email"> 
            <label>Госномер автомобиля, для которого нужен пропуск на время карантина.*<br>Например: C001АА89</label>
			<input class="nomer form-control field"  type="text" name="nomer"> 
			<label>Марка авто</label>
			<input class="marka form-control field" type="text" name="marka">
			<label>Статус заявки</label>
            <select id="status" class="status form-control" onChange="changeStatus()"> 
				<option value="" selected></option>
				<option value="Выдан">Выдан</option>
				<option value="Отказ">Отказ</option>
				<option value="Обработка">Обработка</option>
			</select>	
			<label>Причина отказа</label>
			<input class="reason form-control field" type="text" name="reason">
            
            <br>     
            
		<button class="save btn btn-primary" type="submit" style="margin-right:2em;">Сохранить</button>
		<button class="cancel btn btn-success" type="button">Отменить</button> 
		<button class="send btn btn-warning" style="float:right" type="button"> Выдать пропуск</button> 
		</div>
	</form>
</div>
  
 </div>


<script src="script/edit.js"></script>
<script src="script/delete.js"></script>


</body>
</html>

 