const {passwordStrength} = require('../utills');
const { expect } = require('chai');

describe('passwordStength', () => {
    it('When given a strong password return true', () => {
        expect(passwordStrength('Helloworld3%')).to.equal(true)
    });
    it('When given a password missing a capital letter', () => {
        expect(passwordStrength('helloworld3%').message).to.equal('please enter a uppercaseLetter in password')
    });
    it('When given a password missing a number', () => {
        expect(passwordStrength('Helloworld%').message).to.equal('please enter a digit in password')
    });
    it('When given a password missing a special character', () => {
        expect(passwordStrength('Helloworld3').message).to.equal('please enter a specialCharacter in password')
    });
    it('When given a password not log enough', () => {
        expect(passwordStrength('Hello').message).to.equal('please enter a longerWord in password')
    });
});