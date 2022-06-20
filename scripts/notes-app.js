"use strict";

let notes = getSaveNotes();

const filters = {
  searchText: "",
  sortBy: "byEdited",
};

renderNotes(notes, filters);
// listening to the create button
document.querySelector("#create-note").addEventListener("click", (e) => {
  const id = uuidv4();
  const currentTimestamp = moment().valueOf();
  notes.push({
    id: id,
    title: "",
    body: "",
    createdAt: currentTimestamp,
    updatedAt: currentTimestamp,
  });
  saveNotes(notes);
  location.assign(`edit.html#${id}`);
  console.log(now.valueOf());
});

// adding event listener to the input which filters the notes based on the input provided by user
document.querySelector("#search-text").addEventListener("input", (e) => {
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});

// adding event listener to the dropdown to sort the notes
document.querySelector("#filter-by").addEventListener("change", (e) => {
  filters.sortBy = e.target.value;
  renderNotes(notes, filters);
});

window.addEventListener("storage", (e) => {
  if (e.key === "notes") {
    notes = JSON.parse(e.newValue);
    renderNotes(notes, filters);
  }
});
