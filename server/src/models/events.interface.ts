import mongoose = require('mongoose');
export interface Event extends mongoose.Document {
  title: string;
  friends: string[];
  location: string;
  start: Date;
  end: Date;
  wholeDay: boolean;
  notes?: string;
}
