var showText = "show recently dropped sets";
var hideText = "hide recently dropped sets";

var toggler = $("#recently-dropped-toggler")[0];
var sets = $("#recently-dropped")[0];

var toggleRecentlyDropped = function() {
  if(sets.style.display == 'none') {
    sets.style.display = 'block';
    toggler.innerHTML = hideText;
    ga('send', 'event', 'link', 'click', 'show recently dropped sets');
  } else {
    sets.style.display = 'none';
    toggler.innerHTML = showText;
    ga('send', 'event', 'link', 'click', 'hide recently dropped sets');
  }
};
