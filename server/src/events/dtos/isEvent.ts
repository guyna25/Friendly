import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isString,
  isEmpty,
  isDateString,
} from 'class-validator';

export function IsValidEvent(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidEventType',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const value_map = JSON.parse(value);
          const stringsVals = ['title', 'friends', 'location'];
          stringsVals.forEach((valName) => {
            if (!isString(value_map[valName]) || isEmpty(value_map[valName])) {
              return false;
            }
          });
          if (
            !isDateString(value_map['start']) ||
            !isDateString(value_map['end'])
          ) {
            return false;
          }
          if (isEmpty(value_map['notes'])) {
            return true;
          } else {
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
