document.addEventListener('DOMContentLoaded', function() {

    let form = document.querySelector('.getPass');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
    
    
        Validation();
    
       
    
    });
    
    function Validation() {
        let errors = form.querySelectorAll('.error');
    
        if(!errors.length) {
           send();
        }
    }

    function clearForm() {
        form.reset();

    }
    
    function send() {


    var data = new FormData(getPass);

    
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log(JSON.parse(this.responseText));
      }
    });
    
    xhr.open("POST", "http://localhost:8888/specialPass/service/process.php");
    
    xhr.send(data);

    clearForm();
       
        
    }

    


});

