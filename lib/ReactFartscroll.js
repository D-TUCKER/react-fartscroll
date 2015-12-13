'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fartMp3Js = require('./fart-mp3.js');

var _fartMp3Js2 = _interopRequireDefault(_fartMp3Js);

var _fartOggJs = require('./fart-ogg.js');

var _fartOggJs2 = _interopRequireDefault(_fartOggJs);

var ReactFartscroll = _react2['default'].createClass({
	displayName: 'ReactFartscroll',

	render: function render() {
		return _react2['default'].createElement('div', { id: 'fartscroll' });
	},
	resizeFart: function resizeFart() {
		var _this = this;

		if (this.timer) {
			clearTimeout(this.timer);
		}
		this.timer = setTimeout(function () {
			_this.playAudio();
		}, 200);
	},
	scrollFart: function scrollFart() {
		var scrollOffset = Math.floor(window.scrollY / this.trigger_distance);
		if (this.lastOffset !== scrollOffset) {
			this.playAudio();
			this.lastOffset = scrollOffset;
		}
	},
	playAudio: function playAudio(position) {
		var player = this.getPlayer(),
		    audio = this.getAudioFor(player),
		    rand = Math.floor(Math.random() * audio.sound.length);

		player.src = audio.prefix + audio.sound[position || rand];
		player.play();
	},
	getAudioFor: function getAudioFor(player) {
		if (player.canPlayType("audio/mp3")) {
			return _fartMp3Js2['default'];
		} else if (player.canPlayType("audio/ogg")) {
			return _fartOggJs2['default'];
		}
	},
	getPlayer: function getPlayer() {
		var container = this.getContainer(),
		    player,
		    players = container.getElementsByTagName("audio");

		for (player in players) {
			if (player.currentTime === 0 || player.ended) {
				return player;
			}
		}

		player = document.createElement("audio");
		container.appendChild(player);
		return player;
	},
	getContainer: function getContainer() {
		var container = document.getElementById("fartscroll");
		return container;
	},
	componentDidMount: function componentDidMount() {

		this.trigger_distance = 400;
		window.addEventListener('scroll', this.scrollFart, false);
		window.addEventListener('resize', this.resizeFart, false);
	},
	componentWillUnmount: function componentWillUnmount() {
		window.removeEventListener('scroll', this.scrollFart, false);
		window.removeEventListener('resize', this.resizeFart, false);
	}
});

exports['default'] = ReactFartscroll;
module.exports = exports['default'];