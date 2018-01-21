'use strict';

import { registerEvents } from './issue.events';

var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

var IssueSchema = new mongoose.Schema({
  type: String,
  name: String,
  score: SchemaTypes.Double,
  date: Date
});

registerEvents(IssueSchema);
export default mongoose.model('Issue', IssueSchema);
