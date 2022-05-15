// https://blog.weirdx.io/post/3033#:~:text=RSS라는%20이름은%20Really,1.0%20명세를%20지켜야%20함.
// https://jungbo11.tistory.com/rss

import RSS from "rss";

var feed = new RSS({
  title: "title",
  description: "description",
  feed_url: "http://example.com/rss.xml",
  site_url: "http://example.com",
  docs: "http://example.com/rss/docs.html",
  managingEditor: "Dylan Greene",
  webMaster: "Dylan Greene",
  copyright: "2013 Dylan Greene",
  language: "en",
  categories: ["Category 1", "Category 2", "Category 3"],
  pubDate: "May 20, 2012 04:00:00 GMT",
  custom_namespaces: {
    itunes: "http://www.itunes.com/dtds/podcast-1.0.dtd",
  },
});

feed.item({
  title: "item title",
  description: "use this for the content. It can include html.",
  url: "http://example.com/article4?this&that", // link to the item
  guid: "1123", // optional - defaults to url
  categories: ["Category 1", "Category 2", "Category 3", "Category 4"], // optional - array of item categories
  author: "Guest Author", // optional - defaults to feed author property
  date: "May 27, 2012", // any format that js Date can parse.
  lat: 33.417974, //optional latitude field for GeoRSS
  long: -111.933231, //optional longitude field for GeoRSS
  custom_elements: [
    {"itunes:author": "John Doe"},
    {"itunes:subtitle": "A short primer on table spices"},
    {
      "itunes:image": {
        _attr: {
          href: "http://example.com/podcasts/everything/AllAboutEverything/Episode1.jpg",
        },
      },
    },
    {"itunes:duration": "7:04"},
  ],
});

console.log(feed.xml());
