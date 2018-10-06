// Read existing notes from localStorage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes');
    return notesJSON ? JSON.parse(notesJSON) : [];
};

// Save the notes to localStorage
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes));
};

// Remove a note from the list
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id);

    // -1 means not found so looking for greater then -1, also removes said index from the array of notes
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1);
    }
};

//Generate the DOM structure for a note
const generateNoteDOM = (note) => {
    // create a note div and elements that will append to it
    const noteEl = document.createElement('div');
    const noteTitle = document.createElement('a');
    const button = document.createElement('button');

    //setup remove note button
    button.textContent = 'X';
    noteEl.appendChild(button);
    button.addEventListener('click', function() {
        removeNote(note.id);

        //update localStorage
        saveNotes(notes);
        renderNotes(notes, filters);
    });

    // setup note title text
    noteTitle.setAttribute('href', `./edit.html#${note.id}`);
    
    noteTitle.textContent = note.title.length > 0 ? note.title : 'Unnamed note';

    //append note title
    noteEl.appendChild(noteTitle);

    return noteEl;
};

// Sort your notes by one of three ways
const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort( (a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1;
            } else if (a.updatedAt < b.updatedAt) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (sortBy === 'byCreated') {
        return notes.sort( (a, b) => {
            if (a.createdAt > b.createdAt) {
                return 1;
            } else if (a.createdAt < b.createdAt) {
                return -1;
            } else {
                return 0;
            }
        });
    } else if (sortBy === 'alphabetical') {
        return notes.sort( (a, b) => {
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            } else {
                return 0;
            }
        });
    }
        
};

// Render application notes
const renderNotes = (notes, filters) => {
    notes = sortNotes(notes, filters.sortBy);
    // filter notes object based off user search input
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));


    // clear div to render our filtered list
    document.querySelector('#notes').innerHTML = '';

    // render the filtered list of notes to the screen
    filteredNotes.forEach( (note) => {
        //generate DOM node for note title
        const noteEl = generateNoteDOM(note);
        document.querySelector('#notes').appendChild(noteEl);
    });
}; 