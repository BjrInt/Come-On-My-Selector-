# COME ON MY SELECTOR!

## Description
Replaces all <select> tag with a custom SELECTOR that supports css background styling. Replaced selectors are <div>s filled with an ul>li stucture.

This is mainly thought as a workaround for the lack of styling options in Webkit-driven browser (hi Google Chrome :^) )

## Examples
```javascript
// Replace all <select> tags within the document
COMS();

// Replace all <select class="myclass">
COMS('myclass');

// You can specify as much classes as you want to be replaced
COMS('aclass', 'anotherclass', 'classroom');
```

## Styling
You can override the default COMS styling by editing the css file.
