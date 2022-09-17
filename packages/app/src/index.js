const Mdlib = require("mdlib");
const converter = Mdlib();

import "public/style.scss";

/** @param {String} value */
const addNote = (value) => {
    if (value.length <= 0) return;

    const ideaText = value;
    const idea = converter.makeHtml(ideaText);
    const ideaHtml = idea.html;

    const brainstormedElem = document.getElementById("brainstormed");

    const ideaBlock = document.createElement("div");
    ideaBlock.className += 'idea-card';
    ideaBlock.innerHTML = ideaHtml;

    const ideaTitle = document.createElement('div');
    ideaTitle.className += 'title';
    ideaTitle.innerText = idea.metadata.title;

    const ideaCategory = document.createElement('small');
    ideaCategory.className += 'category';
    ideaCategory.innerText = idea.metadata.category;
    ideaTitle.prepend(ideaCategory);

    const ideaTags = document.createElement('span');
    ideaTags.className += 'tags';
    idea.metadata.tags.map((tag) => {
        const ideaTag = document.createElement("small");
        ideaTag.innerText = tag;
        return ideaTag;
    }).forEach((ideaTag) => ideaTags.append(ideaTag));

    ideaBlock.append(ideaTags);
    ideaBlock.prepend(ideaTitle);
    brainstormedElem.prepend(ideaBlock);
};

const onReadyListener = () => {
    /** @type {HTMLTextAreaElement} */
    const ideaElem = document.getElementById("idea");
    const brainstormedElem = document.getElementById("brainstormed");
    let shiftModPressed = false;

    if (!ideaElem) return;
    if (!brainstormedElem) return;

    const handleAddingNote = (value) => {
        try {
            addNote(value);
            ideaElem.value = "";
            ideaElem.setAttribute("placeholder", "Tell me more!")
        } catch (e) {
            console.log({
                message: e.message
            })

            const controlsElm = document.getElementById("controls");
            const errorElm = document.getElementById("error-msg");
            const errorElmContainer = document.getElementById("error-msg__container");

            const controlsElmDisplay = controlsElm.style.display;
            controlsElm.style.display = "none";

            errorElmContainer.innerHTML = e.message;
            errorElm.style.display = "block";

            setTimeout(() => {
                controlsElm.style.display = controlsElmDisplay;
                errorElm.style.display = "none";
            }, 1500)
        }
    }

    const addNoteBtn = document.getElementById("add-note-btn");
    addNoteBtn.addEventListener("click", () => handleAddingNote(ideaElem.value));

    ideaElem.addEventListener("keydown", (e) => {
        if (e.key !== "Shift") return;
        if (e.repeat) return;

        shiftModPressed = true;
    })

    ideaElem.addEventListener("keyup", (e) => {
        if (e.key !== "Shift") return;
        shiftModPressed = false;
    })

    ideaElem.addEventListener("keydown", (e) => {
        if (e.key !== "Enter") return;
        if (!shiftModPressed) return;

        handleAddingNote(ideaElem.value);

        e.preventDefault();
    });

    // Help popup
    const openPopup = document.getElementById("help-btn");
    const closePopup = document.getElementById("close-help-btn");
    const helpPopup = document.getElementById("help-popup");

    openPopup.addEventListener('click', () => {
        helpPopup.style.display = "block";
    });
    closePopup.addEventListener('click', () => {
        helpPopup.style.display = "none";
    });
}

document.addEventListener('DOMContentLoaded', onReadyListener);
