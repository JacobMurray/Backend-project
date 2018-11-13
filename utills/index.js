exports.passwordStrength = (password)  => {
  const variations = {
    longerWord: password.length >= 8,
    digit: /\d/.test(password),
    lowercaseLetter: /[a-z]/.test(password),
    uppercaseLetter: /[A-Z]/.test(password),
    specialCharacter: /[^a-zA-Z0-9]/.test(password)
  };

  for (let check in variations) {
    if (variations[check] === false)
      return { message: `please enter a ${check} in password` };
  }
  return true;
}

