const tip = tippy( '.cardname', {
	arrow: false,
	animateFill: false,
	followCursor: true,
	html: '#js--card-popup',
	placement: 'top',
	touchHold: true,
	delay: [ 50, 0 ],
	animation: 'fade',
	duration: 0,
	performance: true,
	theme: 'scryfall',
	onShow() {
		const thisPopper = this,
			content = thisPopper.querySelector( '.tippy-content' ),
			/* eslint no-underscore-dangle: ["error", { "allow": ["_reference"] }] */
			target = thisPopper._reference,
			jsonURI = new URL( 'https://api.scryfall.com/cards/named' );
		var rotationClass = 'rotate-0';
		jsonURI.searchParams.set( 'exact', target.dataset.cardName );
		jsonURI.searchParams.set( 'set', typeof target.dataset.cardSet === 'undefined' ? '' : target.dataset.cardSet );
		if ( tip.loading || content.innerHTML !== '' ) { return; }
		tip.loading = true;
		// Hide the tooltip until we've finished loaded the image
		thisPopper.style.display = 'none';
		// fetch() only works on modern browsers
		fetch( jsonURI )
			.then( response => {
				if ( !response.ok ) { throw Error( response.statusText ); }
				{ return response; }
			} )
			.then( response => response.json() )
			.then( data => {
				const queryURI = new URL( target.href ),
					directURI = new URL( data.scryfall_uri ),
					utmSource = queryURI.searchParams.get( 'utm_source' );
				directURI.searchParams.set( 'utm_source', utmSource );
				if ( data.hasOwnProperty( 'card_faces' ) ) {
					const isSecondface = data.card_faces[ 0 ].name.replace( /[^a-z]/ig, '' ).toUpperCase() !==
						decodeURIComponent( target.dataset.cardName ).replace( /[^a-z]/ig, '' ).toUpperCase();
					if ( data.layout === 'transform' || data.layout === 'double_faced_token' ) {
						if ( isSecondface ) {
							target.href = directURI.href + '&back';
							return data.card_faces[ 1 ].image_uris.normal;
						} else {
							return data.card_faces[ 0 ].image_uris.normal;
						}
					} else if ( data.layout === 'split' ) {
						if ( data.card_faces[ 1 ].oracle_text.startsWith( 'Aftermath' ) ) {
							if ( isSecondface ) { rotationClass = 'rotate-90ccw'; }
						} else { rotationClass = 'rotate-90cw'; }
					} else if ( data.layout === 'flip' ) {
						if ( isSecondface ) { rotationClass = 'rotate-180'; }
					}
				}
				target.href = directURI.href;
				if ( data.layout === 'planar' ) { rotationClass = 'rotate-90cw'; }
				return data.image_uris.normal;
			} )
			.then( imageURI => fetch( imageURI ) )
			.then( response => response.blob() )
			.then( blob => {
				const url = URL.createObjectURL( blob ),
					img = document.createElement( 'img' );
				img.classList.add( 'cardimage' );
				img.classList.add( rotationClass );
				img.src = url;
				img.alt = target.text;
				img.width = 244;
				content.append( img );
				// Show the tooltip by removing display:none
				thisPopper.style.removeProperty( 'display' );
				tip.loading = false;
			} )
			.catch( function () {
				// TODO: This should be localized
				content.innerHTML = 'Preview error';
				content.parentNode.classList.remove( 'scryfall-theme' );
				content.parentNode.classList.add( 'error' );
				// Show the tooltip by removing display:none
				thisPopper.style.removeProperty( 'display' );
				tip.loading = false;
			} );
	},
	onHidden() {
		const content = this.querySelector( '.tippy-content' );
		content.innerHTML = '';
	},
	// prevent tooltip from displaying over button
	popperOptions: {
		modifiers: {
			preventOverflow: {
				enabled: false
			},
			hide: {
				enabled: false
			}
		}
	}
} );
