import React, { useState } from 'react';
import { fontSizes } from '../../utils/sizes';
import { spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import { Text, View, StyleSheet, Vibration } from 'react-native';
import { CountDown } from '../../components/CountDown';
import { RoundedButton } from '../../components/RoundedButton';
import { ProgressBar } from 'react-native-paper';
import { Timing } from './Timing';

export const Timer = ({ focusSubject, onFinish,clearsubject }) => {
  const interval = React.useRef(null);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);
  const onprogress = (prog) => {
    setProgress(prog);
  };

  const vibrate = () => {
    Vibration.vibrate(1000);
  };
  const onEnd = () => {
    vibrate();
    setMinutes(1);
    setProgress(1);
    setIsStarted(false);
    onFinish();
  };
  const changetime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <CountDown
          minutes={minutes}
          isPaused={!isStarted}
          progress={onprogress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject} </Text>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          progress={progress}
          color="#5E84E2"
          style={{ height: 10 }}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changetime} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton
            title="start"
            onPress={() => {
              setIsStarted(true);
            }}
          />
        ) : (
          <RoundedButton
            title="pause"
            onPress={() => {
              setIsStarted(false);
            }}
          />
        )}
      </View>
      <View style={styles.clearSubject}>
      <RoundedButton
            title="-" size={50}
            onPress={() =>clearsubject()}
          />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countdown: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubject:{
    paddingBottom:20,
    paddingLeft:20
  }
});
