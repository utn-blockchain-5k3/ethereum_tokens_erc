import { ethers } from "hardhat";

async function main() {
  console.log("Deploying ERC20Edu contract...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  console.log("Account balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)));

  // Deploy the contract
  const ERC20Edu = await ethers.getContractFactory("ERC20Edu");
  const erc20Edu = await ERC20Edu.deploy(
    "EduToken",          // name
    "EDU",               // symbol
    ethers.parseUnits("1000000", 18) // initialSupply: 1,000,000 tokens
  );

  await erc20Edu.waitForDeployment();
  const contractAddress = await erc20Edu.getAddress();

  console.log("ERC20Edu deployed to:", contractAddress);
  
  // Verify deployment
  console.log("Contract verified:");
  console.log("- Name:", await erc20Edu.name());
  console.log("- Symbol:", await erc20Edu.symbol());
  console.log("- Total Supply:", ethers.formatUnits(await erc20Edu.totalSupply(), 18));
  console.log("- Owner:", await erc20Edu.owner());
  
  console.log("\n✅ Deployment successful!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });