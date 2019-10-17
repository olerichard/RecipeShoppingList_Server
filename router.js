const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const Recipes = require('./controllers/recipes');
const Units = require('./controllers/units');
const ShoppingList = require('./controllers/shoppinglist');
const passport = require('passport');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  app.get('/', requireAuth, function (req, res) {
    res.send({});
  })

  app.post('/logIn', requireSignin, Authentication.login);
  app.post('/createUser', Authentication.createUser);
  app.post('/saveNewRecipe',requireAuth, upload.single("image"), Recipes.saveNewRecipe);
  app.post('/saveUpdatedRecipe',requireAuth, upload.single("image"), Recipes.saveUpdatedRecipe);
  app.get('/getAllRecipes',requireAuth, Recipes.getAllRecipes);
  app.get('/getAllRecipesShortInfo', Recipes.getAllRecipesShortInfo);
  app.get('/getRecipeById', Recipes.getRecipeById);
  app.get('/getUnitAll',Units.getUnitAll)
  app.get('/getUnitById',Units.GetUnitById)
  app.get('/getUserById',requireAuth, Authentication.getUserById);
  app.post('/getShoppingList',requireAuth, async (req,res,next) =>{ await ShoppingList.getShoppingList(req,res,next) } );
  app.post('/addToShoppingList',requireAuth, ShoppingList.addToShoppingList);
  app.post('/removeFromShoppingList',requireAuth, ShoppingList.removeFromShoppingList);

}