/*! 7OS -Web theme: https://github.com/soswapp/theme.soswapp */

// dnav = {
//   top : 0, // CSS initial top
//   pos : 'affix', // position: affix, fixed, relative,
//   clearElem : '', // id of dom element to clear its top to avoid being blocked by dnav
// }
if (typeof sos == 'undefined') window.sos = {}; // Seven OS
if ( typeof sos.config !== 'object' ) sos.config = {};
sos.theme = {
}; //SOS web theme
function shrink_ph () {
  var ph;
  $(document).find('input, textarea').each(function(){
    if ( $(this).attr('id') && $(this).val().length > 0 ) {
      ph = $(document).find('label[for="'+$(this).attr('id')+'"]');
      $(this).addClass('has-val');
      if(ph.length >0){ ph.addClass('shrink'); }
    }
  });
}

function shrinkPlaceholder () { return shrink_ph(); }
var btnRipple = function (e) {
    var target = e.target;
    // if (target.tagName.toLowerCase() !== 'button') return false;
    if ( !target.classList.contains('btn') && !target.classList.contains('ripple') ) return false;
    if ( target.classList.contains('disabled') ) return false;
    var rect = target.getBoundingClientRect();
    var ripple = target.querySelector('.ripple');
    if (!ripple) {
        ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
        target.appendChild(ripple);
    }
    ripple.classList.remove('show');
    var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
    var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
    ripple.style.top = top + 'px';
    ripple.style.left = left + 'px';
    ripple.classList.add('show');
    return false;
}
document.addEventListener('click', btnRipple, false);
sos.setup = function () {
  $("[id^='setup-']").each(function(){
    var name = $(this).attr('id').replace('setup-','');
    if(typeof sos.config[name] !== 'object') sos.config[name] = {}
    $.each($(this).data(),function(key,val){
      sos.config[name][key] = val;
    });
  });
};
(function(){
  sos.setup();
  // diabled buttons
  $(document).on('click', '.btn.disabled', function(e) {
    e.preventDefault(); return false;
  });
  $('a[href="#"]').click(function(e){
    e.preventDefault();
  })
  // placeholders
  $(document).on('focusin','.mat-ui input, .mat-ui textarea',function(){
    var label = $(document).find('label[for="'+$(this).attr('id')+'"]');
    if(label.length >0){ label.addClass('shrink'); }
  });
  $(document).on('blur','.mat-ui input, .mat-ui textarea',function(){
    var label = $(document).find('label[for="'+$(this).attr('id')+'"]');
    if ($(this).val().length > 0 || $(this).is(':checked')) {
      // $(this).addClass('has-val');
      if(label.length > 0){ label.addClass('shrink');}
    }else{
      // $(this).removeClass('has-val');
      if(label.length >0){ label.removeClass('shrink');}
    }
  });
  $(document).on('blur change','input, textarea, select',function(){
    if( $(this).val().length > 0 ){
      $(this).addClass('has-val');
    }else{
      $(this).removeClass('has-val');
    }
  });
  shrink_ph();
})();
