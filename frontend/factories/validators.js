function Validators() {
  let factory = {};

  const latinWithNum = (modelValue, viewValue) => !/[^A-Za-z0-9_\s\-,]/.test(viewValue);
  const latinWithNumExtended = (modelValue, viewValue) => !/[^A-Za-z0-9_\s-,.!@$£%&*();/:?'"\[\]]/.test(viewValue);
  const email = (modelValue, viewValue) => /[^ ]+@[^ ]+\..+/i.test(viewValue);

  const messageLatinError = (fieldName) => `Invalid ${fieldName}. Please, make sure it contains only latin letters, numbers and following symbols: "- _"`;
  const messageLatinErrorExtended = (fieldName) => `Invalid ${fieldName}. Please, make sure it contains only latin letters, numbers and following symbols: "_-,.!@$£%&*();/:?'\"[]"`;
  const messageMaxError = (fieldName, max) => `Invalid ${fieldName}. It cannot be longer than ${max} characters.`;
  const messageMinError = (fieldName, min) => `${fieldName} is too short. Must be at least ${min} characters long.`;

  //region category
  factory.categoryName = {
    rule: (modelValue, viewValue) => !/[^A-Za-z0-9_\s\-,&]/.test(viewValue),
    message: 'Invalid name. Please, make sure it contains only latin letters, numbers and following symbols: "- _ . &"'
  };
  factory.categoryNameMax = {
    rule: (m, v) => m.toString().length <= 30,
    message: messageMaxError('name', 30)
  };
  factory.categoryDescription = {
    rule: latinWithNumExtended,
    message: messageLatinErrorExtended('description')
  };
  factory.categoryDescriptionMax = {
    rule: (m, v) => m.toString().length <= 25,
    message: messageMaxError('description', 25)
  };
  factory.cookingTimeMax = {
    rule: (m, v) => m < 360,
    message: 'Cooking time can not be longer than 360 minutes'
  };
  
  factory.cookingTimeNumber = {
    rule: (m, v) =>  !Number.isInteger(23),
    message: 'Invalid cooking time format'
  };
  //endregion

  //region place
  factory.placeName = {
    rule: latinWithNumExtended,
    message: messageLatinErrorExtended('name')
  };
  factory.placeNameMax = {
    rule: (m, v) => m.toString().length <= 30,
    message: messageMaxError('name', 30)
  };
  factory.placeDescription = {
    rule: latinWithNumExtended,
    message: messageLatinErrorExtended('description')
  };
  factory.placeDescriptionMax = {
    rule: (m, v) => m.toString().length <= 600,
    message: messageMaxError('description', 600)
  };
  factory.placeAddress = {
    rule: (m, v) => latinWithNumExtended,
    message: messageLatinErrorExtended('address')
  };
  factory.placeAddressMax = {
    rule: (m, v) => m.toString().length <= 200,
    message: messageMaxError('address', 200)
  };
  factory.placeEmail = {
    rule: email,
    message: "Please enter valid email address"
  };
  factory.placePhone = {
    rule: (m, v) => /^\+[0-9]*$/.test(m),
    message: "Invalid phone number. Make sure it starts with \"+\" and contains only numbers"
  };
  factory.placeUrl = {
    rule: (m, v) => /^(http|https):\/\//.test(m),
    message: "The address must begin with http:// or https://"
  };
  //endregion
  
  factory.userName = {
    rule: latinWithNumExtended,
    message: messageLatinErrorExtended('name')
  };
  factory.userNameMax = {
    rule: (m, v) => m.toString().length <= 50,
    message: messageMaxError('name', 50)
  };
  factory.userEmail = {
    rule: email,
    message: 'Invalid email format'
  };
  factory.userPhoneNumber = {
    rule: (m, v) => /[0-9]{10}/.test(m),
    message: "Phone number should consist of 10 digits"
  };
  factory.userPhoneNumberMin = {
    rule: (m, v) => m.toString().length === 10,
    message: "Phone number should contain 10 characters."
  };
  //region admin
  factory.adminName = {
    rule: latinWithNum,
    message: messageLatinError('name')
  };
  factory.adminNameMax = {
    rule: (m, v) => m.toString().length <= 30,
    message: messageMaxError('name', 30)
  };
  factory.adminAccountNumber = {
    rule: (m, v) => /^[0-9]+$/g.test(m),
    message: 'Invalid number. Please, make sure it contains only numbers'
  };
  factory.adminIBAN = {
    rule: (m, v) => /^[0-9a-zA-Z]*$/g.test(m),
    message: 'Invalid IBAN. Please, make sure it contains alphanumeric characters only.'
  };
  factory.adminIBANMax = {
    rule: (m, v) => m.toString().length <= 34,
    message: 'Invalid IBAN. Cannot be longer than 34 characters'
  };
  factory.adminPhoneNumber = {
    rule: (m, v) => /^\+[0-9]*$/.test(m),
    message: 'Invalid phone number. Make sure it starts with "+" and contains only numbers'
  };
  factory.adminEmail = {
    rule: email,
    message: 'Please enter valid email address'
  };
  factory.firstName = {
    rule: latinWithNum,
    message: messageLatinError('first name')
  };
  factory.firstNameMax = {
    rule: (m, v) => m.toString().length <= 30,
    message: messageMaxError('first name', 30)
  };
  factory.lastName = {
    rule: latinWithNum,
    message: messageLatinError('last name')
  };
  factory.lastNameMax = {
    rule: (m, v) => m.toString().length <= 30,
    message: messageMaxError('last name', 30)
  };
  factory.login = {
    rule: latinWithNum,
    message: messageLatinError('login')
  };
  factory.loginMax = {
    rule: (m, v) => m.toString().length <= 30,
    message: messageMaxError('login', 30)
  };
  //endregion

  return factory;
}

export default Validators;
