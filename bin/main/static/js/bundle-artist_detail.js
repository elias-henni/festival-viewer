/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main/js/modules/csrf.js":
/*!*************************************!*\
  !*** ./src/main/js/modules/csrf.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCsrfInfo: () => (/* binding */ getCsrfInfo)
/* harmony export */ });
function getCsrfInfo() {
    const csrfToken = document.querySelector("meta[name=_csrf]").content;
    const csrfHeader = document.querySelector("meta[name=_csrf_header]").content;
    return {
        [csrfHeader]: csrfToken
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************************!*\
  !*** ./src/main/js/artist_detail.js ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_csrf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/csrf.js */ "./src/main/js/modules/csrf.js");


const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(0,_modules_csrf_js__WEBPACK_IMPORTED_MODULE_0__.getCsrfInfo)()
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


})();

/******/ })()
;
//# sourceMappingURL=bundle-artist_detail.js.map