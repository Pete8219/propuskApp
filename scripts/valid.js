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
/*           for(let i=0; i< fields.length; i++) {
              if(fields[i] == ''){
                  let errorText = 'Пожалуйста заполните пустые поля';
                  showModal(errorText);
              }
          } */
          
            
        }
        return true;
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



