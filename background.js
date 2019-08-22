let is_blocking = true;

function log_blocks(requestdet) {
    if (is_blocking) {
        return {cancel: true}
    }
}

function handle_message(request, sender, sendresponse) {
    //console.log("received blocking notice");

    is_blocking = request.blocking;
}

browser.webRequest.onBeforeRequest.addListener(
    log_blocks,
    {urls: ["https://*.nflxvideo.net/*"]},
    ["blocking"]
);

browser.runtime.onMessage.addListener(handle_message);