<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET");
header('Content-Type: application/json');

require "../config/database.php";

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $result = mysqli_query($conn, "SELECT * FROM tb_chat");
    $response = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $response[] = $row;
    }

    echo json_encode($response);
}
