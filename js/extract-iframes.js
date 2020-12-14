"use strict";

// Tweaked from https://stackoverflow.com/a/53965010
// get all iframes that were parsed before this tag
var iframes = document.getElementsByTagName("iframe");

for (let i = 0; i < iframes.length; i++) {
    // Get the url of the iframe.
    var url = iframes[i].getAttribute("src");

    // If that url is of the kind we're looking for,
    if (url.startsWith("https://docs.google.com/document/d/")) {
        // create a div to replace the iframe with later
        let replaceDiv = document.createElement('div');

        // Put some content in it to show it's loading
        replaceDiv.innerHTML =
            `
            <img id="load-image" src="media/loading-wheel.gif" alt="Loading...">
            <p class="load-text">Chapter not loading? Give it a little longer, or try refreshing.</p>
            <p class="load-text">
                You can also read Divinity on 
                <a href="https://archiveofourown.org/works/13366659/chapters/30608427">Archive of our Own</a>
                or <a href="https://toyhou.se/~literature/34515.divinity">Toyhou.se</a>.
            </p>
            `
        ;

        // Give it a class for easy access
        replaceDiv.classList.add("extracted-doc");

        // Now replace the iframe with our div
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
    // First, get all the spans in all the extracted documents.
    let extractedSpans = document.querySelectorAll(".extracted-doc span");

    // Then, for each span,
    for (let i = 0; i < extractedSpans.length; i++) {
        // Get its computed style.
        let emSpan = extractedSpans[i];
        let emSpanStyle = window.getComputedStyle(emSpan);

        // Now go through the styles on this span. If it has any properties we want, save them to
        // a string, so we can add them as inline styles.
        let styleVal = "";
        styleVal += getStyleProp(emSpanStyle, "font-style");
        styleVal += getStyleProp(emSpanStyle, "font-weight");

        // Now add those styles we stored in a string to the span's style attribute.
        emSpan.setAttribute("style", styleVal);

        // Go through the parent of this span to get any properties we want, like text alignment.
        let parentStyle = window.getComputedStyle(emSpan.parentElement);
        styleVal = "";
        styleVal += getStyleProp(parentStyle, "text-align");
        styleVal += getStyleProp(parentStyle, "text-indent");

        // Now add those properties we want to the parent's style attribute.
        emSpan.parentElement.setAttribute("style", styleVal);

        // Additionally, since all centerered text elements are spacers, add a class to them
        // so we can select them in the CSS style sheet.
        if (styleVal.includes("text-align:center;")) {
            emSpan.parentElement.classList.add("spacer");
        }
    }

    // Now that we've added all of the styles we want as inline styles, get rid of the style tags
    // on the extracted documents.
    let extractedStyleElems = document.querySelectorAll(".extracted-doc style");
    for (let i = 0; i < extractedStyleElems.length; i++) {
        let element = extractedStyleElems[i];
        element.parentNode.removeChild(element)
    }
}

// Checks a given style for a given property, and returns its value as a string if found. Returns the
// empty string if not found.
function getStyleProp(style, property) {
    if (style.getPropertyValue(property)) {
        return `${property}:${style.getPropertyValue(property)};`
    }
    else {
        return "";
    }
}