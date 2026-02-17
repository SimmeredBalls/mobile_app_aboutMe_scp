// src/screens/DatabaseScreen.tsx
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../constants/Theme';
import { RedactedText } from '../components/RedactedText';

const DatabaseContent = () => {
  const insets = useSafeAreaInsets();

  const subject = {
    id: "SUBJECT-2003",
    name: "STEPHEN ALAMBAN JR.",
    class: "THAUMIEL-PENDING", // Added an Object Class for flair
    rating: 0.65,
    status: "UNDER OBSERVATION"
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      
      {/* SCANLINE OVERLAY - Gives it that CRT flickering monitor feel */}
      <View style={styles.scanline} pointerEvents="none" />

      {/* TACTICAL HEADER */}
      <View style={styles.hudHeader}>
        <View>
          <Text style={styles.glitchText}>SCIP-NET MOBILE TERMINAL</Text>
          <Text style={styles.subHeaderText}>SITE-19 INTRANET // RAISA-AUTHORIZED</Text>
        </View>
        <View style={styles.clearanceBadge}>
          <Text style={styles.clearanceLevel}>L-2</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        
        {/* ENCRYPTED LOAD LOG */}
        <View style={styles.terminalWindow}>
          <Text style={styles.terminalText}>{`> DECRYPTING: FILE_2003.OBJ\n> KEY: ********** VALIDATED\n> CAUTION: COGNITOHAZARD RISK LOW`}</Text>
        </View>

        {/* DATA MODULE: PROFILE */}
        <View style={styles.moduleFrame}>
          <View style={styles.moduleHeader}>
            <Text style={styles.moduleTitle}>ENTITY_DATA_01</Text>
          </View>
          
          <View style={styles.row}>
            <View style={styles.infoColumn}>
              <Text style={styles.label}>DESIGNATION</Text>
              <Text style={styles.value}>{subject.id}</Text>
              
              <Text style={[styles.label, {marginTop: 10}]}>LEGAL_NAME</Text>
              <Text style={styles.valueText}>{subject.name}</Text>
              
              <Text style={[styles.label, {marginTop: 10}]}>STATUS</Text>
              <Text style={[styles.value, {color: COLORS.warningYellow}]}>{subject.status}</Text>
            </View>
            
            <View style={styles.photoFrame}>
              {/* Profile Image with a green tint to look like a night-vision camera */}
              <Image 
                source={require('../../assets/Man.jpg')} 
                style={styles.subjectImage}
              />
              <View style={styles.cornerTL} />
              <View style={styles.cornerBR} />
              <Text style={styles.camLabel}>CAM_04_FEED</Text>
            </View>
          </View>

          {/* HUME LEVEL PROGRESS BAR */}
          <View style={styles.meterSection}>
            <View style={styles.meterHeader}>
              <Text style={styles.meterLabel}>REALITY STABILITY (HUME)</Text>
              <Text style={styles.meterValue}>{(subject.rating * 100).toFixed(0)}%</Text>
            </View>
            <View style={styles.meterBg}>
              <View style={[styles.meterFill, { width: `${subject.rating * 100}%` }]} />
            </View>
          </View>
        </View>

        {/* DATA MODULE: CONTAINMENT */}
        <View style={styles.moduleFrame}>
          <View style={styles.moduleHeader}>
            <Text style={styles.moduleTitle}>CONTAINMENT_LOG</Text>
          </View>
          <Text style={styles.bodyText}>
            Humanoid must remain within <RedactedText>REGION: PHILIPPINES</RedactedText>. 
            Behavioral drift occurs during "App Development" phases. 
            High priority: Ensure sandwich supply remains at <Text style={styles.highlightText}>MAX_CAPACITY</Text>.
          </Text>
        </View>

        <TouchableOpacity style={styles.breachButton}>
          <Text style={styles.breachText}>REPORT CONTAINMENT BREACH</Text>
        </TouchableOpacity>

      </ScrollView>

      <View style={styles.hudFooter}>
        <Text style={styles.footerInfo}>NODE: 19-B // LAT: 8.5° N // LON: 124.5° E</Text>
      </View>
    </View>
  );
};

export default function DatabaseScreen() {
  return (
    <SafeAreaProvider>
      <DatabaseContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020403' },
  scanline: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 255, 107, 0.03)',
    zIndex: 999,
  },
  hudHeader: {
    padding: 20,
    borderBottomWidth: 2,
    borderColor: COLORS.terminalGreen,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(26, 255, 107, 0.05)',
  },
  glitchText: { color: COLORS.terminalGreen, fontSize: 16, fontWeight: '900', letterSpacing: 1 },
  subHeaderText: { color: COLORS.terminalGreen, fontSize: 8, opacity: 0.7 },
  clearanceBadge: {
    borderWidth: 1,
    borderColor: COLORS.warningYellow,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  clearanceLevel: { color: COLORS.warningYellow, fontWeight: 'bold' },
  scrollBody: { padding: 15 },
  terminalWindow: {
    backgroundColor: '#000',
    padding: 10,
    borderLeftWidth: 3,
    borderColor: COLORS.terminalGreen,
    marginBottom: 20,
  },
  terminalText: { color: COLORS.terminalGreen, fontSize: 10, fontFamily: FONTS.mono, lineHeight: 14 },
  moduleFrame: {
    borderWidth: 1,
    borderColor: 'rgba(26, 255, 107, 0.3)',
    marginBottom: 20,
    backgroundColor: 'rgba(5, 10, 5, 0.8)',
  },
  moduleHeader: {
    backgroundColor: 'rgba(26, 255, 107, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  moduleTitle: { color: COLORS.terminalGreen, fontSize: 10, fontWeight: 'bold' },
  row: { flexDirection: 'row', padding: 12 },
  infoColumn: { flex: 1.2 },
  label: { color: 'rgba(26, 255, 107, 0.5)', fontSize: 9, fontWeight: 'bold' },
  value: { color: COLORS.terminalGreen, fontSize: 18, fontWeight: '900' },
  valueText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  photoFrame: { flex: 1, position: 'relative', padding: 5, alignItems: 'flex-end' },
  subjectImage: { 
    width: 100, 
    height: 100, 
    backgroundColor: '#111',
    tintColor: COLORS.terminalGreen, // Makes the photo monochromatic green
    opacity: 0.8
  },
  cornerTL: { position: 'absolute', top: 0, left: 35, width: 10, height: 10, borderLeftWidth: 2, borderTopWidth: 2, borderColor: COLORS.terminalGreen },
  cornerBR: { position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRightWidth: 2, borderBottomWidth: 2, borderColor: COLORS.terminalGreen },
  camLabel: { color: COLORS.terminalGreen, fontSize: 7, marginTop: 4, textAlign: 'right' },
  meterSection: { padding: 12, borderTopWidth: 1, borderColor: 'rgba(26, 255, 107, 0.1)' },
  meterHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  meterLabel: { color: COLORS.terminalGreen, fontSize: 9 },
  meterValue: { color: COLORS.warningYellow, fontSize: 9, fontWeight: 'bold' },
  meterBg: { height: 4, backgroundColor: '#111' },
  meterFill: { height: '100%', backgroundColor: COLORS.terminalGreen, shadowColor: COLORS.terminalGreen, shadowRadius: 5, shadowOpacity: 1 },
  bodyText: { color: '#d6ffd9', fontSize: 13, lineHeight: 20, padding: 12 },
  highlightText: { color: COLORS.warningYellow, fontWeight: 'bold' },
  breachButton: {
    borderWidth: 1,
    borderColor: '#f44',
    padding: 15,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    marginTop: 10,
  },
  breachText: { color: '#f44', fontWeight: 'bold', fontSize: 12, letterSpacing: 2 },
  hudFooter: { padding: 10, alignItems: 'center', borderTopWidth: 1, borderColor: 'rgba(26, 255, 107, 0.1)' },
  footerInfo: { color: 'rgba(26, 255, 107, 0.3)', fontSize: 9, fontFamily: FONTS.mono },
});