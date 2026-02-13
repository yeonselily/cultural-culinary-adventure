<?php

header("Access-Control-Allow-Origin: https://yeonselily.github.io/cultural-culinary-adventure-frontend/");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle OPTIONS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.inc.php';

// Get input data
$data = json_decode(file_get_contents("php://input"), true);
file_put_contents('log.txt', print_r($data, true));

// Connect to database
$conn = new mysqli($servername, $username, $password, $database, $port);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "DB connection failed"]);
    exit;
}

// 1. Insert into Recipes
$stmt = $conn->prepare("INSERT INTO Recipes (author_id, cooking_time, difficulty_rating, is_kid_friendly, thumbnail_url) VALUES (?, ?, ?, ?, ?)");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Prepare failed: " . $conn->error]);
    exit;
}

$stmt->bind_param("iiiss", $data['userId'], $data['cookTime'], $data['difficulty'], $data['kidFriendly'], $data['image']);
if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode(["error" => "Execution failed: " . $stmt->error]);
    exit;
}

$recipeId = $stmt->insert_id;

// 2. Insert name
$stmt = $conn->prepare("INSERT INTO Recipe_Name (recipe_id, display_name, short_name) VALUES (?, ?, ?)");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Prepare failed: " . $conn->error]);
    exit;
}
$stmt->bind_param("iss", $recipeId, $data['title'], $data['shortName']);
if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode(["error" => "Name insert failed: " . $stmt->error]);
    exit;
}

// 3. Insert description
$stmt = $conn->prepare("INSERT INTO Recipe_Descriptions (recipe_id, description_text) VALUES (?, ?)");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Prepare failed: " . $conn->error]);
    exit;
}
$stmt->bind_param("is", $recipeId, $data['description']);
if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode(["error" => "Description insert failed: " . $stmt->error]);
    exit;
}

// 4. Diets
$diets = ['vegan' => 1, 'vegetarian' => 2, 'glutenFree' => 3];
foreach ($diets as $diet => $id) {
    if (!empty($data[$diet])) {
        $stmt = $conn->prepare("INSERT INTO Recipe_Dietary_Info (recipe_id, diet_id) VALUES (?, ?)");
        if (!$stmt) {
            http_response_code(500);
            echo json_encode(["error" => "Prepare failed: " . $conn->error]);
            exit;
        }
        $stmt->bind_param("ii", $recipeId, $id);
        if (!$stmt->execute()) {
            http_response_code(500);
            echo json_encode(["error" => "Diet insert failed: " . $stmt->error]);
            exit;
        }
    }
}

// 5a. Influences - Countries
if (!empty($data['countries'])) {
    foreach ($data['countries'] as $countryId) {
        $stateId = null;

        $stmt = $conn->prepare("INSERT INTO Recipe_Influences (recipe_id, country_id, state_id) VALUES (?, ?, ?)");
        $stmt->bind_param("iii", $recipeId, $countryId, $stateId);

        if (!$stmt->execute()) {
            http_response_code(500);
            echo json_encode(["error" => "Influence insert failed: " . $stmt->error]);
            exit;
        }
    }
}

// 5b. Influences - States
if (!empty($data['states'])) {
    foreach ($data['states'] as $stateId) {
        $countryId = 236;

        $stmt = $conn->prepare("INSERT INTO Recipe_Influences (recipe_id, country_id, state_id) VALUES (?, ?, ?)");
        $stmt->bind_param("iii", $recipeId, $countryId, $stateId);

        if (!$stmt->execute()) {
            http_response_code(500);
            echo json_encode(["error" => "State influence insert failed: " . $stmt->error]);
            exit;
        }
    }
}


// 6. Ingredients
if (!empty($data['ingredients'])) {
    foreach ($data['ingredients'] as $ingr) {        
        if ($ingr[isNew]) {
            $stmt = $conn->prepare("INSERT INTO Ingredients (ingredient_name) VALUES (?)");
            $stmt->bind_param("s", $ingr['name']);
            if (!$stmt->execute()) {
                http_response_code(500);
                echo json_encode(["error" => "Ingredient insert failed: " . $stmt->error]);
                exit;
            }
            $ingredientId = $stmt->insert_id;
        } else {
            $ingredientId = $ingr['id'];
        }
        
        // Insert recipe ingredient
        $stmt = $conn->prepare("INSERT INTO Recipe_Ingredients (recipe_id, ingredient_id, amount, unit) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("iiis", $recipeId, $ingredientId, $ingr['quantity'], $ingr['unit']);
        if (!$stmt->execute()) {
            http_response_code(500);
            echo json_encode(["error" => "Recipe ingredient insert failed: " . $stmt->error]);
            exit;
        }
    }
}

// 7. Substitutions
if (!empty($data['substitutions'])) {
    foreach ($data['substitutions'] as $sub) {
        $ogIngredient = $sub['ogIngrId'];

        if ($sub[isNew]) {
            $stmt = $conn->prepare("INSERT INTO Ingredients (ingredient_name) VALUES (?)");
            $stmt->bind_param("s", $sub['subIngr']);
            if (!$stmt->execute()) {
                http_response_code(500);
                echo json_encode(["error" => "Ingredient insert failed: " . $stmt->error]);
                exit;
            }
            $subIngredient = $stmt->insert_id;
        } else {
            $subIngredient= $sub['subIngrId'];
        }
        
        $stmt = $conn->prepare("INSERT INTO Recipe_Substitutions (recipe_id, subbed_ingredient, original_ingredient, subbed_parts, original_parts) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("iiiii", $recipeId, $subIngredient, $originalIngredient, $sub['subAmt'], $sub['ogAmt']);
        if (!$stmt->execute()) {
            http_response_code(500);
            echo json_encode(["error" => "Substitution insert failed: " . $stmt->error]);
            exit;
        }
    }
}

// 8. Steps
if (!empty($data['steps'])) {
    foreach ($data['steps'] as $i => $step) {
        $stepNumber = $i + 1;
        $stmt = $conn->prepare("INSERT INTO Recipe_Instructions (recipe_id, step_number, step_description) VALUES (?, ?, ?)");
        $stmt->bind_param("iis", $recipeId, $stepNumber, $step);
        if (!$stmt->execute()) {
            http_response_code(500);
            echo json_encode(["error" => "Step insert failed: " . $stmt->error]);
            exit;
        }
    }
}

echo json_encode(["success" => true, "recipe_id" => $recipeId]);
?>