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
    // Verificacion almacenamiento local
    if (typeof(Storage) !== "undefined") {
      console.log("Si podemos");
    } else {
      console.log("No podmeos")
    }
    // Verificacion lectura archivos
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      console.log("Si podemos");
    } else {
      alert('The File APIs are not fully supported in this browser.');
    }
    var preguntas = JSON.parse(preguntas);
    // Devuelve el objeto con todas las preguntas
    console.log(mydata);
})
