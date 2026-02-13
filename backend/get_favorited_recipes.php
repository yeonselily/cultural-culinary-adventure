<?php
// Enable error reporting during development (remove before deploying publicly)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Set headers for CORS and JSON response
header("Access-Control-Allow-Origin: https://yeonselily.github.io/cultural-culinary-adventure-frontend/");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Include database credentials
require_once 'config.inc.php';

// Connect to the MySQL database using provided credentials
$conn = new mysqli($servername, $username, $password, $database, $port);

// Handle connection failure with a clean JSON error
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

// Get the JSON body from the POST request
$input = json_decode(file_get_contents("php://input"), true);

// Validate required input: user_id
if (!isset($input['user_id'])) {
    http_response_code(400); // Bad request
    echo json_encode(["error" => "Missing user_id"]);
    exit;
}

$user_id = $input['user_id'];

// Query: Join User_Favorites and Recipes to get all recipes this user has favorited
$sql = "
SELECT Recipes.recipe_id, Recipes.cooking_time, Recipes.difficulty_rating, Recipes.is_kid_friendly
FROM User_Favorites
JOIN Recipes ON User_Favorites.recipe_id = Recipes.recipe_id
WHERE User_Favorites.user_id = ?
";

// Prepare and execute the SQL statement securely
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();

// Get the query result
$result = $stmt->get_result();
$recipes = [];

// Store all fetched recipes in an array
while ($row = $result->fetch_assoc()) {
    $recipes[] = $row;
}

// Return the list as a JSON array
echo json_encode([
    "success" => true,
    "favorites" => $recipes
]);

// Close database resources
$stmt->close();
$conn->close();
?>