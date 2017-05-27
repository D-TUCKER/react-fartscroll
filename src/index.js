import React from 'react';
import PropTypes from 'prop-types';

import mp3 from './fart-mp3';
import ogg from './fart-ogg';

function getAudioFor(player) {
  if (player.canPlayType('audio/mp3')) {
    return mp3;
  } else if (player.canPlayType('audio/ogg')) {
    return ogg;
  }
  return '';
}

export default class FartScroll extends React.Component {

  constructor(props) {
    super(props);
    this.resizeFart = this.resizeFart.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.scrollFart = this.scrollFart.bind(this);
  }

  componentDidMount() {
    this.triggerDistance = this.props.triggerDistance;
    if (this.props.scrollFart) { window.addEventListener('scroll', this.scrollFart, false); }
    if (this.props.resizeFart) { window.addEventListener('resize', this.resizeFart, false); }
  }

  componentWillUnmount() {
    if (this.props.scrollFart) { window.removeEventListener('scroll', this.scrollFart, false); }
    if (this.props.resizeFart) { window.removeEventListener('resize', this.resizeFart, false); }
  }

  playAudio(position) {
    const player = this.audioRef;
    const audio = getAudioFor(player);
    const rand = Math.floor(Math.random() * audio.sound.length);

    player.src = audio.prefix + audio.sound[position || rand];
    player.play();
  }

  scrollFart() {
    const scrollOffset = Math.floor(window.scrollY / this.triggerDistance);
    if (this.lastOffset !== scrollOffset) {
      this.playAudio();
      this.lastOffset = scrollOffset;
    }
  }

  resizeFart() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => { this.playAudio(); }, 200);
  }

  render() {
    return <audio ref={(audioRef) => { this.audioRef = audioRef; }} />;
  }

}

FartScroll.defaultProps = {
  scrollFart: true,
  triggerDistance: 400,
  resizeFart: true,
};

FartScroll.propTypes = {
  scrollFart: PropTypes.bool,
  triggerDistance: PropTypes.number,
  resizeFart: PropTypes.bool,
};
