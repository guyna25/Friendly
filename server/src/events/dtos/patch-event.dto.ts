import { IsJSON } from 'class-validator';
import { IsValidEventUpdate } from './isEventUpdate';

export class PatchEventDTO {
  @IsJSON()
  @IsValidEventUpdate()
  content: string;
}
