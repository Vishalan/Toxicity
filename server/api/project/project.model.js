'use strict';

import { registerEvents } from './project.events';

var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

var ProjectSchema = new mongoose.Schema({
  type: String,
  name: String,
  score: SchemaTypes.Double,
  date: Date,
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }]
});

registerEvents(ProjectSchema);
export default mongoose.model('Project', ProjectSchema);
