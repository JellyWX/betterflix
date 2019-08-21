function log_blocks(requestdet) {
    if (requestdet.originUrl.startsWith("https://www.netflix.com/browse")) {
        return {cancel: true}
    }
}

function check_for_redir(requestdet) {
    console.log("accessed " + requestdet.url);
}

browser.webRequest.onBeforeRequest.addListener(
    log_blocks,
    {urls: ["https://*.nflxvideo.net/*"]},
    ["blocking"]
);

browser.webNavigation.onBeforeNavigate.addListener(
    check_for_redir,
    {url: [{hostContains: "netflix.com"}]}
);