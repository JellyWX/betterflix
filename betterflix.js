const observer = new MutationObserver(remove_bigrows);
const config = { attributes: false, childList: true, subtree: true };

function remove_bigrows(mutationlist, observer) {
    for (mutation of mutationlist) {
        if (mutation.addedNodes.length > 0) {
            for (item of mutation.addedNodes) {
                if (item.dataset.listContext == `bigRow`) {
                    item.remove();
                }
                else if (item.nodeName == `VIDEO`) {
                    item.remove();
                }
            }
        }
    }
}

function remove_billboard() {
    let selected = document.querySelector(`.volatile-billboard-animations-container`);

    if (selected == null) {
        window.setTimeout(remove_billboard, 150);
    }
    else {
        selected.remove();
    }
}

function one_time_remove_bigrows() {
    let selected = document.querySelector(`[data-list-context="bigRow"]`);

    if (selected != null) {
        selected.remove();
    }
}

function start() {
    browser.runtime.sendMessage({blocking: true});

    let mainView = document.querySelector(`.is-fullbleed`);

    if (mainView != null) {
        observer.observe(mainView, config);
        remove_billboard();
        one_time_remove_bigrows();
        check_for_navigate(location.href);
    }
    else {
        window.setTimeout(start, 250);
    }
}

function check_for_navigate(href) {
    let current_href = location.href;

    if (current_href.includes(`watch`)) {
        browser.runtime.sendMessage({blocking: false});
        return
    }
    else if (current_href != href) {
        start();
    }
    else {
        window.setTimeout(function() { check_for_navigate(current_href); }, 100);
    }
}

start();

window.addEventListener(`popstate`, function() { start(); });