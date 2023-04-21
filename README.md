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

### 参考文献
1. [EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
2. [FireWallet - Github](https://github.com/xwing-india/eth-india)
3. [Account-Abstruction](https://github.com/eth-infinitism/account-abstraction)
4. [NPM  AccountAbstruction](https://www.npmjs.com/package/@account-abstraction/contracts)
5. [jiffyScan](https://www.jiffyscan.xyz/)
6. [【GitHub】jiffyScan](https://github.com/mashharuki/jiffy-explorer)
