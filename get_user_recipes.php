<?php
// Enable PHP error reporting for debugging purposes
ini_set('display_errors', 1);
error_reporting(E_ALL);

// CORS and response headers (allow only frontend domain and set output type)
header("Access-Control-Allow-Origin: https://yeonselily.github.io/cultural-culinary-adventure-frontend/");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Load database connection settings
require_once 'config.inc.php';

// Create MySQL connection
$conn = new mysqli($servername, $username, $password, $database, $port);

// Check for connection error and exit if failed
if ($conn->connect_error) {
    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

// Read the JSON body from the request
$input = json_decode(file_get_contents("php://input"), true);

// Validate input: user_id must be included
if (!isset($input['user_id'])) {
    http_response_code(400); // Bad Request
    echo json_encode(["error" => "Missing user_id"]);
    exit;
}

$user_id = $input['user_id'];

// Query: Select all recipes where this user is the author
$sql = "
SELECT recipe_id, cooking_time, difficulty_rating, is_kid_friendly
FROM Recipes
WHERE author_id = ?
";

// Prepare and execute query with parameter binding
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();

$result = $stmt->get_result();
$recipes = [];

// Collect all recipes posted by the user
while ($row = $result->fetch_assoc()) {
    $recipes[] = $row;
}

// Return recipes in JSON format
echo json_encode([
    "success" => true,
    "my_recipes" => $recipes
]);

// Close resources
$stmt->close();
$conn->close();
?>