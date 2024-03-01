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
/*!*****************************************!*\
  !*** ./src/main/js/festival_details.js ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_csrf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/csrf.js */ "./src/main/js/modules/csrf.js");


const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(0,_modules_csrf_js__WEBPACK_IMPORTED_MODULE_0__.getCsrfInfo)()
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

})();

/******/ })()
;
//# sourceMappingURL=bundle-festival_details.js.map