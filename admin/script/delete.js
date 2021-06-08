function delRecord() {

    let checkBoxesChecked = [];
    let dForm = new FormData();
    console.log(checkBoxesChecked);
    clearFormData();
    
        let checkBoxes = document.querySelectorAll('.check');
    
        for (let i=0; i < checkBoxes.length; i++) {
            if(checkBoxes[i].checked) {
                checkBoxesChecked.push(checkBoxes[i]);
               /*  console.log(checkBoxesChecked[i].value); */
    
            }
        }
        
        deleteRow(checkBoxesChecked);

        async function deleteRow(data) {

                for(let i = 0; i< data.length; i++){
                    /* console.log(data[i].value); */

                dForm.append("delete_row[]", data[i].value);

                }
    
                try {
                    const response = await fetch('../admin/api/delete.php', {
                        method: 'POST',
                        body: dForm
                    });
                     const res = await response.json();
                     alert('Данные удалены');
                     
                     window.location.href = 'http://localhost:8888/specialPass/admin/index.php'; 
               /*       if(res == true) {
                        console.log("Данные успешно удалены");

                        
                        
                        window.location.href = 'http://localhost:8888/specialPass/admin/index.php'; 
                     
                     } */
                    
                    /* console.log(JSON.stringify(res)); */
                    } catch (error) {
                    console.error('Ошибка:', error);
                    }

                
        }

        function clearFormData(){
                for (let key of dForm.keys()) {
                    dForm.delete(key);
                }
        }        
}





