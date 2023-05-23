import mongoose = require('mongoose'); 
export interface Event extends mongoose.Document {
    eventTitle: string,
    friendName: string[],
    location: string,
    date: Date,
    notes?: string,
}
