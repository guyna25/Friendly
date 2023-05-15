import { registerDecorator, ValidationOptions, ValidationArguments, isString, isEmpty, isDateString} from 'class-validator';
import { EventType } from 'src/models/events.types';

export function IsValidEvent(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidEventType',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          let value_map = JSON.parse(value);
          const stringsVals = ['eventTitle', 'friendName', 'location']
          stringsVals.forEach((valName) => {
            if (!isString(value_map[valName]) || isEmpty(value_map[valName])) {
              return false;
            };
          });
          if (!isDateString(value_map['date'])) {
              return false;
          }
          if (isEmpty(value_map['notes'])){
            return true;
          }
          else {
            return isString(value_map['notes']);
          }
        },
        defaultMessage(args: ValidationArguments) {
          // Return an error message if the validation fails
          return `${args.property} must be a valid Event`;
        },
      },
    });
  };
}
