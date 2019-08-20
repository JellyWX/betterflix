function log_blocks(requestdet) {
    if (requestdet.originUrl.startsWith("https://www.netflix.com/browse")) {
        return {cancel: true}
    }
}

browser.webRequest.onBeforeRequest.addListener(
    log_blocks,
    {urls: ["https://*.nflxvideo.net/*"]},
    ["blocking"]
);