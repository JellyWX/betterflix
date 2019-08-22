function save_options(e) {
    for (x of ["autoplay", "billboard", "bigrow"]) {
        browser.storage.sync.set(JSON.parse(`{"${x}": ${document.getElementById(x).value == "checked"}}`));
    }
    e.preventDefault();
}

function restore_options() {
    for (x of ["autoplay", "billboard", "bigrow"]) {
        browser.storage.sync.get(x).then((res) => {document.getElementById(x).value = res.blocked ? "checked" : ""});
    }
}

document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("config").addEventListener("submit", save_options);