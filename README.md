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