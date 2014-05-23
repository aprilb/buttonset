// dependencies
var classes = require("classes");
var each = require("each");
var Emitter = require("emitter");
var value = require("value");
var Option = require("./option");


/**
 * This UI element is about giving a user multiple options, and a way to toggle
 * some on/off (typical use-case is filtering a list by type)
 *
 * @param {HTMLElement|String} el
 * @constructor
 */
function Buttonset(el) {
    if (!(this instanceof Buttonset)) {
        return new Buttonset(el);
    }

    this.element = typeof el === "string" ? document.querySelector(el) : el;
    this.classes = classes(this.element).add("buttonset");

    this.options = {};
}


// mixins
Emitter(Buttonset.prototype);


/**
 * Mark this set as allowing multiple options
 *
 * @api public
 * @returns {Buttonset}
 */
Buttonset.prototype.multiple = function () {
    this._multiple = true;
    return this;
};


/**
 * Add a new button to this collection
 *
 * @api public
 * @param {String} value    The actual value of this button
 * @param {String} [label]  HTML for the visible content
 * @returns {Buttonset}
 */
Buttonset.prototype.option = function (value, label, options) {
    var buttonset = this;
    var option = this.options[value] = new Option(value, label, options);

    option.on("change", function () {
        if (!buttonset._multiple) {
            each(buttonset.options, function (val, opt) {
                if (opt !== option) {
                    opt.deactivate();
                }
            });
        }

        buttonset.emit("change");
    });

    this.element.appendChild(option.element);

    return this;
};


/**
 * Retrieve the selected options from this set
 *
 * @returns {Mixed|Array:Mixed}
 */
Buttonset.prototype.selected = Buttonset.prototype.value = function (value) {
    if (value) {
        if (this._multiple) {
            value = value.map(String);
            each(this.options, function (key, option) {
                option.toggle(value.indexOf(key) > -1);
            });
        } else {
            each(this.options, function (key, option) {
                option.toggle(key == value);
            });
        }
    } else {
        if (this._multiple) {
            var values = [];
            each(this.options, function (key, option) {
                var val = option.value();
                if (val !== null) values.push(val);
            });
            return values;
        } else {
            for (var key in this.options) {
                var val = this.options[key].value();
                if (val !== null) return val;
            }
        }
    }
};


// single export
module.exports = Buttonset;
