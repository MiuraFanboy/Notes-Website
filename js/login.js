function connect(){
    // Post data from input values
    const logs = [];
    logs.push(document.getElementById('username').value)
    logs.push(document.getElementById('password').value)

    console.log(`Trying to log to account, Username: ${logs[0]}  Password: ${logs[1]}`)

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/login.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                try {
                    const response = JSON.parse(xhr.responseText);
                    if(response.message.includes('connected')){
                    window.location.href = "notelist.html";
                    }
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
                
            } else {
                // Handle errors
                console.error('XHR request failed:', xhr.status);
            }
        }
    };

    xhr.send(JSON.stringify({ username: logs[0], password: logs[1] }));
}

function signup(){
    // Post data from input values
    const logs = [];
    logs.push(document.getElementById('username').value)
    logs.push(document.getElementById('password').value)

    console.log(`Created account, Username: ${logs[0]}  Password: ${logs[1]}`)

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/signup.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                try {
                    const response = xhr.responseText;
                    if (response === 'Username already exists') {
                        // Username already exists, perform actions (display a message, etc.)
                        window.alert('EXISTE DEJA')
                        console.log('Username already exists');
                    } else if (response.message === "New record inserted successfully") {
                        // Username is available, perform actions (allow registration, etc.)
                        console.log('Username is available');

                    } else {
                        // Handle other cases or errors
                        connect();
                        
                    }
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
                
            } else {
                // Handle errors
                console.error('XHR request failed:', xhr.status);
            }
        }
    };

    xhr.send(JSON.stringify({ username: logs[0], password: logs[1] }));
};



document.getElementById('sign-btn').addEventListener('click', signup)

document.getElementById('connect-btn').addEventListener('click', connect)