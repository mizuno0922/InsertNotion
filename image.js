const { Client } = require("@notionhq/client");

// Notionクライアントの初期化
const notion = new Client({
  auth: "secret_vpTD76cVcM761H1olqVjUTVyOktPSXZs9Q4OSUBkYui", // ここにあなたのNotion APIキーを入力
});

const pageId = "eb6ed70c61284920b4465c3f2e5c2b37"; // ここにページIDを入力

async function addImageToPage(imageUrl) {
  try {
    const response = await notion.blocks.children.append({
      block_id: pageId,
      children: [
        {
          type: "image",
          image: {
            type: "external",
            external: {
              url: imageUrl,
            },
          },
        },
      ],
    });
    console.log("Image successfully added to the page.", response);
  } catch (error) {
    console.error("Error: ", error.body);
  }
}

// 画像をページに追加する関数を呼び出し
addImageToPage("https://www.axismag.jp/axismag-admin/wp-content/uploads/2019/04/EMARF2-720x358.jpg"); // 画像のURLをここに入力
