console.log("Starting Betterflix...");

const observer = new MutationObserver(remove_bigrows);
const config = { attributes: false, childList: true, subtree: true };

function remove_bigrows(mutationlist, observer) {
    for (mutation of mutationlist) {
        if (mutation.addedNodes.length > 0) {
            for (item of mutation.addedNodes) {
                if (item.dataset.listContext == "bigRow") {
                    item.remove();
                }
                else if (item.nodeName == "VIDEO") {
                    item.remove();
                    console.log("removed VIDEO from expanded title-card");
                }
            }
        }
    }
}

function remove_billboard() {
    let selected = document.querySelector(`.volatile-billboard-animations-container`);

    if (selected == null) {
        window.setTimeout(remove_billboard, 250);
    }
    else {
        selected.remove();
    }
}

function start() {
    let mainView = document.querySelector(".is-fullbleed");

    if (mainView != null) {
        observer.observe(mainView, config);
        remove_billboard();
    }
    else {
        window.setTimeout(start, 200);
        console.log("Retrying to grab mainView...");
    }
}

start();