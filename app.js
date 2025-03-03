


const express = require('express');
const db = require('./db'); 
const app = express();


app.set('view engine', 'ejs');


app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));


//Home page route
app.get('/', (req, res) => {
    res.render('home'); // Renders the new homepage (home.ejs)
  });
  


app.get('/recipes', async (req, res) => {
    
    
    try {
    const [recipes] = await db.query('SELECT * FROM recipes');
    res.render('index', { recipes });
    } 
    
    
    catch (error) {
      console.error(error);
      res.status(500).send('Database error');
    
    
    }
  
});
  



  //Show add-recipe form
app.get('/add-recipe', (req, res) => {
    
    res.render('add-recipe'); 
  

});

app.post('/add-recipe', async (req, res) => {
    
    try {
      
        const { name, category, description, instructions } = req.body;
  
      // Insert the new recipe
      await db.query(
        'INSERT INTO recipes (name, category, description, instructions) VALUES (?, ?, ?, ?)',
        [name, category, description, instructions]
      );
  
      
      // Back button
      res.redirect('/');
    } 
    
    catch (error) {
      console.error(error);
      res.status(500).send('Database error');
   
    }
  


});


//recipe details page
app.get('/recipe/:id', async (req, res) => {
    
    try {
        
        const recipeId = req.params.id;
        
        
        const [recipe] = await db.query('SELECT * FROM recipes WHERE id = ?', [recipeId]);
        
        
        const [ingredients] = await db.query('SELECT name FROM ingredients WHERE recipe_id = ?', [recipeId]);

       
        if (recipe.length === 0) {
            return res.status(404).send('Recipe not found');
        }

        
        res.render('recipe', { recipe: recipe[0], ingredients });


    } 
    
    catch (error) {
        console.error(error);
        res.status(500).send('Database error');
    
    }



});



  




const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
