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

$sql = "SELECT CustomerNumber, CustomerName FROM customer ORDER BY CustomerName";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to prepare statement"]);
    exit;
}

$stmt->execute();

// Use bind_result and fetch (no get_result!)
$stmt->bind_result($CustomerNumber, $CustomerName);

$customers = [];
while ($stmt->fetch()) {
    $customers[] = [
        "CustomerNumber" => $CustomerNumber,
        "CustomerName" => $CustomerName
    ];
}

echo json_encode($customers);
$stmt->close();
$conn->close();

/*
1. insert recipe,  - seyeon 
2. update recipe,  - Shayaz
3. delete recipe, - Younes
4. insert diet,  
5. remove diet,
6. insert fridge ingredient,
7. remove fridge ingredient,
8. insert allergy,
9. remove allergy,
10. select all recipes that have been favorited by the current user,
11. select all recipes that were posted by the current userinsert recipe,
*/