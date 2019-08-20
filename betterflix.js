console.log("Starting Betterflix111...");

const observer = new MutationObserver(remove_bigrows);
const config = { attributes: false, childList: true, subtree: true };

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

function remove_bigrows(mutationlist, observer) {
    console.log("observer observed something");

    let selected = document.querySelectorAll(`[data-list-context="bigRow"]`);

    for (item of selected) {
        item.remove();
    }
}

function remove_videoplayers(mutationlist, observer) {
    let selected = document.querySelectorAll(".VideoPlayer");

    for (item of selected) {
        item.remove();
    }
}

function remove_billboard() {
    let selected = document.querySelector(`.volatile-billboard-animations-container`);

    if (selected == null) {
        window.setTimeout(remove_billboard, 500);
    }
    else {
        selected.remove();
    }
}

function start() {
    let mainView = document.querySelector(".mainView");

    if (mainView != null) {
        observer.observe(mainView, config);
        remove_billboard();
    }
    else {
        window.setTimeout(start, 500);
        console.log("Retrying to grab mainView...");
    }
}

start();
