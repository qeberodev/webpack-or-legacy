const showdown = require("showdown");
const converter = new showdown.Converter();

const onReadyListener = () => {
  /** @type {HTMLTextAreaElement} */
  const ideaElem = document.getElementById("idea");
  const brainstormedElem = document.getElementById("brainstormed");
  let shiftModPressed = false;
  
  if (!ideaElem) return;
  if (!brainstormedElem) return;

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
    
    const ideaText = ideaElem.value;
    const ideaHtml = converter.makeHtml(ideaText);

    if (brainstormedElem.children.length > 0)
      brainstormedElem.prepend(document.createElement("hr"));

    const newIdeaElem = document.createElement("div");
    newIdeaElem.innerHTML = ideaHtml;
    brainstormedElem.prepend(newIdeaElem);

    e.preventDefault();
  })
}

document.addEventListener('DOMContentLoaded', onReadyListener);