import { ethers } from 'hardhat';

const main = async function () {
  const provider = ethers.provider
  const from = await provider.getSigner().getAddress()

  console.log('==from  addr=', from )

  // デプロイ EntryPoint 
  const EntryPoint = await ethers.getContractFactory("EntryPoint");
  const entryPoint = await EntryPoint.deploy();
  await entryPoint.deployed();

  const simpleAccountFactory = await ethers.getContractFactory("SimpleAccountFactory");
  // 自分でEntry Pointコントラクトをデプロして指定する場合はこっち
  // const ret = await simpleAccountFactory.deploy(entryPoint.address);
  // StackUpのBundlerを使用する時はStackUpが用意してくれているEntryPoint Contractを指定した方が安定する。
  const ret = await simpleAccountFactory.deploy(
    entryPoint.address,
    {
      from,
      gasLimit: 6e6,
    });

  console.log('==SimpleAccountFactory addr=', ret.address)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});