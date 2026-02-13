<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: https://yeonselily.github.io/cultural-culinary-adventure-frontend/");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'config.inc.php';

$conn = new mysqli($servername, $username, $password, $database, $port);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

$searchTerm = isset($_GET['q']) ? $_GET['q'] . '%' : '%';

$sql = "SELECT `ingredient_id`, `ingredient_name` FROM `Ingredients` WHERE `ingredient_name` LIKE ? ORDER BY `ingredient_name` ASC LIMIT 10";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        "error" => "Failed to prepare statement",
        "mysqli_error" => $conn->error
    ]);
    exit;
}

$stmt->bind_param("s", $searchTerm);
$stmt->execute();
$stmt->bind_result($ingredient_id, $ingredient_name);

$ingredients = [];
while ($stmt->fetch()) {
    $ingredients[] = [
        "label" => $ingredient_name,
        "value" => $ingredient_id,
        "name" => $ingredient_name
    ];
}

echo json_encode($ingredients);

$stmt->close();
$conn->close();
