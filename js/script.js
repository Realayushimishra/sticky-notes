const addButton = document.querySelector('#add');

const updateLSdata = () => {

    const textareaData = document.querySelectorAll('textarea');
    const notes = [];

    console.log(textareaData);
    textareaData.forEach((note) => {

        return notes.push(note.value);
    })
    console.log(notes);

    localStorage.setItem('notes' , JSON.stringify(notes)); //data locally store krne ko browser me  for a day , month or year
}

const addNewNote = ( text = '' ) => {
    
    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
    <div class="operation">
        <button class="edit"> <i class="fas fa-edit"></i></button>
        <button class="delete"> <i class="fas fa-trash-alt"></i></button>
      </div>

      <div class="main ${text ? "" : "hidden" } "></div>
      <textarea class="${text ? "hidden" : "" }">  </textarea> `;

      note.insertAdjacentHTML('afterbegin' , htmlData);
      //console.log(note);

      //Getting the references

      const editButton = note.querySelector('.edit');
      const delButton = note.querySelector('.delete');
      const mainDiv = note.querySelector('.main');
      const textarea = note.querySelector('textarea');

      //Deleting the Node
      delButton.addEventListener('click' , () => {
          note.remove();
          updateLSdata();
      })

      //Toggle using Edit button
      textarea.value  = text;
      mainDiv.innerHTML = text;

      editButton.addEventListener('click' , () => {
          mainDiv.classList.toggle('hidden');
          textarea.classList.toggle('hidden');
      })

      textarea.addEventListener('change' , () => {
          const value = event.target.value;
          console.log(value);

          updateLSdata();
      })

      document.body.appendChild(note);
      //It appends the node as the last child of a node.
}

//Getting data back from local storage

const notes = JSON.parse(localStorage.getItem('notes'));

if(notes) { notes.forEach((note) => addNewNote(note)) };

addButton.addEventListener('click', () => addNewNote() ); 