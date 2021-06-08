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

getURLParameter(link, 'keygen');
/* console.log(sParameterName);  */



async function getCode(data){
    
    
    let keygen = data[1];
    let pdfForm = new FormData();
    pdfForm.append("keygen", keygen);

    
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        result = (JSON.parse(this.responseText));
        getPropusk(result); 
        /* console.log(result); */
      }
    });
    
    xhr.open("POST", "./admin/api/getPdf.php");
    
    xhr.send(pdfForm);

}
 
function getPropusk(data){
    let id = data[0].id;
    let nomer = data[0].nomer;
    let marka = data[0].marka;
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
            }, */
    
            content: [
                {
                    text: 'Пропуск №'+id,
                    fontSize: 40,
                    alignment:'center',
                    
                },
                {
                    text: 'Марка ' + marka,
                    fontSize:30,
                    alignment: 'center',
                },
                
                {
                    text: 'Госномер '+ nomer,
                    fontSize:30,
                    alignment: 'center',
                },
                {
                    qr: 'https://app.salekhard.org/auto.php?nomer='+nomer,
                    fit:'300',
                alignment:'center',
            },
                
            ]
    
    }

     pdfMake.createPdf(docInfo).open();
     

       
}

})