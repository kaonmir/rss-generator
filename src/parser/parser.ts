import axios from "axios";
import {JSDOM} from "jsdom";
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

export function getRSSFeedFromFacebookGroup(html: string): RSS {
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const feed = doc.getElementById("jsc_c_2j");
  //   const feed = doc.querySelector("div");

  console.log(feed?.textContent);
}
