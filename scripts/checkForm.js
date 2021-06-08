document.addEventListener("DOMContentLoaded", () => {

    let form = document.querySelector('.getPass');


    let org = form.querySelector('.org');
    let address = form.querySelector('.address');
    let inn = form.querySelector('.inn');
    let ruk = form.querySelector('.ruk');
    let phone = form.querySelector('.phone');
    let mail = form.querySelector('.email');
    let nomer_auto = form.querySelector('.nomer');
    let check = form.querySelector('.form-check-input');
    let btn = form.querySelector('.btn');
    let fields = form.querySelectorAll('.field');
    let errors = form.querySelectorAll('.error');
    
    
    
    
    
    function errorBlock(message) {
        let error = document.createElement('div');
            error.className = 'error';
            error.style.color = 'red';
            error.style.fontStyle = 'italic';
            error.style.fontSize = '0.7em';
            error.innerHTML = message;
            return error;
    }
    
    function removeValidation(data) {
        let errors = form.querySelectorAll('.error');
      
        for (let i = 0; i < errors.length; i++) {
          if(data.previousElementSibling == errors[i]) {
            errors[i].remove();
          }  
          
        }
    }
    
    function getErrors (data) {
        let error = form.querySelectorAll('.error');
            if(data.previousElementSibling != error) {
            }
            return true;
    }

    
    
    function checkFields() {
        
        let errArray = [];
        if(!errors.length) {
            
            for(let i=0; i< fields.length; i++) {
                if(!fields[i].value){
                    errArray.push(i);
                    
                    
                    
                } 
                
            } 

            
            if(errArray.length > 0) {
                let errorText = 'Пожалуйста заполните пустые поля';
                showModal(errorText);

            }
            
        }
        console.log(errArray.length)
       return errArray;
        
        
    }
    
    
    
    org.addEventListener('blur', () => {
     if(getErrors(org)) {
    
        let regex = new RegExp(/[А-Яа-я0-9 \"]+/);
        if (regex.test(org.value.trim()) !== true) {
            
            let error = errorBlock("Введите название вашей организации. Название должно быть написано русскими буквами");
            org.parentElement.insertBefore(error, org);
        }
    }
    
        return true;
    });
    
    org.addEventListener('focus', () => {
        removeValidation(org);
    });
    
    address.addEventListener('blur', () => {
        if(getErrors(address)) {
    
        let regex = new RegExp(/[А-Яа-я0-9 \"\.\-\,\/\/]+/);
        if(regex.test(address.value.trim()) !== true) {
            let error = errorBlock("Введите адрес. Он должен быть написан русскими буквами");
            address.parentElement.insertBefore(error,address);
        }
    }
        return true;
    });
    
    address.addEventListener('focus', () =>{
        removeValidation(address);
    });
    
    
    ruk.addEventListener('blur', () => {
        if (getErrors(ruk)) {
        let regex = new RegExp(/[А-Яа-я0-9 \s]+/);
        if(regex.test(ruk.value.trim()) !== true){
          let error = errorBlock("Введите ФИО руководителя русскими буквами");
          ruk.parentElement.insertBefore(error,ruk);
        }
    }
        return true;
    });
    
    ruk.addEventListener('focus', () =>{
        removeValidation(ruk);
    });
    
    
    // Validate input field Inn
    inn.addEventListener('blur', () => {
        if(getErrors(inn)) {
          let regex = new RegExp(/\d{10,12}/);
          if(regex.test(inn.value.trim()) !== true) {
              let error = errorBlock("Введите ИНН. Номер ИНН должен содержать только цифры и быть длиной от 10 до 12 цифр");
              inn.parentElement.insertBefore(error,inn);
                      
              } 
            }
              return true; 
    });
    
    inn.addEventListener('focus', () => {
        removeValidation(inn);
    });
    
    
    
    phone.addEventListener('blur', () =>{
        if(getErrors(phone)) {
       let regex = new RegExp(/[+\(\)\d]+/);
       if(regex.test(phone.value.trim()) !==true) {
           let error = errorBlock("Введите номер телефона");
           phone.parentElement.insertBefore(error, phone);
       }
    }
       return true;
    })
    
    phone.addEventListener('focus', () => {
        removeValidation(phone);
    
    });
    
    
    mail.addEventListener('blur', () => {
        if(getErrors(mail)){
        let regex = new RegExp(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/);
        if(regex.test(mail.value) !== true) {
            let error = errorBlock("Введите корректный адрес электронной почты");
            mail.parentElement.insertBefore(error,mail);
        } 
    }
        return true;
    })
    
    mail.addEventListener('focus', () => {
        removeValidation(mail);
    })
          
    nomer_auto.addEventListener('blur', () => {
        if(getErrors(nomer_auto)) {
            let regex = new RegExp(/(^([А-Я0-9]){7,8})$/);
            if(regex.test(nomer_auto.value) !==true) {
                let error = errorBlock("Введите корректный госномер автомобиля");
                        nomer_auto.parentElement.insertBefore(error,nomer_auto);
          
            }
        }
        return true;
    })
    
    
    check.addEventListener('change', () => {
        if(getErrors(check)) {
            if(check.checked !==true){
                let error = errorBlock("Необходимо подтверждение");
                check.parentElement.insertBefore(error, check);
            }
            if(check.checked === true) {
                removeValidation(check);
            }
        }
        return true;
    })
    
    
    
    
    form.addEventListener('submit', (e) => {
        let err = checkFields();
        /* console.log(err); */ 
        e.preventDefault();
        console.log(err);
    
         if(err.length == 0){
            getData();
            
        }
        /* else {
            
            let message = 'Проверьте заполнение полей1';
            showModal(message);
        } */  
    
    });
    
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

                console.log(data);
              let DataOkved = data.suggestions;
              
              let desc = DataOkved[0].value;
              
              array.desc = desc;
              
              return desc;
                   
                  })
              .then(desc => {

console.log(desc);

                  let kod = orgData.okved[0].kod;
                  let descript = desc;
                  var sForm = new FormData(getPass);
    

                  
                  sForm.append("desc", descript);
                  sForm.append("kod", kod);

                  for(value of sForm.entries()) {
                      console.log(value);
                  }
         
                  var xhr = new XMLHttpRequest();
                  xhr.withCredentials = true;
                  
                  xhr.addEventListener("readystatechange", function() {
                  if(this.readyState === 4 && this.status == 200) {
    
                      let data = (this.responseText);
    
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
      'Authorization':'Token ******',
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
      'Authorization':'Token *****',
      })  
      })
      .then(response=>response.json());
    }
  
    
    
    function showModal(data) {
    
      let modalB = document.querySelector('.modal-body');
      let ModalText = document.createTextNode(data);
      modalB.append(ModalText);
    
    
      $('#myModal').modal({
          keyboard: false
      });


      let btnCloseModal = document.querySelector('.closeModal');
      let close = document.querySelector('.close');

      btnCloseModal.addEventListener('click', ()=>{

         ModalText.remove(); 
         let link = './index.php';
            window.location.href = link;
      });
  
      close.addEventListener('click', ()=>{
        ModalText.remove();
        let link = './index.php';
            window.location.href = link; 
      });
      
    }


    
    function clearForm() {
      form.reset();
    
    }
    


});
