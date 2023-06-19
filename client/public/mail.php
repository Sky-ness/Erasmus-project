<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <title>Envoi mail</title>



</head>


<body>

    <?php
    $to = 'kkabassi@ionio.gr ';
    $subject = $_POST["objet"];
    $message = $_POST["message"];
    $headers = 'From: olive trees website' . "\n";
    mail($to, $subject, $message, $headers);
    ?>

    <p> Your message has been sent successfully. </p>



</body>

</html>