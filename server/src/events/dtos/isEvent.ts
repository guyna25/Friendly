import { registerDecorator, ValidationOptions, ValidationArguments, isString, isEmpty, isDate} from 'class-validator';
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
          const stringsVals = ['name', 'eventTitlte', 'friendName', 'location']
          stringsVals.forEach((valName) => {
            if (!isString(value[valName]) || isEmpty(value[valName])) {
              return false;
            };
          });
          if (!isDate(value['date'])) {
              return false;
          }
          if (isEmpty(value['notes'])){
            return true;
          }
          else {
            return isString(value['notes']);
          }
        },
        defaultMessage(args: ValidationArguments) {
          // Return an error message if the validation fails
          return `${args.property} must be a valid EventType`;
        },
      },
    });
  };
}
