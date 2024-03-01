/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/flatpickr/dist/esm/index.js":
/*!**************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _types_options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types/options */ "./node_modules/flatpickr/dist/esm/types/options.js");
/* harmony import */ var _l10n_default__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./l10n/default */ "./node_modules/flatpickr/dist/esm/l10n/default.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./node_modules/flatpickr/dist/esm/utils/index.js");
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/dom */ "./node_modules/flatpickr/dist/esm/utils/dom.js");
/* harmony import */ var _utils_dates__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/dates */ "./node_modules/flatpickr/dist/esm/utils/dates.js");
/* harmony import */ var _utils_formatting__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/formatting */ "./node_modules/flatpickr/dist/esm/utils/formatting.js");
/* harmony import */ var _utils_polyfills__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/polyfills */ "./node_modules/flatpickr/dist/esm/utils/polyfills.js");
/* harmony import */ var _utils_polyfills__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_utils_polyfills__WEBPACK_IMPORTED_MODULE_6__);
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};







var DEBOUNCED_CHANGE_MS = 300;
function FlatpickrInstance(element, instanceConfig) {
    var self = {
        config: __assign(__assign({}, _types_options__WEBPACK_IMPORTED_MODULE_0__.defaults), flatpickr.defaultConfig),
        l10n: _l10n_default__WEBPACK_IMPORTED_MODULE_1__["default"],
    };
    self.parseDate = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.createDateParser)({ config: self.config, l10n: self.l10n });
    self._handlers = [];
    self.pluginElements = [];
    self.loadedPlugins = [];
    self._bind = bind;
    self._setHoursFromDate = setHoursFromDate;
    self._positionCalendar = positionCalendar;
    self.changeMonth = changeMonth;
    self.changeYear = changeYear;
    self.clear = clear;
    self.close = close;
    self.onMouseOver = onMouseOver;
    self._createElement = _utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement;
    self.createDay = createDay;
    self.destroy = destroy;
    self.isEnabled = isEnabled;
    self.jumpToDate = jumpToDate;
    self.updateValue = updateValue;
    self.open = open;
    self.redraw = redraw;
    self.set = set;
    self.setDate = setDate;
    self.toggle = toggle;
    function setupHelperFunctions() {
        self.utils = {
            getDaysInMonth: function (month, yr) {
                if (month === void 0) { month = self.currentMonth; }
                if (yr === void 0) { yr = self.currentYear; }
                if (month === 1 && ((yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0))
                    return 29;
                return self.l10n.daysInMonth[month];
            },
        };
    }
    function init() {
        self.element = self.input = element;
        self.isOpen = false;
        parseConfig();
        setupLocale();
        setupInputs();
        setupDates();
        setupHelperFunctions();
        if (!self.isMobile)
            build();
        bindEvents();
        if (self.selectedDates.length || self.config.noCalendar) {
            if (self.config.enableTime) {
                setHoursFromDate(self.config.noCalendar ? self.latestSelectedDateObj : undefined);
            }
            updateValue(false);
        }
        setCalendarWidth();
        var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if (!self.isMobile && isSafari) {
            positionCalendar();
        }
        triggerEvent("onReady");
    }
    function getClosestActiveElement() {
        var _a;
        return (((_a = self.calendarContainer) === null || _a === void 0 ? void 0 : _a.getRootNode())
            .activeElement || document.activeElement);
    }
    function bindToInstance(fn) {
        return fn.bind(self);
    }
    function setCalendarWidth() {
        var config = self.config;
        if (config.weekNumbers === false && config.showMonths === 1) {
            return;
        }
        else if (config.noCalendar !== true) {
            window.requestAnimationFrame(function () {
                if (self.calendarContainer !== undefined) {
                    self.calendarContainer.style.visibility = "hidden";
                    self.calendarContainer.style.display = "block";
                }
                if (self.daysContainer !== undefined) {
                    var daysWidth = (self.days.offsetWidth + 1) * config.showMonths;
                    self.daysContainer.style.width = daysWidth + "px";
                    self.calendarContainer.style.width =
                        daysWidth +
                            (self.weekWrapper !== undefined
                                ? self.weekWrapper.offsetWidth
                                : 0) +
                            "px";
                    self.calendarContainer.style.removeProperty("visibility");
                    self.calendarContainer.style.removeProperty("display");
                }
            });
        }
    }
    function updateTime(e) {
        if (self.selectedDates.length === 0) {
            var defaultDate = self.config.minDate === undefined ||
                (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(new Date(), self.config.minDate) >= 0
                ? new Date()
                : new Date(self.config.minDate.getTime());
            var defaults = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.getDefaultHours)(self.config);
            defaultDate.setHours(defaults.hours, defaults.minutes, defaults.seconds, defaultDate.getMilliseconds());
            self.selectedDates = [defaultDate];
            self.latestSelectedDateObj = defaultDate;
        }
        if (e !== undefined && e.type !== "blur") {
            timeWrapper(e);
        }
        var prevValue = self._input.value;
        setHoursFromInputs();
        updateValue();
        if (self._input.value !== prevValue) {
            self._debouncedChange();
        }
    }
    function ampm2military(hour, amPM) {
        return (hour % 12) + 12 * (0,_utils__WEBPACK_IMPORTED_MODULE_2__.int)(amPM === self.l10n.amPM[1]);
    }
    function military2ampm(hour) {
        switch (hour % 24) {
            case 0:
            case 12:
                return 12;
            default:
                return hour % 12;
        }
    }
    function setHoursFromInputs() {
        if (self.hourElement === undefined || self.minuteElement === undefined)
            return;
        var hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.secondElement !== undefined
            ? (parseInt(self.secondElement.value, 10) || 0) % 60
            : 0;
        if (self.amPM !== undefined) {
            hours = ampm2military(hours, self.amPM.textContent);
        }
        var limitMinHours = self.config.minTime !== undefined ||
            (self.config.minDate &&
                self.minDateHasTime &&
                self.latestSelectedDateObj &&
                (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(self.latestSelectedDateObj, self.config.minDate, true) ===
                    0);
        var limitMaxHours = self.config.maxTime !== undefined ||
            (self.config.maxDate &&
                self.maxDateHasTime &&
                self.latestSelectedDateObj &&
                (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(self.latestSelectedDateObj, self.config.maxDate, true) ===
                    0);
        if (self.config.maxTime !== undefined &&
            self.config.minTime !== undefined &&
            self.config.minTime > self.config.maxTime) {
            var minBound = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.calculateSecondsSinceMidnight)(self.config.minTime.getHours(), self.config.minTime.getMinutes(), self.config.minTime.getSeconds());
            var maxBound = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.calculateSecondsSinceMidnight)(self.config.maxTime.getHours(), self.config.maxTime.getMinutes(), self.config.maxTime.getSeconds());
            var currentTime = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.calculateSecondsSinceMidnight)(hours, minutes, seconds);
            if (currentTime > maxBound && currentTime < minBound) {
                var result = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.parseSeconds)(minBound);
                hours = result[0];
                minutes = result[1];
                seconds = result[2];
            }
        }
        else {
            if (limitMaxHours) {
                var maxTime = self.config.maxTime !== undefined
                    ? self.config.maxTime
                    : self.config.maxDate;
                hours = Math.min(hours, maxTime.getHours());
                if (hours === maxTime.getHours())
                    minutes = Math.min(minutes, maxTime.getMinutes());
                if (minutes === maxTime.getMinutes())
                    seconds = Math.min(seconds, maxTime.getSeconds());
            }
            if (limitMinHours) {
                var minTime = self.config.minTime !== undefined
                    ? self.config.minTime
                    : self.config.minDate;
                hours = Math.max(hours, minTime.getHours());
                if (hours === minTime.getHours() && minutes < minTime.getMinutes())
                    minutes = minTime.getMinutes();
                if (minutes === minTime.getMinutes())
                    seconds = Math.max(seconds, minTime.getSeconds());
            }
        }
        setHours(hours, minutes, seconds);
    }
    function setHoursFromDate(dateObj) {
        var date = dateObj || self.latestSelectedDateObj;
        if (date && date instanceof Date) {
            setHours(date.getHours(), date.getMinutes(), date.getSeconds());
        }
    }
    function setHours(hours, minutes, seconds) {
        if (self.latestSelectedDateObj !== undefined) {
            self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
        }
        if (!self.hourElement || !self.minuteElement || self.isMobile)
            return;
        self.hourElement.value = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.pad)(!self.config.time_24hr
            ? ((12 + hours) % 12) + 12 * (0,_utils__WEBPACK_IMPORTED_MODULE_2__.int)(hours % 12 === 0)
            : hours);
        self.minuteElement.value = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.pad)(minutes);
        if (self.amPM !== undefined)
            self.amPM.textContent = self.l10n.amPM[(0,_utils__WEBPACK_IMPORTED_MODULE_2__.int)(hours >= 12)];
        if (self.secondElement !== undefined)
            self.secondElement.value = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.pad)(seconds);
    }
    function onYearInput(event) {
        var eventTarget = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(event);
        var year = parseInt(eventTarget.value) + (event.delta || 0);
        if (year / 1000 > 1 ||
            (event.key === "Enter" && !/[^\d]/.test(year.toString()))) {
            changeYear(year);
        }
    }
    function bind(element, event, handler, options) {
        if (event instanceof Array)
            return event.forEach(function (ev) { return bind(element, ev, handler, options); });
        if (element instanceof Array)
            return element.forEach(function (el) { return bind(el, event, handler, options); });
        element.addEventListener(event, handler, options);
        self._handlers.push({
            remove: function () { return element.removeEventListener(event, handler, options); },
        });
    }
    function triggerChange() {
        triggerEvent("onChange");
    }
    function bindEvents() {
        if (self.config.wrap) {
            ["open", "close", "toggle", "clear"].forEach(function (evt) {
                Array.prototype.forEach.call(self.element.querySelectorAll("[data-" + evt + "]"), function (el) {
                    return bind(el, "click", self[evt]);
                });
            });
        }
        if (self.isMobile) {
            setupMobile();
            return;
        }
        var debouncedResize = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.debounce)(onResize, 50);
        self._debouncedChange = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.debounce)(triggerChange, DEBOUNCED_CHANGE_MS);
        if (self.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent))
            bind(self.daysContainer, "mouseover", function (e) {
                if (self.config.mode === "range")
                    onMouseOver((0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e));
            });
        bind(self._input, "keydown", onKeyDown);
        if (self.calendarContainer !== undefined) {
            bind(self.calendarContainer, "keydown", onKeyDown);
        }
        if (!self.config.inline && !self.config.static)
            bind(window, "resize", debouncedResize);
        if (window.ontouchstart !== undefined)
            bind(window.document, "touchstart", documentClick);
        else
            bind(window.document, "mousedown", documentClick);
        bind(window.document, "focus", documentClick, { capture: true });
        if (self.config.clickOpens === true) {
            bind(self._input, "focus", self.open);
            bind(self._input, "click", self.open);
        }
        if (self.daysContainer !== undefined) {
            bind(self.monthNav, "click", onMonthNavClick);
            bind(self.monthNav, ["keyup", "increment"], onYearInput);
            bind(self.daysContainer, "click", selectDate);
        }
        if (self.timeContainer !== undefined &&
            self.minuteElement !== undefined &&
            self.hourElement !== undefined) {
            var selText = function (e) {
                return (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e).select();
            };
            bind(self.timeContainer, ["increment"], updateTime);
            bind(self.timeContainer, "blur", updateTime, { capture: true });
            bind(self.timeContainer, "click", timeIncrement);
            bind([self.hourElement, self.minuteElement], ["focus", "click"], selText);
            if (self.secondElement !== undefined)
                bind(self.secondElement, "focus", function () { return self.secondElement && self.secondElement.select(); });
            if (self.amPM !== undefined) {
                bind(self.amPM, "click", function (e) {
                    updateTime(e);
                });
            }
        }
        if (self.config.allowInput) {
            bind(self._input, "blur", onBlur);
        }
    }
    function jumpToDate(jumpDate, triggerChange) {
        var jumpTo = jumpDate !== undefined
            ? self.parseDate(jumpDate)
            : self.latestSelectedDateObj ||
                (self.config.minDate && self.config.minDate > self.now
                    ? self.config.minDate
                    : self.config.maxDate && self.config.maxDate < self.now
                        ? self.config.maxDate
                        : self.now);
        var oldYear = self.currentYear;
        var oldMonth = self.currentMonth;
        try {
            if (jumpTo !== undefined) {
                self.currentYear = jumpTo.getFullYear();
                self.currentMonth = jumpTo.getMonth();
            }
        }
        catch (e) {
            e.message = "Invalid date supplied: " + jumpTo;
            self.config.errorHandler(e);
        }
        if (triggerChange && self.currentYear !== oldYear) {
            triggerEvent("onYearChange");
            buildMonthSwitch();
        }
        if (triggerChange &&
            (self.currentYear !== oldYear || self.currentMonth !== oldMonth)) {
            triggerEvent("onMonthChange");
        }
        self.redraw();
    }
    function timeIncrement(e) {
        var eventTarget = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e);
        if (~eventTarget.className.indexOf("arrow"))
            incrementNumInput(e, eventTarget.classList.contains("arrowUp") ? 1 : -1);
    }
    function incrementNumInput(e, delta, inputElem) {
        var target = e && (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e);
        var input = inputElem ||
            (target && target.parentNode && target.parentNode.firstChild);
        var event = createEvent("increment");
        event.delta = delta;
        input && input.dispatchEvent(event);
    }
    function build() {
        var fragment = window.document.createDocumentFragment();
        self.calendarContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-calendar");
        self.calendarContainer.tabIndex = -1;
        if (!self.config.noCalendar) {
            fragment.appendChild(buildMonthNav());
            self.innerContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-innerContainer");
            if (self.config.weekNumbers) {
                var _a = buildWeeks(), weekWrapper = _a.weekWrapper, weekNumbers = _a.weekNumbers;
                self.innerContainer.appendChild(weekWrapper);
                self.weekNumbers = weekNumbers;
                self.weekWrapper = weekWrapper;
            }
            self.rContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-rContainer");
            self.rContainer.appendChild(buildWeekdays());
            if (!self.daysContainer) {
                self.daysContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-days");
                self.daysContainer.tabIndex = -1;
            }
            buildDays();
            self.rContainer.appendChild(self.daysContainer);
            self.innerContainer.appendChild(self.rContainer);
            fragment.appendChild(self.innerContainer);
        }
        if (self.config.enableTime) {
            fragment.appendChild(buildTime());
        }
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "rangeMode", self.config.mode === "range");
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "animate", self.config.animate === true);
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "multiMonth", self.config.showMonths > 1);
        self.calendarContainer.appendChild(fragment);
        var customAppend = self.config.appendTo !== undefined &&
            self.config.appendTo.nodeType !== undefined;
        if (self.config.inline || self.config.static) {
            self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
            if (self.config.inline) {
                if (!customAppend && self.element.parentNode)
                    self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);
                else if (self.config.appendTo !== undefined)
                    self.config.appendTo.appendChild(self.calendarContainer);
            }
            if (self.config.static) {
                var wrapper = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-wrapper");
                if (self.element.parentNode)
                    self.element.parentNode.insertBefore(wrapper, self.element);
                wrapper.appendChild(self.element);
                if (self.altInput)
                    wrapper.appendChild(self.altInput);
                wrapper.appendChild(self.calendarContainer);
            }
        }
        if (!self.config.static && !self.config.inline)
            (self.config.appendTo !== undefined
                ? self.config.appendTo
                : window.document.body).appendChild(self.calendarContainer);
    }
    function createDay(className, date, _dayNumber, i) {
        var dateIsEnabled = isEnabled(date, true), dayElement = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", className, date.getDate().toString());
        dayElement.dateObj = date;
        dayElement.$i = i;
        dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
        if (className.indexOf("hidden") === -1 &&
            (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(date, self.now) === 0) {
            self.todayDateElem = dayElement;
            dayElement.classList.add("today");
            dayElement.setAttribute("aria-current", "date");
        }
        if (dateIsEnabled) {
            dayElement.tabIndex = -1;
            if (isDateSelected(date)) {
                dayElement.classList.add("selected");
                self.selectedDateElem = dayElement;
                if (self.config.mode === "range") {
                    (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(dayElement, "startRange", self.selectedDates[0] &&
                        (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(date, self.selectedDates[0], true) === 0);
                    (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(dayElement, "endRange", self.selectedDates[1] &&
                        (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(date, self.selectedDates[1], true) === 0);
                    if (className === "nextMonthDay")
                        dayElement.classList.add("inRange");
                }
            }
        }
        else {
            dayElement.classList.add("flatpickr-disabled");
        }
        if (self.config.mode === "range") {
            if (isDateInRange(date) && !isDateSelected(date))
                dayElement.classList.add("inRange");
        }
        if (self.weekNumbers &&
            self.config.showMonths === 1 &&
            className !== "prevMonthDay" &&
            i % 7 === 6) {
            self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self.config.getWeek(date) + "</span>");
        }
        triggerEvent("onDayCreate", dayElement);
        return dayElement;
    }
    function focusOnDayElem(targetNode) {
        targetNode.focus();
        if (self.config.mode === "range")
            onMouseOver(targetNode);
    }
    function getFirstAvailableDay(delta) {
        var startMonth = delta > 0 ? 0 : self.config.showMonths - 1;
        var endMonth = delta > 0 ? self.config.showMonths : -1;
        for (var m = startMonth; m != endMonth; m += delta) {
            var month = self.daysContainer.children[m];
            var startIndex = delta > 0 ? 0 : month.children.length - 1;
            var endIndex = delta > 0 ? month.children.length : -1;
            for (var i = startIndex; i != endIndex; i += delta) {
                var c = month.children[i];
                if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj))
                    return c;
            }
        }
        return undefined;
    }
    function getNextAvailableDay(current, delta) {
        var givenMonth = current.className.indexOf("Month") === -1
            ? current.dateObj.getMonth()
            : self.currentMonth;
        var endMonth = delta > 0 ? self.config.showMonths : -1;
        var loopDelta = delta > 0 ? 1 : -1;
        for (var m = givenMonth - self.currentMonth; m != endMonth; m += loopDelta) {
            var month = self.daysContainer.children[m];
            var startIndex = givenMonth - self.currentMonth === m
                ? current.$i + delta
                : delta < 0
                    ? month.children.length - 1
                    : 0;
            var numMonthDays = month.children.length;
            for (var i = startIndex; i >= 0 && i < numMonthDays && i != (delta > 0 ? numMonthDays : -1); i += loopDelta) {
                var c = month.children[i];
                if (c.className.indexOf("hidden") === -1 &&
                    isEnabled(c.dateObj) &&
                    Math.abs(current.$i - i) >= Math.abs(delta))
                    return focusOnDayElem(c);
            }
        }
        self.changeMonth(loopDelta);
        focusOnDay(getFirstAvailableDay(loopDelta), 0);
        return undefined;
    }
    function focusOnDay(current, offset) {
        var activeElement = getClosestActiveElement();
        var dayFocused = isInView(activeElement || document.body);
        var startElem = current !== undefined
            ? current
            : dayFocused
                ? activeElement
                : self.selectedDateElem !== undefined && isInView(self.selectedDateElem)
                    ? self.selectedDateElem
                    : self.todayDateElem !== undefined && isInView(self.todayDateElem)
                        ? self.todayDateElem
                        : getFirstAvailableDay(offset > 0 ? 1 : -1);
        if (startElem === undefined) {
            self._input.focus();
        }
        else if (!dayFocused) {
            focusOnDayElem(startElem);
        }
        else {
            getNextAvailableDay(startElem, offset);
        }
    }
    function buildMonthDays(year, month) {
        var firstOfMonth = (new Date(year, month, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7;
        var prevMonthDays = self.utils.getDaysInMonth((month - 1 + 12) % 12, year);
        var daysInMonth = self.utils.getDaysInMonth(month, year), days = window.document.createDocumentFragment(), isMultiMonth = self.config.showMonths > 1, prevMonthDayClass = isMultiMonth ? "prevMonthDay hidden" : "prevMonthDay", nextMonthDayClass = isMultiMonth ? "nextMonthDay hidden" : "nextMonthDay";
        var dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
        for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
            days.appendChild(createDay("flatpickr-day " + prevMonthDayClass, new Date(year, month - 1, dayNumber), dayNumber, dayIndex));
        }
        for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
            days.appendChild(createDay("flatpickr-day", new Date(year, month, dayNumber), dayNumber, dayIndex));
        }
        for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth &&
            (self.config.showMonths === 1 || dayIndex % 7 !== 0); dayNum++, dayIndex++) {
            days.appendChild(createDay("flatpickr-day " + nextMonthDayClass, new Date(year, month + 1, dayNum % daysInMonth), dayNum, dayIndex));
        }
        var dayContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "dayContainer");
        dayContainer.appendChild(days);
        return dayContainer;
    }
    function buildDays() {
        if (self.daysContainer === undefined) {
            return;
        }
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.clearNode)(self.daysContainer);
        if (self.weekNumbers)
            (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.clearNode)(self.weekNumbers);
        var frag = document.createDocumentFragment();
        for (var i = 0; i < self.config.showMonths; i++) {
            var d = new Date(self.currentYear, self.currentMonth, 1);
            d.setMonth(self.currentMonth + i);
            frag.appendChild(buildMonthDays(d.getFullYear(), d.getMonth()));
        }
        self.daysContainer.appendChild(frag);
        self.days = self.daysContainer.firstChild;
        if (self.config.mode === "range" && self.selectedDates.length === 1) {
            onMouseOver();
        }
    }
    function buildMonthSwitch() {
        if (self.config.showMonths > 1 ||
            self.config.monthSelectorType !== "dropdown")
            return;
        var shouldBuildMonth = function (month) {
            if (self.config.minDate !== undefined &&
                self.currentYear === self.config.minDate.getFullYear() &&
                month < self.config.minDate.getMonth()) {
                return false;
            }
            return !(self.config.maxDate !== undefined &&
                self.currentYear === self.config.maxDate.getFullYear() &&
                month > self.config.maxDate.getMonth());
        };
        self.monthsDropdownContainer.tabIndex = -1;
        self.monthsDropdownContainer.innerHTML = "";
        for (var i = 0; i < 12; i++) {
            if (!shouldBuildMonth(i))
                continue;
            var month = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("option", "flatpickr-monthDropdown-month");
            month.value = new Date(self.currentYear, i).getMonth().toString();
            month.textContent = (0,_utils_formatting__WEBPACK_IMPORTED_MODULE_5__.monthToStr)(i, self.config.shorthandCurrentMonth, self.l10n);
            month.tabIndex = -1;
            if (self.currentMonth === i) {
                month.selected = true;
            }
            self.monthsDropdownContainer.appendChild(month);
        }
    }
    function buildMonth() {
        var container = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-month");
        var monthNavFragment = window.document.createDocumentFragment();
        var monthElement;
        if (self.config.showMonths > 1 ||
            self.config.monthSelectorType === "static") {
            monthElement = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", "cur-month");
        }
        else {
            self.monthsDropdownContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("select", "flatpickr-monthDropdown-months");
            self.monthsDropdownContainer.setAttribute("aria-label", self.l10n.monthAriaLabel);
            bind(self.monthsDropdownContainer, "change", function (e) {
                var target = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e);
                var selectedMonth = parseInt(target.value, 10);
                self.changeMonth(selectedMonth - self.currentMonth);
                triggerEvent("onMonthChange");
            });
            buildMonthSwitch();
            monthElement = self.monthsDropdownContainer;
        }
        var yearInput = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createNumberInput)("cur-year", { tabindex: "-1" });
        var yearElement = yearInput.getElementsByTagName("input")[0];
        yearElement.setAttribute("aria-label", self.l10n.yearAriaLabel);
        if (self.config.minDate) {
            yearElement.setAttribute("min", self.config.minDate.getFullYear().toString());
        }
        if (self.config.maxDate) {
            yearElement.setAttribute("max", self.config.maxDate.getFullYear().toString());
            yearElement.disabled =
                !!self.config.minDate &&
                    self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
        }
        var currentMonth = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-current-month");
        currentMonth.appendChild(monthElement);
        currentMonth.appendChild(yearInput);
        monthNavFragment.appendChild(currentMonth);
        container.appendChild(monthNavFragment);
        return {
            container: container,
            yearElement: yearElement,
            monthElement: monthElement,
        };
    }
    function buildMonths() {
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.clearNode)(self.monthNav);
        self.monthNav.appendChild(self.prevMonthNav);
        if (self.config.showMonths) {
            self.yearElements = [];
            self.monthElements = [];
        }
        for (var m = self.config.showMonths; m--;) {
            var month = buildMonth();
            self.yearElements.push(month.yearElement);
            self.monthElements.push(month.monthElement);
            self.monthNav.appendChild(month.container);
        }
        self.monthNav.appendChild(self.nextMonthNav);
    }
    function buildMonthNav() {
        self.monthNav = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-months");
        self.yearElements = [];
        self.monthElements = [];
        self.prevMonthNav = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", "flatpickr-prev-month");
        self.prevMonthNav.innerHTML = self.config.prevArrow;
        self.nextMonthNav = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", "flatpickr-next-month");
        self.nextMonthNav.innerHTML = self.config.nextArrow;
        buildMonths();
        Object.defineProperty(self, "_hidePrevMonthArrow", {
            get: function () { return self.__hidePrevMonthArrow; },
            set: function (bool) {
                if (self.__hidePrevMonthArrow !== bool) {
                    (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.prevMonthNav, "flatpickr-disabled", bool);
                    self.__hidePrevMonthArrow = bool;
                }
            },
        });
        Object.defineProperty(self, "_hideNextMonthArrow", {
            get: function () { return self.__hideNextMonthArrow; },
            set: function (bool) {
                if (self.__hideNextMonthArrow !== bool) {
                    (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.nextMonthNav, "flatpickr-disabled", bool);
                    self.__hideNextMonthArrow = bool;
                }
            },
        });
        self.currentYearElement = self.yearElements[0];
        updateNavigationCurrentMonth();
        return self.monthNav;
    }
    function buildTime() {
        self.calendarContainer.classList.add("hasTime");
        if (self.config.noCalendar)
            self.calendarContainer.classList.add("noCalendar");
        var defaults = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.getDefaultHours)(self.config);
        self.timeContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-time");
        self.timeContainer.tabIndex = -1;
        var separator = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", "flatpickr-time-separator", ":");
        var hourInput = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createNumberInput)("flatpickr-hour", {
            "aria-label": self.l10n.hourAriaLabel,
        });
        self.hourElement = hourInput.getElementsByTagName("input")[0];
        var minuteInput = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createNumberInput)("flatpickr-minute", {
            "aria-label": self.l10n.minuteAriaLabel,
        });
        self.minuteElement = minuteInput.getElementsByTagName("input")[0];
        self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
        self.hourElement.value = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.pad)(self.latestSelectedDateObj
            ? self.latestSelectedDateObj.getHours()
            : self.config.time_24hr
                ? defaults.hours
                : military2ampm(defaults.hours));
        self.minuteElement.value = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.pad)(self.latestSelectedDateObj
            ? self.latestSelectedDateObj.getMinutes()
            : defaults.minutes);
        self.hourElement.setAttribute("step", self.config.hourIncrement.toString());
        self.minuteElement.setAttribute("step", self.config.minuteIncrement.toString());
        self.hourElement.setAttribute("min", self.config.time_24hr ? "0" : "1");
        self.hourElement.setAttribute("max", self.config.time_24hr ? "23" : "12");
        self.hourElement.setAttribute("maxlength", "2");
        self.minuteElement.setAttribute("min", "0");
        self.minuteElement.setAttribute("max", "59");
        self.minuteElement.setAttribute("maxlength", "2");
        self.timeContainer.appendChild(hourInput);
        self.timeContainer.appendChild(separator);
        self.timeContainer.appendChild(minuteInput);
        if (self.config.time_24hr)
            self.timeContainer.classList.add("time24hr");
        if (self.config.enableSeconds) {
            self.timeContainer.classList.add("hasSeconds");
            var secondInput = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createNumberInput)("flatpickr-second");
            self.secondElement = secondInput.getElementsByTagName("input")[0];
            self.secondElement.value = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.pad)(self.latestSelectedDateObj
                ? self.latestSelectedDateObj.getSeconds()
                : defaults.seconds);
            self.secondElement.setAttribute("step", self.minuteElement.getAttribute("step"));
            self.secondElement.setAttribute("min", "0");
            self.secondElement.setAttribute("max", "59");
            self.secondElement.setAttribute("maxlength", "2");
            self.timeContainer.appendChild((0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", "flatpickr-time-separator", ":"));
            self.timeContainer.appendChild(secondInput);
        }
        if (!self.config.time_24hr) {
            self.amPM = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", "flatpickr-am-pm", self.l10n.amPM[(0,_utils__WEBPACK_IMPORTED_MODULE_2__.int)((self.latestSelectedDateObj
                ? self.hourElement.value
                : self.config.defaultHour) > 11)]);
            self.amPM.title = self.l10n.toggleTitle;
            self.amPM.tabIndex = -1;
            self.timeContainer.appendChild(self.amPM);
        }
        return self.timeContainer;
    }
    function buildWeekdays() {
        if (!self.weekdayContainer)
            self.weekdayContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-weekdays");
        else
            (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.clearNode)(self.weekdayContainer);
        for (var i = self.config.showMonths; i--;) {
            var container = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-weekdaycontainer");
            self.weekdayContainer.appendChild(container);
        }
        updateWeekdays();
        return self.weekdayContainer;
    }
    function updateWeekdays() {
        if (!self.weekdayContainer) {
            return;
        }
        var firstDayOfWeek = self.l10n.firstDayOfWeek;
        var weekdays = __spreadArrays(self.l10n.weekdays.shorthand);
        if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
            weekdays = __spreadArrays(weekdays.splice(firstDayOfWeek, weekdays.length), weekdays.splice(0, firstDayOfWeek));
        }
        for (var i = self.config.showMonths; i--;) {
            self.weekdayContainer.children[i].innerHTML = "\n      <span class='flatpickr-weekday'>\n        " + weekdays.join("</span><span class='flatpickr-weekday'>") + "\n      </span>\n      ";
        }
    }
    function buildWeeks() {
        self.calendarContainer.classList.add("hasWeeks");
        var weekWrapper = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-weekwrapper");
        weekWrapper.appendChild((0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
        var weekNumbers = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-weeks");
        weekWrapper.appendChild(weekNumbers);
        return {
            weekWrapper: weekWrapper,
            weekNumbers: weekNumbers,
        };
    }
    function changeMonth(value, isOffset) {
        if (isOffset === void 0) { isOffset = true; }
        var delta = isOffset ? value : value - self.currentMonth;
        if ((delta < 0 && self._hidePrevMonthArrow === true) ||
            (delta > 0 && self._hideNextMonthArrow === true))
            return;
        self.currentMonth += delta;
        if (self.currentMonth < 0 || self.currentMonth > 11) {
            self.currentYear += self.currentMonth > 11 ? 1 : -1;
            self.currentMonth = (self.currentMonth + 12) % 12;
            triggerEvent("onYearChange");
            buildMonthSwitch();
        }
        buildDays();
        triggerEvent("onMonthChange");
        updateNavigationCurrentMonth();
    }
    function clear(triggerChangeEvent, toInitial) {
        if (triggerChangeEvent === void 0) { triggerChangeEvent = true; }
        if (toInitial === void 0) { toInitial = true; }
        self.input.value = "";
        if (self.altInput !== undefined)
            self.altInput.value = "";
        if (self.mobileInput !== undefined)
            self.mobileInput.value = "";
        self.selectedDates = [];
        self.latestSelectedDateObj = undefined;
        if (toInitial === true) {
            self.currentYear = self._initialDate.getFullYear();
            self.currentMonth = self._initialDate.getMonth();
        }
        if (self.config.enableTime === true) {
            var _a = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.getDefaultHours)(self.config), hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds;
            setHours(hours, minutes, seconds);
        }
        self.redraw();
        if (triggerChangeEvent)
            triggerEvent("onChange");
    }
    function close() {
        self.isOpen = false;
        if (!self.isMobile) {
            if (self.calendarContainer !== undefined) {
                self.calendarContainer.classList.remove("open");
            }
            if (self._input !== undefined) {
                self._input.classList.remove("active");
            }
        }
        triggerEvent("onClose");
    }
    function destroy() {
        if (self.config !== undefined)
            triggerEvent("onDestroy");
        for (var i = self._handlers.length; i--;) {
            self._handlers[i].remove();
        }
        self._handlers = [];
        if (self.mobileInput) {
            if (self.mobileInput.parentNode)
                self.mobileInput.parentNode.removeChild(self.mobileInput);
            self.mobileInput = undefined;
        }
        else if (self.calendarContainer && self.calendarContainer.parentNode) {
            if (self.config.static && self.calendarContainer.parentNode) {
                var wrapper = self.calendarContainer.parentNode;
                wrapper.lastChild && wrapper.removeChild(wrapper.lastChild);
                if (wrapper.parentNode) {
                    while (wrapper.firstChild)
                        wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
                    wrapper.parentNode.removeChild(wrapper);
                }
            }
            else
                self.calendarContainer.parentNode.removeChild(self.calendarContainer);
        }
        if (self.altInput) {
            self.input.type = "text";
            if (self.altInput.parentNode)
                self.altInput.parentNode.removeChild(self.altInput);
            delete self.altInput;
        }
        if (self.input) {
            self.input.type = self.input._type;
            self.input.classList.remove("flatpickr-input");
            self.input.removeAttribute("readonly");
        }
        [
            "_showTimeInput",
            "latestSelectedDateObj",
            "_hideNextMonthArrow",
            "_hidePrevMonthArrow",
            "__hideNextMonthArrow",
            "__hidePrevMonthArrow",
            "isMobile",
            "isOpen",
            "selectedDateElem",
            "minDateHasTime",
            "maxDateHasTime",
            "days",
            "daysContainer",
            "_input",
            "_positionElement",
            "innerContainer",
            "rContainer",
            "monthNav",
            "todayDateElem",
            "calendarContainer",
            "weekdayContainer",
            "prevMonthNav",
            "nextMonthNav",
            "monthsDropdownContainer",
            "currentMonthElement",
            "currentYearElement",
            "navigationCurrentMonth",
            "selectedDateElem",
            "config",
        ].forEach(function (k) {
            try {
                delete self[k];
            }
            catch (_) { }
        });
    }
    function isCalendarElem(elem) {
        return self.calendarContainer.contains(elem);
    }
    function documentClick(e) {
        if (self.isOpen && !self.config.inline) {
            var eventTarget_1 = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e);
            var isCalendarElement = isCalendarElem(eventTarget_1);
            var isInput = eventTarget_1 === self.input ||
                eventTarget_1 === self.altInput ||
                self.element.contains(eventTarget_1) ||
                (e.path &&
                    e.path.indexOf &&
                    (~e.path.indexOf(self.input) ||
                        ~e.path.indexOf(self.altInput)));
            var lostFocus = !isInput &&
                !isCalendarElement &&
                !isCalendarElem(e.relatedTarget);
            var isIgnored = !self.config.ignoredFocusElements.some(function (elem) {
                return elem.contains(eventTarget_1);
            });
            if (lostFocus && isIgnored) {
                if (self.config.allowInput) {
                    self.setDate(self._input.value, false, self.config.altInput
                        ? self.config.altFormat
                        : self.config.dateFormat);
                }
                if (self.timeContainer !== undefined &&
                    self.minuteElement !== undefined &&
                    self.hourElement !== undefined &&
                    self.input.value !== "" &&
                    self.input.value !== undefined) {
                    updateTime();
                }
                self.close();
                if (self.config &&
                    self.config.mode === "range" &&
                    self.selectedDates.length === 1)
                    self.clear(false);
            }
        }
    }
    function changeYear(newYear) {
        if (!newYear ||
            (self.config.minDate && newYear < self.config.minDate.getFullYear()) ||
            (self.config.maxDate && newYear > self.config.maxDate.getFullYear()))
            return;
        var newYearNum = newYear, isNewYear = self.currentYear !== newYearNum;
        self.currentYear = newYearNum || self.currentYear;
        if (self.config.maxDate &&
            self.currentYear === self.config.maxDate.getFullYear()) {
            self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
        }
        else if (self.config.minDate &&
            self.currentYear === self.config.minDate.getFullYear()) {
            self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
        }
        if (isNewYear) {
            self.redraw();
            triggerEvent("onYearChange");
            buildMonthSwitch();
        }
    }
    function isEnabled(date, timeless) {
        var _a;
        if (timeless === void 0) { timeless = true; }
        var dateToCheck = self.parseDate(date, undefined, timeless);
        if ((self.config.minDate &&
            dateToCheck &&
            (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(dateToCheck, self.config.minDate, timeless !== undefined ? timeless : !self.minDateHasTime) < 0) ||
            (self.config.maxDate &&
                dateToCheck &&
                (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(dateToCheck, self.config.maxDate, timeless !== undefined ? timeless : !self.maxDateHasTime) > 0))
            return false;
        if (!self.config.enable && self.config.disable.length === 0)
            return true;
        if (dateToCheck === undefined)
            return false;
        var bool = !!self.config.enable, array = (_a = self.config.enable) !== null && _a !== void 0 ? _a : self.config.disable;
        for (var i = 0, d = void 0; i < array.length; i++) {
            d = array[i];
            if (typeof d === "function" &&
                d(dateToCheck))
                return bool;
            else if (d instanceof Date &&
                dateToCheck !== undefined &&
                d.getTime() === dateToCheck.getTime())
                return bool;
            else if (typeof d === "string") {
                var parsed = self.parseDate(d, undefined, true);
                return parsed && parsed.getTime() === dateToCheck.getTime()
                    ? bool
                    : !bool;
            }
            else if (typeof d === "object" &&
                dateToCheck !== undefined &&
                d.from &&
                d.to &&
                dateToCheck.getTime() >= d.from.getTime() &&
                dateToCheck.getTime() <= d.to.getTime())
                return bool;
        }
        return !bool;
    }
    function isInView(elem) {
        if (self.daysContainer !== undefined)
            return (elem.className.indexOf("hidden") === -1 &&
                elem.className.indexOf("flatpickr-disabled") === -1 &&
                self.daysContainer.contains(elem));
        return false;
    }
    function onBlur(e) {
        var isInput = e.target === self._input;
        var valueChanged = self._input.value.trimEnd() !== getDateStr();
        if (isInput &&
            valueChanged &&
            !(e.relatedTarget && isCalendarElem(e.relatedTarget))) {
            self.setDate(self._input.value, true, e.target === self.altInput
                ? self.config.altFormat
                : self.config.dateFormat);
        }
    }
    function onKeyDown(e) {
        var eventTarget = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e);
        var isInput = self.config.wrap
            ? element.contains(eventTarget)
            : eventTarget === self._input;
        var allowInput = self.config.allowInput;
        var allowKeydown = self.isOpen && (!allowInput || !isInput);
        var allowInlineKeydown = self.config.inline && isInput && !allowInput;
        if (e.keyCode === 13 && isInput) {
            if (allowInput) {
                self.setDate(self._input.value, true, eventTarget === self.altInput
                    ? self.config.altFormat
                    : self.config.dateFormat);
                self.close();
                return eventTarget.blur();
            }
            else {
                self.open();
            }
        }
        else if (isCalendarElem(eventTarget) ||
            allowKeydown ||
            allowInlineKeydown) {
            var isTimeObj = !!self.timeContainer &&
                self.timeContainer.contains(eventTarget);
            switch (e.keyCode) {
                case 13:
                    if (isTimeObj) {
                        e.preventDefault();
                        updateTime();
                        focusAndClose();
                    }
                    else
                        selectDate(e);
                    break;
                case 27:
                    e.preventDefault();
                    focusAndClose();
                    break;
                case 8:
                case 46:
                    if (isInput && !self.config.allowInput) {
                        e.preventDefault();
                        self.clear();
                    }
                    break;
                case 37:
                case 39:
                    if (!isTimeObj && !isInput) {
                        e.preventDefault();
                        var activeElement = getClosestActiveElement();
                        if (self.daysContainer !== undefined &&
                            (allowInput === false ||
                                (activeElement && isInView(activeElement)))) {
                            var delta_1 = e.keyCode === 39 ? 1 : -1;
                            if (!e.ctrlKey)
                                focusOnDay(undefined, delta_1);
                            else {
                                e.stopPropagation();
                                changeMonth(delta_1);
                                focusOnDay(getFirstAvailableDay(1), 0);
                            }
                        }
                    }
                    else if (self.hourElement)
                        self.hourElement.focus();
                    break;
                case 38:
                case 40:
                    e.preventDefault();
                    var delta = e.keyCode === 40 ? 1 : -1;
                    if ((self.daysContainer &&
                        eventTarget.$i !== undefined) ||
                        eventTarget === self.input ||
                        eventTarget === self.altInput) {
                        if (e.ctrlKey) {
                            e.stopPropagation();
                            changeYear(self.currentYear - delta);
                            focusOnDay(getFirstAvailableDay(1), 0);
                        }
                        else if (!isTimeObj)
                            focusOnDay(undefined, delta * 7);
                    }
                    else if (eventTarget === self.currentYearElement) {
                        changeYear(self.currentYear - delta);
                    }
                    else if (self.config.enableTime) {
                        if (!isTimeObj && self.hourElement)
                            self.hourElement.focus();
                        updateTime(e);
                        self._debouncedChange();
                    }
                    break;
                case 9:
                    if (isTimeObj) {
                        var elems = [
                            self.hourElement,
                            self.minuteElement,
                            self.secondElement,
                            self.amPM,
                        ]
                            .concat(self.pluginElements)
                            .filter(function (x) { return x; });
                        var i = elems.indexOf(eventTarget);
                        if (i !== -1) {
                            var target = elems[i + (e.shiftKey ? -1 : 1)];
                            e.preventDefault();
                            (target || self._input).focus();
                        }
                    }
                    else if (!self.config.noCalendar &&
                        self.daysContainer &&
                        self.daysContainer.contains(eventTarget) &&
                        e.shiftKey) {
                        e.preventDefault();
                        self._input.focus();
                    }
                    break;
                default:
                    break;
            }
        }
        if (self.amPM !== undefined && eventTarget === self.amPM) {
            switch (e.key) {
                case self.l10n.amPM[0].charAt(0):
                case self.l10n.amPM[0].charAt(0).toLowerCase():
                    self.amPM.textContent = self.l10n.amPM[0];
                    setHoursFromInputs();
                    updateValue();
                    break;
                case self.l10n.amPM[1].charAt(0):
                case self.l10n.amPM[1].charAt(0).toLowerCase():
                    self.amPM.textContent = self.l10n.amPM[1];
                    setHoursFromInputs();
                    updateValue();
                    break;
            }
        }
        if (isInput || isCalendarElem(eventTarget)) {
            triggerEvent("onKeyDown", e);
        }
    }
    function onMouseOver(elem, cellClass) {
        if (cellClass === void 0) { cellClass = "flatpickr-day"; }
        if (self.selectedDates.length !== 1 ||
            (elem &&
                (!elem.classList.contains(cellClass) ||
                    elem.classList.contains("flatpickr-disabled"))))
            return;
        var hoverDate = elem
            ? elem.dateObj.getTime()
            : self.days.firstElementChild.dateObj.getTime(), initialDate = self.parseDate(self.selectedDates[0], undefined, true).getTime(), rangeStartDate = Math.min(hoverDate, self.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate, self.selectedDates[0].getTime());
        var containsDisabled = false;
        var minRange = 0, maxRange = 0;
        for (var t = rangeStartDate; t < rangeEndDate; t += _utils_dates__WEBPACK_IMPORTED_MODULE_4__.duration.DAY) {
            if (!isEnabled(new Date(t), true)) {
                containsDisabled =
                    containsDisabled || (t > rangeStartDate && t < rangeEndDate);
                if (t < initialDate && (!minRange || t > minRange))
                    minRange = t;
                else if (t > initialDate && (!maxRange || t < maxRange))
                    maxRange = t;
            }
        }
        var hoverableCells = Array.from(self.rContainer.querySelectorAll("*:nth-child(-n+" + self.config.showMonths + ") > ." + cellClass));
        hoverableCells.forEach(function (dayElem) {
            var date = dayElem.dateObj;
            var timestamp = date.getTime();
            var outOfRange = (minRange > 0 && timestamp < minRange) ||
                (maxRange > 0 && timestamp > maxRange);
            if (outOfRange) {
                dayElem.classList.add("notAllowed");
                ["inRange", "startRange", "endRange"].forEach(function (c) {
                    dayElem.classList.remove(c);
                });
                return;
            }
            else if (containsDisabled && !outOfRange)
                return;
            ["startRange", "inRange", "endRange", "notAllowed"].forEach(function (c) {
                dayElem.classList.remove(c);
            });
            if (elem !== undefined) {
                elem.classList.add(hoverDate <= self.selectedDates[0].getTime()
                    ? "startRange"
                    : "endRange");
                if (initialDate < hoverDate && timestamp === initialDate)
                    dayElem.classList.add("startRange");
                else if (initialDate > hoverDate && timestamp === initialDate)
                    dayElem.classList.add("endRange");
                if (timestamp >= minRange &&
                    (maxRange === 0 || timestamp <= maxRange) &&
                    (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.isBetween)(timestamp, initialDate, hoverDate))
                    dayElem.classList.add("inRange");
            }
        });
    }
    function onResize() {
        if (self.isOpen && !self.config.static && !self.config.inline)
            positionCalendar();
    }
    function open(e, positionElement) {
        if (positionElement === void 0) { positionElement = self._positionElement; }
        if (self.isMobile === true) {
            if (e) {
                e.preventDefault();
                var eventTarget = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e);
                if (eventTarget) {
                    eventTarget.blur();
                }
            }
            if (self.mobileInput !== undefined) {
                self.mobileInput.focus();
                self.mobileInput.click();
            }
            triggerEvent("onOpen");
            return;
        }
        else if (self._input.disabled || self.config.inline) {
            return;
        }
        var wasOpen = self.isOpen;
        self.isOpen = true;
        if (!wasOpen) {
            self.calendarContainer.classList.add("open");
            self._input.classList.add("active");
            triggerEvent("onOpen");
            positionCalendar(positionElement);
        }
        if (self.config.enableTime === true && self.config.noCalendar === true) {
            if (self.config.allowInput === false &&
                (e === undefined ||
                    !self.timeContainer.contains(e.relatedTarget))) {
                setTimeout(function () { return self.hourElement.select(); }, 50);
            }
        }
    }
    function minMaxDateSetter(type) {
        return function (date) {
            var dateObj = (self.config["_" + type + "Date"] = self.parseDate(date, self.config.dateFormat));
            var inverseDateObj = self.config["_" + (type === "min" ? "max" : "min") + "Date"];
            if (dateObj !== undefined) {
                self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] =
                    dateObj.getHours() > 0 ||
                        dateObj.getMinutes() > 0 ||
                        dateObj.getSeconds() > 0;
            }
            if (self.selectedDates) {
                self.selectedDates = self.selectedDates.filter(function (d) { return isEnabled(d); });
                if (!self.selectedDates.length && type === "min")
                    setHoursFromDate(dateObj);
                updateValue();
            }
            if (self.daysContainer) {
                redraw();
                if (dateObj !== undefined)
                    self.currentYearElement[type] = dateObj.getFullYear().toString();
                else
                    self.currentYearElement.removeAttribute(type);
                self.currentYearElement.disabled =
                    !!inverseDateObj &&
                        dateObj !== undefined &&
                        inverseDateObj.getFullYear() === dateObj.getFullYear();
            }
        };
    }
    function parseConfig() {
        var boolOpts = [
            "wrap",
            "weekNumbers",
            "allowInput",
            "allowInvalidPreload",
            "clickOpens",
            "time_24hr",
            "enableTime",
            "noCalendar",
            "altInput",
            "shorthandCurrentMonth",
            "inline",
            "static",
            "enableSeconds",
            "disableMobile",
        ];
        var userConfig = __assign(__assign({}, JSON.parse(JSON.stringify(element.dataset || {}))), instanceConfig);
        var formats = {};
        self.config.parseDate = userConfig.parseDate;
        self.config.formatDate = userConfig.formatDate;
        Object.defineProperty(self.config, "enable", {
            get: function () { return self.config._enable; },
            set: function (dates) {
                self.config._enable = parseDateRules(dates);
            },
        });
        Object.defineProperty(self.config, "disable", {
            get: function () { return self.config._disable; },
            set: function (dates) {
                self.config._disable = parseDateRules(dates);
            },
        });
        var timeMode = userConfig.mode === "time";
        if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
            var defaultDateFormat = flatpickr.defaultConfig.dateFormat || _types_options__WEBPACK_IMPORTED_MODULE_0__.defaults.dateFormat;
            formats.dateFormat =
                userConfig.noCalendar || timeMode
                    ? "H:i" + (userConfig.enableSeconds ? ":S" : "")
                    : defaultDateFormat + " H:i" + (userConfig.enableSeconds ? ":S" : "");
        }
        if (userConfig.altInput &&
            (userConfig.enableTime || timeMode) &&
            !userConfig.altFormat) {
            var defaultAltFormat = flatpickr.defaultConfig.altFormat || _types_options__WEBPACK_IMPORTED_MODULE_0__.defaults.altFormat;
            formats.altFormat =
                userConfig.noCalendar || timeMode
                    ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K")
                    : defaultAltFormat + (" h:i" + (userConfig.enableSeconds ? ":S" : "") + " K");
        }
        Object.defineProperty(self.config, "minDate", {
            get: function () { return self.config._minDate; },
            set: minMaxDateSetter("min"),
        });
        Object.defineProperty(self.config, "maxDate", {
            get: function () { return self.config._maxDate; },
            set: minMaxDateSetter("max"),
        });
        var minMaxTimeSetter = function (type) { return function (val) {
            self.config[type === "min" ? "_minTime" : "_maxTime"] = self.parseDate(val, "H:i:S");
        }; };
        Object.defineProperty(self.config, "minTime", {
            get: function () { return self.config._minTime; },
            set: minMaxTimeSetter("min"),
        });
        Object.defineProperty(self.config, "maxTime", {
            get: function () { return self.config._maxTime; },
            set: minMaxTimeSetter("max"),
        });
        if (userConfig.mode === "time") {
            self.config.noCalendar = true;
            self.config.enableTime = true;
        }
        Object.assign(self.config, formats, userConfig);
        for (var i = 0; i < boolOpts.length; i++)
            self.config[boolOpts[i]] =
                self.config[boolOpts[i]] === true ||
                    self.config[boolOpts[i]] === "true";
        _types_options__WEBPACK_IMPORTED_MODULE_0__.HOOKS.filter(function (hook) { return self.config[hook] !== undefined; }).forEach(function (hook) {
            self.config[hook] = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.arrayify)(self.config[hook] || []).map(bindToInstance);
        });
        self.isMobile =
            !self.config.disableMobile &&
                !self.config.inline &&
                self.config.mode === "single" &&
                !self.config.disable.length &&
                !self.config.enable &&
                !self.config.weekNumbers &&
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        for (var i = 0; i < self.config.plugins.length; i++) {
            var pluginConf = self.config.plugins[i](self) || {};
            for (var key in pluginConf) {
                if (_types_options__WEBPACK_IMPORTED_MODULE_0__.HOOKS.indexOf(key) > -1) {
                    self.config[key] = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.arrayify)(pluginConf[key])
                        .map(bindToInstance)
                        .concat(self.config[key]);
                }
                else if (typeof userConfig[key] === "undefined")
                    self.config[key] = pluginConf[key];
            }
        }
        if (!userConfig.altInputClass) {
            self.config.altInputClass =
                getInputElem().className + " " + self.config.altInputClass;
        }
        triggerEvent("onParseConfig");
    }
    function getInputElem() {
        return self.config.wrap
            ? element.querySelector("[data-input]")
            : element;
    }
    function setupLocale() {
        if (typeof self.config.locale !== "object" &&
            typeof flatpickr.l10ns[self.config.locale] === "undefined")
            self.config.errorHandler(new Error("flatpickr: invalid locale " + self.config.locale));
        self.l10n = __assign(__assign({}, flatpickr.l10ns.default), (typeof self.config.locale === "object"
            ? self.config.locale
            : self.config.locale !== "default"
                ? flatpickr.l10ns[self.config.locale]
                : undefined));
        _utils_formatting__WEBPACK_IMPORTED_MODULE_5__.tokenRegex.D = "(" + self.l10n.weekdays.shorthand.join("|") + ")";
        _utils_formatting__WEBPACK_IMPORTED_MODULE_5__.tokenRegex.l = "(" + self.l10n.weekdays.longhand.join("|") + ")";
        _utils_formatting__WEBPACK_IMPORTED_MODULE_5__.tokenRegex.M = "(" + self.l10n.months.shorthand.join("|") + ")";
        _utils_formatting__WEBPACK_IMPORTED_MODULE_5__.tokenRegex.F = "(" + self.l10n.months.longhand.join("|") + ")";
        _utils_formatting__WEBPACK_IMPORTED_MODULE_5__.tokenRegex.K = "(" + self.l10n.amPM[0] + "|" + self.l10n.amPM[1] + "|" + self.l10n.amPM[0].toLowerCase() + "|" + self.l10n.amPM[1].toLowerCase() + ")";
        var userConfig = __assign(__assign({}, instanceConfig), JSON.parse(JSON.stringify(element.dataset || {})));
        if (userConfig.time_24hr === undefined &&
            flatpickr.defaultConfig.time_24hr === undefined) {
            self.config.time_24hr = self.l10n.time_24hr;
        }
        self.formatDate = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.createDateFormatter)(self);
        self.parseDate = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.createDateParser)({ config: self.config, l10n: self.l10n });
    }
    function positionCalendar(customPositionElement) {
        if (typeof self.config.position === "function") {
            return void self.config.position(self, customPositionElement);
        }
        if (self.calendarContainer === undefined)
            return;
        triggerEvent("onPreCalendarPosition");
        var positionElement = customPositionElement || self._positionElement;
        var calendarHeight = Array.prototype.reduce.call(self.calendarContainer.children, (function (acc, child) { return acc + child.offsetHeight; }), 0), calendarWidth = self.calendarContainer.offsetWidth, configPos = self.config.position.split(" "), configPosVertical = configPos[0], configPosHorizontal = configPos.length > 1 ? configPos[1] : null, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPosVertical === "above" ||
            (configPosVertical !== "below" &&
                distanceFromBottom < calendarHeight &&
                inputBounds.top > calendarHeight);
        var top = window.pageYOffset +
            inputBounds.top +
            (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "arrowTop", !showOnTop);
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "arrowBottom", showOnTop);
        if (self.config.inline)
            return;
        var left = window.pageXOffset + inputBounds.left;
        var isCenter = false;
        var isRight = false;
        if (configPosHorizontal === "center") {
            left -= (calendarWidth - inputBounds.width) / 2;
            isCenter = true;
        }
        else if (configPosHorizontal === "right") {
            left -= calendarWidth - inputBounds.width;
            isRight = true;
        }
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "arrowLeft", !isCenter && !isRight);
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "arrowCenter", isCenter);
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "arrowRight", isRight);
        var right = window.document.body.offsetWidth -
            (window.pageXOffset + inputBounds.right);
        var rightMost = left + calendarWidth > window.document.body.offsetWidth;
        var centerMost = right + calendarWidth > window.document.body.offsetWidth;
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "rightMost", rightMost);
        if (self.config.static)
            return;
        self.calendarContainer.style.top = top + "px";
        if (!rightMost) {
            self.calendarContainer.style.left = left + "px";
            self.calendarContainer.style.right = "auto";
        }
        else if (!centerMost) {
            self.calendarContainer.style.left = "auto";
            self.calendarContainer.style.right = right + "px";
        }
        else {
            var doc = getDocumentStyleSheet();
            if (doc === undefined)
                return;
            var bodyWidth = window.document.body.offsetWidth;
            var centerLeft = Math.max(0, bodyWidth / 2 - calendarWidth / 2);
            var centerBefore = ".flatpickr-calendar.centerMost:before";
            var centerAfter = ".flatpickr-calendar.centerMost:after";
            var centerIndex = doc.cssRules.length;
            var centerStyle = "{left:" + inputBounds.left + "px;right:auto;}";
            (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "rightMost", false);
            (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "centerMost", true);
            doc.insertRule(centerBefore + "," + centerAfter + centerStyle, centerIndex);
            self.calendarContainer.style.left = centerLeft + "px";
            self.calendarContainer.style.right = "auto";
        }
    }
    function getDocumentStyleSheet() {
        var editableSheet = null;
        for (var i = 0; i < document.styleSheets.length; i++) {
            var sheet = document.styleSheets[i];
            if (!sheet.cssRules)
                continue;
            try {
                sheet.cssRules;
            }
            catch (err) {
                continue;
            }
            editableSheet = sheet;
            break;
        }
        return editableSheet != null ? editableSheet : createStyleSheet();
    }
    function createStyleSheet() {
        var style = document.createElement("style");
        document.head.appendChild(style);
        return style.sheet;
    }
    function redraw() {
        if (self.config.noCalendar || self.isMobile)
            return;
        buildMonthSwitch();
        updateNavigationCurrentMonth();
        buildDays();
    }
    function focusAndClose() {
        self._input.focus();
        if (window.navigator.userAgent.indexOf("MSIE") !== -1 ||
            navigator.msMaxTouchPoints !== undefined) {
            setTimeout(self.close, 0);
        }
        else {
            self.close();
        }
    }
    function selectDate(e) {
        e.preventDefault();
        e.stopPropagation();
        var isSelectable = function (day) {
            return day.classList &&
                day.classList.contains("flatpickr-day") &&
                !day.classList.contains("flatpickr-disabled") &&
                !day.classList.contains("notAllowed");
        };
        var t = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.findParent)((0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e), isSelectable);
        if (t === undefined)
            return;
        var target = t;
        var selectedDate = (self.latestSelectedDateObj = new Date(target.dateObj.getTime()));
        var shouldChangeMonth = (selectedDate.getMonth() < self.currentMonth ||
            selectedDate.getMonth() >
                self.currentMonth + self.config.showMonths - 1) &&
            self.config.mode !== "range";
        self.selectedDateElem = target;
        if (self.config.mode === "single")
            self.selectedDates = [selectedDate];
        else if (self.config.mode === "multiple") {
            var selectedIndex = isDateSelected(selectedDate);
            if (selectedIndex)
                self.selectedDates.splice(parseInt(selectedIndex), 1);
            else
                self.selectedDates.push(selectedDate);
        }
        else if (self.config.mode === "range") {
            if (self.selectedDates.length === 2) {
                self.clear(false, false);
            }
            self.latestSelectedDateObj = selectedDate;
            self.selectedDates.push(selectedDate);
            if ((0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(selectedDate, self.selectedDates[0], true) !== 0)
                self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
        }
        setHoursFromInputs();
        if (shouldChangeMonth) {
            var isNewYear = self.currentYear !== selectedDate.getFullYear();
            self.currentYear = selectedDate.getFullYear();
            self.currentMonth = selectedDate.getMonth();
            if (isNewYear) {
                triggerEvent("onYearChange");
                buildMonthSwitch();
            }
            triggerEvent("onMonthChange");
        }
        updateNavigationCurrentMonth();
        buildDays();
        updateValue();
        if (!shouldChangeMonth &&
            self.config.mode !== "range" &&
            self.config.showMonths === 1)
            focusOnDayElem(target);
        else if (self.selectedDateElem !== undefined &&
            self.hourElement === undefined) {
            self.selectedDateElem && self.selectedDateElem.focus();
        }
        if (self.hourElement !== undefined)
            self.hourElement !== undefined && self.hourElement.focus();
        if (self.config.closeOnSelect) {
            var single = self.config.mode === "single" && !self.config.enableTime;
            var range = self.config.mode === "range" &&
                self.selectedDates.length === 2 &&
                !self.config.enableTime;
            if (single || range) {
                focusAndClose();
            }
        }
        triggerChange();
    }
    var CALLBACKS = {
        locale: [setupLocale, updateWeekdays],
        showMonths: [buildMonths, setCalendarWidth, buildWeekdays],
        minDate: [jumpToDate],
        maxDate: [jumpToDate],
        positionElement: [updatePositionElement],
        clickOpens: [
            function () {
                if (self.config.clickOpens === true) {
                    bind(self._input, "focus", self.open);
                    bind(self._input, "click", self.open);
                }
                else {
                    self._input.removeEventListener("focus", self.open);
                    self._input.removeEventListener("click", self.open);
                }
            },
        ],
    };
    function set(option, value) {
        if (option !== null && typeof option === "object") {
            Object.assign(self.config, option);
            for (var key in option) {
                if (CALLBACKS[key] !== undefined)
                    CALLBACKS[key].forEach(function (x) { return x(); });
            }
        }
        else {
            self.config[option] = value;
            if (CALLBACKS[option] !== undefined)
                CALLBACKS[option].forEach(function (x) { return x(); });
            else if (_types_options__WEBPACK_IMPORTED_MODULE_0__.HOOKS.indexOf(option) > -1)
                self.config[option] = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.arrayify)(value);
        }
        self.redraw();
        updateValue(true);
    }
    function setSelectedDate(inputDate, format) {
        var dates = [];
        if (inputDate instanceof Array)
            dates = inputDate.map(function (d) { return self.parseDate(d, format); });
        else if (inputDate instanceof Date || typeof inputDate === "number")
            dates = [self.parseDate(inputDate, format)];
        else if (typeof inputDate === "string") {
            switch (self.config.mode) {
                case "single":
                case "time":
                    dates = [self.parseDate(inputDate, format)];
                    break;
                case "multiple":
                    dates = inputDate
                        .split(self.config.conjunction)
                        .map(function (date) { return self.parseDate(date, format); });
                    break;
                case "range":
                    dates = inputDate
                        .split(self.l10n.rangeSeparator)
                        .map(function (date) { return self.parseDate(date, format); });
                    break;
                default:
                    break;
            }
        }
        else
            self.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(inputDate)));
        self.selectedDates = (self.config.allowInvalidPreload
            ? dates
            : dates.filter(function (d) { return d instanceof Date && isEnabled(d, false); }));
        if (self.config.mode === "range")
            self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
    }
    function setDate(date, triggerChange, format) {
        if (triggerChange === void 0) { triggerChange = false; }
        if (format === void 0) { format = self.config.dateFormat; }
        if ((date !== 0 && !date) || (date instanceof Array && date.length === 0))
            return self.clear(triggerChange);
        setSelectedDate(date, format);
        self.latestSelectedDateObj =
            self.selectedDates[self.selectedDates.length - 1];
        self.redraw();
        jumpToDate(undefined, triggerChange);
        setHoursFromDate();
        if (self.selectedDates.length === 0) {
            self.clear(false);
        }
        updateValue(triggerChange);
        if (triggerChange)
            triggerEvent("onChange");
    }
    function parseDateRules(arr) {
        return arr
            .slice()
            .map(function (rule) {
            if (typeof rule === "string" ||
                typeof rule === "number" ||
                rule instanceof Date) {
                return self.parseDate(rule, undefined, true);
            }
            else if (rule &&
                typeof rule === "object" &&
                rule.from &&
                rule.to)
                return {
                    from: self.parseDate(rule.from, undefined),
                    to: self.parseDate(rule.to, undefined),
                };
            return rule;
        })
            .filter(function (x) { return x; });
    }
    function setupDates() {
        self.selectedDates = [];
        self.now = self.parseDate(self.config.now) || new Date();
        var preloadedDate = self.config.defaultDate ||
            ((self.input.nodeName === "INPUT" ||
                self.input.nodeName === "TEXTAREA") &&
                self.input.placeholder &&
                self.input.value === self.input.placeholder
                ? null
                : self.input.value);
        if (preloadedDate)
            setSelectedDate(preloadedDate, self.config.dateFormat);
        self._initialDate =
            self.selectedDates.length > 0
                ? self.selectedDates[0]
                : self.config.minDate &&
                    self.config.minDate.getTime() > self.now.getTime()
                    ? self.config.minDate
                    : self.config.maxDate &&
                        self.config.maxDate.getTime() < self.now.getTime()
                        ? self.config.maxDate
                        : self.now;
        self.currentYear = self._initialDate.getFullYear();
        self.currentMonth = self._initialDate.getMonth();
        if (self.selectedDates.length > 0)
            self.latestSelectedDateObj = self.selectedDates[0];
        if (self.config.minTime !== undefined)
            self.config.minTime = self.parseDate(self.config.minTime, "H:i");
        if (self.config.maxTime !== undefined)
            self.config.maxTime = self.parseDate(self.config.maxTime, "H:i");
        self.minDateHasTime =
            !!self.config.minDate &&
                (self.config.minDate.getHours() > 0 ||
                    self.config.minDate.getMinutes() > 0 ||
                    self.config.minDate.getSeconds() > 0);
        self.maxDateHasTime =
            !!self.config.maxDate &&
                (self.config.maxDate.getHours() > 0 ||
                    self.config.maxDate.getMinutes() > 0 ||
                    self.config.maxDate.getSeconds() > 0);
    }
    function setupInputs() {
        self.input = getInputElem();
        if (!self.input) {
            self.config.errorHandler(new Error("Invalid input element specified"));
            return;
        }
        self.input._type = self.input.type;
        self.input.type = "text";
        self.input.classList.add("flatpickr-input");
        self._input = self.input;
        if (self.config.altInput) {
            self.altInput = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)(self.input.nodeName, self.config.altInputClass);
            self._input = self.altInput;
            self.altInput.placeholder = self.input.placeholder;
            self.altInput.disabled = self.input.disabled;
            self.altInput.required = self.input.required;
            self.altInput.tabIndex = self.input.tabIndex;
            self.altInput.type = "text";
            self.input.setAttribute("type", "hidden");
            if (!self.config.static && self.input.parentNode)
                self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
        }
        if (!self.config.allowInput)
            self._input.setAttribute("readonly", "readonly");
        updatePositionElement();
    }
    function updatePositionElement() {
        self._positionElement = self.config.positionElement || self._input;
    }
    function setupMobile() {
        var inputType = self.config.enableTime
            ? self.config.noCalendar
                ? "time"
                : "datetime-local"
            : "date";
        self.mobileInput = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("input", self.input.className + " flatpickr-mobile");
        self.mobileInput.tabIndex = 1;
        self.mobileInput.type = inputType;
        self.mobileInput.disabled = self.input.disabled;
        self.mobileInput.required = self.input.required;
        self.mobileInput.placeholder = self.input.placeholder;
        self.mobileFormatStr =
            inputType === "datetime-local"
                ? "Y-m-d\\TH:i:S"
                : inputType === "date"
                    ? "Y-m-d"
                    : "H:i:S";
        if (self.selectedDates.length > 0) {
            self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
        }
        if (self.config.minDate)
            self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
        if (self.config.maxDate)
            self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
        if (self.input.getAttribute("step"))
            self.mobileInput.step = String(self.input.getAttribute("step"));
        self.input.type = "hidden";
        if (self.altInput !== undefined)
            self.altInput.type = "hidden";
        try {
            if (self.input.parentNode)
                self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
        }
        catch (_a) { }
        bind(self.mobileInput, "change", function (e) {
            self.setDate((0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e).value, false, self.mobileFormatStr);
            triggerEvent("onChange");
            triggerEvent("onClose");
        });
    }
    function toggle(e) {
        if (self.isOpen === true)
            return self.close();
        self.open(e);
    }
    function triggerEvent(event, data) {
        if (self.config === undefined)
            return;
        var hooks = self.config[event];
        if (hooks !== undefined && hooks.length > 0) {
            for (var i = 0; hooks[i] && i < hooks.length; i++)
                hooks[i](self.selectedDates, self.input.value, self, data);
        }
        if (event === "onChange") {
            self.input.dispatchEvent(createEvent("change"));
            self.input.dispatchEvent(createEvent("input"));
        }
    }
    function createEvent(name) {
        var e = document.createEvent("Event");
        e.initEvent(name, true, true);
        return e;
    }
    function isDateSelected(date) {
        for (var i = 0; i < self.selectedDates.length; i++) {
            var selectedDate = self.selectedDates[i];
            if (selectedDate instanceof Date &&
                (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(selectedDate, date) === 0)
                return "" + i;
        }
        return false;
    }
    function isDateInRange(date) {
        if (self.config.mode !== "range" || self.selectedDates.length < 2)
            return false;
        return ((0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(date, self.selectedDates[0]) >= 0 &&
            (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(date, self.selectedDates[1]) <= 0);
    }
    function updateNavigationCurrentMonth() {
        if (self.config.noCalendar || self.isMobile || !self.monthNav)
            return;
        self.yearElements.forEach(function (yearElement, i) {
            var d = new Date(self.currentYear, self.currentMonth, 1);
            d.setMonth(self.currentMonth + i);
            if (self.config.showMonths > 1 ||
                self.config.monthSelectorType === "static") {
                self.monthElements[i].textContent =
                    (0,_utils_formatting__WEBPACK_IMPORTED_MODULE_5__.monthToStr)(d.getMonth(), self.config.shorthandCurrentMonth, self.l10n) + " ";
            }
            else {
                self.monthsDropdownContainer.value = d.getMonth().toString();
            }
            yearElement.value = d.getFullYear().toString();
        });
        self._hidePrevMonthArrow =
            self.config.minDate !== undefined &&
                (self.currentYear === self.config.minDate.getFullYear()
                    ? self.currentMonth <= self.config.minDate.getMonth()
                    : self.currentYear < self.config.minDate.getFullYear());
        self._hideNextMonthArrow =
            self.config.maxDate !== undefined &&
                (self.currentYear === self.config.maxDate.getFullYear()
                    ? self.currentMonth + 1 > self.config.maxDate.getMonth()
                    : self.currentYear > self.config.maxDate.getFullYear());
    }
    function getDateStr(specificFormat) {
        var format = specificFormat ||
            (self.config.altInput ? self.config.altFormat : self.config.dateFormat);
        return self.selectedDates
            .map(function (dObj) { return self.formatDate(dObj, format); })
            .filter(function (d, i, arr) {
            return self.config.mode !== "range" ||
                self.config.enableTime ||
                arr.indexOf(d) === i;
        })
            .join(self.config.mode !== "range"
            ? self.config.conjunction
            : self.l10n.rangeSeparator);
    }
    function updateValue(triggerChange) {
        if (triggerChange === void 0) { triggerChange = true; }
        if (self.mobileInput !== undefined && self.mobileFormatStr) {
            self.mobileInput.value =
                self.latestSelectedDateObj !== undefined
                    ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr)
                    : "";
        }
        self.input.value = getDateStr(self.config.dateFormat);
        if (self.altInput !== undefined) {
            self.altInput.value = getDateStr(self.config.altFormat);
        }
        if (triggerChange !== false)
            triggerEvent("onValueUpdate");
    }
    function onMonthNavClick(e) {
        var eventTarget = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e);
        var isPrevMonth = self.prevMonthNav.contains(eventTarget);
        var isNextMonth = self.nextMonthNav.contains(eventTarget);
        if (isPrevMonth || isNextMonth) {
            changeMonth(isPrevMonth ? -1 : 1);
        }
        else if (self.yearElements.indexOf(eventTarget) >= 0) {
            eventTarget.select();
        }
        else if (eventTarget.classList.contains("arrowUp")) {
            self.changeYear(self.currentYear + 1);
        }
        else if (eventTarget.classList.contains("arrowDown")) {
            self.changeYear(self.currentYear - 1);
        }
    }
    function timeWrapper(e) {
        e.preventDefault();
        var isKeyDown = e.type === "keydown", eventTarget = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e), input = eventTarget;
        if (self.amPM !== undefined && eventTarget === self.amPM) {
            self.amPM.textContent =
                self.l10n.amPM[(0,_utils__WEBPACK_IMPORTED_MODULE_2__.int)(self.amPM.textContent === self.l10n.amPM[0])];
        }
        var min = parseFloat(input.getAttribute("min")), max = parseFloat(input.getAttribute("max")), step = parseFloat(input.getAttribute("step")), curValue = parseInt(input.value, 10), delta = e.delta ||
            (isKeyDown ? (e.which === 38 ? 1 : -1) : 0);
        var newValue = curValue + step * delta;
        if (typeof input.value !== "undefined" && input.value.length === 2) {
            var isHourElem = input === self.hourElement, isMinuteElem = input === self.minuteElement;
            if (newValue < min) {
                newValue =
                    max +
                        newValue +
                        (0,_utils__WEBPACK_IMPORTED_MODULE_2__.int)(!isHourElem) +
                        ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.int)(isHourElem) && (0,_utils__WEBPACK_IMPORTED_MODULE_2__.int)(!self.amPM));
                if (isMinuteElem)
                    incrementNumInput(undefined, -1, self.hourElement);
            }
            else if (newValue > max) {
                newValue =
                    input === self.hourElement ? newValue - max - (0,_utils__WEBPACK_IMPORTED_MODULE_2__.int)(!self.amPM) : min;
                if (isMinuteElem)
                    incrementNumInput(undefined, 1, self.hourElement);
            }
            if (self.amPM &&
                isHourElem &&
                (step === 1
                    ? newValue + curValue === 23
                    : Math.abs(newValue - curValue) > step)) {
                self.amPM.textContent =
                    self.l10n.amPM[(0,_utils__WEBPACK_IMPORTED_MODULE_2__.int)(self.amPM.textContent === self.l10n.amPM[0])];
            }
            input.value = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.pad)(newValue);
        }
    }
    init();
    return self;
}
function _flatpickr(nodeList, config) {
    var nodes = Array.prototype.slice
        .call(nodeList)
        .filter(function (x) { return x instanceof HTMLElement; });
    var instances = [];
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        try {
            if (node.getAttribute("data-fp-omit") !== null)
                continue;
            if (node._flatpickr !== undefined) {
                node._flatpickr.destroy();
                node._flatpickr = undefined;
            }
            node._flatpickr = FlatpickrInstance(node, config || {});
            instances.push(node._flatpickr);
        }
        catch (e) {
            console.error(e);
        }
    }
    return instances.length === 1 ? instances[0] : instances;
}
if (typeof HTMLElement !== "undefined" &&
    typeof HTMLCollection !== "undefined" &&
    typeof NodeList !== "undefined") {
    HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (config) {
        return _flatpickr(this, config);
    };
    HTMLElement.prototype.flatpickr = function (config) {
        return _flatpickr([this], config);
    };
}
var flatpickr = function (selector, config) {
    if (typeof selector === "string") {
        return _flatpickr(window.document.querySelectorAll(selector), config);
    }
    else if (selector instanceof Node) {
        return _flatpickr([selector], config);
    }
    else {
        return _flatpickr(selector, config);
    }
};
flatpickr.defaultConfig = {};
flatpickr.l10ns = {
    en: __assign({}, _l10n_default__WEBPACK_IMPORTED_MODULE_1__["default"]),
    default: __assign({}, _l10n_default__WEBPACK_IMPORTED_MODULE_1__["default"]),
};
flatpickr.localize = function (l10n) {
    flatpickr.l10ns.default = __assign(__assign({}, flatpickr.l10ns.default), l10n);
};
flatpickr.setDefaults = function (config) {
    flatpickr.defaultConfig = __assign(__assign({}, flatpickr.defaultConfig), config);
};
flatpickr.parseDate = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.createDateParser)({});
flatpickr.formatDate = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.createDateFormatter)({});
flatpickr.compareDates = _utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates;
if (typeof jQuery !== "undefined" && typeof jQuery.fn !== "undefined") {
    jQuery.fn.flatpickr = function (config) {
        return _flatpickr(this, config);
    };
}
Date.prototype.fp_incr = function (days) {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
};
if (typeof window !== "undefined") {
    window.flatpickr = flatpickr;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (flatpickr);


/***/ }),

/***/ "./node_modules/flatpickr/dist/esm/l10n/default.js":
/*!*********************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/l10n/default.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   english: () => (/* binding */ english)
/* harmony export */ });
var english = {
    weekdays: {
        shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        longhand: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ],
    },
    months: {
        shorthand: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        longhand: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
    },
    daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    firstDayOfWeek: 0,
    ordinal: function (nth) {
        var s = nth % 100;
        if (s > 3 && s < 21)
            return "th";
        switch (s % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    },
    rangeSeparator: " to ",
    weekAbbreviation: "Wk",
    scrollTitle: "Scroll to increment",
    toggleTitle: "Click to toggle",
    amPM: ["AM", "PM"],
    yearAriaLabel: "Year",
    monthAriaLabel: "Month",
    hourAriaLabel: "Hour",
    minuteAriaLabel: "Minute",
    time_24hr: false,
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (english);


/***/ }),

/***/ "./node_modules/flatpickr/dist/esm/types/options.js":
/*!**********************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/types/options.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HOOKS: () => (/* binding */ HOOKS),
/* harmony export */   defaults: () => (/* binding */ defaults)
/* harmony export */ });
var HOOKS = [
    "onChange",
    "onClose",
    "onDayCreate",
    "onDestroy",
    "onKeyDown",
    "onMonthChange",
    "onOpen",
    "onParseConfig",
    "onReady",
    "onValueUpdate",
    "onYearChange",
    "onPreCalendarPosition",
];
var defaults = {
    _disable: [],
    allowInput: false,
    allowInvalidPreload: false,
    altFormat: "F j, Y",
    altInput: false,
    altInputClass: "form-control input",
    animate: typeof window === "object" &&
        window.navigator.userAgent.indexOf("MSIE") === -1,
    ariaDateFormat: "F j, Y",
    autoFillDefaultTime: true,
    clickOpens: true,
    closeOnSelect: true,
    conjunction: ", ",
    dateFormat: "Y-m-d",
    defaultHour: 12,
    defaultMinute: 0,
    defaultSeconds: 0,
    disable: [],
    disableMobile: false,
    enableSeconds: false,
    enableTime: false,
    errorHandler: function (err) {
        return typeof console !== "undefined" && console.warn(err);
    },
    getWeek: function (givenDate) {
        var date = new Date(givenDate.getTime());
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
        var week1 = new Date(date.getFullYear(), 0, 4);
        return (1 +
            Math.round(((date.getTime() - week1.getTime()) / 86400000 -
                3 +
                ((week1.getDay() + 6) % 7)) /
                7));
    },
    hourIncrement: 1,
    ignoredFocusElements: [],
    inline: false,
    locale: "default",
    minuteIncrement: 5,
    mode: "single",
    monthSelectorType: "dropdown",
    nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
    noCalendar: false,
    now: new Date(),
    onChange: [],
    onClose: [],
    onDayCreate: [],
    onDestroy: [],
    onKeyDown: [],
    onMonthChange: [],
    onOpen: [],
    onParseConfig: [],
    onReady: [],
    onValueUpdate: [],
    onYearChange: [],
    onPreCalendarPosition: [],
    plugins: [],
    position: "auto",
    positionElement: undefined,
    prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
    shorthandCurrentMonth: false,
    showMonths: 1,
    static: false,
    time_24hr: false,
    weekNumbers: false,
    wrap: false,
};


/***/ }),

/***/ "./node_modules/flatpickr/dist/esm/utils/dates.js":
/*!********************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/utils/dates.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateSecondsSinceMidnight: () => (/* binding */ calculateSecondsSinceMidnight),
/* harmony export */   compareDates: () => (/* binding */ compareDates),
/* harmony export */   compareTimes: () => (/* binding */ compareTimes),
/* harmony export */   createDateFormatter: () => (/* binding */ createDateFormatter),
/* harmony export */   createDateParser: () => (/* binding */ createDateParser),
/* harmony export */   duration: () => (/* binding */ duration),
/* harmony export */   getDefaultHours: () => (/* binding */ getDefaultHours),
/* harmony export */   isBetween: () => (/* binding */ isBetween),
/* harmony export */   parseSeconds: () => (/* binding */ parseSeconds)
/* harmony export */ });
/* harmony import */ var _formatting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formatting */ "./node_modules/flatpickr/dist/esm/utils/formatting.js");
/* harmony import */ var _types_options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types/options */ "./node_modules/flatpickr/dist/esm/types/options.js");
/* harmony import */ var _l10n_default__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../l10n/default */ "./node_modules/flatpickr/dist/esm/l10n/default.js");



var createDateFormatter = function (_a) {
    var _b = _a.config, config = _b === void 0 ? _types_options__WEBPACK_IMPORTED_MODULE_1__.defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? _l10n_default__WEBPACK_IMPORTED_MODULE_2__.english : _c, _d = _a.isMobile, isMobile = _d === void 0 ? false : _d;
    return function (dateObj, frmt, overrideLocale) {
        var locale = overrideLocale || l10n;
        if (config.formatDate !== undefined && !isMobile) {
            return config.formatDate(dateObj, frmt, locale);
        }
        return frmt
            .split("")
            .map(function (c, i, arr) {
            return _formatting__WEBPACK_IMPORTED_MODULE_0__.formats[c] && arr[i - 1] !== "\\"
                ? _formatting__WEBPACK_IMPORTED_MODULE_0__.formats[c](dateObj, locale, config)
                : c !== "\\"
                    ? c
                    : "";
        })
            .join("");
    };
};
var createDateParser = function (_a) {
    var _b = _a.config, config = _b === void 0 ? _types_options__WEBPACK_IMPORTED_MODULE_1__.defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? _l10n_default__WEBPACK_IMPORTED_MODULE_2__.english : _c;
    return function (date, givenFormat, timeless, customLocale) {
        if (date !== 0 && !date)
            return undefined;
        var locale = customLocale || l10n;
        var parsedDate;
        var dateOrig = date;
        if (date instanceof Date)
            parsedDate = new Date(date.getTime());
        else if (typeof date !== "string" &&
            date.toFixed !== undefined)
            parsedDate = new Date(date);
        else if (typeof date === "string") {
            var format = givenFormat || (config || _types_options__WEBPACK_IMPORTED_MODULE_1__.defaults).dateFormat;
            var datestr = String(date).trim();
            if (datestr === "today") {
                parsedDate = new Date();
                timeless = true;
            }
            else if (config && config.parseDate) {
                parsedDate = config.parseDate(date, format);
            }
            else if (/Z$/.test(datestr) ||
                /GMT$/.test(datestr)) {
                parsedDate = new Date(date);
            }
            else {
                var matched = void 0, ops = [];
                for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
                    var token = format[i];
                    var isBackSlash = token === "\\";
                    var escaped = format[i - 1] === "\\" || isBackSlash;
                    if (_formatting__WEBPACK_IMPORTED_MODULE_0__.tokenRegex[token] && !escaped) {
                        regexStr += _formatting__WEBPACK_IMPORTED_MODULE_0__.tokenRegex[token];
                        var match = new RegExp(regexStr).exec(date);
                        if (match && (matched = true)) {
                            ops[token !== "Y" ? "push" : "unshift"]({
                                fn: _formatting__WEBPACK_IMPORTED_MODULE_0__.revFormat[token],
                                val: match[++matchIndex],
                            });
                        }
                    }
                    else if (!isBackSlash)
                        regexStr += ".";
                }
                parsedDate =
                    !config || !config.noCalendar
                        ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
                        : new Date(new Date().setHours(0, 0, 0, 0));
                ops.forEach(function (_a) {
                    var fn = _a.fn, val = _a.val;
                    return (parsedDate = fn(parsedDate, val, locale) || parsedDate);
                });
                parsedDate = matched ? parsedDate : undefined;
            }
        }
        if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
            config.errorHandler(new Error("Invalid date provided: " + dateOrig));
            return undefined;
        }
        if (timeless === true)
            parsedDate.setHours(0, 0, 0, 0);
        return parsedDate;
    };
};
function compareDates(date1, date2, timeless) {
    if (timeless === void 0) { timeless = true; }
    if (timeless !== false) {
        return (new Date(date1.getTime()).setHours(0, 0, 0, 0) -
            new Date(date2.getTime()).setHours(0, 0, 0, 0));
    }
    return date1.getTime() - date2.getTime();
}
function compareTimes(date1, date2) {
    return (3600 * (date1.getHours() - date2.getHours()) +
        60 * (date1.getMinutes() - date2.getMinutes()) +
        date1.getSeconds() -
        date2.getSeconds());
}
var isBetween = function (ts, ts1, ts2) {
    return ts > Math.min(ts1, ts2) && ts < Math.max(ts1, ts2);
};
var calculateSecondsSinceMidnight = function (hours, minutes, seconds) {
    return hours * 3600 + minutes * 60 + seconds;
};
var parseSeconds = function (secondsSinceMidnight) {
    var hours = Math.floor(secondsSinceMidnight / 3600), minutes = (secondsSinceMidnight - hours * 3600) / 60;
    return [hours, minutes, secondsSinceMidnight - hours * 3600 - minutes * 60];
};
var duration = {
    DAY: 86400000,
};
function getDefaultHours(config) {
    var hours = config.defaultHour;
    var minutes = config.defaultMinute;
    var seconds = config.defaultSeconds;
    if (config.minDate !== undefined) {
        var minHour = config.minDate.getHours();
        var minMinutes = config.minDate.getMinutes();
        var minSeconds = config.minDate.getSeconds();
        if (hours < minHour) {
            hours = minHour;
        }
        if (hours === minHour && minutes < minMinutes) {
            minutes = minMinutes;
        }
        if (hours === minHour && minutes === minMinutes && seconds < minSeconds)
            seconds = config.minDate.getSeconds();
    }
    if (config.maxDate !== undefined) {
        var maxHr = config.maxDate.getHours();
        var maxMinutes = config.maxDate.getMinutes();
        hours = Math.min(hours, maxHr);
        if (hours === maxHr)
            minutes = Math.min(maxMinutes, minutes);
        if (hours === maxHr && minutes === maxMinutes)
            seconds = config.maxDate.getSeconds();
    }
    return { hours: hours, minutes: minutes, seconds: seconds };
}


/***/ }),

/***/ "./node_modules/flatpickr/dist/esm/utils/dom.js":
/*!******************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/utils/dom.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearNode: () => (/* binding */ clearNode),
/* harmony export */   createElement: () => (/* binding */ createElement),
/* harmony export */   createNumberInput: () => (/* binding */ createNumberInput),
/* harmony export */   findParent: () => (/* binding */ findParent),
/* harmony export */   getEventTarget: () => (/* binding */ getEventTarget),
/* harmony export */   toggleClass: () => (/* binding */ toggleClass)
/* harmony export */ });
function toggleClass(elem, className, bool) {
    if (bool === true)
        return elem.classList.add(className);
    elem.classList.remove(className);
}
function createElement(tag, className, content) {
    var e = window.document.createElement(tag);
    className = className || "";
    content = content || "";
    e.className = className;
    if (content !== undefined)
        e.textContent = content;
    return e;
}
function clearNode(node) {
    while (node.firstChild)
        node.removeChild(node.firstChild);
}
function findParent(node, condition) {
    if (condition(node))
        return node;
    else if (node.parentNode)
        return findParent(node.parentNode, condition);
    return undefined;
}
function createNumberInput(inputClassName, opts) {
    var wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
    if (navigator.userAgent.indexOf("MSIE 9.0") === -1) {
        numInput.type = "number";
    }
    else {
        numInput.type = "text";
        numInput.pattern = "\\d*";
    }
    if (opts !== undefined)
        for (var key in opts)
            numInput.setAttribute(key, opts[key]);
    wrapper.appendChild(numInput);
    wrapper.appendChild(arrowUp);
    wrapper.appendChild(arrowDown);
    return wrapper;
}
function getEventTarget(event) {
    try {
        if (typeof event.composedPath === "function") {
            var path = event.composedPath();
            return path[0];
        }
        return event.target;
    }
    catch (error) {
        return event.target;
    }
}


/***/ }),

/***/ "./node_modules/flatpickr/dist/esm/utils/formatting.js":
/*!*************************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/utils/formatting.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formats: () => (/* binding */ formats),
/* harmony export */   monthToStr: () => (/* binding */ monthToStr),
/* harmony export */   revFormat: () => (/* binding */ revFormat),
/* harmony export */   tokenRegex: () => (/* binding */ tokenRegex)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./node_modules/flatpickr/dist/esm/utils/index.js");

var doNothing = function () { return undefined; };
var monthToStr = function (monthNumber, shorthand, locale) { return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber]; };
var revFormat = {
    D: doNothing,
    F: function (dateObj, monthName, locale) {
        dateObj.setMonth(locale.months.longhand.indexOf(monthName));
    },
    G: function (dateObj, hour) {
        dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
    },
    H: function (dateObj, hour) {
        dateObj.setHours(parseFloat(hour));
    },
    J: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    K: function (dateObj, amPM, locale) {
        dateObj.setHours((dateObj.getHours() % 12) +
            12 * (0,_utils__WEBPACK_IMPORTED_MODULE_0__.int)(new RegExp(locale.amPM[1], "i").test(amPM)));
    },
    M: function (dateObj, shortMonth, locale) {
        dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
    },
    S: function (dateObj, seconds) {
        dateObj.setSeconds(parseFloat(seconds));
    },
    U: function (_, unixSeconds) { return new Date(parseFloat(unixSeconds) * 1000); },
    W: function (dateObj, weekNum, locale) {
        var weekNumber = parseInt(weekNum);
        var date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
        date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);
        return date;
    },
    Y: function (dateObj, year) {
        dateObj.setFullYear(parseFloat(year));
    },
    Z: function (_, ISODate) { return new Date(ISODate); },
    d: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    h: function (dateObj, hour) {
        dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
    },
    i: function (dateObj, minutes) {
        dateObj.setMinutes(parseFloat(minutes));
    },
    j: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    l: doNothing,
    m: function (dateObj, month) {
        dateObj.setMonth(parseFloat(month) - 1);
    },
    n: function (dateObj, month) {
        dateObj.setMonth(parseFloat(month) - 1);
    },
    s: function (dateObj, seconds) {
        dateObj.setSeconds(parseFloat(seconds));
    },
    u: function (_, unixMillSeconds) {
        return new Date(parseFloat(unixMillSeconds));
    },
    w: doNothing,
    y: function (dateObj, year) {
        dateObj.setFullYear(2000 + parseFloat(year));
    },
};
var tokenRegex = {
    D: "",
    F: "",
    G: "(\\d\\d|\\d)",
    H: "(\\d\\d|\\d)",
    J: "(\\d\\d|\\d)\\w+",
    K: "",
    M: "",
    S: "(\\d\\d|\\d)",
    U: "(.+)",
    W: "(\\d\\d|\\d)",
    Y: "(\\d{4})",
    Z: "(.+)",
    d: "(\\d\\d|\\d)",
    h: "(\\d\\d|\\d)",
    i: "(\\d\\d|\\d)",
    j: "(\\d\\d|\\d)",
    l: "",
    m: "(\\d\\d|\\d)",
    n: "(\\d\\d|\\d)",
    s: "(\\d\\d|\\d)",
    u: "(.+)",
    w: "(\\d\\d|\\d)",
    y: "(\\d{2})",
};
var formats = {
    Z: function (date) { return date.toISOString(); },
    D: function (date, locale, options) {
        return locale.weekdays.shorthand[formats.w(date, locale, options)];
    },
    F: function (date, locale, options) {
        return monthToStr(formats.n(date, locale, options) - 1, false, locale);
    },
    G: function (date, locale, options) {
        return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(formats.h(date, locale, options));
    },
    H: function (date) { return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getHours()); },
    J: function (date, locale) {
        return locale.ordinal !== undefined
            ? date.getDate() + locale.ordinal(date.getDate())
            : date.getDate();
    },
    K: function (date, locale) { return locale.amPM[(0,_utils__WEBPACK_IMPORTED_MODULE_0__.int)(date.getHours() > 11)]; },
    M: function (date, locale) {
        return monthToStr(date.getMonth(), true, locale);
    },
    S: function (date) { return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getSeconds()); },
    U: function (date) { return date.getTime() / 1000; },
    W: function (date, _, options) {
        return options.getWeek(date);
    },
    Y: function (date) { return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getFullYear(), 4); },
    d: function (date) { return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getDate()); },
    h: function (date) { return (date.getHours() % 12 ? date.getHours() % 12 : 12); },
    i: function (date) { return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getMinutes()); },
    j: function (date) { return date.getDate(); },
    l: function (date, locale) {
        return locale.weekdays.longhand[date.getDay()];
    },
    m: function (date) { return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getMonth() + 1); },
    n: function (date) { return date.getMonth() + 1; },
    s: function (date) { return date.getSeconds(); },
    u: function (date) { return date.getTime(); },
    w: function (date) { return date.getDay(); },
    y: function (date) { return String(date.getFullYear()).substring(2); },
};


/***/ }),

/***/ "./node_modules/flatpickr/dist/esm/utils/index.js":
/*!********************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/utils/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arrayify: () => (/* binding */ arrayify),
/* harmony export */   debounce: () => (/* binding */ debounce),
/* harmony export */   int: () => (/* binding */ int),
/* harmony export */   pad: () => (/* binding */ pad)
/* harmony export */ });
var pad = function (number, length) {
    if (length === void 0) { length = 2; }
    return ("000" + number).slice(length * -1);
};
var int = function (bool) { return (bool === true ? 1 : 0); };
function debounce(fn, wait) {
    var t;
    return function () {
        var _this = this;
        var args = arguments;
        clearTimeout(t);
        t = setTimeout(function () { return fn.apply(_this, args); }, wait);
    };
}
var arrayify = function (obj) {
    return obj instanceof Array ? obj : [obj];
};


/***/ }),

/***/ "./node_modules/flatpickr/dist/esm/utils/polyfills.js":
/*!************************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/utils/polyfills.js ***!
  \************************************************************/
/***/ (() => {

"use strict";

if (typeof Object.assign !== "function") {
    Object.assign = function (target) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!target) {
            throw TypeError("Cannot convert undefined or null to object");
        }
        var _loop_1 = function (source) {
            if (source) {
                Object.keys(source).forEach(function (key) { return (target[key] = source[key]); });
            }
        };
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var source = args_1[_a];
            _loop_1(source);
        }
        return target;
    };
}


/***/ }),

/***/ "./node_modules/joi/dist/joi-browser.min.js":
/*!**************************************************!*\
  !*** ./node_modules/joi/dist/joi-browser.min.js ***!
  \**************************************************/
/***/ ((module) => {

!function(e,t){ true?module.exports=t():0}(self,(()=>{return e={7629:(e,t,r)=>{"use strict";const s=r(375),n=r(8571),a=r(9474),i=r(1687),o=r(8652),l=r(8160),c=r(3292),u=r(6354),f=r(8901),h=r(9708),m=r(6914),d=r(2294),p=r(6133),g=r(1152),y=r(8863),b=r(2036),v={Base:class{constructor(e){this.type=e,this.$_root=null,this._definition={},this._reset()}_reset(){this._ids=new d.Ids,this._preferences=null,this._refs=new p.Manager,this._cache=null,this._valids=null,this._invalids=null,this._flags={},this._rules=[],this._singleRules=new Map,this.$_terms={},this.$_temp={ruleset:null,whens:{}}}describe(){return s("function"==typeof h.describe,"Manifest functionality disabled"),h.describe(this)}allow(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return l.verifyFlat(t,"allow"),this._values(t,"_valids")}alter(e){s(e&&"object"==typeof e&&!Array.isArray(e),"Invalid targets argument"),s(!this._inRuleset(),"Cannot set alterations inside a ruleset");const t=this.clone();t.$_terms.alterations=t.$_terms.alterations||[];for(const r in e){const n=e[r];s("function"==typeof n,"Alteration adjuster for",r,"must be a function"),t.$_terms.alterations.push({target:r,adjuster:n})}return t.$_temp.ruleset=!1,t}artifact(e){return s(void 0!==e,"Artifact cannot be undefined"),s(!this._cache,"Cannot set an artifact with a rule cache"),this.$_setFlag("artifact",e)}cast(e){return s(!1===e||"string"==typeof e,"Invalid to value"),s(!1===e||this._definition.cast[e],"Type",this.type,"does not support casting to",e),this.$_setFlag("cast",!1===e?void 0:e)}default(e,t){return this._default("default",e,t)}description(e){return s(e&&"string"==typeof e,"Description must be a non-empty string"),this.$_setFlag("description",e)}empty(e){const t=this.clone();return void 0!==e&&(e=t.$_compile(e,{override:!1})),t.$_setFlag("empty",e,{clone:!1})}error(e){return s(e,"Missing error"),s(e instanceof Error||"function"==typeof e,"Must provide a valid Error object or a function"),this.$_setFlag("error",e)}example(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return s(void 0!==e,"Missing example"),l.assertOptions(t,["override"]),this._inner("examples",e,{single:!0,override:t.override})}external(e,t){return"object"==typeof e&&(s(!t,"Cannot combine options with description"),t=e.description,e=e.method),s("function"==typeof e,"Method must be a function"),s(void 0===t||t&&"string"==typeof t,"Description must be a non-empty string"),this._inner("externals",{method:e,description:t},{single:!0})}failover(e,t){return this._default("failover",e,t)}forbidden(){return this.presence("forbidden")}id(e){return e?(s("string"==typeof e,"id must be a non-empty string"),s(/^[^\.]+$/.test(e),"id cannot contain period character"),this.$_setFlag("id",e)):this.$_setFlag("id",void 0)}invalid(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return this._values(t,"_invalids")}label(e){return s(e&&"string"==typeof e,"Label name must be a non-empty string"),this.$_setFlag("label",e)}meta(e){return s(void 0!==e,"Meta cannot be undefined"),this._inner("metas",e,{single:!0})}note(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];s(t.length,"Missing notes");for(const e of t)s(e&&"string"==typeof e,"Notes must be non-empty strings");return this._inner("notes",t)}only(){let e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return s("boolean"==typeof e,"Invalid mode:",e),this.$_setFlag("only",e)}optional(){return this.presence("optional")}prefs(e){s(e,"Missing preferences"),s(void 0===e.context,"Cannot override context"),s(void 0===e.externals,"Cannot override externals"),s(void 0===e.warnings,"Cannot override warnings"),s(void 0===e.debug,"Cannot override debug"),l.checkPreferences(e);const t=this.clone();return t._preferences=l.preferences(t._preferences,e),t}presence(e){return s(["optional","required","forbidden"].includes(e),"Unknown presence mode",e),this.$_setFlag("presence",e)}raw(){let e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return this.$_setFlag("result",e?"raw":void 0)}result(e){return s(["raw","strip"].includes(e),"Unknown result mode",e),this.$_setFlag("result",e)}required(){return this.presence("required")}strict(e){const t=this.clone(),r=void 0!==e&&!e;return t._preferences=l.preferences(t._preferences,{convert:r}),t}strip(){let e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return this.$_setFlag("result",e?"strip":void 0)}tag(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];s(t.length,"Missing tags");for(const e of t)s(e&&"string"==typeof e,"Tags must be non-empty strings");return this._inner("tags",t)}unit(e){return s(e&&"string"==typeof e,"Unit name must be a non-empty string"),this.$_setFlag("unit",e)}valid(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];l.verifyFlat(t,"valid");const s=this.allow(...t);return s.$_setFlag("only",!!s._valids,{clone:!1}),s}when(e,t){const r=this.clone();r.$_terms.whens||(r.$_terms.whens=[]);const n=c.when(r,e,t);if(!["any","link"].includes(r.type)){const e=n.is?[n]:n.switch;for(const t of e)s(!t.then||"any"===t.then.type||t.then.type===r.type,"Cannot combine",r.type,"with",t.then&&t.then.type),s(!t.otherwise||"any"===t.otherwise.type||t.otherwise.type===r.type,"Cannot combine",r.type,"with",t.otherwise&&t.otherwise.type)}return r.$_terms.whens.push(n),r.$_mutateRebuild()}cache(e){s(!this._inRuleset(),"Cannot set caching inside a ruleset"),s(!this._cache,"Cannot override schema cache"),s(void 0===this._flags.artifact,"Cannot cache a rule with an artifact");const t=this.clone();return t._cache=e||o.provider.provision(),t.$_temp.ruleset=!1,t}clone(){const e=Object.create(Object.getPrototypeOf(this));return this._assign(e)}concat(e){s(l.isSchema(e),"Invalid schema object"),s("any"===this.type||"any"===e.type||e.type===this.type,"Cannot merge type",this.type,"with another type:",e.type),s(!this._inRuleset(),"Cannot concatenate onto a schema with open ruleset"),s(!e._inRuleset(),"Cannot concatenate a schema with open ruleset");let t=this.clone();if("any"===this.type&&"any"!==e.type){const r=e.clone();for(const e of Object.keys(t))"type"!==e&&(r[e]=t[e]);t=r}t._ids.concat(e._ids),t._refs.register(e,p.toSibling),t._preferences=t._preferences?l.preferences(t._preferences,e._preferences):e._preferences,t._valids=b.merge(t._valids,e._valids,e._invalids),t._invalids=b.merge(t._invalids,e._invalids,e._valids);for(const r of e._singleRules.keys())t._singleRules.has(r)&&(t._rules=t._rules.filter((e=>e.keep||e.name!==r)),t._singleRules.delete(r));for(const r of e._rules)e._definition.rules[r.method].multi||t._singleRules.set(r.name,r),t._rules.push(r);if(t._flags.empty&&e._flags.empty){t._flags.empty=t._flags.empty.concat(e._flags.empty);const r=Object.assign({},e._flags);delete r.empty,i(t._flags,r)}else if(e._flags.empty){t._flags.empty=e._flags.empty;const r=Object.assign({},e._flags);delete r.empty,i(t._flags,r)}else i(t._flags,e._flags);for(const r in e.$_terms){const s=e.$_terms[r];s?t.$_terms[r]?t.$_terms[r]=t.$_terms[r].concat(s):t.$_terms[r]=s.slice():t.$_terms[r]||(t.$_terms[r]=s)}return this.$_root._tracer&&this.$_root._tracer._combine(t,[this,e]),t.$_mutateRebuild()}extend(e){return s(!e.base,"Cannot extend type with another base"),f.type(this,e)}extract(e){return e=Array.isArray(e)?e:e.split("."),this._ids.reach(e)}fork(e,t){s(!this._inRuleset(),"Cannot fork inside a ruleset");let r=this;for(let s of[].concat(e))s=Array.isArray(s)?s:s.split("."),r=r._ids.fork(s,t,r);return r.$_temp.ruleset=!1,r}rule(e){const t=this._definition;l.assertOptions(e,Object.keys(t.modifiers)),s(!1!==this.$_temp.ruleset,"Cannot apply rules to empty ruleset or the last rule added does not support rule properties");const r=null===this.$_temp.ruleset?this._rules.length-1:this.$_temp.ruleset;s(r>=0&&r<this._rules.length,"Cannot apply rules to empty ruleset");const a=this.clone();for(let i=r;i<a._rules.length;++i){const r=a._rules[i],o=n(r);for(const n in e)t.modifiers[n](o,e[n]),s(o.name===r.name,"Cannot change rule name");a._rules[i]=o,a._singleRules.get(o.name)===r&&a._singleRules.set(o.name,o)}return a.$_temp.ruleset=!1,a.$_mutateRebuild()}get ruleset(){s(!this._inRuleset(),"Cannot start a new ruleset without closing the previous one");const e=this.clone();return e.$_temp.ruleset=e._rules.length,e}get $(){return this.ruleset}tailor(e){e=[].concat(e),s(!this._inRuleset(),"Cannot tailor inside a ruleset");let t=this;if(this.$_terms.alterations)for(const{target:r,adjuster:n}of this.$_terms.alterations)e.includes(r)&&(t=n(t),s(l.isSchema(t),"Alteration adjuster for",r,"failed to return a schema object"));return t=t.$_modify({each:t=>t.tailor(e),ref:!1}),t.$_temp.ruleset=!1,t.$_mutateRebuild()}tracer(){return g.location?g.location(this):this}validate(e,t){return y.entry(e,this,t)}validateAsync(e,t){return y.entryAsync(e,this,t)}$_addRule(e){"string"==typeof e&&(e={name:e}),s(e&&"object"==typeof e,"Invalid options"),s(e.name&&"string"==typeof e.name,"Invalid rule name");for(const t in e)s("_"!==t[0],"Cannot set private rule properties");const t=Object.assign({},e);t._resolve=[],t.method=t.method||t.name;const r=this._definition.rules[t.method],n=t.args;s(r,"Unknown rule",t.method);const a=this.clone();if(n){s(1===Object.keys(n).length||Object.keys(n).length===this._definition.rules[t.name].args.length,"Invalid rule definition for",this.type,t.name);for(const e in n){let i=n[e];if(r.argsByName){const o=r.argsByName.get(e);if(o.ref&&l.isResolvable(i))t._resolve.push(e),a.$_mutateRegister(i);else if(o.normalize&&(i=o.normalize(i),n[e]=i),o.assert){const t=l.validateArg(i,e,o);s(!t,t,"or reference")}}void 0!==i?n[e]=i:delete n[e]}}return r.multi||(a._ruleRemove(t.name,{clone:!1}),a._singleRules.set(t.name,t)),!1===a.$_temp.ruleset&&(a.$_temp.ruleset=null),r.priority?a._rules.unshift(t):a._rules.push(t),a}$_compile(e,t){return c.schema(this.$_root,e,t)}$_createError(e,t,r,s,n){let a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{};const i=!1!==a.flags?this._flags:{},o=a.messages?m.merge(this._definition.messages,a.messages):this._definition.messages;return new u.Report(e,t,r,i,o,s,n)}$_getFlag(e){return this._flags[e]}$_getRule(e){return this._singleRules.get(e)}$_mapLabels(e){return e=Array.isArray(e)?e:e.split("."),this._ids.labels(e)}$_match(e,t,r,s){(r=Object.assign({},r)).abortEarly=!0,r._externals=!1,t.snapshot();const n=!y.validate(e,this,t,r,s).errors;return t.restore(),n}$_modify(e){return l.assertOptions(e,["each","once","ref","schema"]),d.schema(this,e)||this}$_mutateRebuild(){return s(!this._inRuleset(),"Cannot add this rule inside a ruleset"),this._refs.reset(),this._ids.reset(),this.$_modify({each:(e,t)=>{let{source:r,name:s,path:n,key:a}=t;const i=this._definition[r][s]&&this._definition[r][s].register;!1!==i&&this.$_mutateRegister(e,{family:i,key:a})}}),this._definition.rebuild&&this._definition.rebuild(this),this.$_temp.ruleset=!1,this}$_mutateRegister(e){let{family:t,key:r}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this._refs.register(e,t),this._ids.register(e,{key:r})}$_property(e){return this._definition.properties[e]}$_reach(e){return this._ids.reach(e)}$_rootReferences(){return this._refs.roots()}$_setFlag(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};s("_"===e[0]||!this._inRuleset(),"Cannot set flag inside a ruleset");const n=this._definition.flags[e]||{};if(a(t,n.default)&&(t=void 0),a(t,this._flags[e]))return this;const i=!1!==r.clone?this.clone():this;return void 0!==t?(i._flags[e]=t,i.$_mutateRegister(t)):delete i._flags[e],"_"!==e[0]&&(i.$_temp.ruleset=!1),i}$_parent(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),s=1;s<t;s++)r[s-1]=arguments[s];return this[e][l.symbols.parent].call(this,...r)}$_validate(e,t,r){return y.validate(e,this,t,r)}_assign(e){e.type=this.type,e.$_root=this.$_root,e.$_temp=Object.assign({},this.$_temp),e.$_temp.whens={},e._ids=this._ids.clone(),e._preferences=this._preferences,e._valids=this._valids&&this._valids.clone(),e._invalids=this._invalids&&this._invalids.clone(),e._rules=this._rules.slice(),e._singleRules=n(this._singleRules,{shallow:!0}),e._refs=this._refs.clone(),e._flags=Object.assign({},this._flags),e._cache=null,e.$_terms={};for(const t in this.$_terms)e.$_terms[t]=this.$_terms[t]?this.$_terms[t].slice():null;e.$_super={};for(const t in this.$_super)e.$_super[t]=this._super[t].bind(e);return e}_bare(){const e=this.clone();e._reset();const t=e._definition.terms;for(const r in t){const s=t[r];e.$_terms[r]=s.init}return e.$_mutateRebuild()}_default(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return l.assertOptions(r,"literal"),s(void 0!==t,"Missing",e,"value"),s("function"==typeof t||!r.literal,"Only function value supports literal option"),"function"==typeof t&&r.literal&&(t={[l.symbols.literal]:!0,literal:t}),this.$_setFlag(e,t)}_generate(e,t,r){if(!this.$_terms.whens)return{schema:this};const s=[],n=[];for(let a=0;a<this.$_terms.whens.length;++a){const i=this.$_terms.whens[a];if(i.concat){s.push(i.concat),n.push(`${a}.concat`);continue}const o=i.ref?i.ref.resolve(e,t,r):e,l=i.is?[i]:i.switch,c=n.length;for(let c=0;c<l.length;++c){const{is:u,then:f,otherwise:h}=l[c],m=`${a}${i.switch?"."+c:""}`;if(u.$_match(o,t.nest(u,`${m}.is`),r)){if(f){const a=t.localize([...t.path,`${m}.then`],t.ancestors,t.schemas),{schema:i,id:o}=f._generate(e,a,r);s.push(i),n.push(`${m}.then${o?`(${o})`:""}`);break}}else if(h){const a=t.localize([...t.path,`${m}.otherwise`],t.ancestors,t.schemas),{schema:i,id:o}=h._generate(e,a,r);s.push(i),n.push(`${m}.otherwise${o?`(${o})`:""}`);break}}if(i.break&&n.length>c)break}const a=n.join(", ");if(t.mainstay.tracer.debug(t,"rule","when",a),!a)return{schema:this};if(!t.mainstay.tracer.active&&this.$_temp.whens[a])return{schema:this.$_temp.whens[a],id:a};let i=this;this._definition.generate&&(i=this._definition.generate(this,e,t,r));for(const e of s)i=i.concat(e);return this.$_root._tracer&&this.$_root._tracer._combine(i,[this,...s]),this.$_temp.whens[a]=i,{schema:i,id:a}}_inner(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};s(!this._inRuleset(),`Cannot set ${e} inside a ruleset`);const n=this.clone();return n.$_terms[e]&&!r.override||(n.$_terms[e]=[]),r.single?n.$_terms[e].push(t):n.$_terms[e].push(...t),n.$_temp.ruleset=!1,n}_inRuleset(){return null!==this.$_temp.ruleset&&!1!==this.$_temp.ruleset}_ruleRemove(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!this._singleRules.has(e))return this;const r=!1!==t.clone?this.clone():this;r._singleRules.delete(e);const s=[];for(let t=0;t<r._rules.length;++t){const n=r._rules[t];n.name!==e||n.keep?s.push(n):r._inRuleset()&&t<r.$_temp.ruleset&&--r.$_temp.ruleset}return r._rules=s,r}_values(e,t){l.verifyFlat(e,t.slice(1,-1));const r=this.clone(),n=e[0]===l.symbols.override;if(n&&(e=e.slice(1)),!r[t]&&e.length?r[t]=new b:n&&(r[t]=e.length?new b:null,r.$_mutateRebuild()),!r[t])return r;n&&r[t].override();for(const n of e){s(void 0!==n,"Cannot call allow/valid/invalid with undefined"),s(n!==l.symbols.override,"Override must be the first value");const e="_invalids"===t?"_valids":"_invalids";r[e]&&(r[e].remove(n),r[e].length||(s("_valids"===t||!r._flags.only,"Setting invalid value",n,"leaves schema rejecting all values due to previous valid rule"),r[e]=null)),r[t].add(n,r._refs)}return r}}};v.Base.prototype[l.symbols.any]={version:l.version,compile:c.compile,root:"$_root"},v.Base.prototype.isImmutable=!0,v.Base.prototype.deny=v.Base.prototype.invalid,v.Base.prototype.disallow=v.Base.prototype.invalid,v.Base.prototype.equal=v.Base.prototype.valid,v.Base.prototype.exist=v.Base.prototype.required,v.Base.prototype.not=v.Base.prototype.invalid,v.Base.prototype.options=v.Base.prototype.prefs,v.Base.prototype.preferences=v.Base.prototype.prefs,e.exports=new v.Base},8652:(e,t,r)=>{"use strict";const s=r(375),n=r(8571),a=r(8160),i={max:1e3,supported:new Set(["undefined","boolean","number","string"])};t.provider={provision:e=>new i.Cache(e)},i.Cache=class{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};a.assertOptions(e,["max"]),s(void 0===e.max||e.max&&e.max>0&&isFinite(e.max),"Invalid max cache size"),this._max=e.max||i.max,this._map=new Map,this._list=new i.List}get length(){return this._map.size}set(e,t){if(null!==e&&!i.supported.has(typeof e))return;let r=this._map.get(e);if(r)return r.value=t,void this._list.first(r);r=this._list.unshift({key:e,value:t}),this._map.set(e,r),this._compact()}get(e){const t=this._map.get(e);if(t)return this._list.first(t),n(t.value)}_compact(){if(this._map.size>this._max){const e=this._list.pop();this._map.delete(e.key)}}},i.List=class{constructor(){this.tail=null,this.head=null}unshift(e){return e.next=null,e.prev=this.head,this.head&&(this.head.next=e),this.head=e,this.tail||(this.tail=e),e}first(e){e!==this.head&&(this._remove(e),this.unshift(e))}pop(){return this._remove(this.tail)}_remove(e){const{next:t,prev:r}=e;return t.prev=r,r&&(r.next=t),e===this.tail&&(this.tail=t),e.prev=null,e.next=null,e}}},8160:(e,t,r)=>{"use strict";const s=r(375),n=r(7916),a=r(5934);let i,o;const l={isoDate:/^(?:[-+]\d{2})?(?:\d{4}(?!\d{2}\b))(?:(-?)(?:(?:0[1-9]|1[0-2])(?:\1(?:[12]\d|0[1-9]|3[01]))?|W(?:[0-4]\d|5[0-2])(?:-?[1-7])?|(?:00[1-9]|0[1-9]\d|[12]\d{2}|3(?:[0-5]\d|6[1-6])))(?![T]$|[T][\d]+Z$)(?:[T\s](?:(?:(?:[01]\d|2[0-3])(?:(:?)[0-5]\d)?|24\:?00)(?:[.,]\d+(?!:))?)(?:\2[0-5]\d(?:[.,]\d+)?)?(?:[Z]|(?:[+-])(?:[01]\d|2[0-3])(?::?[0-5]\d)?)?)?)?$/};t.version=a.version,t.defaults={abortEarly:!0,allowUnknown:!1,artifacts:!1,cache:!0,context:null,convert:!0,dateFormat:"iso",errors:{escapeHtml:!1,label:"path",language:null,render:!0,stack:!1,wrap:{label:'"',array:"[]"}},externals:!0,messages:{},nonEnumerables:!1,noDefaults:!1,presence:"optional",skipFunctions:!1,stripUnknown:!1,warnings:!1},t.symbols={any:Symbol.for("@hapi/joi/schema"),arraySingle:Symbol("arraySingle"),deepDefault:Symbol("deepDefault"),errors:Symbol("errors"),literal:Symbol("literal"),override:Symbol("override"),parent:Symbol("parent"),prefs:Symbol("prefs"),ref:Symbol("ref"),template:Symbol("template"),values:Symbol("values")},t.assertOptions=function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Options";s(e&&"object"==typeof e&&!Array.isArray(e),"Options must be of type object");const n=Object.keys(e).filter((e=>!t.includes(e)));s(0===n.length,`${r} contain unknown keys: ${n}`)},t.checkPreferences=function(e){o=o||r(3378);const t=o.preferences.validate(e);if(t.error)throw new n([t.error.details[0].message])},t.compare=function(e,t,r){switch(r){case"=":return e===t;case">":return e>t;case"<":return e<t;case">=":return e>=t;case"<=":return e<=t}},t.default=function(e,t){return void 0===e?t:e},t.isIsoDate=function(e){return l.isoDate.test(e)},t.isNumber=function(e){return"number"==typeof e&&!isNaN(e)},t.isResolvable=function(e){return!!e&&(e[t.symbols.ref]||e[t.symbols.template])},t.isSchema=function(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=e&&e[t.symbols.any];return!!n&&(s(r.legacy||n.version===t.version,"Cannot mix different versions of joi schemas"),!0)},t.isValues=function(e){return e[t.symbols.values]},t.limit=function(e){return Number.isSafeInteger(e)&&e>=0},t.preferences=function(e,s){i=i||r(6914),e=e||{},s=s||{};const n=Object.assign({},e,s);return s.errors&&e.errors&&(n.errors=Object.assign({},e.errors,s.errors),n.errors.wrap=Object.assign({},e.errors.wrap,s.errors.wrap)),s.messages&&(n.messages=i.compile(s.messages,e.messages)),delete n[t.symbols.prefs],n},t.tryWithPath=function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};try{return e()}catch(e){throw void 0!==e.path?e.path=t+"."+e.path:e.path=t,r.append&&(e.message=`${e.message} (${e.path})`),e}},t.validateArg=function(e,r,s){let{assert:n,message:a}=s;if(t.isSchema(n)){const t=n.validate(e);if(!t.error)return;return t.error.message}if(!n(e))return r?`${r} ${a}`:a},t.verifyFlat=function(e,t){for(const r of e)s(!Array.isArray(r),"Method no longer accepts array arguments:",t)}},3292:(e,t,r)=>{"use strict";const s=r(375),n=r(8160),a=r(6133),i={};t.schema=function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};n.assertOptions(r,["appendPath","override"]);try{return i.schema(e,t,r)}catch(e){throw r.appendPath&&void 0!==e.path&&(e.message=`${e.message} (${e.path})`),e}},i.schema=function(e,t,r){s(void 0!==t,"Invalid undefined schema"),Array.isArray(t)&&(s(t.length,"Invalid empty array schema"),1===t.length&&(t=t[0]));const a=function(t){for(var s=arguments.length,n=new Array(s>1?s-1:0),a=1;a<s;a++)n[a-1]=arguments[a];return!1!==r.override?t.valid(e.override,...n):t.valid(...n)};if(i.simple(t))return a(e,t);if("function"==typeof t)return e.custom(t);if(s("object"==typeof t,"Invalid schema content:",typeof t),n.isResolvable(t))return a(e,t);if(n.isSchema(t))return t;if(Array.isArray(t)){for(const r of t)if(!i.simple(r))return e.alternatives().try(...t);return a(e,...t)}return t instanceof RegExp?e.string().regex(t):t instanceof Date?a(e.date(),t):(s(Object.getPrototypeOf(t)===Object.getPrototypeOf({}),"Schema can only contain plain objects"),e.object().keys(t))},t.ref=function(e,t){return a.isRef(e)?e:a.create(e,t)},t.compile=function(e,r){let a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};n.assertOptions(a,["legacy"]);const o=r&&r[n.symbols.any];if(o)return s(a.legacy||o.version===n.version,"Cannot mix different versions of joi schemas:",o.version,n.version),r;if("object"!=typeof r||!a.legacy)return t.schema(e,r,{appendPath:!0});const l=i.walk(r);return l?l.compile(l.root,r):t.schema(e,r,{appendPath:!0})},i.walk=function(e){if("object"!=typeof e)return null;if(Array.isArray(e)){for(const t of e){const e=i.walk(t);if(e)return e}return null}const t=e[n.symbols.any];if(t)return{root:e[t.root],compile:t.compile};s(Object.getPrototypeOf(e)===Object.getPrototypeOf({}),"Schema can only contain plain objects");for(const t in e){const r=i.walk(e[t]);if(r)return r}return null},i.simple=function(e){return null===e||["boolean","string","number"].includes(typeof e)},t.when=function(e,r,o){if(void 0===o&&(s(r&&"object"==typeof r,"Missing options"),o=r,r=a.create(".")),Array.isArray(o)&&(o={switch:o}),n.assertOptions(o,["is","not","then","otherwise","switch","break"]),n.isSchema(r))return s(void 0===o.is,'"is" can not be used with a schema condition'),s(void 0===o.not,'"not" can not be used with a schema condition'),s(void 0===o.switch,'"switch" can not be used with a schema condition'),i.condition(e,{is:r,then:o.then,otherwise:o.otherwise,break:o.break});if(s(a.isRef(r)||"string"==typeof r,"Invalid condition:",r),s(void 0===o.not||void 0===o.is,'Cannot combine "is" with "not"'),void 0===o.switch){let l=o;void 0!==o.not&&(l={is:o.not,then:o.otherwise,otherwise:o.then,break:o.break});let c=void 0!==l.is?e.$_compile(l.is):e.$_root.invalid(null,!1,0,"").required();return s(void 0!==l.then||void 0!==l.otherwise,'options must have at least one of "then", "otherwise", or "switch"'),s(void 0===l.break||void 0===l.then||void 0===l.otherwise,"Cannot specify then, otherwise, and break all together"),void 0===o.is||a.isRef(o.is)||n.isSchema(o.is)||(c=c.required()),i.condition(e,{ref:t.ref(r),is:c,then:l.then,otherwise:l.otherwise,break:l.break})}s(Array.isArray(o.switch),'"switch" must be an array'),s(void 0===o.is,'Cannot combine "switch" with "is"'),s(void 0===o.not,'Cannot combine "switch" with "not"'),s(void 0===o.then,'Cannot combine "switch" with "then"');const l={ref:t.ref(r),switch:[],break:o.break};for(let t=0;t<o.switch.length;++t){const r=o.switch[t],i=t===o.switch.length-1;n.assertOptions(r,i?["is","then","otherwise"]:["is","then"]),s(void 0!==r.is,'Switch statement missing "is"'),s(void 0!==r.then,'Switch statement missing "then"');const c={is:e.$_compile(r.is),then:e.$_compile(r.then)};if(a.isRef(r.is)||n.isSchema(r.is)||(c.is=c.is.required()),i){s(void 0===o.otherwise||void 0===r.otherwise,'Cannot specify "otherwise" inside and outside a "switch"');const t=void 0!==o.otherwise?o.otherwise:r.otherwise;void 0!==t&&(s(void 0===l.break,"Cannot specify both otherwise and break"),c.otherwise=e.$_compile(t))}l.switch.push(c)}return l},i.condition=function(e,t){for(const r of["then","otherwise"])void 0===t[r]?delete t[r]:t[r]=e.$_compile(t[r]);return t}},6354:(e,t,r)=>{"use strict";const s=r(5688),n=r(8160),a=r(3328);t.Report=class{constructor(e,r,s,n,a,i,o){if(this.code=e,this.flags=n,this.messages=a,this.path=i.path,this.prefs=o,this.state=i,this.value=r,this.message=null,this.template=null,this.local=s||{},this.local.label=t.label(this.flags,this.state,this.prefs,this.messages),void 0===this.value||this.local.hasOwnProperty("value")||(this.local.value=this.value),this.path.length){const e=this.path[this.path.length-1];"object"!=typeof e&&(this.local.key=e)}}_setTemplate(e){if(this.template=e,!this.flags.label&&0===this.path.length){const e=this._template(this.template,"root");e&&(this.local.label=e)}}toString(){if(this.message)return this.message;const e=this.code;if(!this.prefs.errors.render)return this.code;const t=this._template(this.template)||this._template(this.prefs.messages)||this._template(this.messages);return void 0===t?`Error code "${e}" is not defined, your custom type is missing the correct messages definition`:(this.message=t.render(this.value,this.state,this.prefs,this.local,{errors:this.prefs.errors,messages:[this.prefs.messages,this.messages]}),this.prefs.errors.label||(this.message=this.message.replace(/^"" /,"").trim()),this.message)}_template(e,r){return t.template(this.value,e,r||this.code,this.state,this.prefs)}},t.path=function(e){let t="";for(const r of e)"object"!=typeof r&&("string"==typeof r?(t&&(t+="."),t+=r):t+=`[${r}]`);return t},t.template=function(e,t,r,s,i){if(!t)return;if(a.isTemplate(t))return"root"!==r?t:null;let o=i.errors.language;if(n.isResolvable(o)&&(o=o.resolve(e,s,i)),o&&t[o]){if(void 0!==t[o][r])return t[o][r];if(void 0!==t[o]["*"])return t[o]["*"]}return t[r]?t[r]:t["*"]},t.label=function(e,r,s,n){if(e.label)return e.label;if(!s.errors.label)return"";let a=r.path;"key"===s.errors.label&&r.path.length>1&&(a=r.path.slice(-1));return t.path(a)||t.template(null,s.messages,"root",r,s)||n&&t.template(null,n,"root",r,s)||"value"},t.process=function(e,r,s){if(!e)return null;const{override:n,message:a,details:i}=t.details(e);if(n)return n;if(s.errors.stack)return new t.ValidationError(a,i,r);const o=Error.stackTraceLimit;Error.stackTraceLimit=0;const l=new t.ValidationError(a,i,r);return Error.stackTraceLimit=o,l},t.details=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=[];const s=[];for(const n of e){if(n instanceof Error){if(!1!==t.override)return{override:n};const e=n.toString();r.push(e),s.push({message:e,type:"override",context:{error:n}});continue}const e=n.toString();r.push(e),s.push({message:e,path:n.path.filter((e=>"object"!=typeof e)),type:n.code,context:n.local})}return r.length>1&&(r=[...new Set(r)]),{message:r.join(". "),details:s}},t.ValidationError=class extends Error{constructor(e,t,r){super(e),this._original=r,this.details=t}static isError(e){return e instanceof t.ValidationError}},t.ValidationError.prototype.isJoi=!0,t.ValidationError.prototype.name="ValidationError",t.ValidationError.prototype.annotate=s.error},8901:(e,t,r)=>{"use strict";const s=r(375),n=r(8571),a=r(8160),i=r(6914),o={};t.type=function(e,t){const r=Object.getPrototypeOf(e),l=n(r),c=e._assign(Object.create(l)),u=Object.assign({},t);delete u.base,l._definition=u;const f=r._definition||{};u.messages=i.merge(f.messages,u.messages),u.properties=Object.assign({},f.properties,u.properties),c.type=u.type,u.flags=Object.assign({},f.flags,u.flags);const h=Object.assign({},f.terms);if(u.terms)for(const e in u.terms){const t=u.terms[e];s(void 0===c.$_terms[e],"Invalid term override for",u.type,e),c.$_terms[e]=t.init,h[e]=t}u.terms=h,u.args||(u.args=f.args),u.prepare=o.prepare(u.prepare,f.prepare),u.coerce&&("function"==typeof u.coerce&&(u.coerce={method:u.coerce}),u.coerce.from&&!Array.isArray(u.coerce.from)&&(u.coerce={method:u.coerce.method,from:[].concat(u.coerce.from)})),u.coerce=o.coerce(u.coerce,f.coerce),u.validate=o.validate(u.validate,f.validate);const m=Object.assign({},f.rules);if(u.rules)for(const e in u.rules){const t=u.rules[e];s("object"==typeof t,"Invalid rule definition for",u.type,e);let r=t.method;if(void 0===r&&(r=function(){return this.$_addRule(e)}),r&&(s(!l[e],"Rule conflict in",u.type,e),l[e]=r),s(!m[e],"Rule conflict in",u.type,e),m[e]=t,t.alias){const e=[].concat(t.alias);for(const r of e)l[r]=t.method}t.args&&(t.argsByName=new Map,t.args=t.args.map((e=>("string"==typeof e&&(e={name:e}),s(!t.argsByName.has(e.name),"Duplicated argument name",e.name),a.isSchema(e.assert)&&(e.assert=e.assert.strict().label(e.name)),t.argsByName.set(e.name,e),e))))}u.rules=m;const d=Object.assign({},f.modifiers);if(u.modifiers)for(const e in u.modifiers){s(!l[e],"Rule conflict in",u.type,e);const t=u.modifiers[e];s("function"==typeof t,"Invalid modifier definition for",u.type,e);const r=function(t){return this.rule({[e]:t})};l[e]=r,d[e]=t}if(u.modifiers=d,u.overrides){l._super=r,c.$_super={};for(const e in u.overrides)s(r[e],"Cannot override missing",e),u.overrides[e][a.symbols.parent]=r[e],c.$_super[e]=r[e].bind(c);Object.assign(l,u.overrides)}u.cast=Object.assign({},f.cast,u.cast);const p=Object.assign({},f.manifest,u.manifest);return p.build=o.build(u.manifest&&u.manifest.build,f.manifest&&f.manifest.build),u.manifest=p,u.rebuild=o.rebuild(u.rebuild,f.rebuild),c},o.build=function(e,t){return e&&t?function(r,s){return t(e(r,s),s)}:e||t},o.coerce=function(e,t){return e&&t?{from:e.from&&t.from?[...new Set([...e.from,...t.from])]:null,method(r,s){let n;if((!t.from||t.from.includes(typeof r))&&(n=t.method(r,s),n)){if(n.errors||void 0===n.value)return n;r=n.value}if(!e.from||e.from.includes(typeof r)){const t=e.method(r,s);if(t)return t}return n}}:e||t},o.prepare=function(e,t){return e&&t?function(r,s){const n=e(r,s);if(n){if(n.errors||void 0===n.value)return n;r=n.value}return t(r,s)||n}:e||t},o.rebuild=function(e,t){return e&&t?function(r){t(r),e(r)}:e||t},o.validate=function(e,t){return e&&t?function(r,s){const n=t(r,s);if(n){if(n.errors&&(!Array.isArray(n.errors)||n.errors.length))return n;r=n.value}return e(r,s)||n}:e||t}},5107:(e,t,r)=>{"use strict";const s=r(375),n=r(8571),a=r(8652),i=r(8160),o=r(3292),l=r(6354),c=r(8901),u=r(9708),f=r(6133),h=r(3328),m=r(1152);let d;const p={types:{alternatives:r(4946),any:r(8068),array:r(546),boolean:r(4937),date:r(7500),function:r(390),link:r(8785),number:r(3832),object:r(8966),string:r(7417),symbol:r(8826)},aliases:{alt:"alternatives",bool:"boolean",func:"function"},root:function(){const e={_types:new Set(Object.keys(p.types))};for(const t of e._types)e[t]=function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return s(!r.length||["alternatives","link","object"].includes(t),"The",t,"type does not allow arguments"),p.generate(this,p.types[t],r)};for(const t of["allow","custom","disallow","equal","exist","forbidden","invalid","not","only","optional","options","prefs","preferences","required","strip","valid","when"])e[t]=function(){return this.any()[t](...arguments)};Object.assign(e,p.methods);for(const t in p.aliases){const r=p.aliases[t];e[t]=e[r]}return e.x=e.expression,m.setup&&m.setup(e),e}};p.methods={ValidationError:l.ValidationError,version:i.version,cache:a.provider,assert(e,t){for(var r=arguments.length,s=new Array(r>2?r-2:0),n=2;n<r;n++)s[n-2]=arguments[n];p.assert(e,t,!0,s)},attempt(e,t){for(var r=arguments.length,s=new Array(r>2?r-2:0),n=2;n<r;n++)s[n-2]=arguments[n];return p.assert(e,t,!1,s)},build(e){return s("function"==typeof u.build,"Manifest functionality disabled"),u.build(this,e)},checkPreferences(e){i.checkPreferences(e)},compile(e,t){return o.compile(this,e,t)},defaults(e){s("function"==typeof e,"modifier must be a function");const t=Object.assign({},this);for(const r of t._types){const n=e(t[r]());s(i.isSchema(n),"modifier must return a valid schema object"),t[r]=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return p.generate(this,n,t)}}return t},expression(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return new h(...t)},extend(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];i.verifyFlat(t,"extend"),d=d||r(3378),s(t.length,"You need to provide at least one extension"),this.assert(t,d.extensions);const a=Object.assign({},this);a._types=new Set(a._types);for(let e of t){"function"==typeof e&&(e=e(a)),this.assert(e,d.extension);const t=p.expandExtension(e,a);for(const e of t){s(void 0===a[e.type]||a._types.has(e.type),"Cannot override name",e.type);const t=e.base||this.any(),r=c.type(t,e);a._types.add(e.type),a[e.type]=function(){for(var e=arguments.length,t=new Array(e),s=0;s<e;s++)t[s]=arguments[s];return p.generate(this,r,t)}}}return a},isError:l.ValidationError.isError,isExpression:h.isTemplate,isRef:f.isRef,isSchema:i.isSchema,in(){return f.in(...arguments)},override:i.symbols.override,ref(){return f.create(...arguments)},types(){const e={};for(const t of this._types)e[t]=this[t]();for(const t in p.aliases)e[t]=this[t]();return e}},p.assert=function(e,t,r,s){const a=s[0]instanceof Error||"string"==typeof s[0]?s[0]:null,o=null!==a?s[1]:s[0],c=t.validate(e,i.preferences({errors:{stack:!0}},o||{}));let u=c.error;if(!u)return c.value;if(a instanceof Error)throw a;const f=r&&"function"==typeof u.annotate?u.annotate():u.message;throw u instanceof l.ValidationError==0&&(u=n(u)),u.message=a?`${a} ${f}`:f,u},p.generate=function(e,t,r){return s(e,"Must be invoked on a Joi instance."),t.$_root=e,t._definition.args&&r.length?t._definition.args(t,...r):t},p.expandExtension=function(e,t){if("string"==typeof e.type)return[e];const r=[];for(const s of t._types)if(e.type.test(s)){const n=Object.assign({},e);n.type=s,n.base=t[s](),r.push(n)}return r},e.exports=p.root()},6914:(e,t,r)=>{"use strict";const s=r(375),n=r(8571),a=r(3328);t.compile=function(e,t){if("string"==typeof e)return s(!t,"Cannot set single message string"),new a(e);if(a.isTemplate(e))return s(!t,"Cannot set single message template"),e;s("object"==typeof e&&!Array.isArray(e),"Invalid message options"),t=t?n(t):{};for(let r in e){const n=e[r];if("root"===r||a.isTemplate(n)){t[r]=n;continue}if("string"==typeof n){t[r]=new a(n);continue}s("object"==typeof n&&!Array.isArray(n),"Invalid message for",r);const i=r;for(r in t[i]=t[i]||{},n){const e=n[r];"root"===r||a.isTemplate(e)?t[i][r]=e:(s("string"==typeof e,"Invalid message for",r,"in",i),t[i][r]=new a(e))}}return t},t.decompile=function(e){const t={};for(let r in e){const s=e[r];if("root"===r){t.root=s;continue}if(a.isTemplate(s)){t[r]=s.describe({compact:!0});continue}const n=r;for(r in t[n]={},s){const e=s[r];"root"!==r?t[n][r]=e.describe({compact:!0}):t[n].root=e}}return t},t.merge=function(e,r){if(!e)return t.compile(r);if(!r)return e;if("string"==typeof r)return new a(r);if(a.isTemplate(r))return r;const i=n(e);for(let e in r){const t=r[e];if("root"===e||a.isTemplate(t)){i[e]=t;continue}if("string"==typeof t){i[e]=new a(t);continue}s("object"==typeof t&&!Array.isArray(t),"Invalid message for",e);const n=e;for(e in i[n]=i[n]||{},t){const r=t[e];"root"===e||a.isTemplate(r)?i[n][e]=r:(s("string"==typeof r,"Invalid message for",e,"in",n),i[n][e]=new a(r))}}return i}},2294:(e,t,r)=>{"use strict";const s=r(375),n=r(8160),a=r(6133),i={};t.Ids=i.Ids=class{constructor(){this._byId=new Map,this._byKey=new Map,this._schemaChain=!1}clone(){const e=new i.Ids;return e._byId=new Map(this._byId),e._byKey=new Map(this._byKey),e._schemaChain=this._schemaChain,e}concat(e){e._schemaChain&&(this._schemaChain=!0);for(const[t,r]of e._byId.entries())s(!this._byKey.has(t),"Schema id conflicts with existing key:",t),this._byId.set(t,r);for(const[t,r]of e._byKey.entries())s(!this._byId.has(t),"Schema key conflicts with existing id:",t),this._byKey.set(t,r)}fork(e,t,r){const a=this._collect(e);a.push({schema:r});const o=a.shift();let l={id:o.id,schema:t(o.schema)};s(n.isSchema(l.schema),"adjuster function failed to return a joi schema type");for(const e of a)l={id:e.id,schema:i.fork(e.schema,l.id,l.schema)};return l.schema}labels(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];const r=e[0],s=this._get(r);if(!s)return[...t,...e].join(".");const n=e.slice(1);return t=[...t,s.schema._flags.label||r],n.length?s.schema._ids.labels(n,t):t.join(".")}reach(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];const r=e[0],n=this._get(r);s(n,"Schema does not contain path",[...t,...e].join("."));const a=e.slice(1);return a.length?n.schema._ids.reach(a,[...t,r]):n.schema}register(e){let{key:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!e||!n.isSchema(e))return;(e.$_property("schemaChain")||e._ids._schemaChain)&&(this._schemaChain=!0);const r=e._flags.id;if(r){const t=this._byId.get(r);s(!t||t.schema===e,"Cannot add different schemas with the same id:",r),s(!this._byKey.has(r),"Schema id conflicts with existing key:",r),this._byId.set(r,{schema:e,id:r})}t&&(s(!this._byKey.has(t),"Schema already contains key:",t),s(!this._byId.has(t),"Schema key conflicts with existing id:",t),this._byKey.set(t,{schema:e,id:t}))}reset(){this._byId=new Map,this._byKey=new Map,this._schemaChain=!1}_collect(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];const n=e[0],a=this._get(n);s(a,"Schema does not contain path",[...t,...e].join(".")),r=[a,...r];const i=e.slice(1);return i.length?a.schema._ids._collect(i,[...t,n],r):r}_get(e){return this._byId.get(e)||this._byKey.get(e)}},i.fork=function(e,r,s){const n=t.schema(e,{each:(e,t)=>{let{key:n}=t;if(r===(e._flags.id||n))return s},ref:!1});return n?n.$_mutateRebuild():e},t.schema=function(e,t){let r;for(const s in e._flags){if("_"===s[0])continue;const n=i.scan(e._flags[s],{source:"flags",name:s},t);void 0!==n&&(r=r||e.clone(),r._flags[s]=n)}for(let s=0;s<e._rules.length;++s){const n=e._rules[s],a=i.scan(n.args,{source:"rules",name:n.name},t);if(void 0!==a){r=r||e.clone();const t=Object.assign({},n);t.args=a,r._rules[s]=t,r._singleRules.get(n.name)===n&&r._singleRules.set(n.name,t)}}for(const s in e.$_terms){if("_"===s[0])continue;const n=i.scan(e.$_terms[s],{source:"terms",name:s},t);void 0!==n&&(r=r||e.clone(),r.$_terms[s]=n)}return r},i.scan=function(e,t,r,s,o){const l=s||[];if(null===e||"object"!=typeof e)return;let c;if(Array.isArray(e)){for(let s=0;s<e.length;++s){const n="terms"===t.source&&"keys"===t.name&&e[s].key,a=i.scan(e[s],t,r,[s,...l],n);void 0!==a&&(c=c||e.slice(),c[s]=a)}return c}if(!1!==r.schema&&n.isSchema(e)||!1!==r.ref&&a.isRef(e)){const s=r.each(e,{...t,path:l,key:o});if(s===e)return;return s}for(const s in e){if("_"===s[0])continue;const n=i.scan(e[s],t,r,[s,...l],o);void 0!==n&&(c=c||Object.assign({},e),c[s]=n)}return c}},6133:(e,t,r)=>{"use strict";const s=r(375),n=r(8571),a=r(9621),i=r(8160);let o;const l={symbol:Symbol("ref"),defaults:{adjust:null,in:!1,iterables:null,map:null,separator:".",type:"value"}};t.create=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};s("string"==typeof e,"Invalid reference key:",e),i.assertOptions(t,["adjust","ancestor","in","iterables","map","prefix","render","separator"]),s(!t.prefix||"object"==typeof t.prefix,"options.prefix must be of type object");const r=Object.assign({},l.defaults,t);delete r.prefix;const n=r.separator,a=l.context(e,n,t.prefix);if(r.type=a.type,e=a.key,"value"===r.type)if(a.root&&(s(!n||e[0]!==n,"Cannot specify relative path with root prefix"),r.ancestor="root",e||(e=null)),n&&n===e)e=null,r.ancestor=0;else if(void 0!==r.ancestor)s(!n||!e||e[0]!==n,"Cannot combine prefix with ancestor option");else{const[t,s]=l.ancestor(e,n);s&&""===(e=e.slice(s))&&(e=null),r.ancestor=t}return r.path=n?null===e?[]:e.split(n):[e],new l.Ref(r)},t.in=function(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t.create(e,{...r,in:!0})},t.isRef=function(e){return!!e&&!!e[i.symbols.ref]},l.Ref=class{constructor(e){s("object"==typeof e,"Invalid reference construction"),i.assertOptions(e,["adjust","ancestor","in","iterables","map","path","render","separator","type","depth","key","root","display"]),s([!1,void 0].includes(e.separator)||"string"==typeof e.separator&&1===e.separator.length,"Invalid separator"),s(!e.adjust||"function"==typeof e.adjust,"options.adjust must be a function"),s(!e.map||Array.isArray(e.map),"options.map must be an array"),s(!e.map||!e.adjust,"Cannot set both map and adjust options"),Object.assign(this,l.defaults,e),s("value"===this.type||void 0===this.ancestor,"Non-value references cannot reference ancestors"),Array.isArray(this.map)&&(this.map=new Map(this.map)),this.depth=this.path.length,this.key=this.path.length?this.path.join(this.separator):null,this.root=this.path[0],this.updateDisplay()}resolve(e,t,r,n){let a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{};return s(!this.in||a.in,"Invalid in() reference usage"),"global"===this.type?this._resolve(r.context,t,a):"local"===this.type?this._resolve(n,t,a):this.ancestor?"root"===this.ancestor?this._resolve(t.ancestors[t.ancestors.length-1],t,a):(s(this.ancestor<=t.ancestors.length,"Invalid reference exceeds the schema root:",this.display),this._resolve(t.ancestors[this.ancestor-1],t,a)):this._resolve(e,t,a)}_resolve(e,t,r){let s;if("value"===this.type&&t.mainstay.shadow&&!1!==r.shadow&&(s=t.mainstay.shadow.get(this.absolute(t))),void 0===s&&(s=a(e,this.path,{iterables:this.iterables,functions:!0})),this.adjust&&(s=this.adjust(s)),this.map){const e=this.map.get(s);void 0!==e&&(s=e)}return t.mainstay&&t.mainstay.tracer.resolve(t,this,s),s}toString(){return this.display}absolute(e){return[...e.path.slice(0,-this.ancestor),...this.path]}clone(){return new l.Ref(this)}describe(){const e={path:this.path};"value"!==this.type&&(e.type=this.type),"."!==this.separator&&(e.separator=this.separator),"value"===this.type&&1!==this.ancestor&&(e.ancestor=this.ancestor),this.map&&(e.map=[...this.map]);for(const t of["adjust","iterables","render"])null!==this[t]&&void 0!==this[t]&&(e[t]=this[t]);return!1!==this.in&&(e.in=!0),{ref:e}}updateDisplay(){const e=null!==this.key?this.key:"";if("value"!==this.type)return void(this.display=`ref:${this.type}:${e}`);if(!this.separator)return void(this.display=`ref:${e}`);if(!this.ancestor)return void(this.display=`ref:${this.separator}${e}`);if("root"===this.ancestor)return void(this.display=`ref:root:${e}`);if(1===this.ancestor)return void(this.display=`ref:${e||".."}`);const t=new Array(this.ancestor+1).fill(this.separator).join("");this.display=`ref:${t}${e||""}`}},l.Ref.prototype[i.symbols.ref]=!0,t.build=function(e){return"value"===(e=Object.assign({},l.defaults,e)).type&&void 0===e.ancestor&&(e.ancestor=1),new l.Ref(e)},l.context=function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(e=e.trim(),r){const s=void 0===r.global?"$":r.global;if(s!==t&&e.startsWith(s))return{key:e.slice(s.length),type:"global"};const n=void 0===r.local?"#":r.local;if(n!==t&&e.startsWith(n))return{key:e.slice(n.length),type:"local"};const a=void 0===r.root?"/":r.root;if(a!==t&&e.startsWith(a))return{key:e.slice(a.length),type:"value",root:!0}}return{key:e,type:"value"}},l.ancestor=function(e,t){if(!t)return[1,0];if(e[0]!==t)return[1,0];if(e[1]!==t)return[0,1];let r=2;for(;e[r]===t;)++r;return[r-1,r]},t.toSibling=0,t.toParent=1,t.Manager=class{constructor(){this.refs=[]}register(e,s){if(e)if(s=void 0===s?t.toParent:s,Array.isArray(e))for(const t of e)this.register(t,s);else if(i.isSchema(e))for(const t of e._refs.refs)t.ancestor-s>=0&&this.refs.push({ancestor:t.ancestor-s,root:t.root});else t.isRef(e)&&"value"===e.type&&e.ancestor-s>=0&&this.refs.push({ancestor:e.ancestor-s,root:e.root}),o=o||r(3328),o.isTemplate(e)&&this.register(e.refs(),s)}get length(){return this.refs.length}clone(){const e=new t.Manager;return e.refs=n(this.refs),e}reset(){this.refs=[]}roots(){return this.refs.filter((e=>!e.ancestor)).map((e=>e.root))}}},3378:(e,t,r)=>{"use strict";const s=r(5107),n={};n.wrap=s.string().min(1).max(2).allow(!1),t.preferences=s.object({allowUnknown:s.boolean(),abortEarly:s.boolean(),artifacts:s.boolean(),cache:s.boolean(),context:s.object(),convert:s.boolean(),dateFormat:s.valid("date","iso","string","time","utc"),debug:s.boolean(),errors:{escapeHtml:s.boolean(),label:s.valid("path","key",!1),language:[s.string(),s.object().ref()],render:s.boolean(),stack:s.boolean(),wrap:{label:n.wrap,array:n.wrap,string:n.wrap}},externals:s.boolean(),messages:s.object(),noDefaults:s.boolean(),nonEnumerables:s.boolean(),presence:s.valid("required","optional","forbidden"),skipFunctions:s.boolean(),stripUnknown:s.object({arrays:s.boolean(),objects:s.boolean()}).or("arrays","objects").allow(!0,!1),warnings:s.boolean()}).strict(),n.nameRx=/^[a-zA-Z0-9]\w*$/,n.rule=s.object({alias:s.array().items(s.string().pattern(n.nameRx)).single(),args:s.array().items(s.string(),s.object({name:s.string().pattern(n.nameRx).required(),ref:s.boolean(),assert:s.alternatives([s.function(),s.object().schema()]).conditional("ref",{is:!0,then:s.required()}),normalize:s.function(),message:s.string().when("assert",{is:s.function(),then:s.required()})})),convert:s.boolean(),manifest:s.boolean(),method:s.function().allow(!1),multi:s.boolean(),validate:s.function()}),t.extension=s.object({type:s.alternatives([s.string(),s.object().regex()]).required(),args:s.function(),cast:s.object().pattern(n.nameRx,s.object({from:s.function().maxArity(1).required(),to:s.function().minArity(1).maxArity(2).required()})),base:s.object().schema().when("type",{is:s.object().regex(),then:s.forbidden()}),coerce:[s.function().maxArity(3),s.object({method:s.function().maxArity(3).required(),from:s.array().items(s.string()).single()})],flags:s.object().pattern(n.nameRx,s.object({setter:s.string(),default:s.any()})),manifest:{build:s.function().arity(2)},messages:[s.object(),s.string()],modifiers:s.object().pattern(n.nameRx,s.function().minArity(1).maxArity(2)),overrides:s.object().pattern(n.nameRx,s.function()),prepare:s.function().maxArity(3),rebuild:s.function().arity(1),rules:s.object().pattern(n.nameRx,n.rule),terms:s.object().pattern(n.nameRx,s.object({init:s.array().allow(null).required(),manifest:s.object().pattern(/.+/,[s.valid("schema","single"),s.object({mapped:s.object({from:s.string().required(),to:s.string().required()}).required()})])})),validate:s.function().maxArity(3)}).strict(),t.extensions=s.array().items(s.object(),s.function().arity(1)).strict(),n.desc={buffer:s.object({buffer:s.string()}),func:s.object({function:s.function().required(),options:{literal:!0}}),override:s.object({override:!0}),ref:s.object({ref:s.object({type:s.valid("value","global","local"),path:s.array().required(),separator:s.string().length(1).allow(!1),ancestor:s.number().min(0).integer().allow("root"),map:s.array().items(s.array().length(2)).min(1),adjust:s.function(),iterables:s.boolean(),in:s.boolean(),render:s.boolean()}).required()}),regex:s.object({regex:s.string().min(3)}),special:s.object({special:s.valid("deep").required()}),template:s.object({template:s.string().required(),options:s.object()}),value:s.object({value:s.alternatives([s.object(),s.array()]).required()})},n.desc.entity=s.alternatives([s.array().items(s.link("...")),s.boolean(),s.function(),s.number(),s.string(),n.desc.buffer,n.desc.func,n.desc.ref,n.desc.regex,n.desc.special,n.desc.template,n.desc.value,s.link("/")]),n.desc.values=s.array().items(null,s.boolean(),s.function(),s.number().allow(1/0,-1/0),s.string().allow(""),s.symbol(),n.desc.buffer,n.desc.func,n.desc.override,n.desc.ref,n.desc.regex,n.desc.template,n.desc.value),n.desc.messages=s.object().pattern(/.+/,[s.string(),n.desc.template,s.object().pattern(/.+/,[s.string(),n.desc.template])]),t.description=s.object({type:s.string().required(),flags:s.object({cast:s.string(),default:s.any(),description:s.string(),empty:s.link("/"),failover:n.desc.entity,id:s.string(),label:s.string(),only:!0,presence:["optional","required","forbidden"],result:["raw","strip"],strip:s.boolean(),unit:s.string()}).unknown(),preferences:{allowUnknown:s.boolean(),abortEarly:s.boolean(),artifacts:s.boolean(),cache:s.boolean(),convert:s.boolean(),dateFormat:["date","iso","string","time","utc"],errors:{escapeHtml:s.boolean(),label:["path","key"],language:[s.string(),n.desc.ref],wrap:{label:n.wrap,array:n.wrap}},externals:s.boolean(),messages:n.desc.messages,noDefaults:s.boolean(),nonEnumerables:s.boolean(),presence:["required","optional","forbidden"],skipFunctions:s.boolean(),stripUnknown:s.object({arrays:s.boolean(),objects:s.boolean()}).or("arrays","objects").allow(!0,!1),warnings:s.boolean()},allow:n.desc.values,invalid:n.desc.values,rules:s.array().min(1).items({name:s.string().required(),args:s.object().min(1),keep:s.boolean(),message:[s.string(),n.desc.messages],warn:s.boolean()}),keys:s.object().pattern(/.*/,s.link("/")),link:n.desc.ref}).pattern(/^[a-z]\w*$/,s.any())},493:(e,t,r)=>{"use strict";const s=r(8571),n=r(9621),a=r(8160),i={value:Symbol("value")};e.exports=i.State=class{constructor(e,t,r){this.path=e,this.ancestors=t,this.mainstay=r.mainstay,this.schemas=r.schemas,this.debug=null}localize(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;const s=new i.State(e,t,this);return r&&s.schemas&&(s.schemas=[i.schemas(r),...s.schemas]),s}nest(e,t){const r=new i.State(this.path,this.ancestors,this);return r.schemas=r.schemas&&[i.schemas(e),...r.schemas],r.debug=t,r}shadow(e,t){this.mainstay.shadow=this.mainstay.shadow||new i.Shadow,this.mainstay.shadow.set(this.path,e,t)}snapshot(){this.mainstay.shadow&&(this._snapshot=s(this.mainstay.shadow.node(this.path))),this.mainstay.snapshot()}restore(){this.mainstay.shadow&&(this.mainstay.shadow.override(this.path,this._snapshot),this._snapshot=void 0),this.mainstay.restore()}commit(){this.mainstay.shadow&&(this.mainstay.shadow.override(this.path,this._snapshot),this._snapshot=void 0),this.mainstay.commit()}},i.schemas=function(e){return a.isSchema(e)?{schema:e}:e},i.Shadow=class{constructor(){this._values=null}set(e,t,r){if(!e.length)return;if("strip"===r&&"number"==typeof e[e.length-1])return;this._values=this._values||new Map;let s=this._values;for(let t=0;t<e.length;++t){const r=e[t];let n=s.get(r);n||(n=new Map,s.set(r,n)),s=n}s[i.value]=t}get(e){const t=this.node(e);if(t)return t[i.value]}node(e){if(this._values)return n(this._values,e,{iterables:!0})}override(e,t){if(!this._values)return;const r=e.slice(0,-1),s=e[e.length-1],a=n(this._values,r,{iterables:!0});t?a.set(s,t):a&&a.delete(s)}}},3328:(e,t,r)=>{"use strict";const s=r(375),n=r(8571),a=r(5277),i=r(1447),o=r(8160),l=r(6354),c=r(6133),u={symbol:Symbol("template"),opens:new Array(1e3).join("\0"),closes:new Array(1e3).join(""),dateFormat:{date:Date.prototype.toDateString,iso:Date.prototype.toISOString,string:Date.prototype.toString,time:Date.prototype.toTimeString,utc:Date.prototype.toUTCString}};e.exports=u.Template=class{constructor(e,t){s("string"==typeof e,"Template source must be a string"),s(!e.includes("\0")&&!e.includes(""),"Template source cannot contain reserved control characters"),this.source=e,this.rendered=e,this._template=null,this._settings=n(t),this._parse()}_parse(){if(!this.source.includes("{"))return;const e=u.encode(this.source),t=u.split(e);let r=!1;const s=[],n=t.shift();n&&s.push(n);for(const e of t){const t="{"!==e[0],n=t?"}":"}}",a=e.indexOf(n);if(-1===a||"{"===e[1]){s.push(`{${u.decode(e)}`);continue}let i=e.slice(t?0:1,a);const o=":"===i[0];o&&(i=i.slice(1));const l=this._ref(u.decode(i),{raw:t,wrapped:o});s.push(l),"string"!=typeof l&&(r=!0);const c=e.slice(a+n.length);c&&s.push(u.decode(c))}r?this._template=s:this.rendered=s.join("")}static date(e,t){return u.dateFormat[t.dateFormat].call(e)}describe(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!this._settings&&e.compact)return this.source;const t={template:this.source};return this._settings&&(t.options=this._settings),t}static build(e){return new u.Template(e.template,e.options)}isDynamic(){return!!this._template}static isTemplate(e){return!!e&&!!e[o.symbols.template]}refs(){if(!this._template)return;const e=[];for(const t of this._template)"string"!=typeof t&&e.push(...t.refs);return e}resolve(e,t,r,s){return this._template&&1===this._template.length?this._part(this._template[0],e,t,r,s,{}):this.render(e,t,r,s)}_part(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),s=1;s<t;s++)r[s-1]=arguments[s];return e.ref?e.ref.resolve(...r):e.formula.evaluate(r)}render(e,t,r,s){let n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{};if(!this.isDynamic())return this.rendered;const i=[];for(const o of this._template)if("string"==typeof o)i.push(o);else{const l=this._part(o,e,t,r,s,n),c=u.stringify(l,e,t,r,s,n);if(void 0!==c){const e=o.raw||!1===(n.errors&&n.errors.escapeHtml)?c:a(c);i.push(u.wrap(e,o.wrapped&&r.errors.wrap.label))}}return i.join("")}_ref(e,t){let{raw:r,wrapped:s}=t;const n=[],a=e=>{const t=c.create(e,this._settings);return n.push(t),e=>t.resolve(...e)};try{var o=new i.Parser(e,{reference:a,functions:u.functions,constants:u.constants})}catch(t){throw t.message=`Invalid template variable "${e}" fails due to: ${t.message}`,t}if(o.single){if("reference"===o.single.type){const e=n[0];return{ref:e,raw:r,refs:n,wrapped:s||"local"===e.type&&"label"===e.key}}return u.stringify(o.single.value)}return{formula:o,raw:r,refs:n}}toString(){return this.source}},u.Template.prototype[o.symbols.template]=!0,u.Template.prototype.isImmutable=!0,u.encode=function(e){return e.replace(/\\(\{+)/g,((e,t)=>u.opens.slice(0,t.length))).replace(/\\(\}+)/g,((e,t)=>u.closes.slice(0,t.length)))},u.decode=function(e){return e.replace(/\u0000/g,"{").replace(/\u0001/g,"}")},u.split=function(e){const t=[];let r="";for(let s=0;s<e.length;++s){const n=e[s];if("{"===n){let n="";for(;s+1<e.length&&"{"===e[s+1];)n+="{",++s;t.push(r),r=n}else r+=n}return t.push(r),t},u.wrap=function(e,t){return t?1===t.length?`${t}${e}${t}`:`${t[0]}${e}${t[1]}`:e},u.stringify=function(e,t,r,s,n){let a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{};const i=typeof e,o=s&&s.errors&&s.errors.wrap||{};let l=!1;if(c.isRef(e)&&e.render&&(l=e.in,e=e.resolve(t,r,s,n,{in:e.in,...a})),null===e)return"null";if("string"===i)return u.wrap(e,a.arrayItems&&o.string);if("number"===i||"function"===i||"symbol"===i)return e.toString();if("object"!==i)return JSON.stringify(e);if(e instanceof Date)return u.Template.date(e,s);if(e instanceof Map){const t=[];for(const[r,s]of e.entries())t.push(`${r.toString()} -> ${s.toString()}`);e=t}if(!Array.isArray(e))return e.toString();const f=[];for(const i of e)f.push(u.stringify(i,t,r,s,n,{arrayItems:!0,...a}));return u.wrap(f.join(", "),!l&&o.array)},u.constants={true:!0,false:!1,null:null,second:1e3,minute:6e4,hour:36e5,day:864e5},u.functions={if:(e,t,r)=>e?t:r,length:e=>"string"==typeof e?e.length:e&&"object"==typeof e?Array.isArray(e)?e.length:Object.keys(e).length:null,msg(e){const[t,r,s,n,a]=this,i=a.messages;if(!i)return"";const o=l.template(t,i[0],e,r,s)||l.template(t,i[1],e,r,s);return o?o.render(t,r,s,n,a):""},number:e=>"number"==typeof e?e:"string"==typeof e?parseFloat(e):"boolean"==typeof e?e?1:0:e instanceof Date?e.getTime():null}},4946:(e,t,r)=>{"use strict";const s=r(375),n=r(1687),a=r(8068),i=r(8160),o=r(3292),l=r(6354),c=r(6133),u={};e.exports=a.extend({type:"alternatives",flags:{match:{default:"any"}},terms:{matches:{init:[],register:c.toSibling}},args(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),s=1;s<t;s++)r[s-1]=arguments[s];return 1===r.length&&Array.isArray(r[0])?e.try(...r[0]):e.try(...r)},validate(e,t){const{schema:r,error:s,state:a,prefs:i}=t;if(r._flags.match){const t=[],o=[];for(let s=0;s<r.$_terms.matches.length;++s){const n=r.$_terms.matches[s],l=a.nest(n.schema,`match.${s}`);l.snapshot();const c=n.schema.$_validate(e,l,i);c.errors?(o.push(c.errors),l.restore()):(t.push(c.value),l.commit())}if(0===t.length)return{errors:s("alternatives.any",{details:o.map((e=>l.details(e,{override:!1})))})};if("one"===r._flags.match)return 1===t.length?{value:t[0]}:{errors:s("alternatives.one")};if(t.length!==r.$_terms.matches.length)return{errors:s("alternatives.all",{details:o.map((e=>l.details(e,{override:!1})))})};const c=e=>e.$_terms.matches.some((e=>"object"===e.schema.type||"alternatives"===e.schema.type&&c(e.schema)));return c(r)?{value:t.reduce(((e,t)=>n(e,t,{mergeArrays:!1})))}:{value:t[t.length-1]}}const o=[];for(let t=0;t<r.$_terms.matches.length;++t){const s=r.$_terms.matches[t];if(s.schema){const r=a.nest(s.schema,`match.${t}`);r.snapshot();const n=s.schema.$_validate(e,r,i);if(!n.errors)return r.commit(),n;r.restore(),o.push({schema:s.schema,reports:n.errors});continue}const n=s.ref?s.ref.resolve(e,a,i):e,l=s.is?[s]:s.switch;for(let r=0;r<l.length;++r){const o=l[r],{is:c,then:u,otherwise:f}=o,h=`match.${t}${s.switch?"."+r:""}`;if(c.$_match(n,a.nest(c,`${h}.is`),i)){if(u)return u.$_validate(e,a.nest(u,`${h}.then`),i)}else if(f)return f.$_validate(e,a.nest(f,`${h}.otherwise`),i)}}return u.errors(o,t)},rules:{conditional:{method(e,t){s(!this._flags._endedSwitch,"Unreachable condition"),s(!this._flags.match,"Cannot combine match mode",this._flags.match,"with conditional rule"),s(void 0===t.break,"Cannot use break option with alternatives conditional");const r=this.clone(),n=o.when(r,e,t),a=n.is?[n]:n.switch;for(const e of a)if(e.then&&e.otherwise){r.$_setFlag("_endedSwitch",!0,{clone:!1});break}return r.$_terms.matches.push(n),r.$_mutateRebuild()}},match:{method(e){if(s(["any","one","all"].includes(e),"Invalid alternatives match mode",e),"any"!==e)for(const t of this.$_terms.matches)s(t.schema,"Cannot combine match mode",e,"with conditional rules");return this.$_setFlag("match",e)}},try:{method(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];s(t.length,"Missing alternative schemas"),i.verifyFlat(t,"try"),s(!this._flags._endedSwitch,"Unreachable condition");const n=this.clone();for(const e of t)n.$_terms.matches.push({schema:n.$_compile(e)});return n.$_mutateRebuild()}}},overrides:{label(e){return this.$_parent("label",e).$_modify({each:(t,r)=>"is"!==r.path[0]?t.label(e):void 0,ref:!1})}},rebuild(e){e.$_modify({each:t=>{i.isSchema(t)&&"array"===t.type&&e.$_setFlag("_arrayItems",!0,{clone:!1})}})},manifest:{build(e,t){if(t.matches)for(const r of t.matches){const{schema:t,ref:s,is:n,not:a,then:i,otherwise:o}=r;e=t?e.try(t):s?e.conditional(s,{is:n,then:i,not:a,otherwise:o,switch:r.switch}):e.conditional(n,{then:i,otherwise:o})}return e}},messages:{"alternatives.all":"{{#label}} does not match all of the required types","alternatives.any":"{{#label}} does not match any of the allowed types","alternatives.match":"{{#label}} does not match any of the allowed types","alternatives.one":"{{#label}} matches more than one allowed type","alternatives.types":"{{#label}} must be one of {{#types}}"}}),u.errors=function(e,t){let{error:r,state:s}=t;if(!e.length)return{errors:r("alternatives.any")};if(1===e.length)return{errors:e[0].reports};const n=new Set,a=[];for(const{reports:t,schema:i}of e){if(t.length>1)return u.unmatched(e,r);const o=t[0];if(o instanceof l.Report==0)return u.unmatched(e,r);if(o.state.path.length!==s.path.length){a.push({type:i.type,report:o});continue}if("any.only"===o.code){for(const e of o.local.valids)n.add(e);continue}const[c,f]=o.code.split(".");"base"===f?n.add(c):a.push({type:i.type,report:o})}return a.length?1===a.length?{errors:a[0].report}:u.unmatched(e,r):{errors:r("alternatives.types",{types:[...n]})}},u.unmatched=function(e,t){const r=[];for(const t of e)r.push(...t.reports);return{errors:t("alternatives.match",l.details(r,{override:!1}))}}},8068:(e,t,r)=>{"use strict";const s=r(375),n=r(7629),a=r(8160),i=r(6914);e.exports=n.extend({type:"any",flags:{only:{default:!1}},terms:{alterations:{init:null},examples:{init:null},externals:{init:null},metas:{init:[]},notes:{init:[]},shared:{init:null},tags:{init:[]},whens:{init:null}},rules:{custom:{method(e,t){return s("function"==typeof e,"Method must be a function"),s(void 0===t||t&&"string"==typeof t,"Description must be a non-empty string"),this.$_addRule({name:"custom",args:{method:e,description:t}})},validate(e,t,r){let{method:s}=r;try{return s(e,t)}catch(e){return t.error("any.custom",{error:e})}},args:["method","description"],multi:!0},messages:{method(e){return this.prefs({messages:e})}},shared:{method(e){s(a.isSchema(e)&&e._flags.id,"Schema must be a schema with an id");const t=this.clone();return t.$_terms.shared=t.$_terms.shared||[],t.$_terms.shared.push(e),t.$_mutateRegister(e),t}},warning:{method(e,t){return s(e&&"string"==typeof e,"Invalid warning code"),this.$_addRule({name:"warning",args:{code:e,local:t},warn:!0})},validate(e,t,r){let{code:s,local:n}=r;return t.error(s,n)},args:["code","local"],multi:!0}},modifiers:{keep(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];e.keep=t},message(e,t){e.message=i.compile(t)},warn(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];e.warn=t}},manifest:{build(e,t){for(const r in t){const s=t[r];if(["examples","externals","metas","notes","tags"].includes(r))for(const t of s)e=e[r.slice(0,-1)](t);else if("alterations"!==r)if("whens"!==r){if("shared"===r)for(const t of s)e=e.shared(t)}else for(const t of s){const{ref:r,is:s,not:n,then:a,otherwise:i,concat:o}=t;e=o?e.concat(o):r?e.when(r,{is:s,not:n,then:a,otherwise:i,switch:t.switch,break:t.break}):e.when(s,{then:a,otherwise:i,break:t.break})}else{const t={};for(const{target:e,adjuster:r}of s)t[e]=r;e=e.alter(t)}}return e}},messages:{"any.custom":"{{#label}} failed custom validation because {{#error.message}}","any.default":"{{#label}} threw an error when running default method","any.failover":"{{#label}} threw an error when running failover method","any.invalid":"{{#label}} contains an invalid value","any.only":'{{#label}} must be {if(#valids.length == 1, "", "one of ")}{{#valids}}',"any.ref":"{{#label}} {{#arg}} references {{:#ref}} which {{#reason}}","any.required":"{{#label}} is required","any.unknown":"{{#label}} is not allowed"}})},546:(e,t,r)=>{"use strict";const s=r(375),n=r(9474),a=r(9621),i=r(8068),o=r(8160),l=r(3292),c={};e.exports=i.extend({type:"array",flags:{single:{default:!1},sparse:{default:!1}},terms:{items:{init:[],manifest:"schema"},ordered:{init:[],manifest:"schema"},_exclusions:{init:[]},_inclusions:{init:[]},_requireds:{init:[]}},coerce:{from:"object",method(e,t){let{schema:r,state:s,prefs:n}=t;if(!Array.isArray(e))return;const a=r.$_getRule("sort");return a?c.sort(r,e,a.args.options,s,n):void 0}},validate(e,t){let{schema:r,error:s}=t;if(!Array.isArray(e)){if(r._flags.single){const t=[e];return t[o.symbols.arraySingle]=!0,{value:t}}return{errors:s("array.base")}}if(r.$_getRule("items")||r.$_terms.externals)return{value:e.slice()}},rules:{has:{method(e){e=this.$_compile(e,{appendPath:!0});const t=this.$_addRule({name:"has",args:{schema:e}});return t.$_mutateRegister(e),t},validate(e,t,r){let{state:s,prefs:n,error:a}=t,{schema:i}=r;const o=[e,...s.ancestors];for(let t=0;t<e.length;++t){const r=s.localize([...s.path,t],o,i);if(i.$_match(e[t],r,n))return e}const l=i._flags.label;return l?a("array.hasKnown",{patternLabel:l}):a("array.hasUnknown",null)},multi:!0},items:{method(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];o.verifyFlat(t,"items");const s=this.$_addRule("items");for(let e=0;e<t.length;++e){const r=o.tryWithPath((()=>this.$_compile(t[e])),e,{append:!0});s.$_terms.items.push(r)}return s.$_mutateRebuild()},validate(e,t){let{schema:r,error:s,state:n,prefs:a,errorsArray:i}=t;const l=r.$_terms._requireds.slice(),u=r.$_terms.ordered.slice(),f=[...r.$_terms._inclusions,...l],h=!e[o.symbols.arraySingle];delete e[o.symbols.arraySingle];const m=i();let d=e.length;for(let t=0;t<d;++t){const i=e[t];let o=!1,p=!1;const g=h?t:new Number(t),y=[...n.path,g];if(!r._flags.sparse&&void 0===i){if(m.push(s("array.sparse",{key:g,path:y,pos:t,value:void 0},n.localize(y))),a.abortEarly)return m;u.shift();continue}const b=[e,...n.ancestors];for(const e of r.$_terms._exclusions)if(e.$_match(i,n.localize(y,b,e),a,{presence:"ignore"})){if(m.push(s("array.excludes",{pos:t,value:i},n.localize(y))),a.abortEarly)return m;o=!0,u.shift();break}if(o)continue;if(r.$_terms.ordered.length){if(u.length){const o=u.shift(),l=o.$_validate(i,n.localize(y,b,o),a);if(l.errors){if(m.push(...l.errors),a.abortEarly)return m}else if("strip"===o._flags.result)c.fastSplice(e,t),--t,--d;else{if(!r._flags.sparse&&void 0===l.value){if(m.push(s("array.sparse",{key:g,path:y,pos:t,value:void 0},n.localize(y))),a.abortEarly)return m;continue}e[t]=l.value}continue}if(!r.$_terms.items.length){if(m.push(s("array.orderedLength",{pos:t,limit:r.$_terms.ordered.length})),a.abortEarly)return m;break}}const v=[];let _=l.length;for(let o=0;o<_;++o){const u=n.localize(y,b,l[o]);u.snapshot();const f=l[o].$_validate(i,u,a);if(v[o]=f,!f.errors){if(u.commit(),e[t]=f.value,p=!0,c.fastSplice(l,o),--o,--_,!r._flags.sparse&&void 0===f.value&&(m.push(s("array.sparse",{key:g,path:y,pos:t,value:void 0},n.localize(y))),a.abortEarly))return m;break}u.restore()}if(p)continue;const w=a.stripUnknown&&!!a.stripUnknown.arrays||!1;_=f.length;for(const u of f){let f;const h=l.indexOf(u);if(-1!==h)f=v[h];else{const l=n.localize(y,b,u);if(l.snapshot(),f=u.$_validate(i,l,a),!f.errors){l.commit(),"strip"===u._flags.result?(c.fastSplice(e,t),--t,--d):r._flags.sparse||void 0!==f.value?e[t]=f.value:(m.push(s("array.sparse",{key:g,path:y,pos:t,value:void 0},n.localize(y))),o=!0),p=!0;break}l.restore()}if(1===_){if(w){c.fastSplice(e,t),--t,--d,p=!0;break}if(m.push(...f.errors),a.abortEarly)return m;o=!0;break}}if(!o&&(r.$_terms._inclusions.length||r.$_terms._requireds.length)&&!p){if(w){c.fastSplice(e,t),--t,--d;continue}if(m.push(s("array.includes",{pos:t,value:i},n.localize(y))),a.abortEarly)return m}}return l.length&&c.fillMissedErrors(r,m,l,e,n,a),u.length&&(c.fillOrderedErrors(r,m,u,e,n,a),m.length||c.fillDefault(u,e,n,a)),m.length?m:e},priority:!0,manifest:!1},length:{method(e){return this.$_addRule({name:"length",args:{limit:e},operator:"="})},validate(e,t,r,s){let{limit:n}=r,{name:a,operator:i,args:l}=s;return o.compare(e.length,n,i)?e:t.error("array."+a,{limit:l.limit,value:e})},args:[{name:"limit",ref:!0,assert:o.limit,message:"must be a positive integer"}]},max:{method(e){return this.$_addRule({name:"max",method:"length",args:{limit:e},operator:"<="})}},min:{method(e){return this.$_addRule({name:"min",method:"length",args:{limit:e},operator:">="})}},ordered:{method(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];o.verifyFlat(t,"ordered");const s=this.$_addRule("items");for(let e=0;e<t.length;++e){const r=o.tryWithPath((()=>this.$_compile(t[e])),e,{append:!0});c.validateSingle(r,s),s.$_mutateRegister(r),s.$_terms.ordered.push(r)}return s.$_mutateRebuild()}},single:{method(e){const t=void 0===e||!!e;return s(!t||!this._flags._arrayItems,"Cannot specify single rule when array has array items"),this.$_setFlag("single",t)}},sort:{method(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o.assertOptions(e,["by","order"]);const t={order:e.order||"ascending"};return e.by&&(t.by=l.ref(e.by,{ancestor:0}),s(!t.by.ancestor,"Cannot sort by ancestor")),this.$_addRule({name:"sort",args:{options:t}})},validate(e,t,r){let{error:s,state:n,prefs:a,schema:i}=t,{options:o}=r;const{value:l,errors:u}=c.sort(i,e,o,n,a);if(u)return u;for(let t=0;t<e.length;++t)if(e[t]!==l[t])return s("array.sort",{order:o.order,by:o.by?o.by.key:"value"});return e},convert:!0},sparse:{method(e){const t=void 0===e||!!e;return this._flags.sparse===t?this:(t?this.clone():this.$_addRule("items")).$_setFlag("sparse",t,{clone:!1})}},unique:{method(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};s(!e||"function"==typeof e||"string"==typeof e,"comparator must be a function or a string"),o.assertOptions(t,["ignoreUndefined","separator"]);const r={name:"unique",args:{options:t,comparator:e}};if(e)if("string"==typeof e){const s=o.default(t.separator,".");r.path=s?e.split(s):[e]}else r.comparator=e;return this.$_addRule(r)},validate(e,t,r,i){let{state:o,error:l,schema:c}=t,{comparator:u,options:f}=r,{comparator:h,path:m}=i;const d={string:Object.create(null),number:Object.create(null),undefined:Object.create(null),boolean:Object.create(null),object:new Map,function:new Map,custom:new Map},p=h||n,g=f.ignoreUndefined;for(let t=0;t<e.length;++t){const r=m?a(e[t],m):e[t],n=h?d.custom:d[typeof r];if(s(n,"Failed to find unique map container for type",typeof r),n instanceof Map){const s=n.entries();let a;for(;!(a=s.next()).done;)if(p(a.value[0],r)){const r=o.localize([...o.path,t],[e,...o.ancestors]),s={pos:t,value:e[t],dupePos:a.value[1],dupeValue:e[a.value[1]]};return m&&(s.path=u),l("array.unique",s,r)}n.set(r,t)}else{if((!g||void 0!==r)&&void 0!==n[r]){const s={pos:t,value:e[t],dupePos:n[r],dupeValue:e[n[r]]};return m&&(s.path=u),l("array.unique",s,o.localize([...o.path,t],[e,...o.ancestors]))}n[r]=t}}return e},args:["comparator","options"],multi:!0}},cast:{set:{from:Array.isArray,to:(e,t)=>new Set(e)}},rebuild(e){e.$_terms._inclusions=[],e.$_terms._exclusions=[],e.$_terms._requireds=[];for(const t of e.$_terms.items)c.validateSingle(t,e),"required"===t._flags.presence?e.$_terms._requireds.push(t):"forbidden"===t._flags.presence?e.$_terms._exclusions.push(t):e.$_terms._inclusions.push(t);for(const t of e.$_terms.ordered)c.validateSingle(t,e)},manifest:{build:(e,t)=>(t.items&&(e=e.items(...t.items)),t.ordered&&(e=e.ordered(...t.ordered)),e)},messages:{"array.base":"{{#label}} must be an array","array.excludes":"{{#label}} contains an excluded value","array.hasKnown":"{{#label}} does not contain at least one required match for type {:#patternLabel}","array.hasUnknown":"{{#label}} does not contain at least one required match","array.includes":"{{#label}} does not match any of the allowed types","array.includesRequiredBoth":"{{#label}} does not contain {{#knownMisses}} and {{#unknownMisses}} other required value(s)","array.includesRequiredKnowns":"{{#label}} does not contain {{#knownMisses}}","array.includesRequiredUnknowns":"{{#label}} does not contain {{#unknownMisses}} required value(s)","array.length":"{{#label}} must contain {{#limit}} items","array.max":"{{#label}} must contain less than or equal to {{#limit}} items","array.min":"{{#label}} must contain at least {{#limit}} items","array.orderedLength":"{{#label}} must contain at most {{#limit}} items","array.sort":"{{#label}} must be sorted in {#order} order by {{#by}}","array.sort.mismatching":"{{#label}} cannot be sorted due to mismatching types","array.sort.unsupported":"{{#label}} cannot be sorted due to unsupported type {#type}","array.sparse":"{{#label}} must not be a sparse array item","array.unique":"{{#label}} contains a duplicate value"}}),c.fillMissedErrors=function(e,t,r,s,n,a){const i=[];let o=0;for(const e of r){const t=e._flags.label;t?i.push(t):++o}i.length?o?t.push(e.$_createError("array.includesRequiredBoth",s,{knownMisses:i,unknownMisses:o},n,a)):t.push(e.$_createError("array.includesRequiredKnowns",s,{knownMisses:i},n,a)):t.push(e.$_createError("array.includesRequiredUnknowns",s,{unknownMisses:o},n,a))},c.fillOrderedErrors=function(e,t,r,s,n,a){const i=[];for(const e of r)"required"===e._flags.presence&&i.push(e);i.length&&c.fillMissedErrors(e,t,i,s,n,a)},c.fillDefault=function(e,t,r,s){const n=[];let a=!0;for(let i=e.length-1;i>=0;--i){const o=e[i],l=[t,...r.ancestors],c=o.$_validate(void 0,r.localize(r.path,l,o),s).value;if(a){if(void 0===c)continue;a=!1}n.unshift(c)}n.length&&t.push(...n)},c.fastSplice=function(e,t){let r=t;for(;r<e.length;)e[r++]=e[r];--e.length},c.validateSingle=function(e,t){("array"===e.type||e._flags._arrayItems)&&(s(!t._flags.single,"Cannot specify array item with single rule enabled"),t.$_setFlag("_arrayItems",!0,{clone:!1}))},c.sort=function(e,t,r,s,n){const a="ascending"===r.order?1:-1,i=-1*a,o=a,l=(l,u)=>{let f=c.compare(l,u,i,o);if(null!==f)return f;if(r.by&&(l=r.by.resolve(l,s,n),u=r.by.resolve(u,s,n)),f=c.compare(l,u,i,o),null!==f)return f;const h=typeof l;if(h!==typeof u)throw e.$_createError("array.sort.mismatching",t,null,s,n);if("number"!==h&&"string"!==h)throw e.$_createError("array.sort.unsupported",t,{type:h},s,n);return"number"===h?(l-u)*a:l<u?i:o};try{return{value:t.slice().sort(l)}}catch(e){return{errors:e}}},c.compare=function(e,t,r,s){return e===t?0:void 0===e?1:void 0===t?-1:null===e?s:null===t?r:null}},4937:(e,t,r)=>{"use strict";const s=r(375),n=r(8068),a=r(8160),i=r(2036),o={isBool:function(e){return"boolean"==typeof e}};e.exports=n.extend({type:"boolean",flags:{sensitive:{default:!1}},terms:{falsy:{init:null,manifest:"values"},truthy:{init:null,manifest:"values"}},coerce(e,t){let{schema:r}=t;if("boolean"!=typeof e){if("string"==typeof e){const t=r._flags.sensitive?e:e.toLowerCase();e="true"===t||"false"!==t&&e}return"boolean"!=typeof e&&(e=r.$_terms.truthy&&r.$_terms.truthy.has(e,null,null,!r._flags.sensitive)||(!r.$_terms.falsy||!r.$_terms.falsy.has(e,null,null,!r._flags.sensitive))&&e),{value:e}}},validate(e,t){let{error:r}=t;if("boolean"!=typeof e)return{value:e,errors:r("boolean.base")}},rules:{truthy:{method(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];a.verifyFlat(t,"truthy");const n=this.clone();n.$_terms.truthy=n.$_terms.truthy||new i;for(let e=0;e<t.length;++e){const r=t[e];s(void 0!==r,"Cannot call truthy with undefined"),n.$_terms.truthy.add(r)}return n}},falsy:{method(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];a.verifyFlat(t,"falsy");const n=this.clone();n.$_terms.falsy=n.$_terms.falsy||new i;for(let e=0;e<t.length;++e){const r=t[e];s(void 0!==r,"Cannot call falsy with undefined"),n.$_terms.falsy.add(r)}return n}},sensitive:{method(){let e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return this.$_setFlag("sensitive",e)}}},cast:{number:{from:o.isBool,to:(e,t)=>e?1:0},string:{from:o.isBool,to:(e,t)=>e?"true":"false"}},manifest:{build:(e,t)=>(t.truthy&&(e=e.truthy(...t.truthy)),t.falsy&&(e=e.falsy(...t.falsy)),e)},messages:{"boolean.base":"{{#label}} must be a boolean"}})},7500:(e,t,r)=>{"use strict";const s=r(375),n=r(8068),a=r(8160),i=r(3328),o={isDate:function(e){return e instanceof Date}};e.exports=n.extend({type:"date",coerce:{from:["number","string"],method(e,t){let{schema:r}=t;return{value:o.parse(e,r._flags.format)||e}}},validate(e,t){let{schema:r,error:s,prefs:n}=t;if(e instanceof Date&&!isNaN(e.getTime()))return;const a=r._flags.format;return n.convert&&a&&"string"==typeof e?{value:e,errors:s("date.format",{format:a})}:{value:e,errors:s("date.base")}},rules:{compare:{method:!1,validate(e,t,r,s){let{date:n}=r,{name:i,operator:o,args:l}=s;const c="now"===n?Date.now():n.getTime();return a.compare(e.getTime(),c,o)?e:t.error("date."+i,{limit:l.date,value:e})},args:[{name:"date",ref:!0,normalize:e=>"now"===e?e:o.parse(e),assert:e=>null!==e,message:"must have a valid date format"}]},format:{method(e){return s(["iso","javascript","unix"].includes(e),"Unknown date format",e),this.$_setFlag("format",e)}},greater:{method(e){return this.$_addRule({name:"greater",method:"compare",args:{date:e},operator:">"})}},iso:{method(){return this.format("iso")}},less:{method(e){return this.$_addRule({name:"less",method:"compare",args:{date:e},operator:"<"})}},max:{method(e){return this.$_addRule({name:"max",method:"compare",args:{date:e},operator:"<="})}},min:{method(e){return this.$_addRule({name:"min",method:"compare",args:{date:e},operator:">="})}},timestamp:{method(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"javascript";return s(["javascript","unix"].includes(e),'"type" must be one of "javascript, unix"'),this.format(e)}}},cast:{number:{from:o.isDate,to:(e,t)=>e.getTime()},string:{from:o.isDate,to(e,t){let{prefs:r}=t;return i.date(e,r)}}},messages:{"date.base":"{{#label}} must be a valid date","date.format":'{{#label}} must be in {msg("date.format." + #format) || #format} format',"date.greater":"{{#label}} must be greater than {{:#limit}}","date.less":"{{#label}} must be less than {{:#limit}}","date.max":"{{#label}} must be less than or equal to {{:#limit}}","date.min":"{{#label}} must be greater than or equal to {{:#limit}}","date.format.iso":"ISO 8601 date","date.format.javascript":"timestamp or number of milliseconds","date.format.unix":"timestamp or number of seconds"}}),o.parse=function(e,t){if(e instanceof Date)return e;if("string"!=typeof e&&(isNaN(e)||!isFinite(e)))return null;if(/^\s*$/.test(e))return null;if("iso"===t)return a.isIsoDate(e)?o.date(e.toString()):null;const r=e;if("string"==typeof e&&/^[+-]?\d+(\.\d+)?$/.test(e)&&(e=parseFloat(e)),t){if("javascript"===t)return o.date(1*e);if("unix"===t)return o.date(1e3*e);if("string"==typeof r)return null}return o.date(e)},o.date=function(e){const t=new Date(e);return isNaN(t.getTime())?null:t}},390:(e,t,r)=>{"use strict";const s=r(375),n=r(7824);e.exports=n.extend({type:"function",properties:{typeof:"function"},rules:{arity:{method(e){return s(Number.isSafeInteger(e)&&e>=0,"n must be a positive integer"),this.$_addRule({name:"arity",args:{n:e}})},validate(e,t,r){let{n:s}=r;return e.length===s?e:t.error("function.arity",{n:s})}},class:{method(){return this.$_addRule("class")},validate:(e,t)=>/^\s*class\s/.test(e.toString())?e:t.error("function.class",{value:e})},minArity:{method(e){return s(Number.isSafeInteger(e)&&e>0,"n must be a strict positive integer"),this.$_addRule({name:"minArity",args:{n:e}})},validate(e,t,r){let{n:s}=r;return e.length>=s?e:t.error("function.minArity",{n:s})}},maxArity:{method(e){return s(Number.isSafeInteger(e)&&e>=0,"n must be a positive integer"),this.$_addRule({name:"maxArity",args:{n:e}})},validate(e,t,r){let{n:s}=r;return e.length<=s?e:t.error("function.maxArity",{n:s})}}},messages:{"function.arity":"{{#label}} must have an arity of {{#n}}","function.class":"{{#label}} must be a class","function.maxArity":"{{#label}} must have an arity lesser or equal to {{#n}}","function.minArity":"{{#label}} must have an arity greater or equal to {{#n}}"}})},7824:(e,t,r)=>{"use strict";const s=r(978),n=r(375),a=r(8571),i=r(3652),o=r(8068),l=r(8160),c=r(3292),u=r(6354),f=r(6133),h=r(3328),m={renameDefaults:{alias:!1,multiple:!1,override:!1}};e.exports=o.extend({type:"_keys",properties:{typeof:"object"},flags:{unknown:{default:!1}},terms:{dependencies:{init:null},keys:{init:null,manifest:{mapped:{from:"schema",to:"key"}}},patterns:{init:null},renames:{init:null}},args:(e,t)=>e.keys(t),validate(e,t){let{schema:r,error:s,state:n,prefs:a}=t;if(!e||typeof e!==r.$_property("typeof")||Array.isArray(e))return{value:e,errors:s("object.base",{type:r.$_property("typeof")})};if(!(r.$_terms.renames||r.$_terms.dependencies||r.$_terms.keys||r.$_terms.patterns||r.$_terms.externals))return;e=m.clone(e,a);const i=[];if(r.$_terms.renames&&!m.rename(r,e,n,a,i))return{value:e,errors:i};if(!r.$_terms.keys&&!r.$_terms.patterns&&!r.$_terms.dependencies)return{value:e,errors:i};const o=new Set(Object.keys(e));if(r.$_terms.keys){const t=[e,...n.ancestors];for(const s of r.$_terms.keys){const r=s.key,l=e[r];o.delete(r);const c=n.localize([...n.path,r],t,s),u=s.schema.$_validate(l,c,a);if(u.errors){if(a.abortEarly)return{value:e,errors:u.errors};void 0!==u.value&&(e[r]=u.value),i.push(...u.errors)}else"strip"===s.schema._flags.result||void 0===u.value&&void 0!==l?delete e[r]:void 0!==u.value&&(e[r]=u.value)}}if(o.size||r._flags._hasPatternMatch){const t=m.unknown(r,e,o,i,n,a);if(t)return t}if(r.$_terms.dependencies)for(const t of r.$_terms.dependencies){if(null!==t.key&&!1===m.isPresent(t.options)(t.key.resolve(e,n,a,null,{shadow:!1})))continue;const s=m.dependencies[t.rel](r,t,e,n,a);if(s){const t=r.$_createError(s.code,e,s.context,n,a);if(a.abortEarly)return{value:e,errors:t};i.push(t)}}return{value:e,errors:i}},rules:{and:{method(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return l.verifyFlat(t,"and"),m.dependency(this,"and",null,t)}},append:{method(e){return null==e||0===Object.keys(e).length?this:this.keys(e)}},assert:{method(e,t,r){h.isTemplate(e)||(e=c.ref(e)),n(void 0===r||"string"==typeof r,"Message must be a string"),t=this.$_compile(t,{appendPath:!0});const s=this.$_addRule({name:"assert",args:{subject:e,schema:t,message:r}});return s.$_mutateRegister(e),s.$_mutateRegister(t),s},validate(e,t,r){let{error:s,prefs:n,state:a}=t,{subject:i,schema:o,message:l}=r;const c=i.resolve(e,a,n),u=f.isRef(i)?i.absolute(a):[];return o.$_match(c,a.localize(u,[e,...a.ancestors],o),n)?e:s("object.assert",{subject:i,message:l})},args:["subject","schema","message"],multi:!0},instance:{method(e,t){return n("function"==typeof e,"constructor must be a function"),t=t||e.name,this.$_addRule({name:"instance",args:{constructor:e,name:t}})},validate(e,t,r){let{constructor:s,name:n}=r;return e instanceof s?e:t.error("object.instance",{type:n,value:e})},args:["constructor","name"]},keys:{method(e){n(void 0===e||"object"==typeof e,"Object schema must be a valid object"),n(!l.isSchema(e),"Object schema cannot be a joi schema");const t=this.clone();if(e)if(Object.keys(e).length){t.$_terms.keys=t.$_terms.keys?t.$_terms.keys.filter((t=>!e.hasOwnProperty(t.key))):new m.Keys;for(const r in e)l.tryWithPath((()=>t.$_terms.keys.push({key:r,schema:this.$_compile(e[r])})),r)}else t.$_terms.keys=new m.Keys;else t.$_terms.keys=null;return t.$_mutateRebuild()}},length:{method(e){return this.$_addRule({name:"length",args:{limit:e},operator:"="})},validate(e,t,r,s){let{limit:n}=r,{name:a,operator:i,args:o}=s;return l.compare(Object.keys(e).length,n,i)?e:t.error("object."+a,{limit:o.limit,value:e})},args:[{name:"limit",ref:!0,assert:l.limit,message:"must be a positive integer"}]},max:{method(e){return this.$_addRule({name:"max",method:"length",args:{limit:e},operator:"<="})}},min:{method(e){return this.$_addRule({name:"min",method:"length",args:{limit:e},operator:">="})}},nand:{method(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return l.verifyFlat(t,"nand"),m.dependency(this,"nand",null,t)}},or:{method(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return l.verifyFlat(t,"or"),m.dependency(this,"or",null,t)}},oxor:{method(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return m.dependency(this,"oxor",null,t)}},pattern:{method(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const s=e instanceof RegExp;s||(e=this.$_compile(e,{appendPath:!0})),n(void 0!==t,"Invalid rule"),l.assertOptions(r,["fallthrough","matches"]),s&&n(!e.flags.includes("g")&&!e.flags.includes("y"),"pattern should not use global or sticky mode"),t=this.$_compile(t,{appendPath:!0});const a=this.clone();a.$_terms.patterns=a.$_terms.patterns||[];const i={[s?"regex":"schema"]:e,rule:t};return r.matches&&(i.matches=this.$_compile(r.matches),"array"!==i.matches.type&&(i.matches=i.matches.$_root.array().items(i.matches)),a.$_mutateRegister(i.matches),a.$_setFlag("_hasPatternMatch",!0,{clone:!1})),r.fallthrough&&(i.fallthrough=!0),a.$_terms.patterns.push(i),a.$_mutateRegister(t),a}},ref:{method(){return this.$_addRule("ref")},validate:(e,t)=>f.isRef(e)?e:t.error("object.refType",{value:e})},regex:{method(){return this.$_addRule("regex")},validate:(e,t)=>e instanceof RegExp?e:t.error("object.regex",{value:e})},rename:{method(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};n("string"==typeof e||e instanceof RegExp,"Rename missing the from argument"),n("string"==typeof t||t instanceof h,"Invalid rename to argument"),n(t!==e,"Cannot rename key to same name:",e),l.assertOptions(r,["alias","ignoreUndefined","override","multiple"]);const a=this.clone();a.$_terms.renames=a.$_terms.renames||[];for(const t of a.$_terms.renames)n(t.from!==e,"Cannot rename the same key multiple times");return t instanceof h&&a.$_mutateRegister(t),a.$_terms.renames.push({from:e,to:t,options:s(m.renameDefaults,r)}),a}},schema:{method(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"any";return this.$_addRule({name:"schema",args:{type:e}})},validate(e,t,r){let{type:s}=r;return!l.isSchema(e)||"any"!==s&&e.type!==s?t.error("object.schema",{type:s}):e}},unknown:{method(e){return this.$_setFlag("unknown",!1!==e)}},with:{method(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return m.dependency(this,"with",e,t,r)}},without:{method(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return m.dependency(this,"without",e,t,r)}},xor:{method(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return l.verifyFlat(t,"xor"),m.dependency(this,"xor",null,t)}}},overrides:{default(e,t){return void 0===e&&(e=l.symbols.deepDefault),this.$_parent("default",e,t)}},rebuild(e){if(e.$_terms.keys){const t=new i.Sorter;for(const r of e.$_terms.keys)l.tryWithPath((()=>t.add(r,{after:r.schema.$_rootReferences(),group:r.key})),r.key);e.$_terms.keys=new m.Keys(...t.nodes)}},manifest:{build(e,t){if(t.keys&&(e=e.keys(t.keys)),t.dependencies)for(const{rel:r,key:s=null,peers:n,options:a}of t.dependencies)e=m.dependency(e,r,s,n,a);if(t.patterns)for(const{regex:r,schema:s,rule:n,fallthrough:a,matches:i}of t.patterns)e=e.pattern(r||s,n,{fallthrough:a,matches:i});if(t.renames)for(const{from:r,to:s,options:n}of t.renames)e=e.rename(r,s,n);return e}},messages:{"object.and":"{{#label}} contains {{#presentWithLabels}} without its required peers {{#missingWithLabels}}","object.assert":'{{#label}} is invalid because {if(#subject.key, `"` + #subject.key + `" failed to ` + (#message || "pass the assertion test"), #message || "the assertion failed")}',"object.base":"{{#label}} must be of type {{#type}}","object.instance":"{{#label}} must be an instance of {{:#type}}","object.length":'{{#label}} must have {{#limit}} key{if(#limit == 1, "", "s")}',"object.max":'{{#label}} must have less than or equal to {{#limit}} key{if(#limit == 1, "", "s")}',"object.min":'{{#label}} must have at least {{#limit}} key{if(#limit == 1, "", "s")}',"object.missing":"{{#label}} must contain at least one of {{#peersWithLabels}}","object.nand":"{{:#mainWithLabel}} must not exist simultaneously with {{#peersWithLabels}}","object.oxor":"{{#label}} contains a conflict between optional exclusive peers {{#peersWithLabels}}","object.pattern.match":"{{#label}} keys failed to match pattern requirements","object.refType":"{{#label}} must be a Joi reference","object.regex":"{{#label}} must be a RegExp object","object.rename.multiple":"{{#label}} cannot rename {{:#from}} because multiple renames are disabled and another key was already renamed to {{:#to}}","object.rename.override":"{{#label}} cannot rename {{:#from}} because override is disabled and target {{:#to}} exists","object.schema":"{{#label}} must be a Joi schema of {{#type}} type","object.unknown":"{{#label}} is not allowed","object.with":"{{:#mainWithLabel}} missing required peer {{:#peerWithLabel}}","object.without":"{{:#mainWithLabel}} conflict with forbidden peer {{:#peerWithLabel}}","object.xor":"{{#label}} contains a conflict between exclusive peers {{#peersWithLabels}}"}}),m.clone=function(e,t){if("object"==typeof e){if(t.nonEnumerables)return a(e,{shallow:!0});const r=Object.create(Object.getPrototypeOf(e));return Object.assign(r,e),r}const r=function(){for(var t=arguments.length,r=new Array(t),s=0;s<t;s++)r[s]=arguments[s];return e.apply(this,r)};return r.prototype=a(e.prototype),Object.defineProperty(r,"name",{value:e.name,writable:!1}),Object.defineProperty(r,"length",{value:e.length,writable:!1}),Object.assign(r,e),r},m.dependency=function(e,t,r,s,a){n(null===r||"string"==typeof r,t,"key must be a strings"),a||(a=s.length>1&&"object"==typeof s[s.length-1]?s.pop():{}),l.assertOptions(a,["separator","isPresent"]),s=[].concat(s);const i=l.default(a.separator,"."),o=[];for(const e of s)n("string"==typeof e,t,"peers must be strings"),o.push(c.ref(e,{separator:i,ancestor:0,prefix:!1}));null!==r&&(r=c.ref(r,{separator:i,ancestor:0,prefix:!1}));const u=e.clone();return u.$_terms.dependencies=u.$_terms.dependencies||[],u.$_terms.dependencies.push(new m.Dependency(t,r,o,s,a)),u},m.dependencies={and(e,t,r,s,n){const a=[],i=[],o=t.peers.length,l=m.isPresent(t.options);for(const e of t.peers)!1===l(e.resolve(r,s,n,null,{shadow:!1}))?a.push(e.key):i.push(e.key);if(a.length!==o&&i.length!==o)return{code:"object.and",context:{present:i,presentWithLabels:m.keysToLabels(e,i),missing:a,missingWithLabels:m.keysToLabels(e,a)}}},nand(e,t,r,s,n){const a=[],i=m.isPresent(t.options);for(const e of t.peers)i(e.resolve(r,s,n,null,{shadow:!1}))&&a.push(e.key);if(a.length!==t.peers.length)return;const o=t.paths[0],l=t.paths.slice(1);return{code:"object.nand",context:{main:o,mainWithLabel:m.keysToLabels(e,o),peers:l,peersWithLabels:m.keysToLabels(e,l)}}},or(e,t,r,s,n){const a=m.isPresent(t.options);for(const e of t.peers)if(a(e.resolve(r,s,n,null,{shadow:!1})))return;return{code:"object.missing",context:{peers:t.paths,peersWithLabels:m.keysToLabels(e,t.paths)}}},oxor(e,t,r,s,n){const a=[],i=m.isPresent(t.options);for(const e of t.peers)i(e.resolve(r,s,n,null,{shadow:!1}))&&a.push(e.key);if(!a.length||1===a.length)return;const o={peers:t.paths,peersWithLabels:m.keysToLabels(e,t.paths)};return o.present=a,o.presentWithLabels=m.keysToLabels(e,a),{code:"object.oxor",context:o}},with(e,t,r,s,n){const a=m.isPresent(t.options);for(const i of t.peers)if(!1===a(i.resolve(r,s,n,null,{shadow:!1})))return{code:"object.with",context:{main:t.key.key,mainWithLabel:m.keysToLabels(e,t.key.key),peer:i.key,peerWithLabel:m.keysToLabels(e,i.key)}}},without(e,t,r,s,n){const a=m.isPresent(t.options);for(const i of t.peers)if(a(i.resolve(r,s,n,null,{shadow:!1})))return{code:"object.without",context:{main:t.key.key,mainWithLabel:m.keysToLabels(e,t.key.key),peer:i.key,peerWithLabel:m.keysToLabels(e,i.key)}}},xor(e,t,r,s,n){const a=[],i=m.isPresent(t.options);for(const e of t.peers)i(e.resolve(r,s,n,null,{shadow:!1}))&&a.push(e.key);if(1===a.length)return;const o={peers:t.paths,peersWithLabels:m.keysToLabels(e,t.paths)};return 0===a.length?{code:"object.missing",context:o}:(o.present=a,o.presentWithLabels=m.keysToLabels(e,a),{code:"object.xor",context:o})}},m.keysToLabels=function(e,t){return Array.isArray(t)?t.map((t=>e.$_mapLabels(t))):e.$_mapLabels(t)},m.isPresent=function(e){return"function"==typeof e.isPresent?e.isPresent:e=>void 0!==e},m.rename=function(e,t,r,s,n){const a={};for(const i of e.$_terms.renames){const o=[],l="string"!=typeof i.from;if(l)for(const e in t){if(void 0===t[e]&&i.options.ignoreUndefined)continue;if(e===i.to)continue;const r=i.from.exec(e);r&&o.push({from:e,to:i.to,match:r})}else!Object.prototype.hasOwnProperty.call(t,i.from)||void 0===t[i.from]&&i.options.ignoreUndefined||o.push(i);for(const c of o){const o=c.from;let u=c.to;if(u instanceof h&&(u=u.render(t,r,s,c.match)),o!==u){if(!i.options.multiple&&a[u]&&(n.push(e.$_createError("object.rename.multiple",t,{from:o,to:u,pattern:l},r,s)),s.abortEarly))return!1;if(Object.prototype.hasOwnProperty.call(t,u)&&!i.options.override&&!a[u]&&(n.push(e.$_createError("object.rename.override",t,{from:o,to:u,pattern:l},r,s)),s.abortEarly))return!1;void 0===t[o]?delete t[u]:t[u]=t[o],a[u]=!0,i.options.alias||delete t[o]}}}return!0},m.unknown=function(e,t,r,s,n,a){if(e.$_terms.patterns){let i=!1;const o=e.$_terms.patterns.map((e=>{if(e.matches)return i=!0,[]})),l=[t,...n.ancestors];for(const i of r){const c=t[i],u=[...n.path,i];for(let f=0;f<e.$_terms.patterns.length;++f){const h=e.$_terms.patterns[f];if(h.regex){const e=h.regex.test(i);if(n.mainstay.tracer.debug(n,"rule",`pattern.${f}`,e?"pass":"error"),!e)continue}else if(!h.schema.$_match(i,n.nest(h.schema,`pattern.${f}`),a))continue;r.delete(i);const m=n.localize(u,l,{schema:h.rule,key:i}),d=h.rule.$_validate(c,m,a);if(d.errors){if(a.abortEarly)return{value:t,errors:d.errors};s.push(...d.errors)}if(h.matches&&o[f].push(i),t[i]=d.value,!h.fallthrough)break}}if(i)for(let r=0;r<o.length;++r){const i=o[r];if(!i)continue;const c=e.$_terms.patterns[r].matches,f=n.localize(n.path,l,c),h=c.$_validate(i,f,a);if(h.errors){const r=u.details(h.errors,{override:!1});r.matches=i;const o=e.$_createError("object.pattern.match",t,r,n,a);if(a.abortEarly)return{value:t,errors:o};s.push(o)}}}if(r.size&&(e.$_terms.keys||e.$_terms.patterns)){if(a.stripUnknown&&!e._flags.unknown||a.skipFunctions){const e=!(!a.stripUnknown||!0!==a.stripUnknown&&!a.stripUnknown.objects);for(const s of r)e?(delete t[s],r.delete(s)):"function"==typeof t[s]&&r.delete(s)}if(!l.default(e._flags.unknown,a.allowUnknown))for(const i of r){const r=n.localize([...n.path,i],[]),o=e.$_createError("object.unknown",t[i],{child:i},r,a,{flags:!1});if(a.abortEarly)return{value:t,errors:o};s.push(o)}}},m.Dependency=class{constructor(e,t,r,s,n){this.rel=e,this.key=t,this.peers=r,this.paths=s,this.options=n}describe(){const e={rel:this.rel,peers:this.paths};return null!==this.key&&(e.key=this.key.key),"."!==this.peers[0].separator&&(e.options={...e.options,separator:this.peers[0].separator}),this.options.isPresent&&(e.options={...e.options,isPresent:this.options.isPresent}),e}},m.Keys=class extends Array{concat(e){const t=this.slice(),r=new Map;for(let e=0;e<t.length;++e)r.set(t[e].key,e);for(const s of e){const e=s.key,n=r.get(e);void 0!==n?t[n]={key:e,schema:t[n].schema.concat(s.schema)}:t.push(s)}return t}}},8785:(e,t,r)=>{"use strict";const s=r(375),n=r(8068),a=r(8160),i=r(3292),o=r(6354),l={};e.exports=n.extend({type:"link",properties:{schemaChain:!0},terms:{link:{init:null,manifest:"single",register:!1}},args:(e,t)=>e.ref(t),validate(e,t){let{schema:r,state:n,prefs:a}=t;s(r.$_terms.link,"Uninitialized link schema");const i=l.generate(r,e,n,a),o=r.$_terms.link[0].ref;return i.$_validate(e,n.nest(i,`link:${o.display}:${i.type}`),a)},generate:(e,t,r,s)=>l.generate(e,t,r,s),rules:{ref:{method(e){s(!this.$_terms.link,"Cannot reinitialize schema"),e=i.ref(e),s("value"===e.type||"local"===e.type,"Invalid reference type:",e.type),s("local"===e.type||"root"===e.ancestor||e.ancestor>0,"Link cannot reference itself");const t=this.clone();return t.$_terms.link=[{ref:e}],t}},relative:{method(){let e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return this.$_setFlag("relative",e)}}},overrides:{concat(e){s(this.$_terms.link,"Uninitialized link schema"),s(a.isSchema(e),"Invalid schema object"),s("link"!==e.type,"Cannot merge type link with another link");const t=this.clone();return t.$_terms.whens||(t.$_terms.whens=[]),t.$_terms.whens.push({concat:e}),t.$_mutateRebuild()}},manifest:{build:(e,t)=>(s(t.link,"Invalid link description missing link"),e.ref(t.link))}}),l.generate=function(e,t,r,s){let n=r.mainstay.links.get(e);if(n)return n._generate(t,r,s).schema;const a=e.$_terms.link[0].ref,{perspective:i,path:o}=l.perspective(a,r);l.assert(i,"which is outside of schema boundaries",a,e,r,s);try{n=o.length?i.$_reach(o):i}catch(t){l.assert(!1,"to non-existing schema",a,e,r,s)}return l.assert("link"!==n.type,"which is another link",a,e,r,s),e._flags.relative||r.mainstay.links.set(e,n),n._generate(t,r,s).schema},l.perspective=function(e,t){if("local"===e.type){for(const{schema:r,key:s}of t.schemas){if((r._flags.id||s)===e.path[0])return{perspective:r,path:e.path.slice(1)};if(r.$_terms.shared)for(const t of r.$_terms.shared)if(t._flags.id===e.path[0])return{perspective:t,path:e.path.slice(1)}}return{perspective:null,path:null}}return"root"===e.ancestor?{perspective:t.schemas[t.schemas.length-1].schema,path:e.path}:{perspective:t.schemas[e.ancestor]&&t.schemas[e.ancestor].schema,path:e.path}},l.assert=function(e,t,r,n,a,i){e||s(!1,`"${o.label(n._flags,a,i)}" contains link reference "${r.display}" ${t}`)}},3832:(e,t,r)=>{"use strict";const s=r(375),n=r(8068),a=r(8160),i={numberRx:/^\s*[+-]?(?:(?:\d+(?:\.\d*)?)|(?:\.\d+))(?:e([+-]?\d+))?\s*$/i,precisionRx:/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/,exponentialPartRegex:/[eE][+-]?\d+$/,leadingSignAndZerosRegex:/^[+-]?(0*)?/,dotRegex:/\./,trailingZerosRegex:/0+$/};e.exports=n.extend({type:"number",flags:{unsafe:{default:!1}},coerce:{from:"string",method(e,t){let{schema:r,error:s}=t;if(!e.match(i.numberRx))return;e=e.trim();const n={value:parseFloat(e)};if(0===n.value&&(n.value=0),!r._flags.unsafe)if(e.match(/e/i)){if(i.extractSignificantDigits(e)!==i.extractSignificantDigits(String(n.value)))return n.errors=s("number.unsafe"),n}else{const t=n.value.toString();if(t.match(/e/i))return n;if(t!==i.normalizeDecimal(e))return n.errors=s("number.unsafe"),n}return n}},validate(e,t){let{schema:r,error:s,prefs:n}=t;if(e===1/0||e===-1/0)return{value:e,errors:s("number.infinity")};if(!a.isNumber(e))return{value:e,errors:s("number.base")};const i={value:e};if(n.convert){const e=r.$_getRule("precision");if(e){const t=Math.pow(10,e.args.limit);i.value=Math.round(i.value*t)/t}}return 0===i.value&&(i.value=0),!r._flags.unsafe&&(e>Number.MAX_SAFE_INTEGER||e<Number.MIN_SAFE_INTEGER)&&(i.errors=s("number.unsafe")),i},rules:{compare:{method:!1,validate(e,t,r,s){let{limit:n}=r,{name:i,operator:o,args:l}=s;return a.compare(e,n,o)?e:t.error("number."+i,{limit:l.limit,value:e})},args:[{name:"limit",ref:!0,assert:a.isNumber,message:"must be a number"}]},greater:{method(e){return this.$_addRule({name:"greater",method:"compare",args:{limit:e},operator:">"})}},integer:{method(){return this.$_addRule("integer")},validate:(e,t)=>Math.trunc(e)-e==0?e:t.error("number.integer")},less:{method(e){return this.$_addRule({name:"less",method:"compare",args:{limit:e},operator:"<"})}},max:{method(e){return this.$_addRule({name:"max",method:"compare",args:{limit:e},operator:"<="})}},min:{method(e){return this.$_addRule({name:"min",method:"compare",args:{limit:e},operator:">="})}},multiple:{method(e){return this.$_addRule({name:"multiple",args:{base:e}})},validate(e,t,r,s){let{base:n}=r;return e*(1/n)%1==0?e:t.error("number.multiple",{multiple:s.args.base,value:e})},args:[{name:"base",ref:!0,assert:e=>"number"==typeof e&&isFinite(e)&&e>0,message:"must be a positive number"}],multi:!0},negative:{method(){return this.sign("negative")}},port:{method(){return this.$_addRule("port")},validate:(e,t)=>Number.isSafeInteger(e)&&e>=0&&e<=65535?e:t.error("number.port")},positive:{method(){return this.sign("positive")}},precision:{method(e){return s(Number.isSafeInteger(e),"limit must be an integer"),this.$_addRule({name:"precision",args:{limit:e}})},validate(e,t,r){let{limit:s}=r;const n=e.toString().match(i.precisionRx);return Math.max((n[1]?n[1].length:0)-(n[2]?parseInt(n[2],10):0),0)<=s?e:t.error("number.precision",{limit:s,value:e})},convert:!0},sign:{method(e){return s(["negative","positive"].includes(e),"Invalid sign",e),this.$_addRule({name:"sign",args:{sign:e}})},validate(e,t,r){let{sign:s}=r;return"negative"===s&&e<0||"positive"===s&&e>0?e:t.error(`number.${s}`)}},unsafe:{method(){let e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return s("boolean"==typeof e,"enabled must be a boolean"),this.$_setFlag("unsafe",e)}}},cast:{string:{from:e=>"number"==typeof e,to:(e,t)=>e.toString()}},messages:{"number.base":"{{#label}} must be a number","number.greater":"{{#label}} must be greater than {{#limit}}","number.infinity":"{{#label}} cannot be infinity","number.integer":"{{#label}} must be an integer","number.less":"{{#label}} must be less than {{#limit}}","number.max":"{{#label}} must be less than or equal to {{#limit}}","number.min":"{{#label}} must be greater than or equal to {{#limit}}","number.multiple":"{{#label}} must be a multiple of {{#multiple}}","number.negative":"{{#label}} must be a negative number","number.port":"{{#label}} must be a valid port","number.positive":"{{#label}} must be a positive number","number.precision":"{{#label}} must have no more than {{#limit}} decimal places","number.unsafe":"{{#label}} must be a safe number"}}),i.extractSignificantDigits=function(e){return e.replace(i.exponentialPartRegex,"").replace(i.dotRegex,"").replace(i.trailingZerosRegex,"").replace(i.leadingSignAndZerosRegex,"")},i.normalizeDecimal=function(e){return(e=e.replace(/^\+/,"").replace(/\.0*$/,"").replace(/^(-?)\.([^\.]*)$/,"$10.$2").replace(/^(-?)0+([0-9])/,"$1$2")).includes(".")&&e.endsWith("0")&&(e=e.replace(/0+$/,"")),"-0"===e?"0":e}},8966:(e,t,r)=>{"use strict";const s=r(7824);e.exports=s.extend({type:"object",cast:{map:{from:e=>e&&"object"==typeof e,to:(e,t)=>new Map(Object.entries(e))}}})},7417:(e,t,r)=>{"use strict";const s=r(375),n=r(5380),a=r(1745),i=r(9959),o=r(6064),l=r(9926),c=r(5752),u=r(8068),f=r(8160),h={tlds:l instanceof Set&&{tlds:{allow:l,deny:null}},base64Regex:{true:{true:/^(?:[\w\-]{2}[\w\-]{2})*(?:[\w\-]{2}==|[\w\-]{3}=)?$/,false:/^(?:[A-Za-z0-9+\/]{2}[A-Za-z0-9+\/]{2})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/},false:{true:/^(?:[\w\-]{2}[\w\-]{2})*(?:[\w\-]{2}(==)?|[\w\-]{3}=?)?$/,false:/^(?:[A-Za-z0-9+\/]{2}[A-Za-z0-9+\/]{2})*(?:[A-Za-z0-9+\/]{2}(==)?|[A-Za-z0-9+\/]{3}=?)?$/}},dataUriRegex:/^data:[\w+.-]+\/[\w+.-]+;((charset=[\w-]+|base64),)?(.*)$/,hexRegex:/^[a-f0-9]+$/i,ipRegex:i.regex({cidr:"forbidden"}).regex,isoDurationRegex:/^P(?!$)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?$/,guidBrackets:{"{":"}","[":"]","(":")","":""},guidVersions:{uuidv1:"1",uuidv2:"2",uuidv3:"3",uuidv4:"4",uuidv5:"5"},guidSeparators:new Set([void 0,!0,!1,"-",":"]),normalizationForms:["NFC","NFD","NFKC","NFKD"]};e.exports=u.extend({type:"string",flags:{insensitive:{default:!1},truncate:{default:!1}},terms:{replacements:{init:null}},coerce:{from:"string",method(e,t){let{schema:r,state:s,prefs:n}=t;const a=r.$_getRule("normalize");a&&(e=e.normalize(a.args.form));const i=r.$_getRule("case");i&&(e="upper"===i.args.direction?e.toLocaleUpperCase():e.toLocaleLowerCase());const o=r.$_getRule("trim");if(o&&o.args.enabled&&(e=e.trim()),r.$_terms.replacements)for(const t of r.$_terms.replacements)e=e.replace(t.pattern,t.replacement);const l=r.$_getRule("hex");if(l&&l.args.options.byteAligned&&e.length%2!=0&&(e=`0${e}`),r.$_getRule("isoDate")){const t=h.isoDate(e);t&&(e=t)}if(r._flags.truncate){const t=r.$_getRule("max");if(t){let a=t.args.limit;if(f.isResolvable(a)&&(a=a.resolve(e,s,n),!f.limit(a)))return{value:e,errors:r.$_createError("any.ref",a,{ref:t.args.limit,arg:"limit",reason:"must be a positive integer"},s,n)};e=e.slice(0,a)}}return{value:e}}},validate(e,t){let{schema:r,error:s}=t;if("string"!=typeof e)return{value:e,errors:s("string.base")};if(""===e){const t=r.$_getRule("min");if(t&&0===t.args.limit)return;return{value:e,errors:s("string.empty")}}},rules:{alphanum:{method(){return this.$_addRule("alphanum")},validate:(e,t)=>/^[a-zA-Z0-9]+$/.test(e)?e:t.error("string.alphanum")},base64:{method(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return f.assertOptions(e,["paddingRequired","urlSafe"]),e={urlSafe:!1,paddingRequired:!0,...e},s("boolean"==typeof e.paddingRequired,"paddingRequired must be boolean"),s("boolean"==typeof e.urlSafe,"urlSafe must be boolean"),this.$_addRule({name:"base64",args:{options:e}})},validate(e,t,r){let{options:s}=r;return h.base64Regex[s.paddingRequired][s.urlSafe].test(e)?e:t.error("string.base64")}},case:{method(e){return s(["lower","upper"].includes(e),"Invalid case:",e),this.$_addRule({name:"case",args:{direction:e}})},validate(e,t,r){let{direction:s}=r;return"lower"===s&&e===e.toLocaleLowerCase()||"upper"===s&&e===e.toLocaleUpperCase()?e:t.error(`string.${s}case`)},convert:!0},creditCard:{method(){return this.$_addRule("creditCard")},validate(e,t){let r=e.length,s=0,n=1;for(;r--;){const t=e.charAt(r)*n;s+=t-9*(t>9),n^=3}return s>0&&s%10==0?e:t.error("string.creditCard")}},dataUri:{method(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return f.assertOptions(e,["paddingRequired"]),e={paddingRequired:!0,...e},s("boolean"==typeof e.paddingRequired,"paddingRequired must be boolean"),this.$_addRule({name:"dataUri",args:{options:e}})},validate(e,t,r){let{options:s}=r;const n=e.match(h.dataUriRegex);if(n){if(!n[2])return e;if("base64"!==n[2])return e;if(h.base64Regex[s.paddingRequired].false.test(n[3]))return e}return t.error("string.dataUri")}},domain:{method(e){e&&f.assertOptions(e,["allowFullyQualified","allowUnicode","maxDomainSegments","minDomainSegments","tlds"]);const t=h.addressOptions(e);return this.$_addRule({name:"domain",args:{options:e},address:t})},validate(e,t,r,s){let{address:a}=s;return n.isValid(e,a)?e:t.error("string.domain")}},email:{method(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};f.assertOptions(e,["allowFullyQualified","allowUnicode","ignoreLength","maxDomainSegments","minDomainSegments","multiple","separator","tlds"]),s(void 0===e.multiple||"boolean"==typeof e.multiple,"multiple option must be an boolean");const t=h.addressOptions(e),r=new RegExp(`\\s*[${e.separator?o(e.separator):","}]\\s*`);return this.$_addRule({name:"email",args:{options:e},regex:r,address:t})},validate(e,t,r,s){let{options:n}=r,{regex:i,address:o}=s;const l=n.multiple?e.split(i):[e],c=[];for(const e of l)a.isValid(e,o)||c.push(e);return c.length?t.error("string.email",{value:e,invalids:c}):e}},guid:{alias:"uuid",method(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};f.assertOptions(e,["version","separator"]);let t="";if(e.version){const r=[].concat(e.version);s(r.length>=1,"version must have at least 1 valid version specified");const n=new Set;for(let e=0;e<r.length;++e){const a=r[e];s("string"==typeof a,"version at position "+e+" must be a string");const i=h.guidVersions[a.toLowerCase()];s(i,"version at position "+e+" must be one of "+Object.keys(h.guidVersions).join(", ")),s(!n.has(i),"version at position "+e+" must not be a duplicate"),t+=i,n.add(i)}}s(h.guidSeparators.has(e.separator),'separator must be one of true, false, "-", or ":"');const r=void 0===e.separator?"[:-]?":!0===e.separator?"[:-]":!1===e.separator?"[]?":`\\${e.separator}`,n=new RegExp(`^([\\[{\\(]?)[0-9A-F]{8}(${r})[0-9A-F]{4}\\2?[${t||"0-9A-F"}][0-9A-F]{3}\\2?[${t?"89AB":"0-9A-F"}][0-9A-F]{3}\\2?[0-9A-F]{12}([\\]}\\)]?)$`,"i");return this.$_addRule({name:"guid",args:{options:e},regex:n})},validate(e,t,r,s){let{regex:n}=s;const a=n.exec(e);return a?h.guidBrackets[a[1]]!==a[a.length-1]?t.error("string.guid"):e:t.error("string.guid")}},hex:{method(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return f.assertOptions(e,["byteAligned"]),e={byteAligned:!1,...e},s("boolean"==typeof e.byteAligned,"byteAligned must be boolean"),this.$_addRule({name:"hex",args:{options:e}})},validate(e,t,r){let{options:s}=r;return h.hexRegex.test(e)?s.byteAligned&&e.length%2!=0?t.error("string.hexAlign"):e:t.error("string.hex")}},hostname:{method(){return this.$_addRule("hostname")},validate:(e,t)=>n.isValid(e,{minDomainSegments:1})||h.ipRegex.test(e)?e:t.error("string.hostname")},insensitive:{method(){return this.$_setFlag("insensitive",!0)}},ip:{method(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};f.assertOptions(e,["cidr","version"]);const{cidr:t,versions:r,regex:s}=i.regex(e),n=e.version?r:void 0;return this.$_addRule({name:"ip",args:{options:{cidr:t,version:n}},regex:s})},validate(e,t,r,s){let{options:n}=r,{regex:a}=s;return a.test(e)?e:n.version?t.error("string.ipVersion",{value:e,cidr:n.cidr,version:n.version}):t.error("string.ip",{value:e,cidr:n.cidr})}},isoDate:{method(){return this.$_addRule("isoDate")},validate(e,t){let{error:r}=t;return h.isoDate(e)?e:r("string.isoDate")}},isoDuration:{method(){return this.$_addRule("isoDuration")},validate:(e,t)=>h.isoDurationRegex.test(e)?e:t.error("string.isoDuration")},length:{method(e,t){return h.length(this,"length",e,"=",t)},validate(e,t,r,s){let{limit:n,encoding:a}=r,{name:i,operator:o,args:l}=s;const c=!a&&e.length;return f.compare(c,n,o)?e:t.error("string."+i,{limit:l.limit,value:e,encoding:a})},args:[{name:"limit",ref:!0,assert:f.limit,message:"must be a positive integer"},"encoding"]},lowercase:{method(){return this.case("lower")}},max:{method(e,t){return h.length(this,"max",e,"<=",t)},args:["limit","encoding"]},min:{method(e,t){return h.length(this,"min",e,">=",t)},args:["limit","encoding"]},normalize:{method(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"NFC";return s(h.normalizationForms.includes(e),"normalization form must be one of "+h.normalizationForms.join(", ")),this.$_addRule({name:"normalize",args:{form:e}})},validate(e,t,r){let{error:s}=t,{form:n}=r;return e===e.normalize(n)?e:s("string.normalize",{value:e,form:n})},convert:!0},pattern:{alias:"regex",method(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};s(e instanceof RegExp,"regex must be a RegExp"),s(!e.flags.includes("g")&&!e.flags.includes("y"),"regex should not use global or sticky mode"),"string"==typeof t&&(t={name:t}),f.assertOptions(t,["invert","name"]);const r=["string.pattern",t.invert?".invert":"",t.name?".name":".base"].join("");return this.$_addRule({name:"pattern",args:{regex:e,options:t},errorCode:r})},validate(e,t,r,s){let{regex:n,options:a}=r,{errorCode:i}=s;return n.test(e)^a.invert?e:t.error(i,{name:a.name,regex:n,value:e})},args:["regex","options"],multi:!0},replace:{method(e,t){"string"==typeof e&&(e=new RegExp(o(e),"g")),s(e instanceof RegExp,"pattern must be a RegExp"),s("string"==typeof t,"replacement must be a String");const r=this.clone();return r.$_terms.replacements||(r.$_terms.replacements=[]),r.$_terms.replacements.push({pattern:e,replacement:t}),r}},token:{method(){return this.$_addRule("token")},validate:(e,t)=>/^\w+$/.test(e)?e:t.error("string.token")},trim:{method(){let e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return s("boolean"==typeof e,"enabled must be a boolean"),this.$_addRule({name:"trim",args:{enabled:e}})},validate(e,t,r){let{enabled:s}=r;return s&&e!==e.trim()?t.error("string.trim"):e},convert:!0},truncate:{method(){let e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return s("boolean"==typeof e,"enabled must be a boolean"),this.$_setFlag("truncate",e)}},uppercase:{method(){return this.case("upper")}},uri:{method(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};f.assertOptions(e,["allowRelative","allowQuerySquareBrackets","domain","relativeOnly","scheme"]),e.domain&&f.assertOptions(e.domain,["allowFullyQualified","allowUnicode","maxDomainSegments","minDomainSegments","tlds"]);const{regex:t,scheme:r}=c.regex(e),s=e.domain?h.addressOptions(e.domain):null;return this.$_addRule({name:"uri",args:{options:e},regex:t,domain:s,scheme:r})},validate(e,t,r,s){let{options:a}=r,{regex:i,domain:o,scheme:l}=s;if(["http:/","https:/"].includes(e))return t.error("string.uri");const c=i.exec(e);if(c){const r=c[1]||c[2];return!o||a.allowRelative&&!r||n.isValid(r,o)?e:t.error("string.domain",{value:r})}return a.relativeOnly?t.error("string.uriRelativeOnly"):a.scheme?t.error("string.uriCustomScheme",{scheme:l,value:e}):t.error("string.uri")}}},manifest:{build(e,t){if(t.replacements)for(const{pattern:r,replacement:s}of t.replacements)e=e.replace(r,s);return e}},messages:{"string.alphanum":"{{#label}} must only contain alpha-numeric characters","string.base":"{{#label}} must be a string","string.base64":"{{#label}} must be a valid base64 string","string.creditCard":"{{#label}} must be a credit card","string.dataUri":"{{#label}} must be a valid dataUri string","string.domain":"{{#label}} must contain a valid domain name","string.email":"{{#label}} must be a valid email","string.empty":"{{#label}} is not allowed to be empty","string.guid":"{{#label}} must be a valid GUID","string.hex":"{{#label}} must only contain hexadecimal characters","string.hexAlign":"{{#label}} hex decoded representation must be byte aligned","string.hostname":"{{#label}} must be a valid hostname","string.ip":"{{#label}} must be a valid ip address with a {{#cidr}} CIDR","string.ipVersion":"{{#label}} must be a valid ip address of one of the following versions {{#version}} with a {{#cidr}} CIDR","string.isoDate":"{{#label}} must be in iso format","string.isoDuration":"{{#label}} must be a valid ISO 8601 duration","string.length":"{{#label}} length must be {{#limit}} characters long","string.lowercase":"{{#label}} must only contain lowercase characters","string.max":"{{#label}} length must be less than or equal to {{#limit}} characters long","string.min":"{{#label}} length must be at least {{#limit}} characters long","string.normalize":"{{#label}} must be unicode normalized in the {{#form}} form","string.token":"{{#label}} must only contain alpha-numeric and underscore characters","string.pattern.base":"{{#label}} with value {:[.]} fails to match the required pattern: {{#regex}}","string.pattern.name":"{{#label}} with value {:[.]} fails to match the {{#name}} pattern","string.pattern.invert.base":"{{#label}} with value {:[.]} matches the inverted pattern: {{#regex}}","string.pattern.invert.name":"{{#label}} with value {:[.]} matches the inverted {{#name}} pattern","string.trim":"{{#label}} must not have leading or trailing whitespace","string.uri":"{{#label}} must be a valid uri","string.uriCustomScheme":"{{#label}} must be a valid uri with a scheme matching the {{#scheme}} pattern","string.uriRelativeOnly":"{{#label}} must be a valid relative uri","string.uppercase":"{{#label}} must only contain uppercase characters"}}),h.addressOptions=function(e){if(!e)return e;if(s(void 0===e.minDomainSegments||Number.isSafeInteger(e.minDomainSegments)&&e.minDomainSegments>0,"minDomainSegments must be a positive integer"),s(void 0===e.maxDomainSegments||Number.isSafeInteger(e.maxDomainSegments)&&e.maxDomainSegments>0,"maxDomainSegments must be a positive integer"),!1===e.tlds)return e;if(!0===e.tlds||void 0===e.tlds)return s(h.tlds,"Built-in TLD list disabled"),Object.assign({},e,h.tlds);s("object"==typeof e.tlds,"tlds must be true, false, or an object");const t=e.tlds.deny;if(t)return Array.isArray(t)&&(e=Object.assign({},e,{tlds:{deny:new Set(t)}})),s(e.tlds.deny instanceof Set,"tlds.deny must be an array, Set, or boolean"),s(!e.tlds.allow,"Cannot specify both tlds.allow and tlds.deny lists"),h.validateTlds(e.tlds.deny,"tlds.deny"),e;const r=e.tlds.allow;return r?!0===r?(s(h.tlds,"Built-in TLD list disabled"),Object.assign({},e,h.tlds)):(Array.isArray(r)&&(e=Object.assign({},e,{tlds:{allow:new Set(r)}})),s(e.tlds.allow instanceof Set,"tlds.allow must be an array, Set, or boolean"),h.validateTlds(e.tlds.allow,"tlds.allow"),e):e},h.validateTlds=function(e,t){for(const r of e)s(n.isValid(r,{minDomainSegments:1,maxDomainSegments:1}),`${t} must contain valid top level domain names`)},h.isoDate=function(e){if(!f.isIsoDate(e))return null;/.*T.*[+-]\d\d$/.test(e)&&(e+="00");const t=new Date(e);return isNaN(t.getTime())?null:t.toISOString()},h.length=function(e,t,r,n,a){return s(!a||!1,"Invalid encoding:",a),e.$_addRule({name:t,method:"length",args:{limit:r,encoding:a},operator:n})}},8826:(e,t,r)=>{"use strict";const s=r(375),n=r(8068),a={};a.Map=class extends Map{slice(){return new a.Map(this)}},e.exports=n.extend({type:"symbol",terms:{map:{init:new a.Map}},coerce:{method(e,t){let{schema:r,error:s}=t;const n=r.$_terms.map.get(e);return n&&(e=n),r._flags.only&&"symbol"!=typeof e?{value:e,errors:s("symbol.map",{map:r.$_terms.map})}:{value:e}}},validate(e,t){let{error:r}=t;if("symbol"!=typeof e)return{value:e,errors:r("symbol.base")}},rules:{map:{method(e){e&&!e[Symbol.iterator]&&"object"==typeof e&&(e=Object.entries(e)),s(e&&e[Symbol.iterator],"Iterable must be an iterable or object");const t=this.clone(),r=[];for(const n of e){s(n&&n[Symbol.iterator],"Entry must be an iterable");const[e,a]=n;s("object"!=typeof e&&"function"!=typeof e&&"symbol"!=typeof e,"Key must not be of type object, function, or Symbol"),s("symbol"==typeof a,"Value must be a Symbol"),t.$_terms.map.set(e,a),r.push(a)}return t.valid(...r)}}},manifest:{build:(e,t)=>(t.map&&(e=e.map(t.map)),e)},messages:{"symbol.base":"{{#label}} must be a symbol","symbol.map":"{{#label}} must be one of {{#map}}"}})},8863:(e,t,r)=>{"use strict";const s=r(375),n=r(8571),a=r(738),i=r(9621),o=r(8160),l=r(6354),c=r(493),u={result:Symbol("result")};t.entry=function(e,t,r){let n=o.defaults;r&&(s(void 0===r.warnings,"Cannot override warnings preference in synchronous validation"),s(void 0===r.artifacts,"Cannot override artifacts preference in synchronous validation"),n=o.preferences(o.defaults,r));const a=u.entry(e,t,n);s(!a.mainstay.externals.length,"Schema with external rules must use validateAsync()");const i={value:a.value};return a.error&&(i.error=a.error),a.mainstay.warnings.length&&(i.warning=l.details(a.mainstay.warnings)),a.mainstay.debug&&(i.debug=a.mainstay.debug),a.mainstay.artifacts&&(i.artifacts=a.mainstay.artifacts),i},t.entryAsync=async function(e,t,r){let s=o.defaults;r&&(s=o.preferences(o.defaults,r));const n=u.entry(e,t,s),a=n.mainstay;if(n.error)throw a.debug&&(n.error.debug=a.debug),n.error;if(a.externals.length){let t=n.value;const c=[];for(const n of a.externals){const f=n.state.path,h="link"===n.schema.type?a.links.get(n.schema):null;let m,d,p=t;const g=f.length?[t]:[],y=f.length?i(e,f):e;if(f.length){m=f[f.length-1];let e=t;for(const t of f.slice(0,-1))e=e[t],g.unshift(e);d=g[0],p=d[m]}try{const e=(e,t)=>(h||n.schema).$_createError(e,p,t,n.state,s),i=await n.method(p,{schema:n.schema,linked:h,state:n.state,prefs:r,original:y,error:e,errorsArray:u.errorsArray,warn:(e,t)=>a.warnings.push((h||n.schema).$_createError(e,p,t,n.state,s)),message:(e,t)=>(h||n.schema).$_createError("external",p,t,n.state,s,{messages:e})});if(void 0===i||i===p)continue;if(i instanceof l.Report){if(a.tracer.log(n.schema,n.state,"rule","external","error"),c.push(i),s.abortEarly)break;continue}if(Array.isArray(i)&&i[o.symbols.errors]){if(a.tracer.log(n.schema,n.state,"rule","external","error"),c.push(...i),s.abortEarly)break;continue}d?(a.tracer.value(n.state,"rule",p,i,"external"),d[m]=i):(a.tracer.value(n.state,"rule",t,i,"external"),t=i)}catch(e){throw s.errors.label&&(e.message+=` (${n.label})`),e}}if(n.value=t,c.length)throw n.error=l.process(c,e,s),a.debug&&(n.error.debug=a.debug),n.error}if(!s.warnings&&!s.debug&&!s.artifacts)return n.value;const c={value:n.value};return a.warnings.length&&(c.warning=l.details(a.warnings)),a.debug&&(c.debug=a.debug),a.artifacts&&(c.artifacts=a.artifacts),c},u.Mainstay=class{constructor(e,t,r){this.externals=[],this.warnings=[],this.tracer=e,this.debug=t,this.links=r,this.shadow=null,this.artifacts=null,this._snapshots=[]}snapshot(){this._snapshots.push({externals:this.externals.slice(),warnings:this.warnings.slice()})}restore(){const e=this._snapshots.pop();this.externals=e.externals,this.warnings=e.warnings}commit(){this._snapshots.pop()}},u.entry=function(e,r,s){const{tracer:n,cleanup:a}=u.tracer(r,s),i=s.debug?[]:null,o=r._ids._schemaChain?new Map:null,f=new u.Mainstay(n,i,o),h=r._ids._schemaChain?[{schema:r}]:null,m=new c([],[],{mainstay:f,schemas:h}),d=t.validate(e,r,m,s);a&&r.$_root.untrace();const p=l.process(d.errors,e,s);return{value:d.value,error:p,mainstay:f}},u.tracer=function(e,t){return e.$_root._tracer?{tracer:e.$_root._tracer._register(e)}:t.debug?(s(e.$_root.trace,"Debug mode not supported"),{tracer:e.$_root.trace()._register(e),cleanup:!0}):{tracer:u.ignore}},t.validate=function(e,t,r,s){let n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{};if(t.$_terms.whens&&(t=t._generate(e,r,s).schema),t._preferences&&(s=u.prefs(t,s)),t._cache&&s.cache){const s=t._cache.get(e);if(r.mainstay.tracer.debug(r,"validate","cached",!!s),s)return s}const a=(n,a,i)=>t.$_createError(n,e,a,i||r,s),i={original:e,prefs:s,schema:t,state:r,error:a,errorsArray:u.errorsArray,warn:(e,t,s)=>r.mainstay.warnings.push(a(e,t,s)),message:(n,a)=>t.$_createError("custom",e,a,r,s,{messages:n})};r.mainstay.tracer.entry(t,r);const l=t._definition;if(l.prepare&&void 0!==e&&s.convert){const t=l.prepare(e,i);if(t){if(r.mainstay.tracer.value(r,"prepare",e,t.value),t.errors)return u.finalize(t.value,[].concat(t.errors),i);e=t.value}}if(l.coerce&&void 0!==e&&s.convert&&(!l.coerce.from||l.coerce.from.includes(typeof e))){const t=l.coerce.method(e,i);if(t){if(r.mainstay.tracer.value(r,"coerced",e,t.value),t.errors)return u.finalize(t.value,[].concat(t.errors),i);e=t.value}}const c=t._flags.empty;c&&c.$_match(u.trim(e,t),r.nest(c),o.defaults)&&(r.mainstay.tracer.value(r,"empty",e,void 0),e=void 0);const f=n.presence||t._flags.presence||(t._flags._endedSwitch?null:s.presence);if(void 0===e){if("forbidden"===f)return u.finalize(e,null,i);if("required"===f)return u.finalize(e,[t.$_createError("any.required",e,null,r,s)],i);if("optional"===f){if(t._flags.default!==o.symbols.deepDefault)return u.finalize(e,null,i);r.mainstay.tracer.value(r,"default",e,{}),e={}}}else if("forbidden"===f)return u.finalize(e,[t.$_createError("any.unknown",e,null,r,s)],i);const h=[];if(t._valids){const n=t._valids.get(e,r,s,t._flags.insensitive);if(n)return s.convert&&(r.mainstay.tracer.value(r,"valids",e,n.value),e=n.value),r.mainstay.tracer.filter(t,r,"valid",n),u.finalize(e,null,i);if(t._flags.only){const n=t.$_createError("any.only",e,{valids:t._valids.values({display:!0})},r,s);if(s.abortEarly)return u.finalize(e,[n],i);h.push(n)}}if(t._invalids){const n=t._invalids.get(e,r,s,t._flags.insensitive);if(n){r.mainstay.tracer.filter(t,r,"invalid",n);const a=t.$_createError("any.invalid",e,{invalids:t._invalids.values({display:!0})},r,s);if(s.abortEarly)return u.finalize(e,[a],i);h.push(a)}}if(l.validate){const t=l.validate(e,i);if(t&&(r.mainstay.tracer.value(r,"base",e,t.value),e=t.value,t.errors)){if(!Array.isArray(t.errors))return h.push(t.errors),u.finalize(e,h,i);if(t.errors.length)return h.push(...t.errors),u.finalize(e,h,i)}}return t._rules.length?u.rules(e,h,i):u.finalize(e,h,i)},u.rules=function(e,t,r){const{schema:s,state:n,prefs:a}=r;for(const i of s._rules){const l=s._definition.rules[i.method];if(l.convert&&a.convert){n.mainstay.tracer.log(s,n,"rule",i.name,"full");continue}let c,f=i.args;if(i._resolve.length){f=Object.assign({},f);for(const t of i._resolve){const r=l.argsByName.get(t),i=f[t].resolve(e,n,a),u=r.normalize?r.normalize(i):i,h=o.validateArg(u,null,r);if(h){c=s.$_createError("any.ref",i,{arg:t,ref:f[t],reason:h},n,a);break}f[t]=u}}c=c||l.validate(e,r,f,i);const h=u.rule(c,i);if(h.errors){if(n.mainstay.tracer.log(s,n,"rule",i.name,"error"),i.warn){n.mainstay.warnings.push(...h.errors);continue}if(a.abortEarly)return u.finalize(e,h.errors,r);t.push(...h.errors)}else n.mainstay.tracer.log(s,n,"rule",i.name,"pass"),n.mainstay.tracer.value(n,"rule",e,h.value,i.name),e=h.value}return u.finalize(e,t,r)},u.rule=function(e,t){return e instanceof l.Report?(u.error(e,t),{errors:[e],value:null}):Array.isArray(e)&&e[o.symbols.errors]?(e.forEach((e=>u.error(e,t))),{errors:e,value:null}):{errors:null,value:e}},u.error=function(e,t){return t.message&&e._setTemplate(t.message),e},u.finalize=function(e,t,r){t=t||[];const{schema:n,state:a,prefs:i}=r;if(t.length){const s=u.default("failover",void 0,t,r);void 0!==s&&(a.mainstay.tracer.value(a,"failover",e,s),e=s,t=[])}if(t.length&&n._flags.error)if("function"==typeof n._flags.error){t=n._flags.error(t),Array.isArray(t)||(t=[t]);for(const e of t)s(e instanceof Error||e instanceof l.Report,"error() must return an Error object")}else t=[n._flags.error];if(void 0===e){const s=u.default("default",e,t,r);a.mainstay.tracer.value(a,"default",e,s),e=s}if(n._flags.cast&&void 0!==e){const t=n._definition.cast[n._flags.cast];if(t.from(e)){const s=t.to(e,r);a.mainstay.tracer.value(a,"cast",e,s,n._flags.cast),e=s}}if(n.$_terms.externals&&i.externals&&!1!==i._externals)for(const{method:e}of n.$_terms.externals)a.mainstay.externals.push({method:e,schema:n,state:a,label:l.label(n._flags,a,i)});const o={value:e,errors:t.length?t:null};return n._flags.result&&(o.value="strip"===n._flags.result?void 0:r.original,a.mainstay.tracer.value(a,n._flags.result,e,o.value),a.shadow(e,n._flags.result)),n._cache&&!1!==i.cache&&!n._refs.length&&n._cache.set(r.original,o),void 0===e||o.errors||void 0===n._flags.artifact||(a.mainstay.artifacts=a.mainstay.artifacts||new Map,a.mainstay.artifacts.has(n._flags.artifact)||a.mainstay.artifacts.set(n._flags.artifact,[]),a.mainstay.artifacts.get(n._flags.artifact).push(a.path)),o},u.prefs=function(e,t){const r=t===o.defaults;return r&&e._preferences[o.symbols.prefs]?e._preferences[o.symbols.prefs]:(t=o.preferences(t,e._preferences),r&&(e._preferences[o.symbols.prefs]=t),t)},u.default=function(e,t,r,s){const{schema:a,state:i,prefs:l}=s,c=a._flags[e];if(l.noDefaults||void 0===c)return t;if(i.mainstay.tracer.log(a,i,"rule",e,"full"),!c)return c;if("function"==typeof c){const t=c.length?[n(i.ancestors[0]),s]:[];try{return c(...t)}catch(t){return void r.push(a.$_createError(`any.${e}`,null,{error:t},i,l))}}return"object"!=typeof c?c:c[o.symbols.literal]?c.literal:o.isResolvable(c)?c.resolve(t,i,l):n(c)},u.trim=function(e,t){if("string"!=typeof e)return e;const r=t.$_getRule("trim");return r&&r.args.enabled?e.trim():e},u.ignore={active:!1,debug:a,entry:a,filter:a,log:a,resolve:a,value:a},u.errorsArray=function(){const e=[];return e[o.symbols.errors]=!0,e}},2036:(e,t,r)=>{"use strict";const s=r(375),n=r(9474),a=r(8160),i={};e.exports=i.Values=class{constructor(e,t){this._values=new Set(e),this._refs=new Set(t),this._lowercase=i.lowercases(e),this._override=!1}get length(){return this._values.size+this._refs.size}add(e,t){a.isResolvable(e)?this._refs.has(e)||(this._refs.add(e),t&&t.register(e)):this.has(e,null,null,!1)||(this._values.add(e),"string"==typeof e&&this._lowercase.set(e.toLowerCase(),e))}static merge(e,t,r){if(e=e||new i.Values,t){if(t._override)return t.clone();for(const r of[...t._values,...t._refs])e.add(r)}if(r)for(const t of[...r._values,...r._refs])e.remove(t);return e.length?e:null}remove(e){a.isResolvable(e)?this._refs.delete(e):(this._values.delete(e),"string"==typeof e&&this._lowercase.delete(e.toLowerCase()))}has(e,t,r,s){return!!this.get(e,t,r,s)}get(e,t,r,s){if(!this.length)return!1;if(this._values.has(e))return{value:e};if("string"==typeof e&&e&&s){const t=this._lowercase.get(e.toLowerCase());if(t)return{value:t}}if(!this._refs.size&&"object"!=typeof e)return!1;if("object"==typeof e)for(const t of this._values)if(n(t,e))return{value:t};if(t)for(const a of this._refs){const i=a.resolve(e,t,r,null,{in:!0});if(void 0===i)continue;const o=a.in&&"object"==typeof i?Array.isArray(i)?i:Object.keys(i):[i];for(const t of o)if(typeof t==typeof e)if(s&&e&&"string"==typeof e){if(t.toLowerCase()===e.toLowerCase())return{value:t,ref:a}}else if(n(t,e))return{value:t,ref:a}}return!1}override(){this._override=!0}values(e){if(e&&e.display){const e=[];for(const t of[...this._values,...this._refs])void 0!==t&&e.push(t);return e}return Array.from([...this._values,...this._refs])}clone(){const e=new i.Values(this._values,this._refs);return e._override=this._override,e}concat(e){s(!e._override,"Cannot concat override set of values");const t=new i.Values([...this._values,...e._values],[...this._refs,...e._refs]);return t._override=this._override,t}describe(){const e=[];this._override&&e.push({override:!0});for(const t of this._values.values())e.push(t&&"object"==typeof t?{value:t}:t);for(const t of this._refs.values())e.push(t.describe());return e}},i.Values.prototype[a.symbols.values]=!0,i.Values.prototype.slice=i.Values.prototype.clone,i.lowercases=function(e){const t=new Map;if(e)for(const r of e)"string"==typeof r&&t.set(r.toLowerCase(),r);return t}},978:(e,t,r)=>{"use strict";const s=r(375),n=r(8571),a=r(1687),i=r(9621),o={};e.exports=function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(s(e&&"object"==typeof e,"Invalid defaults value: must be an object"),s(!t||!0===t||"object"==typeof t,"Invalid source value: must be true, falsy or an object"),s("object"==typeof r,"Invalid options: must be an object"),!t)return null;if(r.shallow)return o.applyToDefaultsWithShallow(e,t,r);const i=n(e);if(!0===t)return i;const l=void 0!==r.nullOverride&&r.nullOverride;return a(i,t,{nullOverride:l,mergeArrays:!1})},o.applyToDefaultsWithShallow=function(e,t,r){const l=r.shallow;s(Array.isArray(l),"Invalid keys");const c=new Map,u=!0===t?null:new Set;for(let r of l){r=Array.isArray(r)?r:r.split(".");const s=i(e,r);s&&"object"==typeof s?c.set(s,u&&i(t,r)||s):u&&u.add(r)}const f=n(e,{},c);if(!u)return f;for(const e of u)o.reachCopy(f,t,e);const h=void 0!==r.nullOverride&&r.nullOverride;return a(f,t,{nullOverride:h,mergeArrays:!1})},o.reachCopy=function(e,t,r){for(const e of r){if(!(e in t))return;const r=t[e];if("object"!=typeof r||null===r)return;t=r}const s=t;let n=e;for(let e=0;e<r.length-1;++e){const t=r[e];"object"!=typeof n[t]&&(n[t]={}),n=n[t]}n[r[r.length-1]]=s}},375:(e,t,r)=>{"use strict";const s=r(7916);e.exports=function(e){if(!e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];if(1===r.length&&r[0]instanceof Error)throw r[0];throw new s(r)}}},8571:(e,t,r)=>{"use strict";const s=r(9621),n=r(4277),a=r(7043),i={needsProtoHack:new Set([n.set,n.map,n.weakSet,n.weakMap])};e.exports=i.clone=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if("object"!=typeof e||null===e)return e;let s=i.clone,o=r;if(t.shallow){if(!0!==t.shallow)return i.cloneWithShallow(e,t);s=e=>e}else if(o){const t=o.get(e);if(t)return t}else o=new Map;const l=n.getInternalProto(e);if(l===n.buffer)return!1;if(l===n.date)return new Date(e.getTime());if(l===n.regex)return new RegExp(e);const c=i.base(e,l,t);if(c===e)return e;if(o&&o.set(e,c),l===n.set)for(const r of e)c.add(s(r,t,o));else if(l===n.map)for(const[r,n]of e)c.set(r,s(n,t,o));const u=a.keys(e,t);for(const r of u){if("__proto__"===r)continue;if(l===n.array&&"length"===r){c.length=e.length;continue}const a=Object.getOwnPropertyDescriptor(e,r);a?a.get||a.set?Object.defineProperty(c,r,a):a.enumerable?c[r]=s(e[r],t,o):Object.defineProperty(c,r,{enumerable:!1,writable:!0,configurable:!0,value:s(e[r],t,o)}):Object.defineProperty(c,r,{enumerable:!0,writable:!0,configurable:!0,value:s(e[r],t,o)})}return c},i.cloneWithShallow=function(e,t){const r=t.shallow;(t=Object.assign({},t)).shallow=!1;const n=new Map;for(const t of r){const r=s(e,t);"object"!=typeof r&&"function"!=typeof r||n.set(r,r)}return i.clone(e,t,n)},i.base=function(e,t,r){if(!1===r.prototype)return i.needsProtoHack.has(t)?new t.constructor:t===n.array?[]:{};const s=Object.getPrototypeOf(e);if(s&&s.isImmutable)return e;if(t===n.array){const e=[];return s!==t&&Object.setPrototypeOf(e,s),e}if(i.needsProtoHack.has(t)){const e=new s.constructor;return s!==t&&Object.setPrototypeOf(e,s),e}return Object.create(s)}},9474:(e,t,r)=>{"use strict";const s=r(4277),n={mismatched:null};e.exports=function(e,t,r){return r=Object.assign({prototype:!0},r),!!n.isDeepEqual(e,t,r,[])},n.isDeepEqual=function(e,t,r,a){if(e===t)return 0!==e||1/e==1/t;const i=typeof e;if(i!==typeof t)return!1;if(null===e||null===t)return!1;if("function"===i){if(!r.deepFunction||e.toString()!==t.toString())return!1}else if("object"!==i)return e!=e&&t!=t;const o=n.getSharedType(e,t,!!r.prototype);switch(o){case s.buffer:return!1;case s.promise:return e===t;case s.regex:return e.toString()===t.toString();case n.mismatched:return!1}for(let r=a.length-1;r>=0;--r)if(a[r].isSame(e,t))return!0;a.push(new n.SeenEntry(e,t));try{return!!n.isDeepEqualObj(o,e,t,r,a)}finally{a.pop()}},n.getSharedType=function(e,t,r){if(r)return Object.getPrototypeOf(e)!==Object.getPrototypeOf(t)?n.mismatched:s.getInternalProto(e);const a=s.getInternalProto(e);return a!==s.getInternalProto(t)?n.mismatched:a},n.valueOf=function(e){const t=e.valueOf;if(void 0===t)return e;try{return t.call(e)}catch(e){return e}},n.hasOwnEnumerableProperty=function(e,t){return Object.prototype.propertyIsEnumerable.call(e,t)},n.isSetSimpleEqual=function(e,t){for(const r of Set.prototype.values.call(e))if(!Set.prototype.has.call(t,r))return!1;return!0},n.isDeepEqualObj=function(e,t,r,a,i){const{isDeepEqual:o,valueOf:l,hasOwnEnumerableProperty:c}=n,{keys:u,getOwnPropertySymbols:f}=Object;if(e===s.array){if(!a.part){if(t.length!==r.length)return!1;for(let e=0;e<t.length;++e)if(!o(t[e],r[e],a,i))return!1;return!0}for(const e of t)for(const t of r)if(o(e,t,a,i))return!0}else if(e===s.set){if(t.size!==r.size)return!1;if(!n.isSetSimpleEqual(t,r)){const e=new Set(Set.prototype.values.call(r));for(const r of Set.prototype.values.call(t)){if(e.delete(r))continue;let t=!1;for(const s of e)if(o(r,s,a,i)){e.delete(s),t=!0;break}if(!t)return!1}}}else if(e===s.map){if(t.size!==r.size)return!1;for(const[e,s]of Map.prototype.entries.call(t)){if(void 0===s&&!Map.prototype.has.call(r,e))return!1;if(!o(s,Map.prototype.get.call(r,e),a,i))return!1}}else if(e===s.error&&(t.name!==r.name||t.message!==r.message))return!1;const h=l(t),m=l(r);if((t!==h||r!==m)&&!o(h,m,a,i))return!1;const d=u(t);if(!a.part&&d.length!==u(r).length&&!a.skip)return!1;let p=0;for(const e of d)if(a.skip&&a.skip.includes(e))void 0===r[e]&&++p;else{if(!c(r,e))return!1;if(!o(t[e],r[e],a,i))return!1}if(!a.part&&d.length-p!==u(r).length)return!1;if(!1!==a.symbols){const e=f(t),s=new Set(f(r));for(const n of e){if(!a.skip||!a.skip.includes(n))if(c(t,n)){if(!c(r,n))return!1;if(!o(t[n],r[n],a,i))return!1}else if(c(r,n))return!1;s.delete(n)}for(const e of s)if(c(r,e))return!1}return!0},n.SeenEntry=class{constructor(e,t){this.obj=e,this.ref=t}isSame(e,t){return this.obj===e&&this.ref===t}}},7916:(e,t,r)=>{"use strict";const s=r(8761);e.exports=class extends Error{constructor(e){super(e.filter((e=>""!==e)).map((e=>"string"==typeof e?e:e instanceof Error?e.message:s(e))).join(" ")||"Unknown error"),"function"==typeof Error.captureStackTrace&&Error.captureStackTrace(this,t.assert)}}},5277:e=>{"use strict";const t={};e.exports=function(e){if(!e)return"";let r="";for(let s=0;s<e.length;++s){const n=e.charCodeAt(s);t.isSafe(n)?r+=e[s]:r+=t.escapeHtmlChar(n)}return r},t.escapeHtmlChar=function(e){return t.namedHtml.get(e)||(e>=256?"&#"+e+";":`&#x${e.toString(16).padStart(2,"0")};`)},t.isSafe=function(e){return t.safeCharCodes.has(e)},t.namedHtml=new Map([[38,"&amp;"],[60,"&lt;"],[62,"&gt;"],[34,"&quot;"],[160,"&nbsp;"],[162,"&cent;"],[163,"&pound;"],[164,"&curren;"],[169,"&copy;"],[174,"&reg;"]]),t.safeCharCodes=function(){const e=new Set;for(let t=32;t<123;++t)(t>=97||t>=65&&t<=90||t>=48&&t<=57||32===t||46===t||44===t||45===t||58===t||95===t)&&e.add(t);return e}()},6064:e=>{"use strict";e.exports=function(e){return e.replace(/[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g,"\\$&")}},738:e=>{"use strict";e.exports=function(){}},1687:(e,t,r)=>{"use strict";const s=r(375),n=r(8571),a=r(7043),i={};e.exports=i.merge=function(e,t,r){if(s(e&&"object"==typeof e,"Invalid target value: must be an object"),s(null==t||"object"==typeof t,"Invalid source value: must be null, undefined, or an object"),!t)return e;if(r=Object.assign({nullOverride:!0,mergeArrays:!0},r),Array.isArray(t)){s(Array.isArray(e),"Cannot merge array onto an object"),r.mergeArrays||(e.length=0);for(let s=0;s<t.length;++s)e.push(n(t[s],{symbols:r.symbols}));return e}const o=a.keys(t,r);for(let s=0;s<o.length;++s){const a=o[s];if("__proto__"===a||!Object.prototype.propertyIsEnumerable.call(t,a))continue;const l=t[a];if(l&&"object"==typeof l){if(e[a]===l)continue;!e[a]||"object"!=typeof e[a]||Array.isArray(e[a])!==Array.isArray(l)||l instanceof Date||l instanceof RegExp?e[a]=n(l,{symbols:r.symbols}):i.merge(e[a],l,r)}else(null!=l||r.nullOverride)&&(e[a]=l)}return e}},9621:(e,t,r)=>{"use strict";const s=r(375),n={};e.exports=function(e,t,r){if(!1===t||null==t)return e;"string"==typeof(r=r||{})&&(r={separator:r});const a=Array.isArray(t);s(!a||!r.separator,"Separator option is not valid for array-based chain");const i=a?t:t.split(r.separator||".");let o=e;for(let e=0;e<i.length;++e){let a=i[e];const l=r.iterables&&n.iterables(o);if(Array.isArray(o)||"set"===l){const e=Number(a);Number.isInteger(e)&&(a=e<0?o.length+e:e)}if(!o||"function"==typeof o&&!1===r.functions||!l&&void 0===o[a]){s(!r.strict||e+1===i.length,"Missing segment",a,"in reach path ",t),s("object"==typeof o||!0===r.functions||"function"!=typeof o,"Invalid segment",a,"in reach path ",t),o=r.default;break}o=l?"set"===l?[...o][a]:o.get(a):o[a]}return o},n.iterables=function(e){return e instanceof Set?"set":e instanceof Map?"map":void 0}},8761:e=>{"use strict";e.exports=function(){try{return JSON.stringify(...arguments)}catch(e){return"[Cannot display object: "+e.message+"]"}}},4277:(e,t)=>{"use strict";const r={};t=e.exports={array:Array.prototype,buffer:!1,date:Date.prototype,error:Error.prototype,generic:Object.prototype,map:Map.prototype,promise:Promise.prototype,regex:RegExp.prototype,set:Set.prototype,weakMap:WeakMap.prototype,weakSet:WeakSet.prototype},r.typeMap=new Map([["[object Error]",t.error],["[object Map]",t.map],["[object Promise]",t.promise],["[object Set]",t.set],["[object WeakMap]",t.weakMap],["[object WeakSet]",t.weakSet]]),t.getInternalProto=function(e){if(Array.isArray(e))return t.array;if(e instanceof Date)return t.date;if(e instanceof RegExp)return t.regex;if(e instanceof Error)return t.error;const s=Object.prototype.toString.call(e);return r.typeMap.get(s)||t.generic}},7043:(e,t)=>{"use strict";t.keys=function(e){return!1!==(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).symbols?Reflect.ownKeys(e):Object.getOwnPropertyNames(e)}},3652:(e,t,r)=>{"use strict";const s=r(375),n={};t.Sorter=class{constructor(){this._items=[],this.nodes=[]}add(e,t){const r=[].concat((t=t||{}).before||[]),n=[].concat(t.after||[]),a=t.group||"?",i=t.sort||0;s(!r.includes(a),`Item cannot come before itself: ${a}`),s(!r.includes("?"),"Item cannot come before unassociated items"),s(!n.includes(a),`Item cannot come after itself: ${a}`),s(!n.includes("?"),"Item cannot come after unassociated items"),Array.isArray(e)||(e=[e]);for(const t of e){const e={seq:this._items.length,sort:i,before:r,after:n,group:a,node:t};this._items.push(e)}if(!t.manual){const e=this._sort();s(e,"item","?"!==a?`added into group ${a}`:"","created a dependencies error")}return this.nodes}merge(e){Array.isArray(e)||(e=[e]);for(const t of e)if(t)for(const e of t._items)this._items.push(Object.assign({},e));this._items.sort(n.mergeSort);for(let e=0;e<this._items.length;++e)this._items[e].seq=e;const t=this._sort();return s(t,"merge created a dependencies error"),this.nodes}sort(){const e=this._sort();return s(e,"sort created a dependencies error"),this.nodes}_sort(){const e={},t=Object.create(null),r=Object.create(null);for(const s of this._items){const n=s.seq,a=s.group;r[a]=r[a]||[],r[a].push(n),e[n]=s.before;for(const e of s.after)t[e]=t[e]||[],t[e].push(n)}for(const t in e){const s=[];for(const n in e[t]){const a=e[t][n];r[a]=r[a]||[],s.push(...r[a])}e[t]=s}for(const s in t)if(r[s])for(const n of r[s])e[n].push(...t[s]);const s={};for(const t in e){const r=e[t];for(const e of r)s[e]=s[e]||[],s[e].push(t)}const n={},a=[];for(let e=0;e<this._items.length;++e){let t=e;if(s[e]){t=null;for(let e=0;e<this._items.length;++e){if(!0===n[e])continue;s[e]||(s[e]=[]);const r=s[e].length;let a=0;for(let t=0;t<r;++t)n[s[e][t]]&&++a;if(a===r){t=e;break}}}null!==t&&(n[t]=!0,a.push(t))}if(a.length!==this._items.length)return!1;const i={};for(const e of this._items)i[e.seq]=e;this._items=[],this.nodes=[];for(const e of a){const t=i[e];this.nodes.push(t.node),this._items.push(t)}return!0}},n.mergeSort=(e,t)=>e.sort===t.sort?0:e.sort<t.sort?-1:1},5380:(e,t,r)=>{"use strict";const s=r(443),n=r(2178),a={minDomainSegments:2,nonAsciiRx:/[^\x00-\x7f]/,domainControlRx:/[\x00-\x20@\:\/\\#!\$&\'\(\)\*\+,;=\?]/,tldSegmentRx:/^[a-zA-Z](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?$/,domainSegmentRx:/^[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?$/,URL:s.URL||URL};t.analyze=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!e)return n.code("DOMAIN_NON_EMPTY_STRING");if("string"!=typeof e)throw new Error("Invalid input: domain must be a string");if(e.length>256)return n.code("DOMAIN_TOO_LONG");if(a.nonAsciiRx.test(e)){if(!1===t.allowUnicode)return n.code("DOMAIN_INVALID_UNICODE_CHARS");e=e.normalize("NFC")}if(a.domainControlRx.test(e))return n.code("DOMAIN_INVALID_CHARS");e=a.punycode(e),t.allowFullyQualified&&"."===e[e.length-1]&&(e=e.slice(0,-1));const r=t.minDomainSegments||a.minDomainSegments,s=e.split(".");if(s.length<r)return n.code("DOMAIN_SEGMENTS_COUNT");if(t.maxDomainSegments&&s.length>t.maxDomainSegments)return n.code("DOMAIN_SEGMENTS_COUNT_MAX");const i=t.tlds;if(i){const e=s[s.length-1].toLowerCase();if(i.deny&&i.deny.has(e)||i.allow&&!i.allow.has(e))return n.code("DOMAIN_FORBIDDEN_TLDS")}for(let e=0;e<s.length;++e){const t=s[e];if(!t.length)return n.code("DOMAIN_EMPTY_SEGMENT");if(t.length>63)return n.code("DOMAIN_LONG_SEGMENT");if(e<s.length-1){if(!a.domainSegmentRx.test(t))return n.code("DOMAIN_INVALID_CHARS")}else if(!a.tldSegmentRx.test(t))return n.code("DOMAIN_INVALID_TLDS_CHARS")}return null},t.isValid=function(e,r){return!t.analyze(e,r)},a.punycode=function(e){e.includes("%")&&(e=e.replace(/%/g,"%25"));try{return new a.URL(`http://${e}`).host}catch(t){return e}}},1745:(e,t,r)=>{"use strict";const s=r(9848),n=r(5380),a=r(2178),i={nonAsciiRx:/[^\x00-\x7f]/,encoder:new(s.TextEncoder||TextEncoder)};t.analyze=function(e,t){return i.email(e,t)},t.isValid=function(e,t){return!i.email(e,t)},i.email=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("string"!=typeof e)throw new Error("Invalid input: email must be a string");if(!e)return a.code("EMPTY_STRING");const r=!i.nonAsciiRx.test(e);if(!r){if(!1===t.allowUnicode)return a.code("FORBIDDEN_UNICODE");e=e.normalize("NFC")}const s=e.split("@");if(2!==s.length)return s.length>2?a.code("MULTIPLE_AT_CHAR"):a.code("MISSING_AT_CHAR");const[o,l]=s;if(!o)return a.code("EMPTY_LOCAL");if(!t.ignoreLength){if(e.length>254)return a.code("ADDRESS_TOO_LONG");if(i.encoder.encode(o).length>64)return a.code("LOCAL_TOO_LONG")}return i.local(o,r)||n.analyze(l,t)},i.local=function(e,t){const r=e.split(".");for(const e of r){if(!e.length)return a.code("EMPTY_LOCAL_SEGMENT");if(t){if(!i.atextRx.test(e))return a.code("INVALID_LOCAL_CHARS")}else for(const t of e){if(i.atextRx.test(t))continue;const e=i.binary(t);if(!i.atomRx.test(e))return a.code("INVALID_LOCAL_CHARS")}}},i.binary=function(e){return Array.from(i.encoder.encode(e)).map((e=>String.fromCharCode(e))).join("")},i.atextRx=/^[\w!#\$%&'\*\+\-/=\?\^`\{\|\}~]+$/,i.atomRx=new RegExp(["(?:[\\xc2-\\xdf][\\x80-\\xbf])","(?:\\xe0[\\xa0-\\xbf][\\x80-\\xbf])|(?:[\\xe1-\\xec][\\x80-\\xbf]{2})|(?:\\xed[\\x80-\\x9f][\\x80-\\xbf])|(?:[\\xee-\\xef][\\x80-\\xbf]{2})","(?:\\xf0[\\x90-\\xbf][\\x80-\\xbf]{2})|(?:[\\xf1-\\xf3][\\x80-\\xbf]{3})|(?:\\xf4[\\x80-\\x8f][\\x80-\\xbf]{2})"].join("|"))},2178:(e,t)=>{"use strict";t.codes={EMPTY_STRING:"Address must be a non-empty string",FORBIDDEN_UNICODE:"Address contains forbidden Unicode characters",MULTIPLE_AT_CHAR:"Address cannot contain more than one @ character",MISSING_AT_CHAR:"Address must contain one @ character",EMPTY_LOCAL:"Address local part cannot be empty",ADDRESS_TOO_LONG:"Address too long",LOCAL_TOO_LONG:"Address local part too long",EMPTY_LOCAL_SEGMENT:"Address local part contains empty dot-separated segment",INVALID_LOCAL_CHARS:"Address local part contains invalid character",DOMAIN_NON_EMPTY_STRING:"Domain must be a non-empty string",DOMAIN_TOO_LONG:"Domain too long",DOMAIN_INVALID_UNICODE_CHARS:"Domain contains forbidden Unicode characters",DOMAIN_INVALID_CHARS:"Domain contains invalid character",DOMAIN_INVALID_TLDS_CHARS:"Domain contains invalid tld character",DOMAIN_SEGMENTS_COUNT:"Domain lacks the minimum required number of segments",DOMAIN_SEGMENTS_COUNT_MAX:"Domain contains too many segments",DOMAIN_FORBIDDEN_TLDS:"Domain uses forbidden TLD",DOMAIN_EMPTY_SEGMENT:"Domain contains empty dot-separated segment",DOMAIN_LONG_SEGMENT:"Domain contains dot-separated segment that is too long"},t.code=function(e){return{code:e,error:t.codes[e]}}},9959:(e,t,r)=>{"use strict";const s=r(375),n=r(5752);t.regex=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};s(void 0===e.cidr||"string"==typeof e.cidr,"options.cidr must be a string");const t=e.cidr?e.cidr.toLowerCase():"optional";s(["required","optional","forbidden"].includes(t),"options.cidr must be one of required, optional, forbidden"),s(void 0===e.version||"string"==typeof e.version||Array.isArray(e.version),"options.version must be a string or an array of string");let r=e.version||["ipv4","ipv6","ipvfuture"];Array.isArray(r)||(r=[r]),s(r.length>=1,"options.version must have at least 1 version specified");for(let e=0;e<r.length;++e)s("string"==typeof r[e],"options.version must only contain strings"),r[e]=r[e].toLowerCase(),s(["ipv4","ipv6","ipvfuture"].includes(r[e]),"options.version contains unknown version "+r[e]+" - must be one of ipv4, ipv6, ipvfuture");r=Array.from(new Set(r));const a=`(?:${r.map((e=>{if("forbidden"===t)return n.ip[e];const r=`\\/${"ipv4"===e?n.ip.v4Cidr:n.ip.v6Cidr}`;return"required"===t?`${n.ip[e]}${r}`:`${n.ip[e]}(?:${r})?`})).join("|")})`,i=new RegExp(`^${a}$`);return{cidr:t,versions:r,regex:i,raw:a}}},5752:(e,t,r)=>{"use strict";const s=r(375),n=r(6064),a={generate:function(){const e={},t="\\dA-Fa-f",r="["+t+"]",s="\\w-\\.~",n="!\\$&'\\(\\)\\*\\+,;=",a="%"+t,i=s+a+n+":@",o="["+i+"]",l="(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";e.ipv4address="(?:"+l+"\\.){3}"+l;const c=r+"{1,4}",u="(?:"+c+":"+c+"|"+e.ipv4address+")",f="(?:"+c+":){6}"+u,h="::(?:"+c+":){5}"+u,m="(?:"+c+")?::(?:"+c+":){4}"+u,d="(?:(?:"+c+":){0,1}"+c+")?::(?:"+c+":){3}"+u,p="(?:(?:"+c+":){0,2}"+c+")?::(?:"+c+":){2}"+u,g="(?:(?:"+c+":){0,3}"+c+")?::"+c+":"+u,y="(?:(?:"+c+":){0,4}"+c+")?::"+u,b="(?:(?:"+c+":){0,5}"+c+")?::"+c,v="(?:(?:"+c+":){0,6}"+c+")?::";e.ipv4Cidr="(?:\\d|[1-2]\\d|3[0-2])",e.ipv6Cidr="(?:0{0,2}\\d|0?[1-9]\\d|1[01]\\d|12[0-8])",e.ipv6address="(?:"+f+"|"+h+"|"+m+"|"+d+"|"+p+"|"+g+"|"+y+"|"+b+"|"+v+")",e.ipvFuture="v"+r+"+\\.["+s+n+":]+",e.scheme="[a-zA-Z][a-zA-Z\\d+-\\.]*",e.schemeRegex=new RegExp(e.scheme);const _="["+s+a+n+":]*",w="["+s+a+n+"]{1,255}",$="(?:\\[(?:"+e.ipv6address+"|"+e.ipvFuture+")\\]|"+e.ipv4address+"|"+w+")",x="(?:"+_+"@)?"+$+"(?::\\d*)?",j="(?:"+_+"@)?("+$+")(?::\\d*)?",k=o+"*",R=o+"+",A="(?:\\/"+k+")*",S="\\/(?:"+R+A+")?",O=R+A,E="["+s+a+n+"@]+"+A,D="(?:\\/\\/\\/"+k+A+")";return e.hierPart="(?:(?:\\/\\/"+x+A+")|"+S+"|"+O+"|"+D+")",e.hierPartCapture="(?:(?:\\/\\/"+j+A+")|"+S+"|"+O+")",e.relativeRef="(?:(?:\\/\\/"+x+A+")|"+S+"|"+E+"|)",e.relativeRefCapture="(?:(?:\\/\\/"+j+A+")|"+S+"|"+E+"|)",e.query="["+i+"\\/\\?]*(?=#|$)",e.queryWithSquareBrackets="["+i+"\\[\\]\\/\\?]*(?=#|$)",e.fragment="["+i+"\\/\\?]*",e}};a.rfc3986=a.generate(),t.ip={v4Cidr:a.rfc3986.ipv4Cidr,v6Cidr:a.rfc3986.ipv6Cidr,ipv4:a.rfc3986.ipv4address,ipv6:a.rfc3986.ipv6address,ipvfuture:a.rfc3986.ipvFuture},a.createRegex=function(e){const t=a.rfc3986,r="(?:\\?"+(e.allowQuerySquareBrackets?t.queryWithSquareBrackets:t.query)+")?(?:#"+t.fragment+")?",i=e.domain?t.relativeRefCapture:t.relativeRef;if(e.relativeOnly)return a.wrap(i+r);let o="";if(e.scheme){s(e.scheme instanceof RegExp||"string"==typeof e.scheme||Array.isArray(e.scheme),"scheme must be a RegExp, String, or Array");const r=[].concat(e.scheme);s(r.length>=1,"scheme must have at least 1 scheme specified");const a=[];for(let e=0;e<r.length;++e){const i=r[e];s(i instanceof RegExp||"string"==typeof i,"scheme at position "+e+" must be a RegExp or String"),i instanceof RegExp?a.push(i.source.toString()):(s(t.schemeRegex.test(i),"scheme at position "+e+" must be a valid scheme"),a.push(n(i)))}o=a.join("|")}const l="(?:"+(o?"(?:"+o+")":t.scheme)+":"+(e.domain?t.hierPartCapture:t.hierPart)+")",c=e.allowRelative?"(?:"+l+"|"+i+")":l;return a.wrap(c+r,o)},a.wrap=function(e,t){return{raw:e=`(?=.)(?!https?:/(?:$|[^/]))(?!https?:///)(?!https?:[^/])${e}`,regex:new RegExp(`^${e}$`),scheme:t}},a.uriRegex=a.createRegex({}),t.regex=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return e.scheme||e.allowRelative||e.relativeOnly||e.allowQuerySquareBrackets||e.domain?a.createRegex(e):a.uriRegex}},1447:(e,t)=>{"use strict";const r={operators:["!","^","*","/","%","+","-","<","<=",">",">=","==","!=","&&","||","??"],operatorCharacters:["!","^","*","/","%","+","-","<","=",">","&","|","?"],operatorsOrder:[["^"],["*","/","%"],["+","-"],["<","<=",">",">="],["==","!="],["&&"],["||","??"]],operatorsPrefix:["!","n"],literals:{'"':'"',"`":"`","'":"'","[":"]"},numberRx:/^(?:[0-9]*(\.[0-9]*)?){1}$/,tokenRx:/^[\w\$\#\.\@\:\{\}]+$/,symbol:Symbol("formula"),settings:Symbol("settings")};t.Parser=class{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!t[r.settings]&&t.constants)for(const e in t.constants){const r=t.constants[e];if(null!==r&&!["boolean","number","string"].includes(typeof r))throw new Error(`Formula constant ${e} contains invalid ${typeof r} value type`)}this.settings=t[r.settings]?t:Object.assign({[r.settings]:!0,constants:{},functions:{}},t),this.single=null,this._parts=null,this._parse(e)}_parse(e){let s=[],n="",a=0,i=!1;const o=e=>{if(a)throw new Error("Formula missing closing parenthesis");const o=s.length?s[s.length-1]:null;if(i||n||e){if(o&&"reference"===o.type&&")"===e)return o.type="function",o.value=this._subFormula(n,o.value),void(n="");if(")"===e){const e=new t.Parser(n,this.settings);s.push({type:"segment",value:e})}else if(i){if("]"===i)return s.push({type:"reference",value:n}),void(n="");s.push({type:"literal",value:n})}else if(r.operatorCharacters.includes(n))o&&"operator"===o.type&&r.operators.includes(o.value+n)?o.value+=n:s.push({type:"operator",value:n});else if(n.match(r.numberRx))s.push({type:"constant",value:parseFloat(n)});else if(void 0!==this.settings.constants[n])s.push({type:"constant",value:this.settings.constants[n]});else{if(!n.match(r.tokenRx))throw new Error(`Formula contains invalid token: ${n}`);s.push({type:"reference",value:n})}n=""}};for(const t of e)i?t===i?(o(),i=!1):n+=t:a?"("===t?(n+=t,++a):")"===t?(--a,a?n+=t:o(t)):n+=t:t in r.literals?i=r.literals[t]:"("===t?(o(),++a):r.operatorCharacters.includes(t)?(o(),n=t,o()):" "!==t?n+=t:o();o(),s=s.map(((e,t)=>"operator"!==e.type||"-"!==e.value||t&&"operator"!==s[t-1].type?e:{type:"operator",value:"n"}));let l=!1;for(const e of s){if("operator"===e.type){if(r.operatorsPrefix.includes(e.value))continue;if(!l)throw new Error("Formula contains an operator in invalid position");if(!r.operators.includes(e.value))throw new Error(`Formula contains an unknown operator ${e.value}`)}else if(l)throw new Error("Formula missing expected operator");l=!l}if(!l)throw new Error("Formula contains invalid trailing operator");1===s.length&&["reference","literal","constant"].includes(s[0].type)&&(this.single={type:"reference"===s[0].type?"reference":"value",value:s[0].value}),this._parts=s.map((e=>{if("operator"===e.type)return r.operatorsPrefix.includes(e.value)?e:e.value;if("reference"!==e.type)return e.value;if(this.settings.tokenRx&&!this.settings.tokenRx.test(e.value))throw new Error(`Formula contains invalid reference ${e.value}`);return this.settings.reference?this.settings.reference(e.value):r.reference(e.value)}))}_subFormula(e,s){const n=this.settings.functions[s];if("function"!=typeof n)throw new Error(`Formula contains unknown function ${s}`);let a=[];if(e){let t="",n=0,i=!1;const o=()=>{if(!t)throw new Error(`Formula contains function ${s} with invalid arguments ${e}`);a.push(t),t=""};for(let s=0;s<e.length;++s){const a=e[s];i?(t+=a,a===i&&(i=!1)):a in r.literals&&!n?(t+=a,i=r.literals[a]):","!==a||n?(t+=a,"("===a?++n:")"===a&&--n):o()}o()}return a=a.map((e=>new t.Parser(e,this.settings))),function(e){const t=[];for(const r of a)t.push(r.evaluate(e));return n.call(e,...t)}}evaluate(e){const t=this._parts.slice();for(let s=t.length-2;s>=0;--s){const n=t[s];if(n&&"operator"===n.type){const a=t[s+1];t.splice(s+1,1);const i=r.evaluate(a,e);t[s]=r.single(n.value,i)}}return r.operatorsOrder.forEach((s=>{for(let n=1;n<t.length-1;)if(s.includes(t[n])){const s=t[n],a=r.evaluate(t[n-1],e),i=r.evaluate(t[n+1],e);t.splice(n,2);const o=r.calculate(s,a,i);t[n-1]=0===o?0:o}else n+=2})),r.evaluate(t[0],e)}},t.Parser.prototype[r.symbol]=!0,r.reference=function(e){return function(t){return t&&void 0!==t[e]?t[e]:null}},r.evaluate=function(e,t){return null===e?null:"function"==typeof e?e(t):e[r.symbol]?e.evaluate(t):e},r.single=function(e,t){if("!"===e)return!t;const r=-t;return 0===r?0:r},r.calculate=function(e,t,s){if("??"===e)return r.exists(t)?t:s;if("string"==typeof t||"string"==typeof s){if("+"===e)return(t=r.exists(t)?t:"")+(r.exists(s)?s:"")}else switch(e){case"^":return Math.pow(t,s);case"*":return t*s;case"/":return t/s;case"%":return t%s;case"+":return t+s;case"-":return t-s}switch(e){case"<":return t<s;case"<=":return t<=s;case">":return t>s;case">=":return t>=s;case"==":return t===s;case"!=":return t!==s;case"&&":return t&&s;case"||":return t||s}return null},r.exists=function(e){return null!=e}},9926:()=>{},5688:()=>{},9708:()=>{},1152:()=>{},443:()=>{},9848:()=>{},5934:e=>{"use strict";e.exports={version:"17.9.2"}}},t={},function r(s){var n=t[s];if(void 0!==n)return n.exports;var a=t[s]={exports:{}};return e[s](a,a.exports,r),a.exports}(5107);var e,t}));

/***/ }),

/***/ "./src/main/js/modules/csrf.js":
/*!*************************************!*\
  !*** ./src/main/js/modules/csrf.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!********************************!*\
  !*** ./src/main/js/artists.js ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! joi */ "./node_modules/joi/dist/joi-browser.min.js");
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flatpickr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flatpickr */ "./node_modules/flatpickr/dist/esm/index.js");
/* harmony import */ var _modules_csrf_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/csrf.js */ "./src/main/js/modules/csrf.js");




const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(0,_modules_csrf_js__WEBPACK_IMPORTED_MODULE_2__.getCsrfInfo)()
};

console.log(headers)

;(0,flatpickr__WEBPACK_IMPORTED_MODULE_1__["default"])("#birthDate", {});

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

const artistSchema = joi__WEBPACK_IMPORTED_MODULE_0___default().object({
    name: joi__WEBPACK_IMPORTED_MODULE_0___default().string()
        .required()
        .min(1),
    birthdate: joi__WEBPACK_IMPORTED_MODULE_0___default().date()
        .required()
        .max('now'),
    hitSong: joi__WEBPACK_IMPORTED_MODULE_0___default().string()
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
        ...(0,_modules_csrf_js__WEBPACK_IMPORTED_MODULE_2__.getCsrfInfo)()
    };

    let formData = new FormData();
    formData.append("file", artistImage.files[0]);
    let response = fetch(`/api/image/upload/artist/artist-${artistId}.png/${artistId}`, {
        method: "POST",
        headers,
        body: formData
    });
}

})();

/******/ })()
;
//# sourceMappingURL=bundle-artists.js.map