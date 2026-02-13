<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Set necessary CORS and content headers
header("Access-Control-Allow-Origin: https://yeonselily.github.io/cultural-culinary-adventure-frontend/");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Include DB credentials
require_once 'config.inc.php';

// Connect to the database
$conn = new mysqli($servername, $username, $password, $database, $port);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

// Read input JSON and decode
$input = json_decode(file_get_contents("php://input"), true);

// Validate required fields
if (!isset($input['user_id']) || !isset($input['diet_id'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing user_id or diet_id"]);
    exit;
}

$user_id = $input['user_id'];
$diet_id = $input['diet_id'];

// Attempt to delete the (user_id, diet_id) pair
$sql = "DELETE FROM User_Diets WHERE user_id = ? AND diet_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("is", $user_id, $diet_id); // "is" = int, string

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["success" => true, "message" => "Diet removed successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "No such diet found for this user"]);
    }
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to remove diet", "details" => $stmt->error]);
}

$stmt->close();
$conn->close();
?> 