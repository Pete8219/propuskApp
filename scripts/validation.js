
form.addEventListener('submit', (e) => {
      Validation();
        e.preventDefault();

});


function Validation() {
    let errors = document.querySelectorAll('.error');
    if(!errors.length) {
        let fields = document.querySelectorAll('.field');
         for(let i=0; i<fields.length; i++){
             if(fields[i] == ''){
                fields[i].style.borderColor='#ced4da'; 
                let errorText = 'Пожалуйста заполните пустые поля';
                  showModal(errorText);

             }
            }
        } else
        {
            getData();
        }
         
            
         
    
}




/* function emptyValue(){
    let alert = document.querySelector('.alert'); 

    

    if(!org.value) {

        alert.style.display='block';
        let error = errorBlock('Заполните поле организация');
        alert.append(error);

    }
    if(!inn.value) {
        let error = errorBlock('Заполните поле ИНН');
        
        alert.append(error);

    }
} */

function getData() {
    let nomer_inn;
    let okved='';
    let array ={kod:'', desc:''};
    var orgData ={
       inn:'',
       okved: [],
    };

    nomer_inn = inn.value;

    orgData.inn = nomer_inn;



    post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party', {query: nomer_inn})
    .then(data => {
        
       
        let requestData = data.suggestions;


        
        okved = requestData[0].data.okved;
        array.kod = okved;

        orgData.okved.push(array);
        okved = orgData.okved[0].kod;
        
        return okved;
            
        })
    .then(okved => {
        postOkved('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/okved2', {query: okved})
            .then(data => {
            let DataOkved = data.suggestions;
            
            let desc = DataOkved[0].value;
            
            array.desc = desc;
            
            return desc;
                 
                })
            .then(desc => {
                let kod = orgData.okved[0].kod;
                var sForm = new FormData(getPass);

                for(value of sForm.values()){
                    console.log(value);
                }
                
                sForm.append("desc", desc);
                sForm.append("kod", kod);
       
                var xhr = new XMLHttpRequest();
                xhr.withCredentials = true;
                
                xhr.addEventListener("readystatechange", function() {
                if(this.readyState === 4 && this.status == 200) {

                    let data = JSON.parse(this.responseText);

                    showModal(data);
                   
                    /* console.log('Data saved successfully', data); */
                }
                });
                
                xhr.open("POST", "./admin/api/save.php");
                
                xhr.send(sForm);
                clearForm();
                });        
                
    })
      
             // обрабатываем результат вызова response.json()
    .catch(error => console.error(error))





function post(url, data) {
return fetch(url, {
    credentials: 'same-origin',  
    method: 'post',
    body: JSON.stringify(data),  
    headers: new Headers({
    'Content-Type':'application/json',
    'Accept':'application/json',
    'Authorization':'Token *****',
    })  
    })
    .then(response=>response.json());
}

}



function postOkved(url, data) {
return fetch(url, {
    credentials: 'same-origin',  
    method: 'post',
    body: JSON.stringify(data),  
    headers: new Headers({
    'Content-Type':'application/json',
    'Accept':'application/json',
    'Authorization':'Token ****',
    })  
    })
    .then(response=>response.json());
}
 

function getInnOkved() {
    let inn = orgData.inn;
    let kod = orgData.okved[0].kod;
}



function showModal(data) {

    let modalB = document.querySelector('.modal-body');
    let ModalText = document.createTextNode(data);
    modalB.append(ModalText);


    $('#myModal').modal({
        keyboard: true
    });
    
}

function clearForm() {
    form.reset();

}
