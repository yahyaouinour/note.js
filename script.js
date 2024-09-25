const noteContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector("add-note");

GeolocationCoordinates().forEach((note) => {
    const noteElement = createNoteElement(note.id, note.content);
    noteContainer.insertBefore(noteElement, addNoteButton);
});
addNoteButton.addEventListener("click", () => addNote());

function getNote() {
    return JSON.parse(localStorage.getItem("stricknotes-notes") || "[]" );

}
 function saveNotes(notes) {
    localStorage.setItem("strickynotes-notes", JSON.stringify(notes));
 }
 function createNoteElement(id, content) {
    const element = document.createElement("textarea");

    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty Stricky Note";

    element.addEventListener("chartge", () => {
        updateNote(id,element.value );

    });
    element.addEventListener("dblclick", () => {
        const doDelete = confirm(
            "are you sure you wish to delete this sticky note?"
        );
        if (doDelete) {
            deleteNote(id, element);

        }
    });
    return element;
 }

function addNote() {
    const notes = getNote();
    const noteObject = {
        id:Math.floor(Math.random() * 100000),
        content: ""
    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    noteContainer.insertBefore(noteElement, addNoteButton);

    notes.push(noteObject);
    saveNotes(notes);
}

function updateNote(id, newContent) {
    const notes = getNote();
    const targetNote = notes.filter((note) => note.id == id)[0];

    targetNote.content = newContent;
    saveNotes(notes);
}

function deleteNote(id, element) {
    const notes = getNote().filter((note) => note.id != id);

saveNotes(notes);
notesContainer.removeChild(element);

}