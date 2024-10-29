const { ethers } = require('hardhat');

async function main() {
    console.log("Initializing contract deployment...");

    // Get the deployer's signer
    const [deployer] = await ethers.getSigners();
    console.log("Deployer address:", deployer.address);

    // Get the contract factory
    const HackVentures = await ethers.getContractFactory("HackVentures");
    console.log("Contract factory for 'HackVentures' retrieved.");

    console.log("Deploying the contract...");
    const contract = await HackVentures.deploy();

    console.log("Waiting for the deployment to be confirmed...");
    await contract.waitForDeployment();  

    // Get the deployed contract address
    const contractAddress = await contract.getAddress();  // Access the contract address directly
    console.log("HackVentures contract deployed successfully!");
    console.log("Contract Address:", contractAddress);

    // Fetch the deployer's balance
    const deployerBalance = await ethers.provider.getBalance(deployer.address);
    // Format the balance to Ether
    const formattedBalance = ethers.formatEther(deployerBalance);

    console.log(`Deployer's balance: ${formattedBalance} AIA`);
}

main()
    .then(() => {
        console.log("Deployment script executed successfully.");
        process.exit(0);
    })
    .catch(error => {
        console.error("Error during deployment:", error);
        process.exit(1);
    });
