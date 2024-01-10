const connect = (uname, pword) =>{
    const username = uname;
    const password = pword;

    xhr = new XMLHttpRequest();

    xhr.open("POST", "connect.php", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log(response);
                if(response.message.includes('valid')){
                    window.alert(response.message)
                    document.getElementById('welcome-title').innerText = `Bienvenue ${username}!`;
                }else if(response.message.includes('invalid')){
                    window.alert(response.message)
                }
            } else {
                console.error('Request failed:', xhr.status);            
            }
        }
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({username: username, password: password}))

}

const disconnect = () =>{
    xhr = new XMLHttpRequest();

    xhr.open("GET", "disconnect.php", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log("Logged out successfully")
                window.alert("Logged out successfully")
            } else {
                console.error('Logout failed:', xhr.status);            
            }
    }
    }
    xhr.send()
}



function generateNotes(noteArr){
    let noteListDiv = document.getElementById('note-list');

    noteArr.forEach(x => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');

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
                    document.getElementById('note-list').innerText = response.message
                }
               
            } else {
                console.error('Request failed:', xhr.status);            
            }
        }
    };
    xhr.open("GET", "get_notes.php", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send()

}

function addNote(){
    
}


displayNotes();

