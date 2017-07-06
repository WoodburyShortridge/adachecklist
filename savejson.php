<?php
    $data[] = $_POST;

    $inp = file_get_contents('responses.json');
    $tempArray = json_decode($inp);
    array_push($tempArray, $data);
    $jsonData = json_encode($tempArray);
    file_put_contents('responses.json', $jsonData);

//    $fp = fopen('responses.json', 'w');
//    fwrite($fp, json_encode($_POST));
//    fclose($fp);
?>