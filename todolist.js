

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName'); //# => id ler için 
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');

const url = "https://62025187b8735d00174cb9b0.mockapi.io/todolist";

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

// Getirme

const getFromApi = async () => {
    const response = await fetch('https://62025187b8735d00174cb9b0.mockapi.io/todolist', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: null
    });
    const data = await response.json();

    // now do whatever you want with the data  
    return (data);
};

// Example POST method implementation:
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}
/* 
 postData('https://62025187b8735d00174cb9b0.mockapi.io/todolist', { addtask: "deneme", isdone: "false" })
   .then(data => {
     console.log(data); // JSON data parsed by `data.json()` call
   });
*/


/*


const deleteData = async () => {
    const response = await fetch('https://62025187b8735d00174cb9b0.mockapi.io/todolist', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: null
    });

    const data = await response.json();

    // now do whatever you want with the data  
    return (data);
};
*/
// ES6 class


async function deleteData(url) {

    // Awaiting fetch which contains
    // method, headers and content-type
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    });

    // Awaiting for the resource to be deleted
    const data = 'resource deleted...';

    // Return response data
    return data;
}


async function ahs() {
    await fetch('https://62025187b8735d00174cb9b0.mockapi.io/todolist', {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json'
        },
    })
        .then(res => {
            if (res.ok) {
                console.log("DELETE request successful");
                return res
            } else {
                console.log("DELETE request unsuccessful");
            }
            return res
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))

}

//load items
loadItems();

// call event listeners
eventListeners();

function eventListeners() {
    // submit event
    form.addEventListener('submit', addNewItem);

    // delete an item
    taskList.addEventListener('click', deleteItem);

    // delete all items
    btnDeleteAll.addEventListener('click', deleteAllItems);
}

async function loadItems() {
    let items;
    items = await getFromApi();
    console.log(items)
    items.forEach(function (item) {
        createItem(item);
    })

}
function getItemsFromLS() {
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

// set item to ls
function setItemToLS(text) {
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}

// delete from ls
function deleteItemFromLS(text) {
    items = getItemsFromLS();
    items.forEach(function (item, index) {
        if (item === text) {
            items.splice(index, 1);
        }
    });
    localStorage.setItem('items', JSON.stringify(items));
}


function createItem(text) {
    let cssClass;
    if (text.isdone == "false") {
        cssClass = "" //tammalandığında olacak css classı
    }
    else {
        cssClass = 'list-group-item list-group-item-secondary'
    }
    // create li
    const li = document.createElement('li');
    li.className = cssClass;
    li.appendChild(document.createTextNode(text.addtask));


    const btnDone = document.createElement('button');
    btnDone.appendChild(li);

    var list = li;
    list.addEventListener('click', function (ev) {
        if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');

            console.log('sonunda be abi')
            
        }
    }, false);

    // create a
    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';

    // add a to li
    li.appendChild(a);

    // add li to ul
    taskList.appendChild(li);

}

// add new item
function addNewItem(e) {
    if (input.value === '') {
        alert('Please add any task');
        return false;
    }
    postData('https://62025187b8735d00174cb9b0.mockapi.io/todolist', { addtask: input.value, isdone: "false" })
        .then(data => {
            console.log(data); // JSON data parsed by `data.json()` call
        });

    // create item
    createItem(input.value);

    //  save to ls
    setItemToLS(input.value);

    // clear input
    input.value = '';

    e.preventDefault(); // sayfa yenilenmiyor bu şekilde

}

// delete an item
function deleteItem(e) {


    if (e.target.className === 'fas fa-times') {
        if (confirm('are you sure ?')) {
            e.target.parentElement.parentElement.remove();


        

            let id= "application/json".id


            
            fetch('https://62025187b8735d00174cb9b0.mockapi.io/todolist/' + id, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json; charset=utf-8" },
            })
                .then(res => res.text()) // or res.json()
                .then(res => console.log(res))


            //delete from ls
            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        } return false;
    }
    e.preventDefault();
}

// delete all items
function deleteAllItems(e) {

    if (confirm('are you sure ?')) {

        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }
    e.preventDefault();
}














