'use strict';
const Comment = require( '../models/Comment' );

exports.saveComment = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  let newComment = new Comment( {
    name: req.body.name,
    age: req.body.age,
    height: req.body.height,
    weight: req.body.weight,
  } )
  console.dir(req.body)
  console.log("the comment is:")
  console.dir(newComment)

  //console.log("skill = "+newSkill)

  newComment.save()
    .then( () => {
      res.redirect( '/showComments' );
    } )
    .catch( error => {
      res.send( error );
    } );
};

// this displays all of the skills
exports.getAllComment = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  Comment.find( )
    .exec()
    .then( ( comments ) => {
      res.render( 'comments', {
        comments: comments, title:"Comments"
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


 // this displays all of the skills
exports.getOneComment = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  const id = req.params.id
  console.log('the id is '+id)
  Comment.findOne({_id:id})
    .exec()
    .then( ( comment ) => {
      res.render( 'comment', {
        comment:comment, title:"Comment"
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
