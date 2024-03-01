import Joi from 'joi'
import flatpickr from "flatpickr";
import {getCsrfInfo} from './modules/csrf.js'

const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...getCsrfInfo()
};

console.log(headers)

flatpickr("#birthDate", {});

const deleteButtons = document.querySelectorAll("#deleteArtistBtn");
deleteButtons.forEach(deleteButton =>
    deleteButton.addEventListener("click", deleteArtist));

async function deleteArtist(event) {
    const clickedButton = event.target;

    const hiddenInput = clickedButton
        .previousElementSibling;
    const artistId = parseInt(hiddenInput.value);

    let response;
    try {
        response = await fetch(`/api/artists/${artistId}`, {
            method: "DELETE",
            headers
        });
    } catch (e) {
        alert(`Something went wrong "${e.message}".`);
    }

    if (response.status === 204) {
        const trToBeRemoved = clickedButton.parentElement.parentElement;
        const parent = trToBeRemoved.parentElement;
        parent.removeChild(trToBeRemoved);
    } else {
        alert(`Unsupported status code ${response.status}.`);
    }
}

const addArtistBtn = document.getElementById("addArtistBtn");
const addArtistForm = document.getElementById("addArtistForm");
const infoBox = document.getElementById('info-box-artist')
const infoSuccess = document.getElementById('info-success-artist')
const submitNewArtistBtn = document.getElementById("submitNewArtistBtn");

addArtistBtn.addEventListener("click", showAddArtistForm);
submitNewArtistBtn.addEventListener("click", processAddArtist);

function showAddArtistForm() {
    if (addArtistForm.hasAttribute("hidden")) {
        addArtistForm.removeAttribute("hidden");
        infoBox.classList.add('visually-hidden')
        infoSuccess.classList.add('visually-hidden')
        addArtistBtn.innerText = "Cancel";
    } else {
        addArtistForm.toggleAttribute("hidden");
        addArtistBtn.innerText = "Add an Artist";
        // reset the form
        document.getElementById('artistName').value = null
        document.getElementById('birthDate').value = null
        document.getElementById('hitSong').value = null
        document.getElementById('isOnePersonAct').value = true
        document.getElementById('country').value = countries.at(0)
        infoBox.classList.add('visually-hidden')
        infoSuccess.classList.add('visually-hidden')
        infoBox.innerText = ""
    }
}

const artistSchema = Joi.object({
    name: Joi.string()
        .required()
        .min(1),
    birthdate: Joi.date()
        .required()
        .max('now'),
    hitSong: Joi.string()
        .required()
        .min(1),
})

function processAddArtist() {
    const artistName = document.getElementById('artistName').value
    const birthdate = document.getElementById('birthDate').value
    const hitSong = document.getElementById('hitSong').value
    const isOnePersonAct = document.getElementById('isOnePersonAct').value
    const nationality = document.getElementById('country').value

    const artistObject = {
        name: artistName,
        birthdate: birthdate,
        hitSong: hitSong
    }

    const validationArtist = artistSchema.validate(artistObject, {abortEarly: false})

    if (validationArtist.error) {
        infoBox.innerText = ""

        for (const error of validationArtist.error.details) {
            infoBox.innerText += error.message + "\n"
        }

        infoBox.classList.remove('visually-hidden')
    } else {
        fetch('/api/artists', {
            method: "POST",
            headers,
            body: JSON.stringify({
                "name": artistName,
                "birthDate": birthdate,
                "hitSong": hitSong,
                "isOnePersonAct": isOnePersonAct,
                "country": nationality,
            })
        })
            .then(response => {
                if (response.status === 201) {
                    infoBox.classList.add('visually-hidden')


                    if (document.getElementById('artistImage').files[0] !== undefined) {
                        const artistImage = document.getElementById('artistImage');
                        response.json().then(artist => uploadFile(artist.id, artistImage))
                    }
                    infoSuccess.classList.remove('visually-hidden')

                } else if (response.status === 400) {
                    infoBox.innerText = ""
                    response.json().then(data => {
                        for (const error of data.details) {
                            infoBox.innerText += error + "\n"
                        }
                    })
                    infoBox.classList.remove('visually-hidden')
                }
            }).catch(error => alert(`Cannot create Artist. Error: ${error}`))
    }
}

function uploadFile(artistId, artistImage) {

    const headers = {
        ...getCsrfInfo()
    };

    let formData = new FormData();
    formData.append("file", artistImage.files[0]);
    let response = fetch(`/api/image/upload/artist/artist-${artistId}.png/${artistId}`, {
        method: "POST",
        headers,
        body: formData
    });
}
