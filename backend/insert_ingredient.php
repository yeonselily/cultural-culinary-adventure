<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: https://yeonselily.github.io/cultural-culinary-adventure-frontend/");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'config.inc.php';

$data = json_decode(file_get_contents("php://input"), true);
$ingredient_name = trim($data['ingredient_name'] ?? '');

if (!$ingredient_name) {
    http_response_code(400);
    echo json_encode(["error" => "Ingredient name is required"]);
    exit;
}

$conn = new mysqli($servername, $username, $password, $database, $port);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

// Check if the ingredient already exists
$check_sql = "SELECT ingredient_id FROM Ingredients WHERE ingredient_name = ?";
$stmt = $conn->prepare($check_sql);
$stmt->bind_param("s", $ingredient_name);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    $stmt->close();

    $insert_sql = "INSERT INTO Ingredients (ingredient_name) VALUES (?)";
    $stmt = $conn->prepare($insert_sql);
    $stmt->bind_param("s", $ingredient_name);
    $stmt->execute();
}

echo json_encode(["success" => true]);

$stmt->close();
$conn->close();
