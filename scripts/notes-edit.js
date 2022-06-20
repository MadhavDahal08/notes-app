"use strict";
const noteTitleElement = document.querySelector(".note-title");
const noteBodyElement = document.querySelector(".note-body");
const removeButtonElemet = document.querySelector(".remove-note");
const lastEdited = document.querySelector("#last-edited");
const noteId = location.hash.substring(1);
let notes = getSaveNotes();

let note = notes.find((note) => note.id === noteId);

if (!note) {
  location.assign("index.html");
}

noteTitleElement.value = note.title;
noteBodyElement.value = note.body;
lastEdited.textContent = generateLastEdited(note.updatedAt);

// listening to the text input of edit.html page to update the note title
noteTitleElement.addEventListener("input", (e) => {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  lastEdited.textContent = `Last edited ${moment(note.updatedAt).fromNow()}`;
  saveNotes(notes);
});
// listening to the text area of edit.html page to upade the note body
noteBodyElement.addEventListener("input", (e) => {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
  lastEdited.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
});

// adding eventlistener to remove note
removeButtonElemet.addEventListener("click", (e) => {
  removeNotes(noteId);
  saveNotes(notes);
  location.assign("index.html");
});

// for the syncing data across all the pages
window.addEventListener("storage", (e) => {
  if (e.key === "notes") {
    notes = JSON.parse(e.newValue);

    note = notes.find((note) => note.id === noteId);

    if (!note) {
      location.assign("index.html");
    }

    noteTitleElement.value = note.title;
    noteBodyElement.value = note.body;
    lastEdited.textContent = generateLastEdited(note.updatedAt);
  }
});
