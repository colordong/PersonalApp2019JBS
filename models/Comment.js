'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

var commentSchema = Schema( {
  name: String,
  age: String,
  height: String,
  weight: String
} );

module.exports = mongoose.model( 'Comment', commentSchema );
