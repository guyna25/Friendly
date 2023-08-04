import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isString,
  isEmpty,
  isDateString,
} from 'class-validator';

export function IsValidEventUpdate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidEventUpdate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const value_map = JSON.parse(value);
          //must have _id
          if (!isString(value_map['_id']) || isEmpty(value_map['_id'])) {
            return false;
          }
          let hasUpdatableField = false;
          //validate types for all possible field updates - needs to have at least one valid not id field
          for (const key in value_map) {
            if (key == '_id') {
              continue;
            }
            if (key == 'title' || key == 'friends' || key == 'location') {
              if (!isString(value_map[key])) {
                return false;
              }
              hasUpdatableField = true;
            } else if (key == 'start' || key == 'end') {
              if (!isDateString(value_map[key])) {
                return false;
              }
              hasUpdatableField = true;
            } else if (key == 'notes') {
              if (!isEmpty(value_map[key]) && isString) {
                return false;
              }
              hasUpdatableField = true;
            } else {
              return false;
            }
          }
          return hasUpdatableField;
        },
        defaultMessage(args: ValidationArguments) {
          // Return an error message if the validation fails
          return `${args.property} must be a valid Event update`;
        },
      },
    });
  };
}
