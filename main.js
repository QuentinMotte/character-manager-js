import "./index.scss";
import axios from "axios";

//GET
const app = document.querySelector(".app");
const inputSearch = document.getElementById("search");
//POST
const form = document.getElementById("form");
const inputName = document.getElementById("name");
const inputShortDescription = document.getElementById("shortDescription");
const inputDescription = document.getElementById("description");
const submit = document.getElementById("submit");
const newCardDisplay = document.querySelector(".new-card");
//UPDATE
let dataArray = [];
const cards = document.querySelectorAll(".card");
const updateCardContainer = document.querySelector(".update-card");
console.log(updateCardContainer);
const btnUpdateCard = document.getElementById("update-card");
const btnUpdateContainer = document.querySelector(".btn-update-container");
const validateBtn = document.getElementById("validate");
const formUpdate = document.getElementById("formUpdate");
console.log(validateBtn);
//DISPLAY - UNDISPLAY
const formSection = document.querySelector(".form-create");
const cardsSection = document.querySelector(".characters-cards");
const btnCreate = document.getElementById("create");
const btnReturn = document.getElementById("return");
const btnReturnCard = document.getElementById("return-card");
console.log(btnReturnCard);
//Delete
const btnDeleteCard = document.getElementById("delete-card");
console.log(btnDeleteCard);
//
//IMAGE
const file = document.querySelector("input[type=file]");
var base64String = "";
function Uploaded() {
    var file = document.querySelector("input[type=file]")["files"][0];
    var reader = new FileReader();
    reader.onload = function () {
        base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
        imageBase64Stringsep = base64String;
    };
    reader.readAsDataURL(file);
}

file.addEventListener("change", () => {
    Uploaded();
});
console.log(dataArray);
//GET;
let fetchData = () => {
    axios
        .get(`https://character-database.becode.xyz/characters`)
        .then((res) =>
            res.data.forEach((item) => {
                // console.log(item);
                // console.log(item.name);
                app.innerHTML += `
        <div class = "card">
        <img src=data:image/gif;base64,${item.image}>
        <p class="id">${item.id}</p>
        <h2>${item.name}</h2>
        <p>${item.shortDescription}</p>
        <button id="btnMore">see more</button>
        </div>
        `;
            })
        )
        .then(function () {
            const btnForSeeMore = document.querySelectorAll("#btnMore");
            console.log(btnForSeeMore);
            btnForSeeMore.forEach((el) => {
                el.addEventListener("click", () => {
                    let idKey = el.parentNode.childNodes[3].textContent;
                    let nameForUpdate = el.parentNode.childNodes[5].textContent;
                    // console.log(nameForUpdate);
                    console.log(idKey);
                    cardsSection.style.display = "none";
                    updateCardContainer.style.display = "flex";
                    btnUpdateContainer.style.display = "flex";
                    axios
                        .get(
                            `https://character-database.becode.xyz/characters?name=${nameForUpdate}`
                        )
                        .then(
                            (res) =>
                                (updateCardContainer.innerHTML = `
                    <div class = "cardUpdate">
                    <img src=data:image/gif;base64,${res.data[0].image}>
                    
                    <h2>${res.data[0].name}</h2>
                    <h3 class="description-one">${res.data[0].shortDescription}</h3>
                    <p class="description-two">${res.data[0].description}</h3>
                    </div>
                    `)
                        )
                        .then(
                            axios
                                .get(
                                    `https://character-database.becode.xyz/characters?name=${nameForUpdate}`
                                )
                                .then((res) => {
                                    const fileIdUpdate =
                                        document.getElementById("fileIdUpdate");
                                    const updateName =
                                        document.getElementById("nameUpdate");
                                    const shortDescriptionUpdate =
                                        document.getElementById(
                                            "shortDescriptionUpdate"
                                        );
                                    const descriptionUpdate =
                                        document.getElementById(
                                            "descriptionUpdate"
                                        );
                                    let img = res.data[0].image;
                                    updateName.value = res.data[0].name;
                                    shortDescriptionUpdate.value =
                                        res.data[0].shortDescription;
                                    descriptionUpdate.value =
                                        res.data[0].description;
                                    async function updatePostRequest() {
                                        params = {
                                            image: `${img}`,
                                            name: `${updateName.value}`,
                                            shortDescription: `${shortDescriptionUpdate.value}`,
                                            description: `${descriptionUpdate.value}`,
                                        };

                                        let res = await axios.put(
                                            `https://character-database.becode.xyz/characters/${idKey}`,
                                            params
                                        );
                                    }
                                    validateBtn.addEventListener(
                                        "click",
                                        () => {
                                            console.log("yes");
                                            updatePostRequest();
                                            formUpdate.style.display = "none";
                                        }
                                    );
                                })
                        );
                    console.log(nameForUpdate);
                    btnUpdateCard.addEventListener("click", () => {
                        formUpdate.style.display = "flex";
                    });
                    async function doDeleteRequest() {
                        let res = await axios.delete(
                            `https://character-database.becode.xyz/characters/${idKey}`
                        );

                        console.log(res.status);
                    }

                    btnDeleteCard.addEventListener("click", () => {
                        if (confirm("Do you really want to delete this ?")) {
                            doDeleteRequest();
                            window.location.reload();
                        }
                    });
                });
            });
        });
};
fetchData();

inputSearch.addEventListener("input", () => {
    axios
        .get(
            `https://character-database.becode.xyz/characters?name=${inputSearch.value}`
        )
        .then(
            (res) =>
                (app.innerHTML = `
        <div class = "card">
        <img src=data:image/gif;base64,${res.data[0].image}>
        
        <h2>${res.data[0].name}</h2>
        <p>${res.data[0].shortDescription}</p>
        </div>
        `)
        );
    if (inputSearch.value.length === 0) {
        window.location.reload();
    }
});

//POST
let params;

async function makePostRequest() {
    params = {
        image: `${base64String}`,
        name: `${inputName.value}`,
        shortDescription: `${inputShortDescription.value}`,
        description: `${inputDescription.value}`,
    };

    let res = await axios.post(
        "https://character-database.becode.xyz/characters",
        params
    );
    let newCard = () => {
        newCardDisplay.innerHTML = `
        <div class = "card">
        <img src=data:image/gif;base64,${JSON.parse(res.config.data).image}>
        
        <h2>${JSON.parse(res.config.data).name}</h2>
        <p>${JSON.parse(res.config.data).shortDescription}</p>
        <p>${JSON.parse(res.config.data).description}</p>
        </div>
        `;
    };
    newCard();
    console.log(JSON.parse(res.config.data).name);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    makePostRequest();

    // console.log(inputName.value);
    // console.log(inputShortDescription.value);
    // console.log(inputDescription.value);
});
//
//DELETE
btnDeleteCard.addEventListener("click", () => {
    console.log();
});

//DISPLAY OR UNDISPLAY

btnCreate.addEventListener("click", () => {
    cardsSection.style.display = "none";
    formSection.style.display = "block";
});
btnReturn.addEventListener("click", () => {
    formSection.style.display = "none";
    cardsSection.style.display = "grid";
    formUpdate.style.display = "none";
});
const cardUpdateDisplay = document.querySelector(".cardUpdate");
btnReturnCard.addEventListener("click", () => {
    // window.location.reload();
    updateCardContainer.style.display = "none";
    cardsSection.style.display = "grid";
    console.log("yes");
    btnUpdateContainer.style.display = "none";
});
