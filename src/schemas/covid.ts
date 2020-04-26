import * as mongoose from 'mongoose';

export const CovidSchema = new mongoose.Schema({
  date: String,
  city: String,
  state: String,
  attention: String,
  age: String,
  gender: String,
  type: String,
  originCountry: String,
}, { collection: 'covid' });
