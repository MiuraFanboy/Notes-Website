// Get the noteId from the URL
const urlParams = new URLSearchParams(window.location.search);
const noteId = urlParams.get('noteId');
const noteTitle = document.getElementById('title');
const noteContent = document.getElementById('content');



function updateNote(){
    xhr = new XMLHttpRequest();

    xhr.open("POST", "php/modify_note.php", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log(xhr.responseText)
                console.log(response);
                // Set document title to the value of the noteTitle textarea

                noteTitle.value = response.title;
                document.title = noteTitle.value ? noteTitle.value : 'Nouvelle note';
                noteContent.innerText = response.content.replace(/\\n/g, '\n');
            } else {
                console.error('Request failed:', xhr.status);            
            }
        }
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({type: 'update',id_note: noteId}));
}

function saveNote() {
    xhr = new XMLHttpRequest();

    xhr.open("POST", "php/modify_note.php", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log(xhr.responseText);

                if (response.message === "Sauvegarde réussie") {
                    window.location.href = 'notelist.html';
                }
            } else {
                console.error('Request failed:', xhr.status);
            }
        }
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ type: 'save', id_note: parseInt(noteId), title: noteTitle.value, content: noteContent.innerText }));
}


updateNote();

document.getElementById('save-button').addEventListener('click', saveNote);