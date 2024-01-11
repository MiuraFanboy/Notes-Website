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

$data = json_decode(file_get_contents('php://input'), true);



$conn->close();
?>