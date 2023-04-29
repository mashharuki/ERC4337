# ERC4337
ERC4337を学習するためのサンプルリポジトリです。

### 特徴

- UserOperation - ユーザーの代わりに送信されるトランザクションを記述する構造体です。混乱を避けるため、"transaction "という名前は付けられていない。
トランザクションと同様に、"sender", "to", "calldata", "maxFeePerGas", "maxPriorityFee", "signature", "nonce" を含む。
トランザクションとは異なり、以下のようないくつかのフィールドを含んでいます。
また、"nonce "と "signature "フィールドの使用方法は、プロトコルで定義されているわけではなく、各アカウントの実装によって定義されています。
- Sender - ユーザーオペレーションを送信するアカウントコントラクト。
- EntryPoint - UserOperationのバンドルを実行するためのシングルトンコントラクトです。バンドラー／クライアントは、サポートされるエントリーポイントをホワイトリストに登録します。
- Bundler - 複数のUserOperationをバンドルし、EntryPoint.handleOps()トランザクションを作成するノード（ブロックビルダー）です。ネットワーク上のすべてのブロックビルダーがバンドラーであることを要求されるわけではないことに注意してください
- アグリゲーター - アグリゲートされた署名を検証するために、アカウントによって信頼されるヘルパー契約です。バンドラー/クライアントは、サポートされるアグリゲーターをホワイトリスト化します。

### アーキテクチャ

アカウントアブストラクションを実現するためのコンポーネント
1. EntryPoint contract (エントリーポイントコントラクト)
2. Paymaster contract (コントラクト)
3. UserOperation (ユーザーが実行したいトランザクション本体のデータ)
4. Bundler (トランザクションを束ねてブロックチェーンに送信するためのAPIサーバー)
5. Miner (？)
6. client library (アカウントアブストラクションの機能を呼び出すためのクライアントライブラリ)

## エクステンション：ペイマスターズ
エントリーポイントのロジックを拡張し、他のユーザーのトランザクションをスポンサーすることができるペイマスターをサポートします。この機能は、アプリケーション開発者がユーザーの料金を補助したり、ユーザーがERC-20トークンで料金を支払うことを可能にしたり、その他多くのユースケースに使用することができます。

Paymasterは、dAppの利用者がトランザクション手数料を支払わずにdAppを使用できるようにするための機能です。Paymasterは、利用者の代わりにトランザクション手数料を支払うため、dAppの利用者はトランザクションを送信するときにETHを持っている必要がありません。

Paymasterは、dAppの所有者が管理するスマートコントラクトであり、dAppの利用者がPaymasterに対して任意の量のETHを送信し、Paymasterはトランザクション手数料を支払い、dAppに転送します。

ERC-2771は、Paymasterを実装するために必要なメソッドやイベントを定義しています。Paymasterを実装するには、ERC-2771で定義されたスマートコントラクトを作成し、必要なメソッドを実装する必要があります。

Paymasterの利点は、利用者がETHを持っていなくてもdAppを利用できるようになることです。これにより、ユーザーの利用率を向上させることができます。また、PaymasterはdAppの所有者が管理するため、手数料を自由に設定することができるため、dAppの収益性を向上させることもできます。

## toEthSignedMessageHashメソッドについて

toEthSignedMessageHashは、Ethereumデジタル署名標準に従って、任意のメッセージに対して署名する前にハッシュ値を生成するために使用されるメソッドの1つです。

このメソッドは、web3.jsやSolidityなどのEthereum開発ツールキットで利用可能であり、以下のようなステップで使用することができます。

1. メッセージをUTF-8形式でエンコードします。
2. Ethereumの署名形式に必要なプレフィックス文字列 ("\x19Ethereum Signed Message:\n" + メッセージのバイト数)を追加します。
3. 2で生成された文字列をハッシュ化します。
4. ハッシュ値を16進数文字列に変換します。

## Metamask Snapについて

Metamask Snapは、Metamaskブラウザ拡張機能に追加できる、分散型アプリケーション（dApps）のための拡張機能です。

Snapは、MetamaskのAPIを使用して、dAppsとのインタラクションを可能にすることができます。Snapは、dAppsがMetamaskのUIやAPIを直接利用することなく、dAppsがMetamaskと連携することを可能にすることができます。これにより、dAppsは、Metamask Snap APIを介してMetamaskのウォレット機能を利用することができます。

Metamask Snapを使用することで、ユーザーはMetamaskをアンロックすることなく、dAppsにアクセスすることができます。dAppsは、Metamask Snapを使用して、ユーザーにウォレットアドレスの確認やトランザクションの署名などの機能を提供することができます。

Metamask Snapは、Snap StoreというMetamaskのSnap拡張機能のマーケットプレイスで利用可能です。Snap Storeには、多数のSnapが提供されており、ユーザーは必要に応じてSnapを追加することができます。Snap Storeには、dAppの開発者が作成したSnapが含まれており、ユーザーはSnap Storeを通じてdAppsにアクセスすることができます。

Metamask Snapは、分散型アプリケーションとのインタラクションを簡素化し、ユーザーにとってよりシームレスなdAppエクスペリエンスを提供することを目的としています。
→ AA系のアプリだとMetamaskはインストールしていない前提なのでそうすること。

## AAを使った際のシステム構成案

![](./docs/system.drawio.png)

## デプロイしたコントラクト

|No.|コントラクト名|アドレス|ネットワーク|
|:-----|:-----|:-----|:-----|
|1|SimpleAccountFactory|[0xA0B912d2797602863ce04F370b36330d80e76832](https://mumbai.polygonscan.com/address/0xA0B912d2797602863ce04F370b36330d80e76832)|Mumbai|
|2|EntryPoint|[0x607cAAF3fF8bB0469F1e9b1e3214008C0B1D05C6](https://mumbai.polygonscan.com/address/0x607cAAF3fF8bB0469F1e9b1e3214008C0B1D05C6#code)|Mumbai|
|3|SimpleAccount|[生成したコントラクトウォレット](https://mumbai.polygonscan.com/address/0xA85aB8d7133A8DA31Ec8f139F3424a92119e3a66)|Mumbai|

## 本リポジトリ内の動かし方

- インストール

```bash
cd 4337-sample && npm i
```

- コンパイル

```bash
npm run compile
```

- テスト

```bash
npm run test
```

- EntryPointコントラクトのデプロイ & Verify

```bash
npm run entryPoint:deploy:mumbai
```

`package.json`ファイルにデプロイしたコントラクトアドレスを埋め込むこと!! 

```bash
npm run entryPoint:verify:mumbai
```

- SimpleAccountFactoryコントラクトのデプロイ & Verify

```bash
npm run simpleAccountFactory:deploy:mumbai 
```

`package.json`ファイルにデプロイしたコントラクトアドレスを埋め込むこと!! 

```bash
npm run simpleAccountFactory:verify:mumbai
```

## QuickStartをやった記録

```bash
yarn
```

```bash
yarn run init
```

- コントラクトウォレット生成

```bash
yarn run simpleAccount address
```

- 実行結果

```bash
SimpleAccount address: 0xAcF13ddE0328fC1D971b14b46601f72EfCde988a
✨  Done in 9.51s.
```

- ネイティブトークンの送金

```bash
yarn run simpleAccount transfer --to 0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072 --amount 0.05
```

- 実行結果

```bash
Signed UserOperation: {
  sender: '0xAcF13ddE0328fC1D971b14b46601f72EfCde988a',
  nonce: '0x0',
  initCode: '0x9406cc6185a346906296840746125a0e449764545fbfb9cf000000000000000000000000e6d171e50dc760f74e1e5c78f3f4e1e2df72cb5e0000000000000000000000000000000000000000000000000000000000000000',
  callData: '0xb61d27f600000000000000000000000051908f598a5e0d8f1a3babfa6df76f9704dad07200000000000000000000000000000000000000000000000000b1a2bc2ec5000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000',
  callGasLimit: '0x814c',
  verificationGasLimit: '0x583f4',
  preVerificationGas: '0xaf9c',
  maxFeePerGas: '0x670cebc0',
  maxPriorityFeePerGas: '0x670ceba0',
  paymasterAndData: '0x',
  signature: '0xf41970f318f4c9425ac22689fcf8d361fff35cc8134cbb69a2b65de733a6657131982677a02d9f89a6dce63bf272be036e33b78d02bfb8404a878b8ebe6d5f881b'
}
UserOpHash: 0xed45d1eb9ecd6457172aeed91e4cd6b13ef907eedd7a27661cabbf1d1a603634
Waiting for transaction...
Transaction hash: 0xcc122aca392ae5096f9404d868f4e4336f2f81f8933bdead8e1ca25909a9c09e
✨  Done in 25.13s.
```

- ERC20のトークン(LINKトークン)を送信する

```bash
yarn run simpleAccount erc20Transfer --token 0x326C977E6efc84E512bB9C30f76E30c160eD06FB --to 0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072 --amount 0.1
```

- 実行結果

```bash
Transferring 0.1 LINK...
Signed UserOperation: {
  sender: '0xAcF13ddE0328fC1D971b14b46601f72EfCde988a',
  nonce: '0x1',
  initCode: '0x',
  callData: '0xb61d27f6000000000000000000000000326c977e6efc84e512bb9c30f76e30c160ed06fb000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000044a9059cbb00000000000000000000000051908f598a5e0d8f1a3babfa6df76f9704dad072000000000000000000000000000000000000000000000000016345785d8a000000000000000000000000000000000000000000000000000000000000',
  callGasLimit: '0x9922',
  verificationGasLimit: '0xed10',
  preVerificationGas: '0xaeb8',
  maxFeePerGas: '0x6507a5de',
  maxPriorityFeePerGas: '0x6507a5c0',
  paymasterAndData: '0x',
  signature: '0xb0a132bd539cfadcc4e05b2f6753f88ad6d53fa0a7e2379d642cc5295b98e2ee107d7a45bf76766cd7f1ca9dc98a8c34f3ae4182a2808e36617d0ef85456aedb1c'
}
UserOpHash: 0x1a4b3f80da3e0c6fd52dd4c1657e14f837eaf4a32f1bf13a98cf7365be7b2144
Waiting for transaction...
Transaction hash: 0x93117543b9382f20f58c27811887dfebac7833080f89132682ad509f0e220cdb
✨  Done in 21.65s.
```

- ERC20を承認するコマンド

```bash
yarn run simpleAccount erc20Approve --token 0x326C977E6efc84E512bB9C30f76E30c160eD06FB --spender 0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072 --amount 0.5
```

- 実行結果

```bash
Approving 0.5 LINK...
Signed UserOperation: {
  sender: '0xAcF13ddE0328fC1D971b14b46601f72EfCde988a',
  nonce: '0x2',
  initCode: '0x',
  callData: '0xb61d27f6000000000000000000000000326c977e6efc84e512bb9c30f76e30c160ed06fb000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000044095ea7b300000000000000000000000051908f598a5e0d8f1a3babfa6df76f9704dad07200000000000000000000000000000000000000000000000006f05b59d3b2000000000000000000000000000000000000000000000000000000000000',
  callGasLimit: '0xc623',
  verificationGasLimit: '0xed10',
  preVerificationGas: '0xaeb8',
  maxFeePerGas: '0x6507a5e2',
  maxPriorityFeePerGas: '0x6507a5c0',
  paymasterAndData: '0x',
  signature: '0xdeeef33f860c1224d0cbc9e72f9c9a942c4da9661b80ae9f9b5268790e51a0382511f8c8e2543bd02a04eaf4ac2846d2ebeb0999607782be4e36ab0f2e2c539d1b'
}
UserOpHash: 0xa9c59076dc2aed6216a8eafaa335a40898a5b470a82b2ff873b42834d57e29d6
Waiting for transaction...
Transaction hash: 0xc96ac903a0130cfbd2fdc0a9dd9553cb040b909d981a9465dc2120d1ab03d6a2
✨  Done in 21.18s.
```

- 一気に複数のERC20トークンした場合

```bash
yarn run simpleAccount batchErc20Transfer --token 0x326C977E6efc84E512bB9C30f76E30c160eD06FB --to 0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072,0x1295BDc0C102EB105dC0198fdC193588fe66A1e4 --amount 0.01
```

- 実行結果

```bash

```

### 参考文献
1. [EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
2. [FireWallet - Github](https://github.com/xwing-india/eth-india)
3. [Account-Abstruction](https://github.com/eth-infinitism/account-abstraction)
4. [NPM  AccountAbstruction](https://www.npmjs.com/package/@account-abstraction/contracts)
5. [jiffyScan](https://www.jiffyscan.xyz/)
6. [【GitHub】jiffyScan](https://github.com/mashharuki/jiffy-explorer)
8. [【StackUp Docs】AA introduction](https://docs.stackup.sh/docs/introduction)
9. [AAsnap](https://github.com/a42io/AAsnap)
10. [stackup-bundler Sample source](https://github.com/stackup-wallet/stackup-bundler)
11. [【npm】Userop.js](https://www.npmjs.com/package/userop)
12. [MetaMask/snaps-monorepo](https://github.com/MetaMask/snaps-monorepo)
13. [extend-the-functionality-of-metamask](https://docs.metamask.io/guide/snaps.html#extend-the-functionality-of-metamask)
14. [Template Snap monorepo](https://github.com/MetaMask/template-snap-monorepo)
15. [Create a gas estimation snap](https://docs.metamask.io/snaps/tutorials/gas-estimation)
16. [Hardhatの使い方メモ(4) テスト - イベントのテスト方法](https://nawoo.hateblo.jp/entry/2021/11/15/223439)