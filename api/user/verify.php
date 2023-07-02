<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
header('Content-Type: application/json');

require "../config/database.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // validasi data
    if (!isset($_POST["id"]) || !isset($_POST["token"])) {
        $response = [
            "message" => "Undifine Params!",
            "status" => "failed"
        ];

        echo json_encode($response);
        exit;
    }

    $id = htmlspecialchars($_POST["id"]);
    $token = htmlspecialchars($_POST["token"]);

    $result = mysqli_query($conn, "SELECT * FROM tb_users WHERE id = $id");

    if (mysqli_num_rows($result) === 1) {
        $user = mysqli_fetch_assoc($result);
        if ($token === $user["token"]) {
            $response = [
                "message" => "Verify Success!",
                "status" => "success",
                "data" => [
                    "id" => $user['id'],
                    "username" => $user['username'],
                    "picture" => $user['picture']
                ]
            ];

            echo json_encode($response);
            exit;
        } else {
            $response = [
                "message" => "INVALID TOKEN!",
                "status" => "failed"
            ];

            echo json_encode($response);
            exit;
        }
    } else {
        $response = [
            "message" => "NOT FOUND DATA!",
            "status" => "failed"
        ];

        echo json_encode($response);
        exit;
    }
}
