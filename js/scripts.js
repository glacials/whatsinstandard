// Sets information for rotation logic

const in2019 = ["sm1", "sm2", "sm3", "sm35", "sm4"];
const newSet = [{"code": "sm11", "name": "Unified Minds", "releaseDate": "08/02/2019"}];

// API Calls and page building
const app = document.getElementById('set-display');

const setContainer = document.createElement('ul');
setContainer.setAttribute('class', 'set-list');

app.appendChild(setContainer);

let request = new XMLHttpRequest();
request.open('GET', 'https://api.pokemontcg.io/v1/sets/', true);
request.onload = function () {

  let data = JSON.parse(this.response);

  data = data.sets;

  if (request.status >= 200 && request.status < 400) {

    //console.log(data.length);
    //console.log(data[9].name);

    data.forEach(set => {

      if (set.standardLegal === true) {
        //console.log(set.name);
        //console.log(set.symbolUrl);

        // Create a list item with the class of item
        const item = document.createElement('li');
        item.setAttribute('class', 'item');

        // Add the title of the set to the list item
        item.textContent = set.name;

        // Add a span containing an img with link to the set logo
        const setLogoSpan = document.createElement('span');
        setLogoSpan.setAttribute('class', 'set-logo');
        const setLogo = document.createElement('img');
        setLogo.setAttribute('src', set.symbolUrl);
        let altText = set.name + ' Set Icon';
        setLogo.setAttribute('alt', altText);

        // Append image to span
        setLogoSpan.appendChild(setLogo);

        // Append span to list item
        item.appendChild(setLogoSpan);

        // Append list item to set-list <ul>
        setContainer.appendChild(item);

      }

    });

  } else {
    console.log('error')
  }

}

request.send();