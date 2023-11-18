const open = document.getElementById("open");
const closeAdd = document.getElementById("closeAdd");
const closeUpdate = document.getElementById("closeUpdate");
const addModal = document.querySelector(".add-modal");
const updateModal = document.querySelector(".update-modal");
const addBtn = document.getElementById("add");
const updateBtn = document.getElementById("update");
const url = "https://northwind.vercel.app/api/suppliers";
const companyName = document.getElementById("companyName");
const contactTitle = document.getElementById("contactTitle");
const contactName = document.getElementById("contactName");

const updateCompanyName = document.getElementById("updateCompanyName");
const updateContactTitle = document.getElementById("updateContactTitle");
const updateContactName = document.getElementById("updateContactName");
let globalId; 
open.addEventListener("click", () => {
    addModal.style.display = "flex";
})

closeAdd.addEventListener("click", () => {
    addModal.style.display = "none";
})

closeUpdate.addEventListener("click", () => {
    updateModal.style.display = "none";
})
addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            CompanyName: companyName.value,
            ContactName: contactName.value,
            ContactTitle: contactTitle.value
        })
    }).then(res => res.ok ? alert("Successful") : alert("Failed"))
        .finally(() => {
            companyName.value = ""
            contactTitle.value = ""
            contactName.value = ""
            tableRender()
        })
})

updateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(`${url}/${globalId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            companyName: updateCompanyName.value,
            contactName: updateContactTitle.value,
            contactTitle: updateContactName.value
        })
    }).then(res => res.ok ? alert("Successful") : alert("Failed"))
        .finally(() => {
            updateCompanyName.value = ""
            updateContactTitle.value = ""
            updateContactName.value = ""
            tableRender()
        })
})

tableRender()
function tableRender() {
    const tbodyElem = document.querySelector("tbody")
    fetch(url)
        .then(res => res.json())
        .then(data => {
            tbodyElem.innerHTML = ""
            data.forEach(element => {
                tbodyElem.innerHTML += `
            <tr>
            <td scope="row">${element.id}</td>
            <td>${element.companyName}</td>
            <td>${element.contactName}</td>
            <td>${element.contactTitle}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteUser(${element.id})">delete</button>
                <button class="btn btn-secondary" onclick="updateUser(${element.id})">update</button>
            </td>
        </tr>
            `
            });
        })
}

function deleteUser(id) {
    fetch(`${url}/${id}`, {
        method: "DELETE"
    })
        .finally(() => {
            console.log("Deleted!");
            tableRender()
        })
}



function updateUser(id) {
    globalId = id 
    fetch(`${url}/${id}`)
        .then(res => res.json())
        .then(data => {
            updateCompanyName.value = data.companyName
            updateContactTitle.value = data.contactTitle
            updateContactName.value = data.contactName
        })
    updateModal.style.display = "flex"
}
