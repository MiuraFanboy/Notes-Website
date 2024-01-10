// let xhr = new XMLHttpRequest();
// xhr.open("GET", "data.php");
// xhr.onload = function () {
//     if (xhr.status === 200) {
//         let jsonData = JSON.parse(xhr.responseText);
//         createTable(jsonData); // Call a function to create the table with the fetched data
//     } else {
//         console.error("Request failed with status:", xhr.status);
//     }
// };
// xhr.send();

// function createTable(data) {
//     let table = document.createElement('table');
//     let tableHeader = table.createTHead();
//     let headerRow = tableHeader.insertRow();

//     // Create table headers
//     for (let key in data[0]) {
//         let th = document.createElement('th');
//         th.textContent = key;
//         headerRow.appendChild(th);
//     }

//     // Create table rows with data
//     for (let item of data) {
//         let row = table.insertRow();
//         for (let key in item) {
//             let cell = row.insertCell();
//             cell.textContent = item[key];
//         }
//     }

//     // Append the table to a container in your HTML (e.g., a <div> with id="table-container")
//     document.getElementById('table-container').appendChild(table);
// }



function connect(){
    
}

function signin(){
    // Post data from input values
}
let signin = true;
document.getElementById('connect-btn').addEventListener('click', signin)

document.getElementById('change-to-signin').addEventListener('click', function(){
    document.getElementById('connect-btn').addEventListener('click', signin)
    document.getElementById('connect-btn').innerHTML = "S'inscrire"
})

document.getElementById('change-to-connect').addEventListener('click', function(){
    document.getElementById('connect-btn').removeEventListener('click', signin)
    document.getElementById('connect-btn').addEventListener('click', connect)
    document.getElementById('connect-btn').innerHTML = "Se connecter"
})

console.log(getEventListeners('#connect-btn'))


