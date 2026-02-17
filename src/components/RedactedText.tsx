// src/components/RedactedText.tsx
import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/Theme';

export const RedactedText = ({ children }: { children: string }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <TouchableOpacity onPress={() => setRevealed(!revealed)}>
      <Text style={[
        styles.text, 
        !revealed && styles.hidden
      ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: COLORS.warningYellow,
    backgroundColor: 'transparent',
  },
  hidden: {
    backgroundColor: COLORS.redacted,
    color: COLORS.redacted,
  },
});