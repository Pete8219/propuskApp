document.addEventListener("DOMContentLoaded", () => {
    let link = document.location.href;
    
    
    
    function getURLParameter(sUrl, sParam) {
        let sPageURL = sUrl.substring(sUrl.indexOf('?') + 1);
        let sURLVariables = sPageURL.split('&');
        for (let i = 0; i < sURLVariables.length; i++) {
            let sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                

                getCode(sParameterName);
                return sParameterName[1];
                
            }
        }
    }
    
    getURLParameter(link, 'nomer');
   
    
    
    
    async function getCode(data){
        
        
        let nomer = data[1];
        let searchForm = new FormData();
        searchForm.append("nomer", nomer);
    
        
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.addEventListener("readystatechange", function() {
          if(this.readyState === 4) {
            result = (JSON.parse(this.responseText));
            showCar(result); 
            console.log(result);
          }
        });
        
        xhr.open("POST", "./admin/api/getAuto.php");
        
        xhr.send(searchForm);
    
    }


    function showCar(data){
        let id = data[0].id;

        let div = document.querySelector('.list');

        div.innerHTML += 'Номер пропуска: ' + data[0].id +'<br>';
        div.innerHTML += 'Госномер авто: ' + data[0].nomer +'<br>';
        div.innerHTML += 'Марка авто: ' + data[0].marka +'<br>';

       
    }



});