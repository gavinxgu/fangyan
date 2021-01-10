export interface Char {
  pinyin: string;
  toneNumber: number;
}

export interface PinyinTransformer {
  getChar(char: Char): Char;
  getWord<Word extends Char[]>(word: Word): Word;
}

/**
 *
 * @param s ni3
 */
export function getCharFromPinyinStr(pinying: string): Char[] {
  const match = pinying.match(/([A-Za-z]+)(\d?)/);
  if (!match)
    return pinying.split("").map((ch) => ({ pinyin: ch, toneNumber: -1 }));
  const pinyin = match[1];
  const tone = match[2];
  if (tone === "1") return [{ pinyin, toneNumber: 55 }];
  else if (tone === "2") return [{ pinyin, toneNumber: 35 }];
  else if (tone === "3") return [{ pinyin, toneNumber: 214 }];
  else if (tone === "4") return [{ pinyin, toneNumber: 51 }];
  else if (tone === "") return [{ pinyin, toneNumber: 0 }];
  throw new Error(`pinyin \`${pinyin}\`, tone \`${tone}\` is not implemented.`);
}
