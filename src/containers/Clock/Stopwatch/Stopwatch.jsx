import React from 'react';

import {
  defaultTimeDisplay,
  initialLaps,
  timeFormat
} from 'modules/clock/constants';
import { getTimeDisplay } from 'modules/clock/helpers';
import { useLaps, useStopwatch } from 'modules/clock/hooks';

import DateTime from 'components/DateTime/DateTime';
import Text from 'components/Text/Text';

import TimerControls from 'containers/Clock/Timer/TimerControls';
import Laps from 'containers/Clock/Stopwatch/Laps';

const Stopwatch = () => {
  const [timer, timerRunning, toggleTimer, resetTimer] = useStopwatch();
  const [laps, updateLaps, hasLaps] = useLaps(initialLaps, timer, timerRunning);
  const baseClass = 'stopwatch';
  const timerDisplay = getTimeDisplay(timer);
  const handleLaps = () => {
    if (!timerRunning) {
      // Reset timer and exit
      resetTimer();
    }

    updateLaps();
  };

  return (
    <div className={baseClass}>
      <Text className={`${baseClass}-text`}>
        {timer ? (
          <DateTime format={timeFormat} fromDate={timerDisplay} stopped />
        ) : (
          defaultTimeDisplay
        )}
      </Text>
      <TimerControls
        disabled={!timer}
        hasLaps={hasLaps}
        primaryAction={toggleTimer}
        secondaryAction={handleLaps}
        timerRunning={timerRunning}
      />
      <Laps laps={laps} />
    </div>
  );
};

export default Stopwatch;
