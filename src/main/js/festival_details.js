import { getCsrfInfo } from './modules/csrf.js'

const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...getCsrfInfo()
};

const attendingArtistsBtn = document.getElementById("attendingArtistsBtn");
const attendingArtistsTable = document.getElementById("attendingArtistsTable");
const tableBody = document.getElementById("tbody");

attendingArtistsBtn.addEventListener("click", showAttendingArtists)

function showAttendingArtists(event) {
    const clickedButton = event.target;

    const hiddenInput = clickedButton
        .previousElementSibling;
    const festivalId = parseInt(hiddenInput.value);

    fetch(`/api/festivals/${festivalId}/artists`, {
        method: "GET",
        headers
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 204) {
                processArtist([]);
            } else {
                // TODO: proper error handling!
                alert(`Received status code ${response.status}`);
            }
        })
        .then(artists => {
            processArtist(artists);
        })
        .catch(error => {
            // TODO: proper error handling!
            alert(`Received error ${error.message}`);
        });


    if (attendingArtistsTable.hasAttribute("hidden")) {
        attendingArtistsTable.removeAttribute("hidden");
    } else {
        attendingArtistsTable.toggleAttribute("hidden");
    }
}

function processArtist(artists) {
    tableBody.innerHTML = "";
    if (artists === undefined) {
        tableBody.innerHTML += `
            <tr>
                <th>Sorry no artists in the lineup</th>
            </tr>
        `;
    } else {
        for (let artist of artists) {
            tableBody.innerHTML += `
            <tr>
                <th><a href="/artists/detail/${artist.id}">${artist.name}</a></th>
            </tr>
        `;
        }
    }
}
