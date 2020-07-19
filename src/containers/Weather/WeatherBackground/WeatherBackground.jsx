import React from 'react';
import { string } from 'prop-types';

import { useWeatherBackground } from 'modules/weather/hooks';

const WeatherBackground = props => {
  const { name } = props;
  const baseClass = 'weather-background';
  const [canvasRef, videoRef, handlePlay] = useWeatherBackground();
  const src = `assets/video/${name}.mp4`;

  return (
    <div className={baseClass}>
      <canvas className="weather-background-canvas" ref={canvasRef}></canvas>
      <video
        className="weather-background-video"
        autoPlay
        loop
        onPlay={handlePlay}
        ref={videoRef}
        src={src}
      ></video>
    </div>
  );
};

WeatherBackground.propTypes = {
  name: string
};

export default WeatherBackground;
