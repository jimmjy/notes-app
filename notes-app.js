let notes = getSavedNotes();

const filters = {
    searchText: '',
    sortBy: 'byEdited'
};

// Call our render initially to place current notes to DOM
renderNotes(notes, filters);

//adding an eventlistener to create a new note and set default properties
document.querySelector('#create-note').addEventListener('click', (e) => {
    const id = uuidv4();
    const timeStamp = moment().valueOf();
    notes.push({
        title: '',
        body: '',
        id: id,
        createdAt: timeStamp,
        updatedAt: timeStamp,
    });
    saveNotes(notes);
    location.assign(`/edit.html#${id}`);
});

// use input event for input to get data in realtime
document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value;
    renderNotes(notes, filters); 
});

// if we don't declare a value for each option, the value will just be what the option is
document.querySelector('#filter-by').addEventListener('change', (e) => {
    filters.sortBy = e.target.value;
    renderNotes(notes, filters);
});

// updates multipage information in realtime, you can open a new note window separately and start typing title to it and see it change while typing on the notes homepage (pretty cool!!!)
window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue);
        renderNotes(notes, filters);
    }
});


