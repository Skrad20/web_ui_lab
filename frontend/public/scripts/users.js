async function getUsers() {
    const response = await fetch("api/users", {
        method: "GET", headers: {"Accept": "application/json"}
    });
    if (response.ok){
        const users = await response.json()
        let rows = document.querySelector("tbody");
        users.forEach(user => {
            rows.append(createRow(user));
        })
    }
}

async function getUser(id) {
    const response = await fetch("/api/users/" + id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const user = await response.json();
        const form = document.forms["userForm"];
        form.elements["id"].value = user.id;
        form.elements["name"].value = user.name;
        form.elements["age"].value = user.age;
    }
    
}

async function deleteUser(id) {
    const response = await fetch("/api/users/" + id, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const user = await response.json();
        document.querySelector("tr[data-rowid='" + user.id + "']").remove();
        
    }
}

async function editUser(id, name, age) {
    const response = await fetch("api/users", {
        method: "PUT",
        headers: { 
            "Accept": "application/json",
             "Content-Type": "application/json" },
        body: JSON.stringify({
            id: id,
            name: name,
            age: parseInt(age, 10)
        })
    });
    if (response.ok === true) {
        const user = await response.json();
        resetForm();
        document.querySelector("tr[data-rowid='" + user.id + "']").replaceWith(createRow(user));
    }
}

async function createUser(name, age) {
    const response = await fetch("api/users", {
        method: "POST", 
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            age: parseInt(age, 10)
        })
    });
    if (response.ok){
        const user = await response.json();
        resetForm();
        document.querySelector("tr[data-rowid='" + user.id + "']'").replaceWith(createRow(user));
    }
}


function createRow(user){
    const tr = document.createElement("tr")
    tr.setAttribute("data-rowid", user.id);

    const idTd = document.createElement("td");
    idTd.append(user.id)
    tr.append(idTd)

    const nameTd = document.createElement("td");
    nameTd.append(user.name)
    tr.append(nameTd)

    const ageTd = document.createElement("td");
    ageTd.append(user.age)
    tr.append(ageTd)

    const linksTd = document.createElement("td");

    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", user.id);
    editLink.setAttribute("style",  "cursor:pointer;padding:15px;");
    editLink.append("Изменить")
    editLink.addEventListener("click", e => {
        e.preventDefault();
        getUser(user.id);
    })
    linksTd.appendChild(editLink)

    const daleteLink = document.createElement("a");
    daleteLink.setAttribute("data-id", user.id);
    daleteLink.setAttribute("style",  "cursor:pointer;padding:15px;");
    daleteLink.append("Удалить")
    daleteLink.addEventListener("click", e => {
        e.preventDefault();
        deleteUser(user.id);
        resetTable();
    })
    linksTd.appendChild(daleteLink)

    tr.appendChild(linksTd);
    return tr;
}

function resetForm(){
    const form = document.forms["userForm"];
    form.reset();
    form.elements["id"].value = 0;
}

function resetTable() {
    let table = document.getElementById("tbodyid");
    table.innerHTML = "";
    getUsers();
}


document.getElementById("reset").click(function (e) {
    e.preventDefault();
    resetForm();
})

document.forms["userForm"].addEventListener("submit", e => {
    e.preventDefault();
    const form = document.forms["userForm"];
    const id = form.elements["id"].value;
    const name = form.elements["name"].value;
    const age = form.elements["age"].value;
    if (id == 0){
        createUser(name, age);
        resetTable();
    } else {
        editUser(id, name, age);
        resetTable();
    }
})

getUsers();
