<?php
session_start(); // Start the session

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
    $password = $data['password']; // Hash the password for security

    // Check if the username exists in the database
    $query = "SELECT * FROM users WHERE username = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        // User found based on the provided username
        $row = $result->fetch_assoc();
        $storedPasswordHash = $row['password']; // Assuming the password column is named 'password' in your database

        // Verify the password
        if (password_verify($password, $storedPasswordHash)) {
            // Passwords match (user entered correct password)
            $_SESSION['username'] = $username; // Store the username in the session

            echo json_encode(array("message" => "$username connected!"));
            // Proceed with further actions (e.g., log in the user)
        } else {
            // Passwords don't match (user entered incorrect password)
            echo json_encode(array("message" => "Incorrect password"));
        }
    } else {
        // User not found based on the provided username
        echo json_encode(array("message" => "User not found"));
    }
} else {
    echo "No data received.";
}

$conn->close();
?>
