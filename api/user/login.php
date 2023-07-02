<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
header('Content-Type: application/json');

require "../config/database.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (!isset($_POST["username"]) || !isset($_POST["password"])) {
        $response = [
            "message" => "Undifine Params!",
            "status" => "failed"
        ];

        echo json_encode($response);
        exit;
    }

    $username = htmlspecialchars($_POST["username"]);
    $password = htmlspecialchars($_POST["password"]);

    $result = mysqli_query($conn, "SELECT * FROM tb_users WHERE username = '$username'");

    if (mysqli_num_rows($result) === 1) {
        $user = mysqli_fetch_assoc($result);

        if (password_verify($password, $user['password'])) {
            $token = uniqid("token-");
            $userId = $user["id"];
            $updateToken = mysqli_query($conn, "UPDATE tb_users SET token = '$token' WHERE id = $userId
            ");

            $response = [
                "message" => "Login Success!",
                "status" => "success",
                "data" => [
                    "token" => $token,
                    "id" => $userId
                ]
            ];

            if ($updateToken) {
                echo json_encode($response);
            }
        } else {
            $response = [
                "message" => "Kata sandi salah!",
                "status" => "failed"
            ];

            echo json_encode($response);
            exit;
        }
    } else {
        $response = [
            "message" => "Akun tidak ditemukan!",
            "status" => "failed"
        ];

        echo json_encode($response);
        exit;
    }
}
