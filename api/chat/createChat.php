<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
header('Content-Type: application/json');

require "../config/database.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (!isset($_POST["pengirim"]) || !isset($_POST["chat"]) || !isset($_GET["id"]) || !isset($_GET["token"])) {
        $response = [
            "message" => "Undifine Params!",
            "status" => "failed"
        ];

        echo json_encode($response);
        exit;
    }

    $id = htmlspecialchars($_GET["id"]);
    $token = htmlspecialchars($_GET["token"]);
    $pengirim = htmlspecialchars($_POST["pengirim"]);
    $chat = htmlspecialchars($_POST["chat"]);

    $result = mysqli_query($conn, "SELECT * FROM tb_users WHERE id = $id");

    if (mysqli_num_rows($result) === 1) {
        $user = mysqli_fetch_assoc($result);
        if ($token === $user["token"]) {
            $query = "INSERT INTO tb_chat VALUES(NULL,'$pengirim','$chat',DEFAULT)";

            $createStatus = mysqli_query($conn, $query);
            if ($createStatus) {
                $response = [
                    "message" => "Send message success!",
                    "status" => "success"
                ];

                echo json_encode($response);
                exit;
            }
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
