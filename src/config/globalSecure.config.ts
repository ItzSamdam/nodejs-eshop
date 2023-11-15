import bcrypt from "bcrypt";
import crypto from "crypto";


/**
 * Generate a random string of characters
 * @param length Length of the string to generate
 * @returns A random string of characters
 */
class generateDigitOTP {
  protected characters: string;
  constructor(characters: string = "0123456789") {
    this.characters = characters;
  }

  generateOtp(length: number): string {
    let generatedOtp: string = "";

    for (let i = 0; i < length; i++) {
      // Use the crypto module to generate a random index
      const randomIndex = crypto.randomInt(0, this.characters.length);
      generatedOtp += this.addToGeneratedOtp(randomIndex);
    }
    return generatedOtp;
  }

  protected addToGeneratedOtp(index: number): string | number {
    return index;
  }
}

class generateAlphaNumericOTP extends generateDigitOTP {
  constructor() {
    const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    super(characters);
  }

  protected addToGeneratedOtp(index: number): string {
    return this.characters[index];
  }
}


/**
 * Hash a password using bcrypt
 * @param password Password to hash
 */
// Number of rounds for bcrypt salt generation (higher is more secure but slower)
const saltRounds = 10;
async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, saltRounds);
}

/**
 * Determine if a password matches a hash using bcrypt
 * @param inputPassword
 * @param hashedPassword
 * @returns
 */
async function comparePassword(inputPassword: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(inputPassword, hashedPassword);
}


export {
  generateDigitOTP, generateAlphaNumericOTP, hashPassword, comparePassword
};
