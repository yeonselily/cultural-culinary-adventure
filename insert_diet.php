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

// Read raw POST input as JSON
$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['user_id']) || !isset($input['diet_id'])) {
    http_response_code(400); 
    echo json_encode(["error" => "Missing user_id or diet_id"]);
    exit;
}

$user_id = $input['user_id'];
$diet_id = $input['diet_id'];

// First, check for duplicate
$checkSql = "SELECT COUNT(*) FROM User_Diets WHERE user_id = ? AND diet_id = ?";
$checkStmt = $conn->prepare($checkSql);
$checkStmt->bind_param("ii", $user_id, $diet_id);
$checkStmt->execute();
$checkStmt->bind_result($count);
$checkStmt->fetch();
$checkStmt->close();

if ($count > 0) {
    echo json_encode(["success" => false, "message" => "Diet already exists for this user"]);
    $conn->close();
    exit;
}

// Proceed to insert
$sql = "INSERT INTO User_Diets (user_id, diet_id) VALUES (?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to prepare statement"]);
    exit;
}

$stmt->bind_param("ii", $user_id, $diet_id); // note: diet_id is int 

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Diet inserted successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to insert diet", "details" => $stmt->error]);
}

$stmt->close();
$conn->close();

/*
6. insert fridge ingredient,
7. remove fridge ingredient,
8. insert allergy,
9. remove allergy,
10. select all recipes that have been favorited by the current user,
11. select all recipes that were posted by the current userinsert recipe,
*/