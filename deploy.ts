// const ethers = require('ethers');
// const fs = require('fs');
// require('dotenv').config();

import { ethers } from 'ethers';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

  // for securing the private key by encrypting it
  // const encryptedKey = fs.readFileSync("./encryptedKey.json", "utf-8");
  // let wallet = ethers.Wallet.fromEncryptedJsonSync(
  //   encryptedKey,
  //   process.env.PRIVATE_KEY_SECRET
  // );
  // wallet = wallet.connect(provider);

  const wallet = new ethers.Wallet(String(process.env.PRIVATE_KEY), provider);

  const abi = fs.readFileSync(
    './compiled/SimpleStorage_sol_SimpleStorage.abi',
    'utf-8',
  );
  const binary = fs.readFileSync(
    './compiled/SimpleStorage_sol_SimpleStorage.bin',
    'utf-8',
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log('Deploying contract...');
  const contract = await contractFactory.deploy();
  await contract.waitForDeployment();
  console.log(`Contract Address: ${contract.target}`);

  // const favouriteNumber = await contract.retrieve();
  // console.log(`Favourite Number: ${favouriteNumber}`);
  // const updateFovouriteNumber = await contract.store(10);
  // await updateFovouriteNumber.wait();
  // const updatedFavouriteNumber = await contract.retrieve();
  // console.log(`Updated Favourite Number: ${updatedFavouriteNumber}`);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
