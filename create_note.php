<?php
session_start(); // Start the session

$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'notedb';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_SESSION['username'])) {
    // User is logged in
    $loggedInUser = $_SESSION['username'];

    $q = "SELECT id_user FROM users WHERE username = ?";
    $userId = $conn->prepare($userId);
    $userId->bind_param('s', $loggedInUser);
    $userId->execute();
    $userId = $userId->get_result();

    $q = "INSERT INTO `notes` (`id_user`, `title`, `content`) VALUES (?, '', '')";
    $stmt = $conn->prepare($q);
    $stmt->bind_param('s', $userId);
    $stmt->execute();


} else {
    // User is not logged in
    echo json_encode(array("message"=>"Please log in."));
}

$conn->close();
?>