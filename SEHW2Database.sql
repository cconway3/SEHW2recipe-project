CREATE DATABASE recipe;

USE recipe;


CREATE TABLE recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    name VARCHAR(255) NOT NULL,
    category ENUM('Chicken', 'Beef', 'Tofu', 'Grains', 'Deer') NOT NULL,
    description TEXT NOT NULL,
    instructions TEXT NOT NULL
    

);

ALTER TABLE recipes MODIFY COLUMN category ENUM('Chicken', 'Beef', 'Tofu', 'Grains', 'Deer') NOT NULL;
SELECT DISTINCT category FROM recipes;
SELECT id, name, category FROM recipes;
SHOW COLUMNS FROM recipes LIKE 'category';
DESCRIBE recipes;
SELECT * FROM recipes;







CREATE TABLE ingredients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    recipe_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE

);




SHOW TABLES;


INSERT INTO recipes (name, category, description, instructions) VALUES
('Breakfast Burrito', 'Beef', 'Eggs and steak breakfast burrito', '1. Scramble Eggs 2. Grill or fry steak 3. Sprinke with cheese 4. Wrap in tortilla'),
('Venison', 'Deer', 'Straight deer meat', '1. Legally hunt and kill a deer 2. Butcher 3. Grill on 350 for until meat is 130 degrees 4. Sautee in butter on pan');

INSERT INTO ingredients (recipe_id, name) VALUES
(1, 'Eggs'),
(1, 'Steak'),
(1, 'Cheese'),
(1, 'Tortilla'),
(2, 'Deer Meat'),
(2, 'Butter');

SELECT * FROM ingredients;
SELECT ingredients.name 
FROM ingredients 
JOIN recipes ON ingredients.recipe_id = recipes.id 
WHERE recipes.name = 'Breakfast Burrito';




    