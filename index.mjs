import * as dotenv from "dotenv";
import { ethers } from "ethers";
import { Command } from "commander";
import { Alchemy, Network } from "alchemy-sdk";
import fs from "fs";
dotenv.config();

if (!process.env.ALCHEMY_API_KEY) {
  console.error("Set the ALCHEMY_API_KEY in the .env file");
  process.exit(1);
}

const program = new Command();
const alchemy = new Alchemy({
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
});

program
  .name("vveb3-tools")
  .description("Some useful vveb3 tools")
  .version("0.0.1");

program
  .command("snapshot")
  .description("Get a snapshot of token owners of a specific NFT contract")
  .argument("<address>", "contract address")
  .action((address) => {
    const getBalances = async () => {
      if (!ethers.isAddress(address)) {
        console.error("Error: Invalid Address");
        process.exit(1);
      }
      const formattedAddress = ethers.getAddress(address);

      const owners = await alchemy.nft.getOwnersForContract(formattedAddress, {
        withTokenBalances: true,
      });

      const data = [];

      owners.owners.forEach((owner, inde) => {
        data.push({
          address: owner.ownerAddress,
          count: owner.tokenBalances.length,
        });
        return;
      });

      // Thanks ChatGPT for saving an npm import
      const csv = `${Object.keys(data[0]).join(",")}\n${data
        .map((obj) => Object.values(obj).join(","))
        .join("\n")}`;

      fs.writeFile("owners.csv", csv, function (err) {
        if (err) throw err;
        console.log("CSV file of token owners created successfully.");
      });
    };

    getBalances();
  });

program.parse();
