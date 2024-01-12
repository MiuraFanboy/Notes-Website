<?php
session_start();

$servername = "localhost"; 
$username = "root";
$password = ""; 
$dbname = "notedb"; 

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if(isset($_SESSION['username'])){
    $username = $_SESSION['username'];
    echo json_encode(array("username" => $username));
}else{
    echo json_encode(array("message" => "Please log-in!"));
}

$conn->close();
?>
