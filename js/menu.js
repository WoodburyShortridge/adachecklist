$menu = $('#faqMenu');
$menu.addClass('has-js');

$menu.children('li').addClass('hidden-md-down');
$menu.children('hr').addClass('hidden-md-down');

$hammy = $('<a id="menuHam" class="hidden-lg-up" href="#a"><img src="img/hamburger.svg" alt="reveal menu"></a>')
$menu.prepend($hammy);

function menuReveal() {
  event.preventDefault;
  $menu.children('li').toggleClass('hidden-md-down');
  $menu.children('hr').toggleClass('hidden-md-down');
  
  var $hamImg = $hammy.children();
  
  if ($hamImg.attr("alt") == "reveal menu"){
    $hamImg.attr("alt","hide menu");
  } else {
    $hamImg.attr("alt","reveal menu");
  }
}


//toggle class .open to #faqMenu subitems when hambuger is clicked
$hammy.click(menuReveal);