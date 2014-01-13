buttonset
=========

Allows a user to have several options they can click to toggle on and off.

    $ component install dominicbarnes/buttonset


```javascript
buttonset("#my-element")
    .multiple()
    .option("a", "Letter A")
    .option("b", "Letter B", { disabled: true }) // disabled on init
    .option("c", "Letter C", { active: true })   // active on init
    .option("d", "Letter D");
```


## API

### Buttonset(el) *constructor*

Initializes a new selection group at the input element. (`el` can be either
an `HTMLElement` or a CSS selector `String`)

### Buttonset#multiple()

Allows multiple options to be selected (default is to only allow 1 to be active
at a time)

### Buttonset#option(value, label, [options])

Adds a new option to the menu. `value` is the actual value of the selection
(must be unique to this option) `label` is the HTML content of the label to be
presented to the user.

`options` is an optional way for you to set the state upon initialization. It
is an object with 2 possible keys: `disabled` and `active` (each does what you
expect)

### Buttonset#selected()

Retrieves the selected options. By default, it will return a single value.
If `multiple` has been enabled, it will be an `Array` of values.


## Events

 * `change`: Emitted whenever a option is changed
