<?php
session_start(); // Start the session

$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'notedb';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(array("message"=>"Connection failed: " . $conn->connect_error)));
}

if (isset($_SESSION['username'])) {
    // User is logged in
    $loggedInUser = $_SESSION['username'];

    $selectQuery = "SELECT id_user FROM users WHERE username = ?";
    $userIdStmt = $conn->prepare($selectQuery);
    $userIdStmt->bind_param('s', $loggedInUser);
    $userIdStmt->execute();
    $userIdResult = $userIdStmt->get_result();

    if ($userIdResult->num_rows > 0) {
        // Fetch the user ID from the result
        $userIdRow = $userIdResult->fetch_assoc();
        $userId = $userIdRow['id_user'];

        $insertQuery = "INSERT INTO `notes` (`id_user`, `title`, `content`) VALUES (?, '', '')";
        $stmt = $conn->prepare($insertQuery);
        $stmt->bind_param('i', $userId); // Assuming id_user is an integer; use 'i' for integer type
        $stmt->execute();

        // Fetch the id_note of the newly inserted record
        $noteId = $conn->insert_id;
        
        echo json_encode(array("message"=>"Note créée avec succès!", "noteId" => $noteId));

    } else {
        echo json_encode(array("message"=>"User not found."));
    }
} else {
    // User is not logged in
    echo json_encode(array("message"=>"Please log in."));
}

$conn->close();
?>