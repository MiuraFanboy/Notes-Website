const checkIfConnected = () => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "php/log_status.php", true);
    xhr.onreadystatechange = function () {
        console.log(xhr);
        console.log(xhr.responseText);
        console.log(xhr.responseText.username);
        console.log(xhr.username);


        console.log('Ready state:', xhr.readyState);
        console.log('Status:', xhr.status);

        if (xhr.readyState === XMLHttpRequest.DONE) {
            const response = JSON.parse(xhr.responseText);
            console.log(response);

            if (response.message && response.message.includes('Please log-in!')) {
                window.location.href = "index.html";
            } else {
                const username = response.username; // Use the correct property name
                console.log(username);
                document.getElementById('welcome-title').innerText = `Welcome ${username}!`;
            }
        }
    };
    xhr.send();
};

checkIfConnected();






const disconnect = () =>{
    xhr = new XMLHttpRequest();

    xhr.open("GET", "php/logout.php", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log("Logged out successfully")
                window.location.href = "index.html"
            } else {
                console.error('Logout failed:', xhr.status);            
            }
    }
    }
    xhr.send()
}

document.getElementById('dc-btn').addEventListener('click', disconnect)


function generateNotes(noteArr){
    let noteListDiv = document.getElementById('note-list');
    
    noteListDiv.innerHTML = "";

    const addDiv = document.createElement('div');
    addDiv.classList.add('note');
    addDiv.id = 'plus';
    addDiv.addEventListener('click', addNote);

    noteListDiv.append(addDiv);

    noteArr.forEach(x => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        noteDiv.addEventListener('click', function(){
            modifyNote(x.id_note);
        });

        const noteTitle = document.createElement('h2');
        noteTitle.classList.add('note-title');
        noteTitle.innerText = x.title;

        const noteContent = document.createElement('p');
        noteContent.classList.add('note-content');
        noteContent.innerText = x.content.replace(/\\n/g, '\n');

        noteDiv.append(noteTitle);
        noteDiv.append(noteContent);

        noteListDiv.append(noteDiv)
    });
}

function displayNotes(){
    xhr = new XMLHttpRequest();


    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if(!response.message){
                    generateNotes(response);
                }else{
                    const text = document.createElement('p');
                    text.innerText = response.message;

                    document.getElementById('note-list').append(text);


                    const addDiv = document.createElement('div');
                    addDiv.classList.add('note');
                    addDiv.id = 'plus';
                    addDiv.addEventListener('click', addNote);

                    document.getElementById('note-list').append(addDiv);
                }
               
            } else {
                console.error('Request failed:', xhr.status);            
            }
        }
    };
    xhr.open("GET", "php/get_notes.php", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send()

}

function addNote(){
    xhr = new XMLHttpRequest();

    xhr.open("POST", "php/create_note.php", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log(xhr.responseText)
                const response = JSON.parse(xhr.responseText);
                // console.log(response);

                if(response.message.includes('succès')){
                    modifyNote(response.noteId);
                }else{
                    window.alert("La note n'a pas pu être ajoutée")
                }

            } else {
                console.error('Request failed:', xhr.status);            
            }
        }
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}

function modifyNote(noteId){
    window.location.href = 'modify-note.html?noteId=' + encodeURIComponent(noteId);
}


checkIfConnected();

displayNotes();