import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import { mp3, ogg } from 'fart'

function getAudioFor(player) {
  if (player.canPlayType('audio/mp3')) {
    return mp3;
  } else if (player.canPlayType('audio/ogg')) {
    return ogg;
  }
  return '';
}

const FartScroll = ({ scrollFart, triggerDistance, resizeFart }) => {

  const audioRef = useRef(null)
  const lastOffset = useRef(null)
  const timer = useRef(null)

  const playAudio = useCallback((position) => {
    const player = audioRef.current;
    const audio = getAudioFor(player);
    const rand = Math.floor(Math.random() * audio.sound.length);

    player.src = audio.prefix + audio.sound[position || rand];
    player.play();
  }, [])

  const playScrollFart = useCallback(() => {
    const scrollOffset = Math.floor(window.scrollY / triggerDistance);
    if (lastOffset.current !== scrollOffset) {
      playAudio();
      lastOffset.current = scrollOffset;
    }
  }, [playAudio, triggerDistance])

  const playResizeFart = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => { playAudio(); }, 200);
  }, [playAudio])

  useEffect(() => {
    if (scrollFart) { window.addEventListener('scroll', playScrollFart, false); }
    if (resizeFart) { window.addEventListener('resize', playResizeFart, false); }

    return () => {
      if (scrollFart) { window.addEventListener('scroll', playScrollFart, false); }
      if (resizeFart) { window.addEventListener('resize', playResizeFart, false); }
    }

  }, [scrollFart, resizeFart, playScrollFart, playResizeFart])

  return <audio ref={audioRef} />;

}

FartScroll.defaultProps = {
  scrollFart: true,
  triggerDistance: 400,
  resizeFart: true,
};

export default FartScroll

export class FartScroll2 extends React.Component {

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



FartScroll.propTypes = {
  scrollFart: PropTypes.bool,
  triggerDistance: PropTypes.number,
  resizeFart: PropTypes.bool,
};