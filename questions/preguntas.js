//var tsv is the TSV file with headers
function tsvJSON(tsv){

  var lines=tsv.split("\n");

  var result = [];

  var headers=lines[0].split("\t");

  for(var i=1;i<lines.length;i++){

	  var obj = {};
	  var currentline=lines[i].split("\t");

	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }

	  result.push(obj);

  }

  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}

var nombreArchivoCSV = "Preguntas_computacion - Hoja 1"
fetch("./questions/"+nombreArchivoCSV+".tsv")
.then((response)=>{
    return response.text();
})
.then((tsvText)=>{
  return tsvJSON(tsvText);
})
.then((json)=>{
  var preguntas = JSON.parse(json);
  console.log(preguntas);
})
.catch(error => {
    console.error('Fallo el obtener las preguntas', error);
});
