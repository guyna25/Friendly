import { IsJSON } from 'class-validator';
import { IsValidEvent } from './isEvent';

export class CreateEventDTO {
  @IsJSON()
  @IsValidEvent()
  content: string;
}
