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

www.DeepL.com/Translator（無料版）で翻訳しました。

### 参考文献
1. [EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
2. [FireWallet - Github](https://github.com/xwing-india/eth-india)
3. [Account-Abstruction](https://github.com/eth-infinitism/account-abstraction)
4. [NPM  AccountAbstruction](https://www.npmjs.com/package/@account-abstraction/contracts)
