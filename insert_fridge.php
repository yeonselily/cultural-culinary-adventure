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

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['user_id']) || !isset($input['ingredient_id'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing user_id or ingredient_id"]);
    exit;
}

$user_id = $input['user_id'];
$ingredient_id = $input['ingredient_id'];

// Check if already exists
$checkSql = "SELECT COUNT(*) FROM User_Fridge_Items WHERE user_id = ? AND ingredient_id = ?";
$checkStmt = $conn->prepare($checkSql);
$checkStmt->bind_param("ii", $user_id, $ingredient_id);
$checkStmt->execute();
$checkStmt->bind_result($count);
$checkStmt->fetch();
$checkStmt->close();

if ($count > 0) {
    echo json_encode(["success" => false, "message" => "Ingredient already in fridge"]);
    $conn->close();
    exit;
}

// Insert new ingredient
$sql = "INSERT INTO User_Fridge_Items (user_id, ingredient_id) VALUES (?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to prepare insert"]);
    exit;
}

$stmt->bind_param("ii", $user_id, $ingredient_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Ingredient added to fridge"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Insert failed", "details" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>