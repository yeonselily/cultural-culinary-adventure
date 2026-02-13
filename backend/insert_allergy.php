<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: https://yeonselily.github.io/cultural-culinary-adventure-frontend/");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'config.inc.php';

$data = json_decode(file_get_contents("php://input"), true);
$user_id = intval($data['user_id'] ?? 0);
$ingredient_id = intval($data['ingredient_id'] ?? 0);

if (!$user_id || !$ingredient_id) {
    http_response_code(400);
    echo json_encode(["error" => "user_id and ingredient_id are required"]);
    exit;
}

$conn = new mysqli($servername, $username, $password, $database, $port);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

// Check if the allergy already exists
$check_sql = "SELECT user_allergy_id FROM User_Allergies WHERE user_id = ? AND allergen_id = ?";
$stmt = $conn->prepare($check_sql);
$stmt->bind_param("ii", $user_id, $ingredient_id);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    $stmt->close();
    $insert_sql = "INSERT INTO User_Allergies (user_id, allergen_id) VALUES (?, ?)";
    $stmt = $conn->prepare($insert_sql);
    $stmt->bind_param("ii", $user_id, $ingredient_id);
    $stmt->execute();
}

// Always return success (even if already existed)
echo json_encode(["success" => true]);

$stmt->close();
$conn->close();
?> 