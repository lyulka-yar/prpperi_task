const form = document.forms.formPair[0];
const outputField = document.querySelector(".manage-block__output");
const add = document.getElementById("add");
const del = document.getElementById("del");
const showXml = document.getElementById("show");
const sortNameBtn = document.getElementById("byName");
const sortValueBtn = document.getElementById("byVal");
const itemsOfOutput = document.getElementsByClassName("manage-block__output-item");
const items = document.getElementsByClassName("manage-block-item");


let regexp = /[^0-9a-zA-Zа-яА-Яа-яґєіїА-ЯҐЄІЇ=]/gi; //regex EN\UA\RU all symbols except "="
let clearStr = "";

add.addEventListener("click", (e) => {

    let p = document.createElement("p");
    let div = document.createElement("div");
    let checkbox = document.createElement("input");

    checkbox.setAttribute("type", "checkbox");

    e.preventDefault();
    form.value = null;

    form.style.border = "1px solid #bebebe";
    div.classList.add("manage-block__output-item");
    p.classList.add("manage-block-item");
    add.setAttribute("disabled", "true");

    p.innerText = `${clearStr.toUpperCase()}`;
    div.append(p, checkbox)
    outputField.appendChild(div);
});

form.addEventListener("input", (e) => {

    clearStr = e.target.value.replaceAll(regexp, "");

    if (clearStr.split("=").length === 2 && !clearStr.split("=").includes("")) {

        clearStr = e.target.value.replaceAll(regexp, "");

        add.removeAttribute("disabled");
        form.style.border = "1px solid #7FB800";

    } else {
        add.style.backgroundColor = "none";
        add.setAttribute("disabled", "true");
        form.style.border = "1px solid red";

    }
});

const sorting = (data, ev) => {

    let arr = [...data];
    let status = arr.length < 2;

    if (status) {
        return;
    }

    clear(itemsOfOutput);

    if (ev.target.id === "byName") {

        arr.sort((a, b) => {

            let prev = a.innerText.slice(0, a.innerText.indexOf("="));
            let next = b.innerText.slice(0, b.innerText.indexOf("="));

            return prev > next;
        });

        for (let i = 0; i < arr.length; i++) {

            let p = document.createElement("p");
            let div = document.createElement("div");
            let checkbox = document.createElement("input");

            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("id", "checkbox");

            p.innerHTML = `${arr[i].innerText}`;
            div.classList.add("manage-block__output-item");
            p.classList.add("manage-block-item");

            div.append(p, checkbox);
            outputField.appendChild(div);
        }
        return;
    }

    arr.sort((a, b) => {

        let prev = a.innerText.slice(a.innerText.indexOf("=") + 1);
        let next = b.innerText.slice(b.innerText.indexOf("=") + 1);

        return prev > next;
    });

    for (let i = 0; i < arr.length; i++) {

        let p = document.createElement("p");
        let div = document.createElement("div");
        let checkbox = document.createElement("input");

        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", "checkbox");

        p.innerHTML = `${arr[i].innerText}`;
        div.classList.add("manage-block__output-item");
        p.classList.add("manage-block-item");

        div.append(p, checkbox);
        outputField.appendChild(div);
    }

};
const deleting = (elem) => {
    for (const elemElement of elem) {
        if (elemElement.lastChild.checked) {

            elemElement.parentNode.removeChild(elemElement);
        }
    }
};
const clear = (data) => {
    while (data[0]) {
        data[0].parentNode.removeChild(data[0]);
    }
}

sortNameBtn.addEventListener("click", (e) => {
    sorting(items, e);
});

sortValueBtn.addEventListener("click", (e) => {
    sorting(items, e);
});

del.addEventListener("click", () => {
    deleting(itemsOfOutput);
});

const toXml = (data) => {
    return `<dataStore> \n ${
            data.reduce((result, el) => {
                return result + `\n <value>  ${Object.keys(el)} : "${el[Object.keys(el)]}"</value>\n`;},"")
        } \n
    </dataStore>`
}

const showXMLModal = () => {
    let container = document.getElementById("container");
    let modal = document.createElement("div");
    let modalBody = document.createElement("div");
    let textContent = document.createElement("div");
    let close = document.createElement("button");


    let status = Array.from(items).length;
    let data = [...items];


    if (!status) {
        return;
    }

    let xmlObj = [];

    for (let i = 0; i < data.length; i++) {

        let key = data[i].innerText.slice(0, data[i].innerText.indexOf("="));
        let value = data[i].innerText.slice(data[i].innerText.indexOf("=") + 1);

        xmlObj[i] = {[key]: value};
    }

    modal.classList.add("modal");
    modalBody.classList.add("modal-body");
    textContent.innerText = toXml(xmlObj);
    close.innerText = "close";
    close.classList.add("close");


    modal.appendChild(modalBody);
    modalBody.append(textContent, close);
    container.appendChild(modal);

    close.addEventListener("click", () => {
        container.lastChild.remove();
    })
}

showXml.addEventListener("click", showXMLModal);
