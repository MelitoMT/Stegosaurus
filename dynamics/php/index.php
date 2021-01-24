<?php
    if(isset($_POST['numJugadores'])){
        echo $_POST['numJugadores'];
        echo'
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Stegosaurus</title>
            <link rel="stylesheet" href="../../styles/index.css">
        </head>
        <body>
        <div id="eleccionPersonajes">
        </div>
        <div id="footer"></div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
        <script src="../js/functions.js"></script>
        <script src="../js/personajes.js"></script>
        </body>
        </html>  
        <script>generarPersonajes("'.$_POST['numJugadores'].'")</script>                  
        ';
    }
    else{
        header("../../index.html");
    }
?>
