'use strict';
const RecipesPost = require( '../models/RecipesPost' );

exports.saveRecipesPost = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  if (!res.locals.loggedIn) {
    return res.send("You must be logged in to post to the forum.")
  }

  let newRecipesPost = new RecipesPost(
   {
    userId: req.user._id,
    post: req.body.post,
    ingredients:req.body.ingredients,
    createdAt: new Date(),
    description:req.body.description
   }
  )

  //console.log("skill = "+newSkill)

  newRecipesPost.save()
    .then( () => {
      res.redirect( 'recipes' );
    } )
    .catch( error => {
      res.send( error );
    } );
};


// this displays all of the skills
exports.getAllRecipesPosts = ( req, res, next ) => {
  //gconsle.log('in getAllSkills')
  RecipesPost.find()
    .exec()
    .then( ( posts ) => {
      console.log("posts are " + posts);
      res.render('recipes',{
        posts:posts
      })
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      //console.log( 'skill promise complete' );
    } );
};

exports.deleteRecipesPost = (req, res) => {
  console.log("in deleteRecipesPost")
  let deleteId = req.body.delete
  if (typeof(deleteId)=='string') {
      // you are deleting just one thing ...
      RecipesPost.deleteOne({_id:deleteId})
           .exec()
           .then(()=>{res.redirect('/recipes')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(deleteId)=='object'){
      RecipesPost.deleteMany({_id:{$in:deleteId}})
           .exec()
           .then(()=>{res.redirect('/recipes')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(deleteId)=='undefined'){
      //console.log("This is if they didn't select a skill")
      res.redirect('/recipes')
  } else {
    //console.log("This shouldn't happen!")
    res.send(`unknown deleteId: ${deleteId} Contact the Developer!!!`)
  }

};


// this displays all of the skills
exports.showOnePost = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  const id = req.params.id
  console.log('the id is '+id)
  RecipesPost.findOne({_id:id})
    .exec()
    .then( ( RecipesPost ) => {
      res.render( 'RecipesPost', {
        post:RecipesPost, title:"Recipes Post"
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      //console.log( 'skill promise complete' );
    } );
};
