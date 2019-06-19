const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const Recipes = require('./controllers/recipes');
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
  app.post('/saveNewRecipe', upload.single("image"), Recipes.saveNewRecipe);
  app.post('/saveUpdatedRecipe', Recipes.saveUpdatedRecipe);
  app.get('/getAllRecipes', Recipes.getAllRecipes);
  app.get('/getAllRecipesShortInfo', Recipes.getAllRecipesShortInfo);
  app.get('/getRecipeById', Recipes.getRecipeById);
  app.post('/getUserById', Authentication.getUserById);

}