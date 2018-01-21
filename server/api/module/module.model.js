'use strict';

import {registerEvents} from './module.events';

var mongoose = require('mongoose')
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

var ModuleSchema = new mongoose.Schema({
  type: String,
  date: Date,
  score: SchemaTypes.Double,
  projects: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Project' }]
});

registerEvents(ModuleSchema);
export default mongoose.model('Module', ModuleSchema);
