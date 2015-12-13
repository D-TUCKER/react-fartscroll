import React from 'react';
import mp3 from './fart-mp3.js';
import ogg from './fart-ogg.js';

var FartScroll = React.createClass({
	render () {
		return <div id="fartscroll"/>;
	},
	resizeFart () {
			if (this.timer) {
				clearTimeout(this.timer);
			}
			this.timer = setTimeout(() => { this.playAudio(); }, 200);

	},
	scrollFart () {
		var scrollOffset = Math.floor(window.scrollY / this.trigger_distance);
		if (this.lastOffset !== scrollOffset) {
			this.playAudio();
			this.lastOffset = scrollOffset;
		}
	},
	playAudio (position) {
		var player = this.getPlayer()
      , audio = this.getAudioFor(player)
      , rand = Math.floor(Math.random() * audio.sound.length);

    player.src = audio.prefix + audio.sound[position || rand];
		player.play();
	},
	getAudioFor (player) {
		if(player.canPlayType("audio/mp3")) {
      return mp3;
    } else if(player.canPlayType("audio/ogg")) {
      return ogg;
    }
	},
	getPlayer () {
		var container = this.getContainer(),
		 		player,
        players = container.getElementsByTagName("audio");

    for (player in  players) {
      if (player.currentTime === 0 || player.ended) {
        return player;
      }
    }

    player = document.createElement("audio");
    container.appendChild(player);
    return player;
	},
	getContainer () {
		var container = document.getElementById("fartscroll");
		return container;
	},
	componentDidMount () {

		this.trigger_distance = 400;
		window.addEventListener('scroll', this.scrollFart, false);
		window.addEventListener('resize', this.resizeFart, false);

	},
	componentWillUnmount () {
		window.removeEventListener('scroll', this.scrollFart, false);
		window.removeEventListener('resize', this.resizeFart, false);
	}
});

export default FartScroll;
