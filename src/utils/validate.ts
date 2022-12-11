export const inputValidationRegex: { [key: string]: RegExp } = {
  id: /^[a-z]+[a-z0-9]{5,19}$/,
  password:
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
  herocode: /^[0-9]{3,4}$/,
};
