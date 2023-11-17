const open = document.getElementById("open");
const close = document.getElementById("close");
const modal = document.querySelector(".add-modal");

open.addEventListener("click", () => {
    modal.style.display = "flex";
})

close.addEventListener("click", () => {
    modal.style.display = "none";
})

tableRender ()
function tableRender () {
    const tbodyElem = document.querySelector("tbody")
    fetch ("https://northwind.vercel.app/api/suppliers")
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
                <button class="btn btn-secondary">update</button>
            </td>
        </tr>
            `
        });
    })
}

function deleteUser(id) {
    fetch(`https://northwind.vercel.app/api/suppliers/${id}`, {
        method: "DELETE"
    })
        .finally(() => {
            console.log("SON");
            tableRender()
        })
}

function updateUser (data) {
    fetch(`https://northwind.vercel.app/api/suppliers/${data}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})

    })
       .finally (() => {
            console.log("SON");
            tableRender()
        }) 
    }