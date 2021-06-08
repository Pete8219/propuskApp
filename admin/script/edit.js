
let link = document.location.href;
let idRecord="";
let text="";
let id ;
let state="";
btn_send = document.querySelector('.send');
editOneRecord = document.querySelector('.editRecord'); //получаем блок в котором находится форма
overhead = document.createElement('div'); //создаем блок с затемняющим фоном

let select = document.querySelector('.status'); //список выбора статусов

let statusObj = [ //объект со статусами

    {id: 1, value: "Обработка", text: "Обработка"},
    {id: 2, value: "Выдан", text: "Выдан"},
    {id: 3, value: "Отказ", text: "Отказ"},

];

select.innerHTML = statusObj.map(n => `<option value="${n.value}">${n.text}</option>`).join('');


//Если пользователь обновил страницу в то время когда открыта форма редактирования
//читаем сохраненное в localStorage значение id открытой записи и меняем статус "Редактирование" на
//статус "На рассмотрении", чтобы избежать блокирование записи


 window.addEventListener('unload', ()=>{
    let i = select.selectedIndex;
    let state = select.options[i].value;
    let id = sessionStorage.getItem('id');

    let uForm = new FormData();

    uForm.append('id', id);
    uForm.append('status',state);

    navigator.sendBeacon("../admin/api/updateStatus.php", uForm)
        sessionStorage.clear();
    
}) ;



//Выполняем асинхронный запрос к базе с помощью FormData для выборки данных по выбранной заявке
//Возвращается массив данных в виде json ответа от сервера 
async function edit(id) {
    /* id = id; */
    let idRecord = sessionStorage.setItem('id', id); 
		
    let editForm = new FormData();
    editForm.append("id",id);


    try {
    let response = await fetch('../admin/api/edit.php', {
        method: 'POST',
        body: editForm
    });
    let result = await response.json();
    if(result) {
        console.log(result); //здесь приходит все правильно, так как в базе
        editRecord(result); //передаем дальше, если есть рузультат
        
    }
    
    } catch (error) {
    console.error('Ошибка:', error);
    }	

}

let statusText;
//Функция отслеживания изменения поля Статус в форме
 function changeStatus() {
    let status = document.getElementById('status');
    let i = status.selectedIndex;
    statusText = status.options[i].text;
    
    console.log(statusText);
     //Работает . Выводит в переменную текущий выбранный статус
 }

    




//здесь все работает

function keyGen()
{
    
    let  possible = "abcdefghijklmnopqrstuvwxyz";

    for( let i=0; i < 12; i++ ){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;

}


async function updateStatus(status,id,text) {
    
    let updStatusField = new FormData();
    updStatusField.append("id", id);
    
    updStatusField.append("status", status);
    updStatusField.append("keygen", text);

    for(value of updStatusField.entries()) {
        console.log(value);
    }

    try {
        const response = await fetch('../admin/api/updateStatus.php', {
            method: 'POST',
            body: updStatusField
        });
        const res = await response.json();
        

        if(res == true) {
            console.log("Данные успешно обновлены");
            localStorage.clear();
            
            window.location.href = link; 
            editOneRecord.style.display='none';
            overhead.style.display='none';
            
        }
        
        console.log(JSON.stringify(res));
        } catch (error) {
        console.error('Ошибка:', error);
        }

}


//Изменение полученных данных   Здесь что то не так !!!! не работает, не меняет статус
function editRecord(data) {
    
    clearForm();
    //Блокируем запись, чтобы не было одновременного редактирования записей

    if(data[0].status === "Редактируется"){
        let mess = "Документ редактируется другим пользователем";
        showModal(mess);
    
    } 

    
    document.body.appendChild(overhead);
    overhead.classList.add('underground');

// получаем все значения из формы - Поля
    let form = document.querySelector('.editPass'),
        input_org = form.querySelector('.org');
        input_address = form.querySelector('.address');
        input_inn = form.querySelector('.inn');
        kod = form.querySelector('.kod');
        transcript = form.querySelector('.transcript');
        additional=form.querySelector('.additional');
        input_ruk = form.querySelector('.ruk');
        input_phone = form.querySelector('.phone');
        input_email = form.querySelector('.email');
        input_nomer = form.querySelector('.nomer');
        input_marka = form.querySelector('.marka');
        input_reason = form.querySelector('.reason');
        status = form.querySelector('.status').options;
        
        btn_save = form.querySelector('.save');
        btn_cancel = form.querySelector('.cancel');
 
//Заносим полученные данные  в поля формы 
        id = data[0].id;
        input_org.value= data[0].org;
        input_address.value= data[0].address;
        input_inn.value= data[0].inn;
        kod.value = data[0].kod;
        transcript.value = data[0].transcript;
        additional.value = data[0].additional;
        input_ruk.value= data[0].ruk;
        input_phone.value= data[0].phone;
        input_email.value= data[0].email;
        input_nomer.value= data[0].nomer;
        input_marka.value = data[0].marka;
        input_reason.value = data[0].reason;

        if(data[0].status == 'Выдан' || data[0].status == 'Отказ'){
        select.value = data[0].status;
        select.disabled = true;
        btn_send.disabled = true;
        btn_save.disabled = true;
        }else {
            select.value = 'Обработка';
        }
        
        
        
    btn_send.addEventListener('click', ()=> {

        //Получаем уникальный номер записи
        clientId = data[0].id;
        select.value = 'Выдан';
        state = select.value;
        keyGen();// запускаем функцию генерации случайно кода
        console.log(text);
        updateStatus(state,clientId,text); // добавили параметр text
    
        sendPostToClient(clientId);
    });

        editOneRecord.style.display='block';

        //Отслеживание нажаний на кнопку Отмена

    btn_cancel.addEventListener('click', (e)=>{
        e.preventDefault();
        
          statusText = select.value;
          updateStatus(statusText,id,text);
      //Перенаправляем на текущую страницу
         setTimeout(function() {
            window.location.href = link;
            editOneRecord.style.display='none';
            overhead.style.display='none';
        },1000); 
     
    });


   
        
        //Отслеживание нажатий на кнопку Сохранить

    btn_save.addEventListener('click', (e) => {
        let i = select.selectedIndex;
        let state = select.options[i].value;
        
        
        console.log(state);
            
           let text = keyGen();
           updRec(state,text);
            
    });


    async function updRec(state,text) {

        let updateForm = new FormData(editPass);
        updateForm.append("id",id);
        updateForm.append("status",state);
        updateForm.append("keygen",text);


        try {
            const response = await fetch('../admin/api/update.php', {
                method: 'POST',
                body: updateForm
            });
             const res = await response.json();
             

             if(res == true) {
                console.log("Данные успешно обновлены");
                alert("Данные успешно ообновлены");
                
                window.location.href = link; 
                editOneRecord.style.display='none';
                overhead.style.display='none';
                
             }
            
            console.log(JSON.stringify(res));
            } catch (error) {
            console.error('Ошибка:', error);
            }


    }

 

}





async function sendPostToClient(id) {
    console.log(text);
    let sendPostForm = new FormData();

    sendPostForm.append("id", id);
  /*   sendPostForm.append("keygen", text); */

    try {
        const response = await fetch('../admin/api/sendPost.php', {
            method: 'POST',
            body: sendPostForm
        });
         const result = await response.json();
         

         if(result) {
            
            alert("Сообщение успешно отправлено");
            
            window.location.href = link; 
            editOneRecord.style.display='none';
            overhead.style.display='none';
            
         }
        
        
        } catch (error) {
        console.error('Ошибка:', error);
        }

}

/* function sendPost(data) {
    let id = data.id;
    let nomer = data.nomer;
    let marka = data.marka;
    console.log(data);
 
    let docInfo = {

        info: {
            title:'Разрешение на въезд',
            author:'Администрация МО город Салехард',
            subject:'Спецпропуск',
            keywords:'спецпропуск, Салехард, самоизоляция'
            },
    
            pageSize : 'A4',
            pageOrientation: 'portrait',
            pageMargins: [50,50,30,60],
    
          /*   header: function(currentPage, pageCount) {
                return {
                    text: currentPage.toString() + 'из' + pageCount,
                    alignment: 'right',
                    margin: [0,30,10,50]
                }
            }, 
    
            content: [
                {
                    text: 'Пропуск №',
                    fontSize: 40,
                    alignment:'center',
                    
                },
                {
                    text: nomer,
                    fontSize:30,
                    alignment: 'center',
                },
                
                {
                    text: marka,
                    fontSize:30,
                    alignment: 'center',
                },
                {
                    qr: 'https://propusk.salekhard.org/index.php?id='+id,
                    fit:'300',
                alignment:'center',
            },
                
            ]
    
    }

      pdfMake.createPdf(docInfo).download(nomer+'.pdf'); 

} */

function showModal(data) {

    let modalB = document.querySelector('.modal-body');
    let btnCloseModal = document.querySelector('.closeModal');
    let close = document.querySelector('.close');

    let ModalText = document.createTextNode(data);
    modalB.append(ModalText);

    btnCloseModal.addEventListener('click', ()=>{
        window.location.href = link;
        editOneRecord.style.display='none';
        overhead.style.display='none';
    });

    close.addEventListener('click', ()=>{
        window.location.href = link;
        editOneRecord.style.display='none';
        overhead.style.display='none'; 
    });


    $('#myModal').modal({
        keyboard: true
    });
    
}


 function clearForm() {
     document.querySelector('.editPass').reset();
     
    
}


