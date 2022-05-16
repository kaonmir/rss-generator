import axios from "axios";
import {JSDOM} from "jsdom";
import {prototype} from "mocha";
import {Builder, By} from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

export type RSS = any;

const SCREEN = {width: 640, height: 480};

// https://jizard.tistory.com/227
export async function getHTMLfromURL(
  url: string,
  sleep = 2000
): Promise<string> {
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options().headless().windowSize(SCREEN))
    .build();
  driver.get(url);

  await new Promise((r) => setTimeout(r, sleep));

  const body = driver.findElement(By.css("body"));
  return body.getAttribute("innerHTML");
}

function getRssFeedOptionFromFacebookGroup(doc: Element, feed_url: string) {
  const title = doc.querySelector(
    '//*[@id="mount_0_0_PJ"]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div/div[1]/div/div/div/div/div/div[1]/h1/span'
  )?.textContent as string;

  const description = doc.querySelector(
    '//*[@id="mount_0_0_L3"]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div[4]/div/div/div/div/div/div[2]/div[2]/div/div[1]/div/div/div/div/div/div[2]/div[1]/div/div/div/div/div/div/div/span/span/div/div/text()'
  )?.textContent as string;

  return {
    title,
    description,
    feed_url,
  };
}
 
function getRssFeedItemFromFacebookGroup(item: Element) {
  const head = item.querySelector(
    "/div/div/div/div/div/div/div/div/div/div[2]/div/div[2]"
  );
  const body = item.querySelector(
    "/div/div/div/div/div/div/div/div/div/div[2]/div/div[3]"
  );

  const description = item.querySelector("/div[1]")?.textContent as string;
  const url = item.querySelector("/div[3]")?.getElementsByTagName("a").item(0);
  const title = description.slice(0, 30);
}

export function getRSSFeedFromFacebookGroup(
  html: string,
  feed_url: string
): RSS {
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const feed = doc.querySelector('div[role="feed"]') as Element;
  // const items: Element[] = [];
  // for (let idx = 1; idx < feed.children.length; idx++) {
  //   const element = feed.children.item(idx) as Element;
  //   items.push(element);
  // }

  const answer = getRssFeedOptionFromFacebookGroup(feed, feed_url);
  console.log(answer);
}

// Feed:                      /html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div[4]/div/div/div/div/div/div[1]/div[2]/div[3]
// Head:        Feed >        /div[2]/div/div/div/div/div/div/div/div/div/div[2]/div/div[2]
// Item Author: Feed > Head > /div/div[2]/div/div[1]/span/h2/span/strong/span/a/span/span
// Item Date:   Feed > Head > /div/div[2]/div/div[2]/span/span/span[2]/span/a/span/span/b/b[30]

// Body:        Feed >        /div[2]/div/div/div/div/div/div/div/div/div/div[2]/div/div[3]
// Item Desc:   Feed > Body > /div[1]
// Item Link:   Feed > Body > /div[3]/div[2]/div/a/@href
