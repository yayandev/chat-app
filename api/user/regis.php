<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
header('Content-Type: application/json');

require "../config/database.php";
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // validasi data
    if (!isset($_POST["username"]) || !isset($_POST["password"]) || !isset($_POST["confirmPassword"])) {
        $response = [
            "message" => "Undifine Params!",
            "status" => "failed"
        ];

        echo json_encode($response);
        exit;
    }

    $username = htmlspecialchars($_POST["username"]);
    $password = htmlspecialchars($_POST["password"]);
    $confirmPassword = htmlspecialchars($_POST["confirmPassword"]);
    $picture = "https://via.placeholder.com/300x300";

    if (!$password === $confirmPassword) {
        $response = [
            "message" => "Konfirmasi Password tidak cocok!",
            "status" => "failed"
        ];

        echo json_encode($response);
        exit;
    }


    $cekUsername = mysqli_query($conn, "SELECT * FROM tb_users WHERE username = '$username'");

    if (mysqli_num_rows($cekUsername) === 1) {
        $response = [
            "message" => "Username Sudah Digunakan!",
            "status" => "failed"
        ];

        echo json_encode($response);
        exit;
    }

    $password = password_hash($password, PASSWORD_DEFAULT);

    $query = "INSERT INTO tb_users VALUES(NULL,'$username','$password',NULL,'$picture')";

    $created = mysqli_query($conn, $query);

    if ($created) {
        $response = [
            "message" => "Akun berhasil dibuat!",
            "status" => "success"
        ];

        echo json_encode($response);
        exit;
    } else {
        $response = [
            "message" => "Akun gagal dibuat!",
            "status" => "failed"
        ];

        echo json_encode($response);
        exit;
    }
}
