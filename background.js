function log_blocks(requestdet) {
    return {cancel: true}
}

browser.webRequest.onBeforeRequest.addListener(
    log_blocks,
    {urls: ["https://*.nflxvideo.net/*"]},
    ["blocking"]
);
