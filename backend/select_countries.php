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

$query = "SELECT country_id, country_name FROM Countries ORDER BY country_name";
$result = $conn->query($query);

$countries = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $countries[] = [
            'id' => $row['country_id'],
            'name' => $row['country_name']
        ];
    }

}

$conn->close();

echo json_encode($countries);
?>
