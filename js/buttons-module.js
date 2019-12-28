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

    <div id="bookmark-button" class="button">
        <img src="media/bookmark-icon.png" alt="Save Bookmark">
    </div>

    <div id="to-bookmark-button" class="button">
        <img src="media/to-bookmark-icon.png" alt="Go To Bookmark">
    </div>
    `;
//#endregion

// Write the html that was set above
document.write(buttonHtml);

// Set up some functions to fire when the buttons are clicked.
document.querySelector("#mode-button").addEventListener("click", swapMode);
document.querySelector("#top-button").addEventListener("click", backToTop);
document.querySelector("#bookmark-button").addEventListener("click", saveBookmark);
document.querySelector("#to-bookmark-button").addEventListener("click", goToBookmark);

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

// Save the user's location on the page in localStorage.
function saveBookmark() {
    // Get the user's position. If body.scrollTop is 0 (invalid), check documentElement.scrollTop.
    // Even if the scrollTop actually was 0, it'll still be set to 0.
    let userPos = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;

    // Save it with a key unique to this chapter.
    localStorage.setItem(`divinity-${document.body.id}-bookmark`, JSON.stringify(userPos));
}

// Go to the bookmark stored in local storage. Does nothing if not found.
function goToBookmark() {
    // Get the bookmark position for this chapter.
    let bookmarkPos = localStorage.getItem(`divinity-${document.body.id}-bookmark`);

    // If it's not found, don't bother.
    if (bookmarkPos) {
        // If it was found, parse it.
        bookmarkPos = JSON.parse(bookmarkPos);

        // Now set the scrolltop accordingly.
        document.body.scrollTop = bookmarkPos;
        document.documentElement.scrollTop = bookmarkPos;
    }
}