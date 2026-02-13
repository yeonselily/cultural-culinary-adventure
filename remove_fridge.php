<?php
// Enable error display for debugging during development (disable in production)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Set headers to allow cross-origin access (CORS) and specify content type as JSON
header("Access-Control-Allow-Origin: https://yeonselily.github.io/cultural-culinary-adventure-frontend/"); // Allow only your frontend origin
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json"); // Output JSON format

// Include database credentials and connection settings from external file
require_once 'config.inc.php';

// Establish connection to the MySQL database
$conn = new mysqli($servername, $username, $password, $database, $port);

// Check if connection failed and return a JSON error
if ($conn->connect_error) {
    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

// Read the incoming request body (raw JSON) and decode it into an associative array
$input = json_decode(file_get_contents("php://input"), true);

// Validate that both required fields are provided
if (!isset($input['user_id']) || !isset($input['ingredient_id'])) {
    http_response_code(400); // Bad Request
    echo json_encode(["error" => "Missing user_id or ingredient_id"]);
    exit;
}

// Extract values from input JSON
$user_id = $input['user_id'];
$ingredient_id = $input['ingredient_id'];

// Prepare SQL DELETE statement to remove a fridge item for a specific user
$sql = "DELETE FROM User_Fridge_Items WHERE user_id = ? AND ingredient_id = ?";
$stmt = $conn->prepare($sql);

// Bind the parameters (both integers) securely to the prepared statement
$stmt->bind_param("ii", $user_id, $ingredient_id);

// Execute the DELETE query
if ($stmt->execute()) {
    // Check if a row was actually affected (i.e., something was deleted)
    if ($stmt->affected_rows > 0) {
        echo json_encode([
            "success" => true,
            "message" => "Ingredient removed from fridge"
        ]);
    } else {
        // No rows deleted: maybe it didn’t exist
        echo json_encode([
            "success" => false,
            "message" => "Ingredient not found in fridge"
        ]);
    }
} else {
    // Handle any SQL execution errors
    http_response_code(500);
    echo json_encode([
        "error" => "Failed to remove ingredient",
        "details" => $stmt->error
    ]);
}

// Always close the statement and database connection
$stmt->close();
$conn->close();
?>