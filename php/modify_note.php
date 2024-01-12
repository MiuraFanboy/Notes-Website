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


    

    $q = "UPDATE notes SET title = ?, content = ? WHERE notes.id_note = ?";
    $stmt = $conn->prepare($q);
    $stmt->bind_param('ssi', $noteTitle, $noteContent, $noteId);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo json_encode(array("message" => "Sauvegarde réussie"));
    } else {
        echo json_encode(array("message" => "Aucune modification effectuée"));
    }

}else if($data['type'] == 'update'){
    $noteId = $data['id_note'];

    $q = 'SELECT title, content FROM notes WHERE id_note = ?';
    $stmt = $conn->prepare($q);
    $stmt->bind_param('i',$noteId);
    $stmt->execute();
    $result = $stmt->get_result();


    $note = $result->fetch_assoc();

    echo json_encode($note);
}

$conn->close();
?>