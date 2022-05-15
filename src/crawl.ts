// https://github.com/chishui/JSSoup

// const JSSoup = require("jssoup").default;

export function findAllUlTag(html: string) {
  // const soup = new JSSoup(html);
  // return soup.findAll("ul") as any[];
}

export function getLeastTextDensityTag(tags: any[]) {
  if (tags.length === 0) throw Error("0 Length detected");
  const sortedTags = tags
    .map((tag) => ({
      tag,
      TD: getTextDensity(tag),
    }))
    .sort((A, B) => A.TD - B.TD);
  return sortedTags[0].tag;
}

function getTextDensity(tag: any) {
  const tagNumber = Math.max(tag.findAll().length, 1);
  const charNumber = tag.text.length;
  return charNumber / tagNumber;
}
