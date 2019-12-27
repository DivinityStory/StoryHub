"use strict";

// Tweaked from https://stackoverflow.com/a/53965010
// get all iframes that were parsed before this tag
var iframes = document.getElementsByTagName("iframe");

for (let i = 0; i < iframes.length; i++) {
    var url = iframes[i].getAttribute("src");
    if (url.startsWith("https://docs.google.com/document/d/")) {
        // create div and replace iframe
        let replaceDiv = document.createElement('div');
        replaceDiv.classList.add("embedded-doc"); // optional
        iframes[i].parentElement.replaceChild(replaceDiv, iframes[i]);

        // CORS request
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function () {
            // display response
            replaceDiv.innerHTML = xhr.responseText;
        };
        xhr.send();
    }
}