function createAndAppendLink(href) {
  const link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  link.setAttribute("href", href);
  document.getElementsByTagName("head")[0].appendChild(link);
}

function createAndAppendScript(src) {
  const script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", src);
  document.getElementsByTagName("body")[0].appendChild(script);
}

function isBrowserCompatible() {
  const crawlers = [
    "Googlebot",
    "Bingbot",
    "Slurp",
    "DuckDuckBot",
    "Baiduspider",
    "YandexBot",
    "Sogou",
    "Exabot",
    "ia_archiver"
  ];

  for (const crawler of crawlers) {
    if (navigator.userAgent.indexOf(crawler) !== -1) {
      return true;
    }
  }

  if (typeof window === "undefined") {
    return false;
  }

  if (window.isSecureContext && !window.crypto && !window.crypto.subtle) {
    return false;
  }

  if (!(window.File && window.FileList && window.FileReader)) {
    return false;
  }

  return !(typeof Blob === "undefined" ||
    (!Blob.prototype.slice && !Blob.prototype.webkitSlice && !!Blob.prototype.mozSlice));


}

if (!isBrowserCompatible()) {
  document.getElementById("browser-not-supported").style.display = "block";
} else {
  createAndAppendLink("css/styles.css");
  createAndAppendLink("lib/css/solid.css");

  const scriptFiles = ["js/scripts.js", "js/polyfills.js", "js/runtime.js", "js/main.js"];
  for (const scriptFile of scriptFiles) {
    createAndAppendScript(scriptFile);
  }
}
