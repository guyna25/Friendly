import mongoose = require('mongoose'); 
export interface Event extends mongoose.Document {
    eventTitlte: string,
    friendName: string[],
    location: string,
    date: Date,
    notes?: string,
}
