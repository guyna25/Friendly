import mongoose = require('mongoose'); 
export interface Event extends mongoose.Document {
    eventTitle: string,
    friends: string[],
    location: string,
    date: Date,
    notes?: string,
}
