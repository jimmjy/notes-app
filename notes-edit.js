// variable setups
const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find( (note) => note.id === noteId );

//returns to homepage if note does not exist, fail safe
if (note === undefined) {
    location.assign('/notes-app/index.html');
}

// variables for inputs
const notesTitle = document.querySelector('#note-title');
const noteEdit = document.querySelector('#note-edit');
const notesBody = document.querySelector('#note-body');

// populates note content on note edit page
notesTitle.value = note.title;
noteEdit.textContent = `Last edited ${moment(note.updatedAt).fromNow()}`;
notesBody.value = note.body;

//dynamic data update title and body
notesTitle.addEventListener('input', (e) => {
    note.title = e.target.value;
    note.updatedAt = moment().valueOf();
    saveNotes(notes);
});

// creating or updating notes
notesBody.addEventListener('input', (e) => {
    note.body = e.target.value;
    note.updatedAt = moment().valueOf();
    saveNotes(notes);
});

// removes notes from localstorage when button clicked
document.querySelector('#remove-note').addEventListener('click', function () {
    removeNote(note.id);
    saveNotes(notes);
    location.assign('/notes-app/index.html');
});

// Dynamic update of notes information in other opened windows
window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue);
        note = notes.find( (note) => note.id === noteId );

        if (note === undefined) {
            location.assign('/notes-app/index.html');
        }

        notesTitle.value = note.title;
        noteEdit.textContent = `Last edited ${moment(note.updatedAt).fromNow()}`;
        notesBody.value = note.body;
    }

    
});
