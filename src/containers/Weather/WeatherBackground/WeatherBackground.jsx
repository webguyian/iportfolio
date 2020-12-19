import React from 'react';
import { string } from 'prop-types';

import { useVideoCanvas } from 'modules/browser/hooks';

const WeatherBackground = props => {
  const { name } = props;
  const baseClass = 'weather-background';
  const [canvasRef, videoRef, actions] = useVideoCanvas();
  const src = `assets/videos/${name}.mp4`;

  return (
    <div className={baseClass}>
      <canvas className={`${baseClass}-canvas`} ref={canvasRef}></canvas>
      <video
        className={`${baseClass}-video`}
        autoPlay
        loop
        onPlay={actions.onPlay}
        ref={videoRef}
        src={src}
        playsInline
      ></video>
    </div>
  );
};

WeatherBackground.propTypes = {
  name: string
};

export default WeatherBackground;
