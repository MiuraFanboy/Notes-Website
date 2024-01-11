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

    $q = 'SELECT id_note, title, content FROM notes WHERE id_user = (SELECT id_user FROM users WHERE username = ?) ORDER BY id_note DESC';
    $stmt = $conn->prepare($q);
    $stmt->bind_param('s', $loggedInUser);
    $stmt->execute();
    $result = $stmt->get_result();

    if($result->num_rows >= 1){
        $notes = array();
        while ($row = $result->fetch_assoc()){
            $notes[] = $row;
        }
        echo json_encode($notes);
    }else{
        echo json_encode(array("message"=>"Pas de notes existantes"));
    }
} else {
    // User is not logged in
    echo json_encode(array("message"=>"Please log in."));
}

$conn->close();
?>