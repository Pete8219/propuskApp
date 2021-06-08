<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" href="./style.css">

    <title>Форма запроса на спецпропуск</title>

    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    <script src="./scripts/pdfmake.min.js"></script>
    <script src="./scripts/vfs_fonts.js"></script>
    

</head>
<body>

    <style>

        form {
            margin-bottom: 5em;
        }
        .navbar {
            width:100%;
            height: 3em;
            margin-bottom: 0.8em;
            border: 1px solid #ced4da;
            border-radius: .25rem;
            
        }
        
        ul.navbar-nav {
            width:100%;
        }

        .dropdown {
            width:100%;
        }
        .dropdown-toggle::after {
            float:right;
            vertical-align: 0.7em;
            margin-top:0.8em;
        }

        .dropdown-item {
            white-space: normal;
        }
        input.form-control {
            
            margin-bottom: 1em;
        }

        .btn {
            margin-top: 2em;
        }

        h2 {
            text-align: center;
        }
    </style>

<!-- Вывод модального окна с информацией -->

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

			<nav class="navbar  navbar-expand-lg navbar-dark bg-dark">
			<a class="navbar-brand" href="./index.php" style="margin-right:2em;">
    <img src="../admin/images/89.png" width="30" height="30" alt="" style="margin-right:1em;">Администрация города Салехарда
  </a>

		</nav>


    <div class="container">
<p style="text-align:justify;">В связи с распространением новой коронавирусной инфекции (COVID-19) Юридическим лицам и ИП необходимо получить специальный пропуск для осуществления своей 
трудовой деятельности на территории МО г.Салехард.</p>

<p style="text-align:justify;">Пропуск могут получить только те Юридические лица и ИП на которых распространяется:<a href="http://publication.pravo.gov.ru/Document/Text/0001202004020025"> Указ Президента Российской Федерации 
от 02 апреля 2020 года № 239 </a> "О мерах по обеспечению санитарно-эпидемиологического благополучия населения на территории
Российской Федерации", а так же Согласно <a href="https://www.yanao.ru/documents/rla/67502/">постановлению Правительства Ямало-Ненецкого автономного округа от 05 апреля 2020
года № 386-П</a> утвержден перечень иных организаций, на которые не распространяется Указ Президента Российской Федерации
от 05 апреля 2020 года № 452-П</p>


<div class="alert alert-danger" role="alert">
  Форма работает с тестовом режиме.
</div>

    	
    <h2>
        Форма для получения спецпропуска для проезда в город Салехард


    </h2>

    <div class="alert alert-danger" role="alert" style="display:none;">
        
    </div>

    <form class="getPass" name="getPass">


            <label for="org">Полное название организации, индивидуального предпринимателя*</label>
            <input class="org form-control field" type="text" name="org">      
            <label>Адрес, местонахождения*</label>
            <input class="address form-control field"  type="text" name="address">
            <div class="form-row">
            	<div class="form-group col-md-6">
            	    <label>ИНН*</label>
            		<input class="inn form-control field" type="text"  name="inn"> 	
            	</div>
            	<div class="form-group col-md-6">
            		<label>ФИО руководителя*</label>
            		<input class="ruk form-control field" type="text" name="ruk"> 	
            	</div>
            	
            </div>
         
                 

            
            <div class="form-row">
            	<div class="form-group col-md-6">
            	    <label>Контактный телефон руководителя*</label>
            		<input class="phone form-control field" type="text" name="phone">
            	</div>
            	<div class="form-group col-md-6">
            		<label>Электронный адрес руководителя*</label>
            		<input class="email form-control field"  type="email" name="email">
            	</div>
            	
            </div>
            <div class="form-row">
            	<div class="form-group col-md-6">
            		<label>Марка авто</label>
            		<input class="marka form-control field" type="text" name="marka">	
            	</div>
            	<div class="form-group col-md-6">
            	     <label>Госномер автомобиля.* Например: C001АА89</label>
            		<input class="nomer form-control field"  type="text" name="nomer"> 	
            	</div>
            </div>
             
            
 
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" checked>
                <label class="form-check-label" for="defaultCheck1">
                    Подтверждаю достоверность изложенных сведений и необходимость этих машин в период карантина*
                </label>
            
            <br>     
            <button type="submit" class="btn btn-primary">Отправить</button>      
            
    </form>

</div>


<!-- <script src="./scripts/valid.js"></script>
<script src="./scripts/validation.js"></script> -->
<script src="./scripts/checkForm.js"></script>

</body>
</html>