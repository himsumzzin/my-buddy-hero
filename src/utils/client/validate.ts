export const inputValidationRegex: { [key: string]: RegExp } = {
  id: /^[a-z]+[a-z0-9]{5,19}$/,
  password:
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
  herocode: /^[0-9]{3,4}$/,
  herotitle: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\s`~!@#$%^&*()-_=+]{2,10}$/, // 한글, 영어, 숫자 첫번째글자부터 한글자 이상
  herodescription: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\s`~!@#$%^&*()-_=+]{4,20}$/,
  heroname: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{1,5}$/,
};
