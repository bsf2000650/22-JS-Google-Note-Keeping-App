const addButton = document.querySelector('#add');

const updateLocalStorageData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];
    // console.log(textAreaData);
    textAreaData.forEach((note) => {
        return notes.push(note.value);
    })
    // console.log(notes);
    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNewNote = (text = '') => {

    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
    <div class="operation">
    <button class="edit"><i class="fa-solid fa-edit"></i></button>
    <button class="delete"><i class="fa-solid fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div> 
    <textarea class="${text ? "hidden" : ""}"></textarea>
`;

    note.insertAdjacentHTML('afterbegin',htmlData);
    document.body.appendChild(note);

    // appends a node as the last child of a node


    // getting the references

    const editButton = note.querySelector('.edit');
    const deleteButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textarea = note.querySelector('textarea');

    // Deleting the note

    deleteButton.addEventListener('click', () => {
        note.remove();
        updateLocalStorageData();
    })

    // Toggle using Edit Icon

    textarea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    })


    textarea.addEventListener('change', (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLocalStorageData();
    });

    // The localStorage and sessionStorage propertis allow to save key/value pairs in a web browser. The localStorage object data with no expiration date. The data will not be deleted when the browser is closed, and will be available the next day, week, or year.




} 

// getting data back from localStorage

const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){
    notes.forEach((note) => addNewNote(note));
}

addButton.addEventListener('click', () => addNewNote());