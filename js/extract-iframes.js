"use strict";

// Tweaked from https://stackoverflow.com/a/53965010
// get all iframes that were parsed before this tag
var iframes = document.getElementsByTagName("iframe");

for (let i = 0; i < iframes.length; i++) {
    // Get the url of the iframe.
    var url = iframes[i].getAttribute("src");

    // If that url is of the kind we're looking for,
    if (url.startsWith("https://docs.google.com/document/d/")) {
        // create div and replace iframe
        let replaceDiv = document.createElement('div');

        // Give it a class for easy access
        replaceDiv.classList.add("embedded-doc");

        // Now replace it with a div
        iframes[i].parentElement.replaceChild(replaceDiv, iframes[i]);

        // CORS request
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function () {
            // Fill the div with what the iframe had in it.
            replaceDiv.innerHTML = xhr.responseText;
            filterStyles();
        };
        xhr.send();
    }
}

function filterStyles() {
    // First, get all the spans in all the embedded documents.
    let embeddedSpans = document.querySelectorAll(".embedded-doc span");

    // Then, for each span,
    for (let i = 0; i < embeddedSpans.length; i++) {
        // Get its computed style.
        let emSpan = embeddedSpans[i];
        let emSpanStyle = window.getComputedStyle(emSpan);

        // Now go through the styles on this span. If it has any properties we want, save them to
        // a string, so we can add it as an inline style.
        let styleVal = "";
        styleVal += getStyleProp(emSpanStyle, "font-style");
        styleVal += getStyleProp(emSpanStyle, "font-weight");

        // Now add those styles we stored in a string to the span's style attribute.
        emSpan.setAttribute("style", styleVal);

        // Go through the parent of this span to get any properties we want, like text alignment.
        let parentStyle = window.getComputedStyle(emSpan.parentElement);
        styleVal = "";
        styleVal += getStyleProp(parentStyle, "text-align");

        // Now add those properties we want to the parent's style attribute.
        emSpan.parentElement.setAttribute("style", styleVal);
    }

    // Now that we've added all of the styles we want as inline styles, get rid of the style tags
    // on the embedded documents.
    let embeddedStyleElems = document.querySelectorAll(".embedded-doc style");
    for (let i = 0; i < embeddedStyleElems.length; i++) {
        let element = embeddedStyleElems[i];
        element.parentNode.removeChild(element)
    }
}

// Checks a given style for a given property, and returns it as a string if found. Returns the
// empty string if not found.
function getStyleProp(style, property) {
    if (style.getPropertyValue(property)) {
        return `${property}:${style.getPropertyValue(property)};`
    }
    else {
        return "";
    }
}