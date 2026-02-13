<?php
header("Access-Control-Allow-Origin: https://yeonselily.github.io/cultural-culinary-adventure-frontend/");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'config.inc.php';

$conn = new mysqli($servername, $username, $password, $database, $port);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "DB connection failed"]);
    exit;
}

$query = "SELECT state_id, state_name FROM States WHERE country_id = 236 ORDER BY state_name";
$result = $conn->query($query);

$states = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $states[] = [
            'id' => (int) $row['state_id'],
            'name' => $row['state_name']
        ];
    }
}

$conn->close();

echo json_encode($states);
?>
