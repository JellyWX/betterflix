const inputs = ["autoplay", "billboard", "bigrow"];

function save_options(e) {
    let settings = [];
    for (x of inputs) {
        settings.push(document.getElementById(x).checked);
    }
    browser.storage.sync.set({settings});

    if (e != null) {
        e.preventDefault();
    }
}

function restore_options() {
    browser.storage.sync.get("settings").then((res) => {
        if (res.settings == undefined) {
            save_options(null);
        }
        else {
            for (let x = 0; x < inputs.length; ++ x) {
                document.getElementById(inputs[x]).checked = res.settings[x];
            }
        }
    }, () => {});
}

document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("config").addEventListener("submit", save_options);