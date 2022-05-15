import {expect} from "chai";
import {describe} from "mocha";
import {
  getHTMLfromURL,
  getRSSFeedFromFacebookGroup,
} from "../src/parser/parser";

describe("simple sample test", async () => {
  const url = "https://www.facebook.com/groups/3060223614081153";
  //   const html = await getHTMLfromURL(url);

  it("should do simple Mocha test", () => expect(1).to.equal(1));
});

describe("getHTMLfromURL function", () => {
  it("should show the first page of the Internet", async () => {
    const url = "http://info.cern.ch/hypertext/WWW/TheProject.html";
    const html = await getHTMLfromURL(url);
    expect(html).to.include("WorldWideWeb");
  });
  it("should show the lorem page", async () => {
    const url = "https://www.lipsum.com/";
    const html = await getHTMLfromURL(url);
    expect(html).to.include("Lorem Ipsum");
  });
});

describe("getRSSFromFacebookGroup", () => {
  it("should make RSS feed from Facebook group", async () => {
    const url = "https://www.facebook.com/groups/3060223614081153";
    const feed = await getHTMLfromURL(url).then(getRSSFeedFromFacebookGroup);
    const xml: string = feed.xml();

    expect(xml).to.include("Hi Guys This IS The Aws Soltion architech");
    expect(xml).to.include("Amitra Jit");
    expect(xml).to.include("https://www.facebook.com/groups/3060223614081153");
  });
});
