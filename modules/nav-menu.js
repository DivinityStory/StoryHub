"use strict";

//#region HTML to Write
let navHtml =
`
<ul class="button-list">
<li>
    <a class="home" href="index.html">
        Home / About
    </a>
</li>
<li>
    <a class="toc" href="table-of-contents.html">
        Table of Contents
    </a>
</li>
<li>
    <a class="chapter1" href="chapter-1.html">
        Latest Chapter
    </a>
</li>
</ul>
<hr class="thin-hr">
`;
//#endregion

// Write the html that was set above
document.write(navHtml);