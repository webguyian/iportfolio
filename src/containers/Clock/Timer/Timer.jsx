import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import Countdown from 'containers/Clock/Countdown/Countdown';
import Picker from 'components/Picker/Picker';
import TimerControls from 'containers/Clock/Timer/TimerControls';

import { labelGroups, optionGroups } from 'modules/clock/constants';
import { useInitialRoute } from 'modules/browser/hooks';
import { useDuration, useTimer } from 'modules/clock/hooks';

const Timer = props => {
  const { location, match } = props;
  const history = useInitialRoute(match, '/clock/timer/picker');
  const [duration, setDuration, values] = useDuration();
  const timer = useTimer(duration);
  const timerRunning = timer.running;
  const baseClass = 'timer';
  const countdownPath = '/clock/timer/countdown';
  const pickerPath = '/clock/timer/picker';
  const isCountdown = location.pathname === countdownPath;
  const startLabel = isCountdown ? 'Resume' : 'Start';

  const handleCancel = () => {
    timer.restart();
    history.push(pickerPath);
  };

  const handleToggle = () => {
    timer.toggle();

    if (!timerRunning) {
      history.push(countdownPath);
    }
  };

  useEffect(() => {
    if (timer.started && !isCountdown) {
      history.push(countdownPath);
    }
  }, [timer.started, isCountdown]);

  useEffect(() => {
    if (timer.running && timer.allSeconds === 0) {
      handleCancel();
    }
  }, [timer]);

  return (
    <div className={baseClass}>
      <Route path={countdownPath} render={() => <Countdown {...timer} />} />
      <Route
        path={pickerPath}
        render={() => (
          <Picker
            labelGroups={labelGroups}
            optionGroups={optionGroups}
            valueGroups={values}
            onChange={setDuration}
            onClick={setDuration}
          />
        )}
      />
      <TimerControls
        disabled={!isCountdown}
        primaryAction={handleToggle}
        secondaryAction={handleCancel}
        secondaryLabel="Cancel"
        startLabel={startLabel}
        stopLabel="Pause"
        timerRunning={timerRunning}
      />
    </div>
  );
};

Timer.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default Timer;
