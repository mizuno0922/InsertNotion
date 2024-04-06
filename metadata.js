const { Client } = require("@notionhq/client");

// Notionクライアントの初期化
const notion = new Client({
  auth: "secret_vpTD76cVcM761H1olqVjUTVyOktPSXZs9Q4OSUBkYui", // ここにあなたのNotion APIキーを入力
});

const databaseId = "91600c147f3d4ab4b76e1e513ca17896"; // ここにデータベースIDを入力

async function createPageWithData(metadata, raw_data) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: {
          title: [
            {
              text: { content: metadata.title },
            },
          ],
        },
        Category: {
          multi_select: metadata.category.flat().map(category => ({ name: category })),
        },
        // LicenseとDescriptionは適宜追加
        Lisense: {
          select: { name: metadata.lisense[0]}, // カテゴリーの最初の要素を使用
        },
        Descripton: {
          select: { name: metadata.descripton[0]}, // カテゴリーの最初の要素を使用
        },
        File: { // FileプロパティにURL経由でファイルを追加
          files: [
            {
              name: metadata.title + ".3dm",
              type: "external",
              external: {
                url: raw_data[0],
              },
            },
          ],
        },
        
      },
      // Photosの埋め込みにはblocksを使用
      children: metadata.photos.map((photoUrl) => ({
        type: "image",
        image: {
          type: "external",
          external: {
            url: photoUrl,
          },
        },
      })),
    });
    console.log("Page created with ID: ", response.id);
  } catch (error) {
    console.error(error.body);
  }
}

// JSONデータからmetadataを抽出
const jsonData = {
  // JSONデータをここに配置...
  raw_data:["https://drive.google.com/uc?id=1v06f8bKy5MZMgPhwZAoQHBqV7MZJM9lx&export=download"] ,
  metadata: {
    title: 'テスト挿入',
    category: [['家具'], ['Biesse']],
    photos: ['https://www.axismag.jp/axismag-admin/wp-content/uploads/2019/04/EMARF-720x547.png', 'https://www.axismag.jp/axismag-admin/wp-content/uploads/2019/04/EMARF2-720x358.jpg'],
    lisense: ['CC0-4'],
    descripton: ['markdown text'],
  },
  // 省略...
};

createPageWithData(jsonData.metadata, jsonData.raw_data);