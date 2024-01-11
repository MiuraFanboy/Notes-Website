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

if($data['type'] == 'save'){
    $noteId = $data['id_note'];
    $noteTitle = $data['title'];
    $noteContent = $data['content'];

    

    $q = "UPDATE notes SET title = '?', content = '?' WHERE notes.id_note = ?";
    $stmt = $conn->prepare($q);
    $stmt->bind_param('sss', $noteTitle, $noteContent, $noteId);
    $stmt->execute();
    $result = $stmt->get_result();

    echo json_encode(array("message"=>"Sauvegarde réussie"));
}else if($data['type'] == 'update'){
    $noteId = $data['id_note'];

    $q = 'SELECT title, content FROM notes WHERE id_note = ?';
    $stmt = $conn->prepare($q);
    $stmt->bind_param('s',$noteId);
    $stmt->execute();
    $result = $stmt->get_result();


    $note = $result->fetch_assoc();
    echo json_encode($note);
}

$conn->close();
?>