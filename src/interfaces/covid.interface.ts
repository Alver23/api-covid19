import { Document } from 'mongoose';

export interface Covid extends Document {
  readonly date: string;
  readonly city: string;
  readonly state: string;
  readonly attention: string;
  readonly age: string;
  readonly gender: string;
  readonly type: string;
  readonly originCountry: string;
}
