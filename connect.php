<?php
session_start();
$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'notedb';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents('php://input'), true);

if($data != null){
    $usernameData = $data['username'];
    $passwordData = $data['password'];

    $q = 'SELECT username FROM users WHERE username = ? AND password = ?';
    $stmt = $conn->prepare($q);
    $stmt->bind_param("ss", $usernameData, $passwordData);
    $stmt->execute();
    $result = $stmt->get_result();

    if($result->num_rows == 1) {
        // do the connected shit
        $_SESSION['username'] = $usernameData; // Store the username in a session variable
        echo json_encode(array("message" => "Your credentials are valid, you are now connected!"));
    }else{
        echo json_encode(array("message" => "Couldn't connect, because your credentials are invalid!"));
    }

}else{
    echo json_encode(array("message" => "No Data"));
}
$conn->close();
?>