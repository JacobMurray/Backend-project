const {passwordStrength} = require('../utills');
const { expect } = require('chai');

describe('passwordStength', () => {
    it('When given a strong password return true', () => {
        expect(passwordStrength('Helloworld3%')).to.equal(true)
    });
    it('When given a missing a capital letter', () => {
        expect(passwordStrength('helloworld3%').message).to.equal('please enter a uppercaseLetter in password')
    });
});