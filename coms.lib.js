/*
  COME ON MY SELECTOR!

  Replaces all <select> tag with a custom SELECTOR that supports css
  background styling. Replaced selectors are <div>s filled with an ul>li
  stucture.

  example :
  COMS() =>
    Replaces all <select> tags within the document

  COMS(myclass)
    => Replaces all <select class="myclass">

  COMS(aclass, anotherclass, classroom)
    => you can specify as much classes as you want to be replaced
*/


// The default class applied to the custom select
var cssSelector = "_comeonmyselector";

function COMS(){
  selects = document.getElementsByTagName('select');

  if(typeof arguments !== 'undefined' && arguments.length > 0){

  }
}
