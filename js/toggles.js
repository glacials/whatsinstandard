
/**
 * Show Recently Dropped Sets
 */
var showSetsText = 'show recently dropped sets';
var hideSetsText = 'hide recently dropped sets';

var droppedToggler = $('#recently-dropped-toggler')[0];
var droppedSets = document.getElementById('recently-dropped');

var toggleRecentlyDropped = function () {
  if (droppedSets.style.display === 'none') {
    droppedSets.style.display = 'block';
    droppedToggler.innerHTML = hideSetsText;
    ga('send', 'event', 'link', 'click', 'show recently dropped sets');
  } else {
    droppedSets.style.display = 'none';
    droppedToggler.innerHTML = showSetsText;
    ga('send', 'event', 'link', 'click', 'hide recently dropped sets');
  }
};

/**
 * Show Ban Announcements
 */
var showBanSourcesText = 'show announcements';
var hideBanSourcesText = 'hide announcements';

var bannedSourcesToggler = $('#ban-source-toggler')[0];
var bannedSourcesList = $('#ban-source')[0];

var toggleBanSources = function () {
  if (bannedSourcesList.style.display === 'none') {
    bannedSourcesList.style.display = 'block';
    bannedSourcesToggler.innerHTML = hideBanSourcesText;
    ga('send', 'event', 'link', 'click', 'show ban sources');
  } else {
    bannedSourcesList.style.display = 'none';
    bannedSourcesToggler.innerHTML = showBanSourcesText;
    ga('send', 'event', 'link', 'click', 'hide ban sources');
  }
};
