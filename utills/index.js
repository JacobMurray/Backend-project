exports.passwordStrength = password => {
let score = 0;
if(!password) return score;

let letters = new Object();
for(let i = 0; i< password.length; i++){
    letters[password[i]] = (letters[password[i]] || 0) +1;
    score += 5 /letters[password[i]]
}
  const variations = {
    digit: /\d/.test(password),
    lowercaseLetter: /[a-z]/.test(password),
    uppercaseLetter: /[A-Z]/.test(password),
    specialCharacter: /[^a-zA-Z0-9]/.test(password)
  };

  let count = 0;
  for (let check in variations) {
    if (variations[check] === true)
      count += (variations[check] === true) ? 1 : 0
  }
  score += (count-1) * 10
  return  Math.round(score);
};
