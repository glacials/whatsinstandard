var toggleRecentlyDropped = function() {
  var el = $("#recently-dropped")[0];
  if(el.style.display == 'none') {
    el.style.display = 'block';
    ga('send', 'event', 'link', 'click', 'show recently dropped sets');
  } else {
    el.style.display = 'none';
    ga('send', 'event', 'link', 'click', 'hide recently dropped sets');
  }
};
