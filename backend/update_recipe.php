<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Headers: Content-Type");  
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");  
header("Content-Type: application/json");  

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {  
    http_response_code(200);  
    exit;  
} 

require_once 'config.inc.php';

$data = json_decode(file_get_contents("php://input"), true);
$recipe_id = intval($data['recipe_id'] ?? 0);

if (!$recipe_id) {
    http_response_code(400);
    echo json_encode(["error" => "Recipe ID is required"]);
    exit;
}

$conn = new mysqli($servername, $username, $password, $database, $port);  
$conn->set_charset('utf8mb4');

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

// Check if the recipe exists
$check_sql = "SELECT recipe_id FROM Recipes WHERE recipe_id = ?";
$stmt = $conn->prepare($check_sql);
$stmt->bind_param("i", $recipe_id);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    http_response_code(404);
    echo json_encode(["error" => "Recipe not found"]);
    $stmt->close();
    $conn->close();
    exit;
}
$stmt->close();

// Update recipe basic info
$cooking_time = intval($data['cooking_time'] ?? 0);
$difficulty_rating = intval($data['difficulty_rating'] ?? 1);
$is_kid_friendly = ($data['is_kid_friendly'] ?? false) ? 1 : 0;

$update_sql = "UPDATE Recipes SET cooking_time = ?, difficulty_rating = ?, is_kid_friendly = ? WHERE recipe_id = ?";
$stmt = $conn->prepare($update_sql);
$stmt->bind_param("iiii", $cooking_time, $difficulty_rating, $is_kid_friendly, $recipe_id);
$stmt->execute();
$stmt->close();

// Update recipe name if provided
$display_name = trim($data['display_name'] ?? '');
if ($display_name) {
    $name_sql = "UPDATE Recipe_Name SET display_name = ? WHERE recipe_id = ?";
    $stmt = $conn->prepare($name_sql);
    $stmt->bind_param("si", $display_name, $recipe_id);
    $stmt->execute();
    $stmt->close();
}

echo json_encode(["success" => true]);

$conn->close();
?> 