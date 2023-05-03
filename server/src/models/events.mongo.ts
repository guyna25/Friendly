import mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
    name: {type:String, required: true},
    eventTitlte: {type:String, required: true},
    friendName: {type: Array<String>, required: true},
    location: {type:String, required: true},
    date: {type:Date, required: true},
    notes: {type:String, required: false},
  });