'use strict';

import { registerEvents } from './file.events';

var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

var FileSchema = new mongoose.Schema({
  type: String,
  name: String,
  date: Date,
  path: String,
  score: SchemaTypes.Double,
  issues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Issue' }]
});

registerEvents(FileSchema);
export default mongoose.model('File', FileSchema);
