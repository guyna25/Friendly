import {IsJSON} from 'class-validator';
import { IsValidEvent } from './isEvent';
// import { Type } from 'class-transformer';
// import { EventType } from 'src/models/events.types';

export class CreateEventDTO {
    @IsJSON()
    @IsValidEvent()
    content: JSON
}