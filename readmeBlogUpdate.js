const fs = require("fs");
const dayjs = require("dayjs");
const Parser = require("rss-parser");
const timezone = require("dayjs/plugin/timezone");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

let text = "";

const parser = new Parser({
  headers: {
    Accept: "application/rss+xml, application/xml, text/xml; q=0.1",
  },
});

(async () => {
  // 피드 목록
  const feed = await parser.parseURL("https://newcodes.tistory.com//rss");

  // 최신 5개의 글의 제목과 링크를 가져온 후 text에 추가
  for (let i = 0; i < 5; i++) {
    const { title, link, pubDate } = feed.items[i];
    console.log(`${i + 1}번째 게시물`);
    console.log(`추가될 제목: ${title}`);
    console.log(`추가될 링크: ${link}`);

    const date = dayjs(pubDate).add(9, "hours").format("YYYY.MM.DD HH:mm:ss");
    text += `<a href=${link}>${title}</a></br>`;
    text += `게시일자 : ${date}</br></br>`;
  }

  // README.md 파일 작성
  fs.appendFileSync("README.md", text + "\n", "utf8", (e) => {
    if (e) {
        console.error("파일 추가 중 오류 발생:", e);
    } else {
        console.log("README.md 파일에 내용이 성공적으로 추가되었습니다.");
    }
    });
})();