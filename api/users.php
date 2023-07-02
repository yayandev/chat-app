<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET");
header('Content-Type: application/json');

require "config/database.php";

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $user = mysqli_query($conn, "SELECT id,username,picture FROM tb_users");
    $data = [];
    while ($row = mysqli_fetch_assoc($user)) {
        $data[] = $row;
    }

    echo json_encode($data);
}
