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
/*!**********************************!*\
  !*** ./src/main/js/festivals.js ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_csrf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/csrf.js */ "./src/main/js/modules/csrf.js");


const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(0,_modules_csrf_js__WEBPACK_IMPORTED_MODULE_0__.getCsrfInfo)()
};

const deleteButtons = document.querySelectorAll("#deleteFestivalBtn");
deleteButtons.forEach(deleteButton =>
    deleteButton.addEventListener("click", deleteFestival));

async function deleteFestival(event) {
    const clickedButton = event.target;

    const hiddenInput = clickedButton
        .previousElementSibling;
    const festivalId = parseInt(hiddenInput.value);

    let response;
    try {
        response = await fetch(`/api/festivals/${festivalId}`, {
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

const addFestivalBtn = document.getElementById("addFestivalBtn");
const addFestivalForm = document.getElementById("addFestivalForm");
const infoBox = document.getElementById('info-box-festival')
const infoSuccess = document.getElementById('info-success-festival')
const submitNewFestivalBtn = document.getElementById("submitNewFestivalBtn");

addFestivalBtn.addEventListener("click", showAddFestivalForm);
submitNewFestivalBtn.addEventListener("click", processAddFestival);

function showAddFestivalForm() {
    if (addFestivalForm.hasAttribute("hidden")) {
        addFestivalForm.removeAttribute("hidden");
        infoBox.classList.add('visually-hidden')
        infoSuccess.classList.add('visually-hidden')
        addFestivalBtn.innerText = "Cancel";
    } else {
        addFestivalForm.toggleAttribute("hidden");
        addFestivalBtn.innerText = "Add a Festival";
        document.getElementById('festivalName').value = null
        document.getElementById('startDate').value = null
        document.getElementById('lengthDays').value = null
        document.getElementById('festivalType').value = festivalTypes.at(0)
        document.getElementById('organizer').value = null
        document.getElementById('cost').value = null
        infoBox.classList.add('visually-hidden')
        infoSuccess.classList.add('visually-hidden')
        infoBox.innerText = ""
    }
}

function processAddFestival() {
    const festivalName = document.getElementById('festivalName').value
    const startDate = document.getElementById('startDate').value
    const lengthDays = document.getElementById('lengthDays').value
    const festivalType = document.getElementById('festivalType').value
    const organizer = document.getElementById('organizer').value
    const cost = document.getElementById('cost').value

    let festivalId = null;
    fetch('/api/festivals', {
        method: "POST",
        headers,
        body: JSON.stringify({
            "name": festivalName,
            "startDate": startDate,
            "lengthDays": lengthDays,
            "festivalType": festivalType,
            "organizer": organizer,
            "cost": cost,
        })
    })
        .then(response => {
            if (response.status === 201) {
                infoBox.classList.add('visually-hidden')

                festivalId = response.id;

                if (document.getElementById('festivalImage').files[0] !== undefined) {
                    const festivalImage = document.getElementById('festivalImage');
                    response.json().then(festival => uploadFile(festival.id, festivalImage, festivalName))
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

    const festivalImage = document.getElementById('festivalImage');

}

function uploadFile(festivalId, FestivalImage, festivalName) {

    const headers = {
        ...(0,_modules_csrf_js__WEBPACK_IMPORTED_MODULE_0__.getCsrfInfo)()
    };

    let formData = new FormData();
    formData.append("file", FestivalImage.files[0]);
    let response = fetch(`/api/image/upload/festival/festival-${festivalId}.png/${festivalId}`, {
        method: "POST",
        headers,
        body: formData
    });
}

})();

/******/ })()
;
//# sourceMappingURL=bundle-festivals.js.map