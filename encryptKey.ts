// const ethers = require("ethers");
// const fs = require("fs");
// require("dotenv").config();

import { ethers } from 'ethers';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const wallet = new ethers.Wallet(String(process.env.PRIVATE_KEY));
  const encryptedJsonKey = await wallet.encrypt(
    String(process.env.PRIVATE_KEY_SECRET),
    () => {},
  );
  fs.writeFileSync('./encryptedKey.json', encryptedJsonKey);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
