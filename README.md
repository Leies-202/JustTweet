# Just Note ボタン Leisskey

ボタンをクリックすると、現在のタブのタイトルとURLを入れた
れいすきーの投稿画面 `https://mk.lei202.com/share` を開くChrome拡張です。
タイトルの接頭辞は従来どおり ` » ` です。投稿の確定は投稿画面で行います。

## Manifest V3への移行方針

単機能のまま保守できるよう、ビルドツールや外部ライブラリは追加しません。

- `browser_action` を `action` に変更。
- バックグラウンドページを Service Worker に変更。クリックのリスナーはトップレベルで登録。
- `window.open` と `screen` を `chrome.windows.get/create` に置き換え。
  投稿画面は画面全体ではなく、元のブラウザウィンドウの中央に開きます。
  サイズは630×810ピクセルを基本に、元のウィンドウが小さい場合はそれに合わせます。
  実際の位置・サイズはOSやChromeによって調整されることがあります。
- `tabs` 権限を `activeTab` に変更。クリック時に対象タブのタイトルとURLを取得します。
  ホスト権限やコンテンツスクリプトは不要です。
- 共有先とクエリパラメータを維持し、バージョンを1.3に更新。

参考: [Chromeの移行ガイド](https://developer.chrome.com/docs/extensions/develop/migrate/to-service-workers)、
[activeTab権限](https://developer.chrome.com/docs/extensions/develop/concepts/activeTab)。

## ローカルで使う

1. Chromeで `chrome://extensions` を開き、デベロッパーモードを有効にします。
2. 「パッケージ化されていない拡張機能を読み込む」で、このリポジトリの `src` フォルダを選択します。
3. 拡張機能をツールバーに固定し、共有したいページでクリックします。

更新後は、拡張機能一覧の再読み込みボタンを押してください。

## 動作確認

- 通常のWebページでクリックし、れいすきーの投稿画面が1つ開くこと。
- 日本語・絵文字・`&`・`#`を含むタイトルやURLが欠けずに渡ること。
- 別ウィンドウや小さいウィンドウでも、クリックしたタブの情報が渡ること。
- Service Workerの検証画面を閉じて30秒以上待ち、再度クリックして開くこと。
- `chrome://extensions` にエラーが出ていないこと。

れいすきーへのログインが必要です。確認のために実際に投稿する必要はありません。

## 配布用ZIPを作る

`make` と `zip` が使える環境で実行します。

```sh
make
```

`just_note_button.zip` が生成されます。
ストアで配布する場合は [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard)
からアップロードします。
