import fs from "fs";
import path from "path";
import pinyin from "pinyin";
import { Char, getCharFromPinyinStr, PinyinTransformer } from "../core";

class QingDaoTransformer implements PinyinTransformer {
  getChar(char: Char): Char {
    if (char.toneNumber === 55) return { ...char, toneNumber: 213 };
    else if (char.toneNumber === 35) return { ...char, toneNumber: 42 };
    else if (char.toneNumber === 214) return { ...char, toneNumber: 55 };
    else if (char.toneNumber === 51) return { ...char, toneNumber: 42 };
    else if (char.toneNumber === 0) {
      return char;
    } else if (char.toneNumber === -1) {
      return char;
    }
    throw new Error(`toneNumber ${char.toneNumber} is not implemented.`);
  }
  getWord<Word extends Char[]>(word: Word): Word {
    throw new Error("Method not implemented.");
  }
  toPinyin(char: Char) {
    if (char.toneNumber === 55) return `${char.pinyin}1`;
    else if (char.toneNumber === 213) return `${char.pinyin}2`;
    else if (char.toneNumber === 42) return `${char.pinyin}4`;
    else if (char.toneNumber === 0) {
      return char.pinyin;
    } else if (char.toneNumber === -1) {
      return char.pinyin;
    }
    throw new Error(`toneNumber ${char.toneNumber} is not implemented.`);
  }
}

const t = new QingDaoTransformer();

function print(s: string) {
  const pinyinResult = pinyin(s, {
    style: pinyin.STYLE_TONE2,
    // segment: true,
  });
  const ret = pinyinResult.map((ch, index) => {
    if (ch.length === 1) {
      const char = getCharFromPinyinStr(ch[0]).map(t.getChar).map(t.toPinyin);
      return char;
    }
    return [];
  });
  fs.writeFileSync(
    path.resolve(__dirname, "./index.html"),
    "<ruby>" +
      ret
        .flat()
        .map(
          (pinyin, index) =>
            `${s[index]} <rp>(</rp><rt style="padding: 0 4px;">${pinyin}</rt><rp>)</rp>`
        )
        .join("") +
      "</ruby>"
  );
  return ret;
}

print(
  "清晨，早早出工的“横漂”群演们排起长队，等待《六扇门之血虫谜案》剧组分发服装并完成妆化；午间，园区餐厅师傅们将热锅出炉的饭菜盛于盒中，而这些盒饭即将为辛苦摄制一上午的“打工人”们送去温暖；傍晚，刚拍过一场哭戏的演员陈都灵在房车内卸去妆发，匆匆奔往《浣溪沙》二组杀青合影现场；离他们不远处，赶拍夜戏的《五鼠闹东京》剧组即将在“大通宵”的深夜作业中迎接黎明……"
);
