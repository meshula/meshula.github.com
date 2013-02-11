


$(function() { 

var $container = $('#container');
$container.isotope({ itemSelector: '.blogentry' });

//var $optionSets = $('#options .option-set'),
var $optionSets = $('#sidebar .option-set');
var $optionLinks = $optionSets.find('a');
$optionSets = $('#index-content .option-set');
var $links2 = $optionSets.find('a');

$optionLinks.click(function() {
  var $this = $(this);

  // don't proceed if already selected
  if ( $this.hasClass('selected') ) {
    return false;
  }
  var $optionSet = $this.parents('.option-set');
//  var $optionSet = $("div").filter(".filters");
  $optionSet.find('.selected').removeClass('selected');
  $this.addClass('selected');
  // make option object dynamically, i.e. { filter: '.my-filter-class' }
  var options = {},
      key = $optionSet.attr('data-option-key'),
      value = $this.attr('data-option-value'); 
  // parse 'false' as false boolean
  value = value === 'false' ? false : value;
  options[ key ] = value;
  if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
    // changes in layout modes need extra logic
    changeLayoutMode( $this, options )
  } else {
    // otherwise, apply new options
    $container.isotope( options );
  }

  return false;
});

$links2.click(function() {
  var $this = $(this);

  // don't proceed if already selected
  if ( $this.hasClass('selected') ) {
    return false;
  }
  var $optionSet = $this.parents('.option-set');
//  var $optionSet = $("div").filter(".filters");
  $optionSet.find('.selected').removeClass('selected');
  $this.addClass('selected');
  // make option object dynamically, i.e. { filter: '.my-filter-class' }
  var options = {},
      key = $optionSet.attr('data-option-key'),
      value = $this.attr('data-option-value'); 
  // parse 'false' as false boolean
  value = value === 'false' ? false : value;
  options[ key ] = value;
  if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
    // changes in layout modes need extra logic
    changeLayoutMode( $this, options )
  } else {
    // otherwise, apply new options
    $container.isotope( options );
  }

  return false;
});
   
$("#TagToggle").click(function() {
  $("#sidebar").slideToggle("fast");
});
 
});

$(document).ready(function() {

	var hider = $(".hider");
	if (hider) {
		hider.click(function(){
			$("#filters").slideToggle("fast");
		});
	}
	
});

