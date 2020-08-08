import React from 'react';
import classNames from 'classnames';

import Button from 'components/Button/Button';
import Link from 'components/Link/Link';
import RoundedButton from 'components/Button/RoundedButton';
import Text from 'components/Text/Text';
import CameraFilters from './CameraFilters/CameraFilters';

import { useCamera, useCameraFilters } from 'modules/camera/hooks';

const Camera = () => {
  const [elements, actions, controls] = useCamera();
  const { flash, timer, filter, swap } = controls;
  const filterState = filter.state;
  const [filters, activeFilter, onFilterClick] = useCameraFilters(
    elements,
    filterState
  );
  const baseClass = 'camera-app';
  const videoClass = `${baseClass}-video`;
  const controlClass = `${baseClass}-control`;
  const getControlStateClass = control => `${controlClass}--${control.state}`;

  return (
    <div className={baseClass}>
      <div className={`${baseClass}-top-bar`}>
        <Button
          className={classNames(controlClass, getControlStateClass(flash))}
          icon="bolt"
          size="2x"
          disabled={flash.state === 'disabled'}
          onClick={flash.onClick}
        >
          Set flash
        </Button>
        <Button
          className={classNames(controlClass, getControlStateClass(timer))}
          icon="history"
          size="2x"
          disabled={timer.state === 'disabled'}
          onClick={timer.onClick}
        >
          Set timer
        </Button>
        <Button
          className={classNames(controlClass, getControlStateClass(filter))}
          icon="swatchbook"
          size="2x"
          disabled={filterState === 'disabled'}
          onClick={filter.onClick}
        >
          Set filter
        </Button>
      </div>
      <div className={`${videoClass}-container`}>
        <canvas
          className={`${baseClass}-canvas`}
          ref={elements.canvas}
          width="375"
          height="425"
        ></canvas>
        <canvas
          className={`${baseClass}-canvas-overlay`}
          ref={elements.overlay}
          width="375"
          height="425"
        ></canvas>
        <video
          className={videoClass}
          ref={elements.video}
          autoPlay
          playsInline
          onPlay={actions.onPlay}
        ></video>
      </div>
      {filterState === 'active' ? (
        <CameraFilters
          filters={filters}
          activeFilter={activeFilter}
          onFilterClick={onFilterClick}
        />
      ) : (
        <Text className={`${baseClass}-label`} element="p" type="accessible">
          Grant camera access to take photos
        </Text>
      )}
      <div className={`${baseClass}-bottom-bar`}>
        <Link to="/photos">
          {elements.image ? (
            <img className={`${baseClass}-image`} src={elements.image} />
          ) : (
            <div className={`${baseClass}-image-placeholder`} />
          )}
        </Link>
        <RoundedButton
          disabled={elements.button === 'disabled'}
          onClick={actions.onClick}
        >
          <Text type="accessible">Capture snapshot</Text>
        </RoundedButton>
        <Button
          icon="sync"
          size="3x"
          disabled={swap.state === 'disabled'}
          onClick={swap.onClick}
        >
          Reverse camera
        </Button>
      </div>
    </div>
  );
};

export default Camera;
