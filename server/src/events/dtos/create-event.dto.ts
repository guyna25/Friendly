import {IsString} from 'class-validator';

export class CreateEventDTO {

    @IsString()
    content: string;
}