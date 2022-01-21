const form = document.forms.formPair[0];
let outputField = document.querySelector(".manage-block__output");
let add = document.getElementById("add");
let del = document.getElementById("del");
let sortNameBtn = document.getElementById("byName");
let sortValueBtn = document.getElementById("byVal");
let itemsOfOutput = document.getElementsByClassName("manage-block__output-item");


let regexp = /[^0-9a-zA-Zа-яА-Яа-яґєіїА-ЯҐЄІЇ=]/gi; //regex EN\UA\RU all symbols except "="
let clearStr = "";

add.addEventListener("click", (e) => {

    let p = document.createElement("p");
    e.preventDefault();
    form.value = null;

    form.style.border = "1px solid #bebebe";
    p.classList.add("manage-block__output-item");
    add.setAttribute("disabled", "true");

    p.innerText = `${clearStr.toUpperCase()}`;
    outputField.appendChild(p);
});

form.addEventListener("input", (e) => {

    clearStr = e.target.value.replaceAll(regexp, "");

    if (clearStr.split("=").length === 2 && !clearStr.split("=").includes("")) {

        clearStr = e.target.value.replaceAll(regexp, "");

        add.removeAttribute("disabled");
        form.style.border = "1px solid #7FB800";

    } else {

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

    deleting(itemsOfOutput);

    if (ev.target.id === "byName") {

        arr.sort((a, b) => {

            let prev = a.innerText.slice(0, a.innerText.indexOf("="));
            let next = b.innerText.slice(0, b.innerText.indexOf("="));

            return prev > next;
        });

        for (let i = 0; i < arr.length; i++) {
            let p = document.createElement("p");

            p.innerHTML = `${arr[i].innerText}`;
            p.classList.add("manage-block__output-item");

            outputField.appendChild(p);
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

        p.innerHTML = `${arr[i].innerText}`;
        p.classList.add("manage-block__output-item");

        outputField.appendChild(p);
    }

};
const deleting = (elem) => {
    while (elem[0]) {
        elem[0].parentNode.removeChild(elem[0]);
    }
};

sortNameBtn.addEventListener("click", (e) => {
    sorting(itemsOfOutput, e);
});

sortValueBtn.addEventListener("click", (e) => {
    sorting(itemsOfOutput, e);
});

del.addEventListener("click", () => {
    let data = document.getElementsByClassName("manage-block__output-item");
    deleting(data);
});
