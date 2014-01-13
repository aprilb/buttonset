// dependencies
var classes = require("classes");
var Emitter = require("emitter");
var events = require("events");


/**
 * Represents a single button in the overall list
 *
 * @constructor
 * @param {Mixed} value       What this box (when "active" means)
 * @param {Mixed} label       What is displayed to the user
 * @param {Object} [options]  State presets
 */
function Option(value, label, options) {
    if (!(this instanceof Option)) {
        return new Option(value, label, options);
    }

    this.element = document.createElement("div");
    this.classes = classes(this.element).add("buttonset-option");

    this._value = value;
    this.element.innerHTML = label || value;

    this.events = events(this.element, this);
    this.events.bind("click");

    if (options) {
        if (options.active)   this.activate();
        if (options.disabled) this.disable();
    }
}


// mixins
Emitter(Option.prototype);


/**
 * click event handler
 */
Option.prototype.onclick = function () {
    if (this.classes.has("disabled")) return;

    this.toggle().emit("change");
};


/**
 * Tells us if this option is active
 *
 * @returns {Boolean}
 */
Option.prototype.active = function () {
    return this.classes.has("active");
};


/**
 * Activate this option
 *
 * @returns {Option}
 */
Option.prototype.activate = function () {
    this.classes.add("active");
    return this;
};


/**
 * Deactivate this option
 *
 * @returns {Option}
 */
Option.prototype.deactivate = function () {
    this.classes.remove("active");
    return this;
};


/**
 * Toggle the "active" state of this option
 *
 * @returns {Option}
 */
Option.prototype.toggle = function () {
    return this[this.active() ? "deactivate" : "activate"]();
};


/**
 * Tells us if the option is disabled
 *
 * @returns {Boolean}
 */
Option.prototype.disabled = function () {
    return this.classes.has("disabled");
};


/**
 * Disable this option (and deactivate)
 *
 * @returns {Option}
 */
Option.prototype.disable = function () {
    this.classes.add("disabled");
    return this.deactivate();
};


/**
 * Enable this option
 *
 * @returns {Option}
 */
Option.prototype.enable = function () {
    this.classes.remove("disabled");
    return this;
};


/**
 * Returns this value (or `null` if disabled)
 *
 * @returns {Mixed}
 */
Option.prototype.value = function () {
    return (this.disabled() || !this.active()) ? null : this._value;
};


// single export
module.exports = Option;
