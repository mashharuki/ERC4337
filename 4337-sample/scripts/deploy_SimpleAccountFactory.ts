import { ethers } from 'hardhat';

const main = async function () {
  const provider = ethers.provider
  const from = await provider.getSigner().getAddress()

  // デプロイ EntryPoint 
  const EntryPoint = await ethers.getContractFactory("EntryPoint");
  const entryPoint = await EntryPoint.deploy();
  await entryPoint.deployed();

  const simpleAccountFactory = await ethers.getContractFactory("SimpleAccountFactory");

  const ret = await simpleAccountFactory.deploy(entryPoint.address);

  console.log('==SimpleAccountFactory addr=', ret.address)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});