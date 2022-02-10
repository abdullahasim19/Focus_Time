import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { colors } from './src/utils/colors';
import { Timer } from './src/features/timer/timer';
import { spacing } from './src/utils/sizes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STATUS = {
  COMPLETE: 1,
  CANCELED: 2,
};
let begin = false;
export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);
  const addHistorywithState = (subject, state) => {
    let flag = false;
    focusHistory.map((item) => {
      //console.log(item.subject);
      if (item.subject === subject) flag = true;
    });
    if (flag) return;
    setFocusHistory([...focusHistory, {key:String(focusHistory.length+1), subject, state }]);
  };
  // console.log(focusHistory);

  const saveHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
      //console.log('I am in save');
    } catch (e) {
      console.log(e);
    }
  };
  const loadHistory = async () => {
    try {
      const h = await AsyncStorage.getItem('focusHistory');
      // console.log(h);
      if (h && JSON.parse(h).length) {
        setFocusHistory(JSON.parse(h));
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (!begin) return;
    // console.log('saving');
    saveHistory();
  }, [focusHistory]);

  useEffect(() => {
    // console.log('loading');
    loadHistory();
    begin = true;
  }, []);
  const onClear = () => {
    setFocusHistory([]);
  };

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onFinish={() => {
            addHistorywithState(focusSubject, STATUS.COMPLETE);
            setFocusSubject(null);
          }}
          clearsubject={() => {
            addHistorywithState(focusSubject, STATUS.CANCELED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.lg,
    backgroundColor: colors.darkBlue,
  },
});
