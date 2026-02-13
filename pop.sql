-- USERS TABLE
CREATE TABLE Users (
user_id INT AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(255) NOT NULL,
phone_number VARCHAR(20),
username VARCHAR(50),
password VARCHAR(255),
name VARCHAR(100),
bio TEXT,
website VARCHAR(255),
location_id INT
);
-- USER_LOCATIONS TABLE
CREATE TABLE User_Locations (
location_id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
country_id INT,
state_id INT
);
-- COUNTRIES TABLE
CREATE TABLE Countries (
country_id INT AUTO_INCREMENT PRIMARY KEY,
country_name VARCHAR(100),
region_id INT
);
-- US_STATES TABLE
CREATE TABLE US_States (
state_id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100),
country_id INT
);
-- DIETS TABLE
CREATE TABLE Diets (
diet_id INT AUTO_INCREMENT PRIMARY KEY,
diet_type VARCHAR(100)
);
-- USER_DIETS TABLE
CREATE TABLE User_Diets (
user_diet_id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
diet_id INT
);
-- PROFESSIONS TABLE
CREATE TABLE Professions (
profession_id INT AUTO_INCREMENT PRIMARY KEY,
profession_type VARCHAR(100)
);
-- USER_PROFESSIONS TABLE
CREATE TABLE User_Professions (
user_pro_id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
profession_id INT
);
-- INGREDIENT_CLASSES TABLE
CREATE TABLE Ingredient_Classes (
class_id INT AUTO_INCREMENT PRIMARY KEY,
class_name VARCHAR(100)
);
-- INGREDIENTS TABLE
CREATE TABLE Ingredients (
ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
ingredient_name VARCHAR(100),
class_id INT
);
-- KITCHEN_TOOLS TABLE
CREATE TABLE Kitchen_Tools (
tool_id INT AUTO_INCREMENT PRIMARY KEY,
tool_name VARCHAR(100)
);
-- RECIPES TABLE
CREATE TABLE Recipes (
recipe_id INT AUTO_INCREMENT PRIMARY KEY,
author_id INT,
cooking_time INT,
difficulty_rating INT,
is_kid_friendly BOOLEAN
);
-- RECIPE_DIETRY_INFO TABLE
CREATE TABLE Recipe_Dietry_Info (
recipe_id INT,
dietary_id INT,
is_compliant BOOLEAN,
PRIMARY KEY (recipe_id, dietary_id)
);
-- DIETARY TABLE
CREATE TABLE Dietary (
dietary_id INT AUTO_INCREMENT PRIMARY KEY,
dietary_name VARCHAR(100)
);
-- RECIPE_INSTRUCTIONS TABLE
CREATE TABLE Recipe_Instructions (
recipe_id INT,
step_number INT,
step_description TEXT,
PRIMARY KEY (recipe_id, step_number)
);
-- RECIPE_DESCRIPTIONS TABLE
CREATE TABLE Recipe_Descriptions (
recipe_id INT,
description_type VARCHAR(50),
description_text TEXT,
PRIMARY KEY (recipe_id, description_type)
);
-- RECIPE_NAME TABLE
CREATE TABLE Recipe_Name (
recipe_id INT PRIMARY KEY,
display_name VARCHAR(255),
short_name VARCHAR(100)
);
-- USER_FAVORITES TABLE
CREATE TABLE User_Favorites (
favorite_id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
recipe_id INT
);
-- USER_ALLERGIES TABLE
CREATE TABLE User_Allergies (
user_allergy_id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
allergen_id INT
);
-- USER_FRIDGE_ITEMS TABLE
CREATE TABLE User_Fridge_Items (
user_id INT,
ingredient_id INT,
PRIMARY KEY (user_id, ingredient_id)
);
-- RECIPE_INGREDIENTS TABLE
CREATE TABLE Recipe_Ingredients (
recipe_ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
recipe_id INT,
ingredient_id INT
);
-- SUBSTITUTIONS TABLE
CREATE TABLE Substitutions (
substitution_id INT AUTO_INCREMENT PRIMARY KEY,
subbed_ingredient INT,
original_ingredient INT,
sub_ratio DECIMAL(4,2)
);
-- SUBSTITUTIONS_TAGS TABLE
CREATE TABLE Substitutions_Tags (
substitution_id INT,
tag_name VARCHAR(100),
PRIMARY KEY (substitution_id, tag_name)
);
-- RECIPE_SUBSTITUTIONS TABLE
CREATE TABLE Recipe_Substitutions (
recipe_sub_id INT AUTO_INCREMENT PRIMARY KEY,
recipe_id INT,
substitution_id INT
);
-- RECIPE_TOOLS TABLE
CREATE TABLE Recipe_Tools (
recipe_tool_id INT AUTO_INCREMENT PRIMARY KEY,
recipe_id INT,
tool_id INT
);
-- RECIPE_INFLUENCES TABLE
CREATE TABLE Recipe_Influences (
recipe_id INT,
country_id INT,
state_id INT,
PRIMARY KEY (recipe_id, country_id)
);