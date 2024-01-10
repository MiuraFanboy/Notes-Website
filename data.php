<?php
$host = 'localhost';
$username = 'root';
$password = '';
$dbname = 'entreprise';

$dsn = "mysql:host=$host;dbname=$dbname";

try {
    $connection = new PDO($dsn, $username, $password);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $sql = "SELECT nom, prenom, salaire, service, date_embauche FROM employes WHERE service IN ('informatique','commercial') AND salaire BETWEEN 2000 AND 3200 ORDER BY salaire DESC;";
    $query = $connection->prepare($sql);
    $query->execute();

    $data = $query->fetchAll(PDO::FETCH_ASSOC);

    // Set appropriate headers and echo the PHP array as JSON
    header('Content-Type: application/json');
    echo json_encode($data);
} catch (PDOException $e) {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
