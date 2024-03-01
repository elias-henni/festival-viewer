import { getCsrfInfo } from './modules/csrf.js'

const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...getCsrfInfo()
};

const editButton = document.getElementById("editButton");
const saveButton = document.getElementById("saveButton");

editButton.addEventListener("click", openEditorArtist)
saveButton.addEventListener("click", updateArtist)

function openEditorArtist() {
    // Name
    document.getElementById("name").contentEditable = "true";

    // Birthdate
    const currentBirthdate = document.getElementById("currentBirthdate");
    const age = document.getElementById("age");
    age.innerHTML = "<input type='date' value='" + currentBirthdate.value + "'/>"

    // HitSong
    document.getElementById("hitSong").contentEditable = "true";

    // Nationality
    // const countries = document.getElementById("countries");
    const nationality = document.getElementById("nationality");
    let tableDataNationality = document.createElement("td")
    tableDataNationality.setAttribute("id", "nationality")
    let dropdownNationality = document.createElement("select")
    for (let country of countries){
        let opt = document.createElement('option');
        opt.value = country;
        opt.innerHTML = country;
        dropdownNationality.appendChild(opt);
    }
    tableDataNationality.appendChild(dropdownNationality);
    nationality.parentNode.replaceChild(tableDataNationality, nationality);

    // Is One Person Act
    const isOnePersonAct = document.getElementById("isOnePersonAct");
    let tableDataIsOnePersonAct = document.createElement("td")
    tableDataIsOnePersonAct.setAttribute("id", "isOnePersonAct")
    let dropdownTrueFalse = document.createElement("select")
    let isTrue = new Option('True','true');
    dropdownTrueFalse.add(isTrue, undefined)

    let isFalse = new Option('False','false');
    dropdownTrueFalse.add(isFalse, undefined)

    tableDataIsOnePersonAct.appendChild(dropdownTrueFalse);
    isOnePersonAct.parentNode.replaceChild(tableDataIsOnePersonAct, isOnePersonAct);
}

function updateArtist(event) {
    const clickedButton = event.target;
    const name = document.getElementById("name");
    const birthDate = document.getElementById("age");
    const hitSong = document.getElementById("hitSong");
    const nationality = document.getElementById("nationality");
    const isOnePersonAct = document.getElementById("isOnePersonAct");

    let newAge = 999;

    const inputElement = clickedButton
        .previousElementSibling
        .previousElementSibling
        .previousElementSibling
        .previousElementSibling;

    const artistId = parseInt(inputElement.value);

    fetch(`/api/artists/${artistId}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({
            "id": artistId,
            "name": name.innerHTML,
            "birthDate": birthDate.firstElementChild.value,
            "hitSong": hitSong.innerHTML,
            "isOnePersonAct": isOnePersonAct.firstElementChild.value,
            "country": nationality.firstElementChild.value
        })
    }).then(response => {
        if (response.status === 200) {
            fetch(`/api/artists/${artistId}`, {
                method: 'GET',
                headers
            })
                .then(response => {
                    if (response.status === 200) {
                        response.json().then(artist => {
                            newAge = artist.age;
                            name.contentEditable = "false";
                            birthDate.innerHTML = '' + newAge;
                            hitSong.contentEditable = "false";
                            nationality.innerHTML = '' + nationality.firstElementChild.value;
                            isOnePersonAct.innerHTML = '' +
                                isOnePersonAct.firstElementChild.value.charAt(0).toUpperCase() + isOnePersonAct.firstElementChild.value.slice(1);
                        })
                            .catch(error => {
                                alert(`Received error ${error.message}`);
                            });
                    }
                })

        } else {
            alert(response.statusMessage);
        }
    })
        .catch(error => alert(error.message));
}

