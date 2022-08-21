const showdown = require("showdown");
const converter = new showdown.Converter();

import "public/style.scss";

/** @param {String} value */
const addNote = (value) => {
  if (value.length <= 0) return;
  
  const ideaText = value;
  const ideaHtml = converter.makeHtml(ideaText);
  const brainstormedElem = document.getElementById("brainstormed");

  const newIdeaElem = document.createElement("div");
  newIdeaElem.className += 'idea-card';
  newIdeaElem.innerHTML = ideaHtml;
  brainstormedElem.prepend(newIdeaElem);
};

const onReadyListener = () => {
  /** @type {HTMLTextAreaElement} */
  const ideaElem = document.getElementById("idea");
  const brainstormedElem = document.getElementById("brainstormed");
  let shiftModPressed = false;
  
  if (!ideaElem) return;
  if (!brainstormedElem) return;

  const addNoteBtn = document.getElementById("add-note-btn");
  addNoteBtn.addEventListener("click", () => addNote(ideaElem.value));

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
    
    addNote(ideaElem.value);
    ideaElem.value = "";
    ideaElem.setAttribute("placeholder", "Tell me more!")

    e.preventDefault();
  })
}

document.addEventListener('DOMContentLoaded', onReadyListener);