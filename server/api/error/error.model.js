'use strict';


import { registerEvents } from './error.events';

var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

var ErrorSchema = new mongoose.Schema({
  type: String,
  name: String,
  score: SchemaTypes.Double,
  date: Date
});

registerEvents(ErrorSchema);
export default mongoose.model('Error', ErrorSchema);
