// The default class applied to the custom select
var _COMS_cssSelector = "_comeonmyselector";

// Enable the console rendering time log
var _COMS_exec = true;

// Hide the original <select>
var _COMS_hideOriginalSelect = true;

/*
  List of fetched <option> styling.
  Feel free to uncomment/add/remove some of them
  for a better user experience.

  Always define the superproperties first so the
  subsets are not overwritten.
*/
var _COMS_properties = new Array();
  // Background
  _COMS_properties.push('background');
  _COMS_properties.push('background-color');
  _COMS_properties.push('background-image');
  _COMS_properties.push('background-size');
  _COMS_properties.push('background-repeat');
  _COMS_properties.push('background-position');

  // Font
  _COMS_properties.push('color');
  _COMS_properties.push('font');
  _COMS_properties.push('font-size');
  _COMS_properties.push('font-family');
  _COMS_properties.push('font-weight');
  _COMS_properties.push('font-variant');
  _COMS_properties.push('line-height');
  _COMS_properties.push('text-transform');
  _COMS_properties.push('text-align');
  _COMS_properties.push('text-decoration');
  _COMS_properties.push('text-shadow');
  _COMS_properties.push('direction');
  _COMS_properties.push('word-spacing');
  _COMS_properties.push('letter-spacing');

  // Boxspacing
  _COMS_properties.push('margin');
  _COMS_properties.push('margin-top');
  _COMS_properties.push('margin-right');
  _COMS_properties.push('margin-bottom');
  _COMS_properties.push('margin-left');
  _COMS_properties.push('padding');
  _COMS_properties.push('padding-top');
  _COMS_properties.push('padding-right');
  _COMS_properties.push('padding-bottom');
  _COMS_properties.push('padding-left');

  // Sizing
  /*
  _COMS_properties.push('width');
  _COMS_properties.push('min-width');
  _COMS_properties.push('max-width');
  _COMS_properties.push('height');
  _COMS_properties.push('min-height');
  _COMS_properties.push('max-height');
  */

/*
************************************************************
************************************************************
*/
var _COMS_styles = new Array();
var _COMS_id = new Array();

function COMS(){
  if(_COMS_exec == true)
    t0 = performance.now();

  var _COMS_selects = document.getElementsByTagName('select');

  for(i=0; i<_COMS_selects.length; i++){
    if(_COMS_hideOriginalSelect == true)
        _COMS_selects[i].style.display = "none";

    if(_COMS_selects[i].id.length > 0){
      _COMS_id[i] = _COMS_selects[i].id;
    }
    else{
      _COMS_id[i] = i+'_COMS_UNIQUEID';
      _COMS_selects[i].setAttribute('id', i+'_COMS_UNIQUEID');
    }

    selector = document.createElement('div');
      selector.setAttribute('class', _COMS_cssSelector);
      selector.setAttribute('id', i+'_COMS_head');

    selectorUl = document.createElement('ul');
      selectorUl.setAttribute('id', i+'_COMS_ul');

    _COMS_styles[i+'_COMS_ul'] = new Array();

    offWidth = 0;
    for(j=0; j<_COMS_selects[i].options.length;j++){
      selectorLi = document.createElement('li');
        selectorLi.setAttribute('id', j+'_COMS_li');

      liArrow = document.createElement('span');
        liArrow.setAttribute('class', '_arrow');
        liArrow.innerHTML = '&#8659;';

      iOption = _COMS_selects[i].options[j];
      innertxt = iOption.innerHTML;

      if(iOption.hasChildNodes() && iOption.childNodes.length > 1)
        console.log(innertxt + ' child detected!');

      _COMS_styles[i+'_COMS_ul'][j] = "";

      for(k=0; k<_COMS_properties.length;k++){
        propn = _COMS_properties[k];
        propv = iOption.style.getPropertyValue(propn);

        if(propv !== ''){
          _COMS_styles[i+'_COMS_ul'][j] += propn + ": " + propv +";";
          selectorLi.style.setProperty(propn, propv);
        }
      }

      if(iOption.className !== ''){
        selectorLi.setAttribute('class', iOption.className);
      }

      selectorLi.innerHTML = innertxt;
      selectorLi.appendChild(liArrow);
      selectorUl.appendChild(selectorLi);

      if(j == _COMS_selects[i].selectedIndex){
        selectorTitle = innertxt;
        selectorStyle = _COMS_styles[i+'_COMS_ul'][j];
      }
    }

    selectorHead = document.createElement('div');
      selectorHead.setAttribute('class', '_selectedoption');

    headArrow = document.createElement('span');
      headArrow.setAttribute('class', '_arrow');
      headArrow.innerHTML = '&#8659;';

    selectorHead.innerHTML = selectorTitle;
    selectorHead.appendChild(headArrow);
    selectorHead.style.cssText = selectorStyle;

    selector.appendChild(selectorHead);
    selectorUl.style.display = "none";
    selector.appendChild(selectorUl);

    parentContainer = _COMS_selects[i].parentNode;
    parentContainer.insertBefore(selector, _COMS_selects[i]);
  }

  if(_COMS_exec == true){
    execTime = performance.now() - t0;
    console.log('[COMS] Rendered! ('+ execTime +'ms)');
  }
}

document.addEventListener('click', function(event) {
  if (event.target.className == '_selectedoption' || event.target.className == '_selectedoptionclicked') {
    //alert("lol");
    pn = event.target.parentNode;

    subul = pn.getElementsByTagName('ul')[0];
    if(subul.style.display == "none"){
      subul.style.display = "block";
      event.target.className = '_selectedoptionclicked';
    }
    else{
      subul.style.display = "none";
      event.target.className = '_selectedoption';
    }
  }

  else if (event.target.tagName.toLowerCase() === 'li' && event.target.parentNode.parentNode.className == _COMS_cssSelector){
    ul = event.target.parentNode;
    ulId = ul.id;
    ulPos = parseInt(ulId);
    selectHead = event.target.parentNode.parentNode.firstChild;
    lindex = parseInt(event.target.id);

    selectHead.style.cssText = _COMS_styles[ulId][lindex];
    selectHead.innerHTML = event.target.innerHTML;

    document.getElementById(_COMS_id[ulPos]).selectedIndex = lindex;
    ul.style.display = "none";
    selectHead.className = '_selectedoption';

    var event = new Event('change');
    document.getElementById(_COMS_id[ulPos]).dispatchEvent(event);
  }

  else{
    AllSelects = document.getElementsByClassName(_COMS_cssSelector);
    for(i=0;i < AllSelects.length; i++){
      AllSelects[i].getElementsByTagName('ul')[0].style.display = "none";
    }

    AllClicked = document.getElementsByClassName('_selectedoptionclicked');
    for(i=0;i < AllClicked.length;i++){
      AllClicked[i].className = '_selectedoption';
    }
  }
});
