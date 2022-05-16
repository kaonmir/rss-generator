import {findAllUlTag, getLeastTextDensityTag} from "./crawl";
import {getHTMLfromURL, getRSSFeedFromFacebookGroup} from "./parser/facebook";
import RSS from "rss";
import {Builder} from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

// getHTMLfromURL("https://bluayer.com/34")
//   .then((data) => findAllUlTag(data))
//   .then((ulTags) => getLeastTextDensityTag(ulTags))
//   .then((answer) => console.log(answer));

async function run() {
  const url = "https://www.facebook.com/groups/3060223614081153";
  const html = await getHTMLfromURL(url);

  getRSSFeedFromFacebookGroup(html, "http://example.com/sadf09h4rvfub");
}

run();
