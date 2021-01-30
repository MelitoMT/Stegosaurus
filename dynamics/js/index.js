generarFrasesCarga();
var title = $('#title');
var menu = $('#menu');
$(document).ready(()=>{
    setTimeout(()=>{
        console.log($(window));
        title.css("display","none");
        $("#footer").css("display","block");
        contIndex('./statics/menu.html');
    
    }, 4000);
}) 