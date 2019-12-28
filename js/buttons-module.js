"use strict";

//#region HTML to Write
let buttonHtml =
    `
    <div id="mode-button" class="button">
        <img src="media/sun-icon.png" alt="Toggle Light Mode">
    </div>
    <div id="top-button" class="button">
        <img src="media/top-icon.png" alt="To Top">
    </div>
    `;
//#endregion

// Write the html that was set above
document.write(buttonHtml);

// Set up some functions to fire when the buttons are clicked.
document.querySelector("#mode-button").addEventListener("click", swapMode);
document.querySelector("#top-button").addEventListener("click", backToTop);

// Swap between dark mode and light mode.
function swapMode() {
    // Get the content element, our embedded doc.
    let emDoc = document.querySelector(".embedded-doc");

    // Get the button's image as well, so we can swap it.
    let modeButton = document.querySelector("#mode-button img");

    // If the doc has an id, then it's in light mode. Otherwise, it's in dark mode.
    // Swaps the image to the opposite of the mode, to indicate that you click on the button to switch.
    if (emDoc.id) {
        emDoc.id = "";
        modeButton.src = "media/sun-icon.png";
        modeButton.alt = "Toggle Light Mode";
    }
    else {
        emDoc.id = "light-mode";
        modeButton.src = "media/moon-icon.png";
        modeButton.alt = "Toggle Dark Mode";
    }
}

// Moves the user back to the top of the document.
function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}