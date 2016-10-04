
$(function () {
window.ya.speechkit.settings.apikey = 'c223db7f-dbd3-4b4e-8857-6b843fdc1f2d';
window.ya.speechkit.settings.lang = 'en-US';
var key1 ="trnsl.1.1.20160926T184310Z.9885b4649bae76f8.877401cc97634d55cd6caeff0e6b2d73e675e2ba";	
var textlan;


$("#gotr").on ("click",detectLan);

$("#govoice").on ("click",voiceYandex);




    function detectLan() {
    
   

 if($("#detectlan option:selected").val()=="default") {

 	textlan=$("#fromlang option:selected").val();
 	
 	 translate ();


 } else  if($("#detectlan option:selected").val()=="auto")  {

	var urlApidata={key:key1,text:$("#enterLang").val(),hint:"ru,en,uk"};

    	 $.ajax({
            url:'https://translate.yandex.net/api/v1.5/tr.json/detect',
            dataType: 'jsonp',
           global:false,
            timeout: 60000,
            cache: false,
           data: urlApidata,
            beforeSend: function(){
               
            },

            error: function(){
              
                alert("Error, try again");
            },

            success: function(data){
               
             textlan= data['lang'];
                
                 translate ();
                  
                }
        });
 }
    }









function translate () {

	 

 	var textData = {key:key1,text:$("#enterLang").val(),lang:textlan +"-"+$("#tolang option:selected").val(),format:'plain',options:1};

 	$.ajax({
            url:'https://translate.yandex.net/api/v1.5/tr.json/translate?',
            dataType: 'jsonp',
           global:false,
            timeout: 60000,
            cache: false,
           data: textData,
            beforeSend: function(){
             
            },

            error: function(){
              
            alert("Error, try again");
            },

      
            success: function(data){
                  if(data.code==200) {
                    console.log(data.text[0]);
                $('#outLang').val(data.text[0]);
               
              } else {

               alert("Error");

              }

             }
            

      });

 
 }

function voiceYandex () {
	var langvoice=['ru-RU','en-US','uk-UA'];
	var choislan;
	var lan = $("#tolang option:selected").val();
	var text=$('#outLang').val();

   if(text=="") return;




 if(lan=="en") choislan=langvoice[1];
 if(lan=="ru") choislan=langvoice[0];
 if(lan=="uk") choislan=langvoice[2];

window.ya.speechkit.settings.lang = choislan;



var tts = new ya.speechkit.Tts(
      // Настройки синтеза. Список доступных настроек см. в справочнике.
      {
        // API-ключ. Может быть задан глобально через объект ya.speechkit.settings.
        //apikey: 'c223db7f-dbd3-4b4e-8857-6b843fdc1f2d',
        // Эмоциональная окраска: добрый голос.
        emotion: 'good',
        // Скорость речи.
        speed: 1.0,
        // Имя диктора.
        speaker: 'jane'  
    });



tts.speak(
    // Текст для озвучивания.
    text,
    // Переопределяем настройки синтеза.
    {
        // Имя диктора.
        speaker: 'omazh',
        // Эмоции в голосе. 
        emotion: 'neutral',
        // Функция-обработчик, которая будет вызвана по завершении озвучивания.
        stopCallback: function () {
            console.log("Озвучивание текста завершено.");
        }
    }
)



}














})


