<?php
$servername = "localhost"; // Replace with your server name if different
$username = "root"; // Replace with your MySQL username
$password = ""; // Replace with your MySQL password
$dbname = "notedb"; // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from the POST request
$data = json_decode(file_get_contents('php://input'), true);

if ($data !== null) {
    $username = $data['username'];
    $password = $data['password'];

    // Check if the username already exists in the database
    $query = "SELECT * FROM users WHERE username = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Username already exists, handle the duplicate data scenario
        echo "Username already exists";
    } else {
        // Prepare and execute the INSERT statement
        $insertQuery = "INSERT INTO users (username, password) VALUES (?, ?)";
        $stmt = $conn->prepare($insertQuery);
        $stmt->bind_param("ss", $username, password_hash($password, PASSWORD_DEFAULT)); // Hash the password for security

        if ($stmt->execute()) {
            echo  "New record inserted successfully";
        } else {
            echo "Error: " . $conn->error;
        }
    }
} else {
    echo "No data received.";
}

$conn->close();
?>
