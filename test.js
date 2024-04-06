const { Client } = require("@notionhq/client");

// Notionクライアントの初期化
const notion = new Client({
  auth: "secret_vpTD76cVcM761H1olqVjUTVyOktPSXZs9Q4OSUBkYui", // ここにあなたのNotion APIキーを入力
});

const databaseId = "91600c147f3d4ab4b76e1e513ca17896"; // ここにデータベースIDを入力

async function addItem(text) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        // データベースのプロパティ名と値を指定
        Name: {
          title: [
            {
              text: {
                content: text,
              },
            },
          ],
        },
        // 他のプロパティがある場合はここに追加
      },
    });
    console.log("Success! Entry added.", response);
  } catch (error) {
    console.error("Error: ", error.body);
  }
}

// 関数を呼び出してデータベースにアイテムを追加
addItem("Test");