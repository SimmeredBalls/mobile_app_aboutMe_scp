import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity 
} from 'react-native'; 
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

// Internal Assets & Custom Hooks
import { COLORS, FONTS } from '../constants/Theme';
import { RedactedText } from '../components/RedactedText';
import { useTypewriter } from '../hooks/useTypewriter'; 

/**
 * DATABASE CONTENT COMPONENT
 * Handles the terminal logic, breach states, and classified data display.
 */
const DatabaseContent = () => {
  const insets = useSafeAreaInsets();
  
  // --- STATE MANAGEMENT ---
  const [isLocked, setIsLocked] = useState(true);
  const [isBreach, setIsBreach] = useState(false);

  // --- MOCKED SUBJECT DATA ---
  const subject = {
    id: "SUBJECT-2003",
    name: "STEPHEN JOHN C. ALAMBAN JR.",
    age: "22",
    course: "BS INFORMATION TECHNOLOGY",
    year: "3RD YEAR",
    location: "POBLACION, OPOL",
    status: "ACTIVE"
  };

  // --- LOGIC: TERMINAL TEXT ---
  // Custom hook handles the typing animation based on the lock status
  const terminalLog = useTypewriter(
    isLocked 
    ? "> WAITING FOR BIOMETRIC SCAN..." 
    : "> AUTH_USER: ADMIN\n> DECRYPTING: SUBJECT-2003\n> STATUS: ACCESS GRANTED", 
    25
  );

  // Toggle function for the "Breach" emergency mode
  const triggerBreach = () => setIsBreach(!isBreach);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {/* Visual Overlay: Static Scanline effect */}
      <View style={styles.scanline} pointerEvents="none" />

      {/* --- SECTION: HUD HEADER --- */}
      <View style={[
        styles.hudHeader, 
        isBreach && styles.headerBreachActive
      ]}>
        <View>
          <Text style={[styles.glitchText, isBreach && styles.textRed]}>
            {isBreach ? "!! BREACH DETECTED !!" : "SCIP-NET MOBILE TERMINAL"}
          </Text>
          <Text style={[styles.subHeaderText, isBreach && styles.textRed]}>
            SITE-19 LOCKDOWN IN EFFECT
          </Text>
        </View>
      </View>

      {/* --- SECTION: TERMINAL CONSOLE --- */}
      <View style={[styles.terminalWindow, isBreach && styles.borderRed]}>
        <Text style={[styles.terminalText, isBreach && styles.textRed]}>
          {isBreach 
            ? "> ALERT: SUBJECT-2003 HAS LEFT CONTAINMENT\n> INITIATING MTF RESPONSE..." 
            : terminalLog}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        
        {/* --- SECTION: AUTHENTICATION INTERFACE --- */}
        {isLocked ? (
          <TouchableOpacity style={styles.unlockButton} onPress={() => setIsLocked(false)}>
            <Text style={styles.unlockButtonText}>[!] INITIATE MEMETIC UNLOCK</Text>
            <Text style={styles.unlockSubtext}>SCAN TO REVEAL CLASSIFIED DATA</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.unlockedBadge}>
            <Text style={styles.unlockedText}>▣ CREDENTIALS ACCEPTED</Text>
          </View>
        )}

        {/* --- SECTION: CLASSIFIED CONTENT (Conditional Rendering) --- */}
        {!isLocked && (
          <View>
            {/* ENTITY PROFILE CARD */}
            <View style={styles.moduleFrame}>
              <View style={styles.moduleHeader}>
                <Text style={styles.moduleTitle}>ENTITY_PROFILE</Text>
              </View>
              <View style={styles.row}>
                <View style={styles.infoColumn}>
                  <Text style={styles.label}>ID: <Text style={styles.value}>{subject.id}</Text></Text>
                  <Text style={styles.label}>NAME: <Text style={styles.valueText}>{subject.name}</Text></Text>
                  <Text style={styles.label}>AGE: <Text style={styles.valueText}>{subject.age}</Text></Text>
                  <Text style={styles.label}>COURSE: <Text style={styles.valueText}>{subject.course}</Text></Text>
                  <Text style={styles.label}>YEAR: <Text style={styles.valueText}>{subject.year}</Text></Text>
                </View>

                {/* SUBJECT VISUAL IDENTIFIER */}
                <View style={styles.photoFrame}>
                  <View style={styles.imageWrapper}>
                    <Image 
                      source={require('../../assets/man.jpg')} 
                      style={styles.subjectImage} 
                    />
                    <View style={styles.imageOverlay} />
                  </View>
                  {/* Decorative UI Corners */}
                  <View style={styles.cornerTL} />
                  <View style={styles.cornerBR} />
                </View>
              </View>
            </View>

            {/* CONTAINMENT PARAMETERS */}
            <View style={styles.moduleFrame}>
              <View style={styles.moduleHeader}>
                <Text style={styles.moduleTitle}>CONTAINMENT_PARAMETERS</Text>
              </View>
              <Text style={styles.bodyText}>
                Subject is contained within a residential unit located in <RedactedText>{subject.location}</RedactedText>.
                {"\n\n"}Required resources:
                {"\n"}• Stable internet connection
                {"\n"}• Regular supply of sandwiches
                {"\n"}• Minimal interruption during procrastination cycles
              </Text>
            </View>

            {/* DESCRIPTION LOG */}
            <View style={styles.moduleFrame}>
              <View style={styles.moduleHeader}>
                <Text style={styles.moduleTitle}>DESCRIPTION_LOG</Text>
              </View>
              <Text style={styles.bodyText}>
                Subject is a humanoid entity classified as an IT student. Demonstrates high aptitude for digital systems but irregular sleep cycles.
              </Text>
              <View style={styles.noteLine}>
                <Text style={styles.noteText}>ANALYST NOTE: Productivity increases under imminent deadlines.</Text>
              </View>
            </View>

            {/* TACTICAL ACTIVITY LOG */}
            <View style={styles.moduleFrame}>
              <View style={styles.moduleHeader}>
                <Text style={styles.moduleTitle}>ACTIVITY_LOG</Text>
              </View>
              <View style={{padding: 12}}>
                <Text style={styles.logLine}>02:14 — YOUTUBE CONSUMPTION DETECTED</Text>
                <Text style={styles.logLine}>03:02 — LANGUAGE ACQUISITION (JPN)</Text>
                <Text style={styles.logLine}>04:31 — CODING ACTIVITY SPIKE</Text>
                <Text style={styles.logLine}>05:10 — DEADLINE PANIC INITIATED</Text>
              </View>
            </View>
          </View>
        )}

        {/* BREACH TOGGLE BUTTON */}
        <TouchableOpacity 
          style={[styles.breachButton, isBreach && styles.breachActive]} 
          onPress={triggerBreach}
        >
          <Text style={[
            styles.breachText, 
            isBreach ? { color: '#000' } : { color: '#ff4444' }
          ]}>
            {isBreach ? "TERMINATE ALERT" : "REPORT CONTAINMENT BREACH"}
          </Text>
        </TouchableOpacity>

      </ScrollView>

      {/* --- SECTION: FOOTER DATA --- */}
      <View style={styles.hudFooter}>
        <Text style={[styles.footerInfo, isBreach && styles.textRed]}>
          SYSTEM TIME: {new Date().toLocaleTimeString()} // LOG_ID: {Math.floor(Math.random() * 9000) + 1000}
        </Text>
      </View>
    </View>
  );
};

/**
 * MAIN SCREEN EXPORT
 */
export default function DatabaseScreen() {
  return (
    <SafeAreaProvider>
      <DatabaseContent />
    </SafeAreaProvider>
  );
}

// --- STYLESHEET ---
const styles = StyleSheet.create({
  // Layout Containers
  container: { flex: 1, backgroundColor: '#020403' },
  scrollBody: { padding: 15 },
  
  // Visual FX
  scanline: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 255, 107, 0.03)',
    zIndex: 999,
  },

  // Header Styles
  hudHeader: {
    padding: 20,
    borderBottomWidth: 2,
    borderColor: COLORS.terminalGreen,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(26, 255, 107, 0.05)',
  },
  headerBreachActive: { 
    borderColor: '#ff4444', 
    backgroundColor: 'rgba(255, 68, 68, 0.15)' 
  },
  glitchText: { color: COLORS.terminalGreen, fontSize: 16, fontWeight: '900', letterSpacing: 1 },
  subHeaderText: { color: COLORS.terminalGreen, fontSize: 8, opacity: 0.7 },

  // Terminal Window
  terminalWindow: {
    backgroundColor: '#000',
    padding: 10,
    borderLeftWidth: 3,
    borderColor: COLORS.terminalGreen,
    marginBottom: 20,
  },
  terminalText: { 
    color: COLORS.terminalGreen, 
    fontSize: 10, 
    fontFamily: FONTS.mono, 
    lineHeight: 14 
  },

  // Module/Card Styles
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
  
  // Profile Section Styles
  row: { flexDirection: 'row', padding: 12 },
  infoColumn: { flex: 1.3 },
  label: { color: 'rgba(26, 255, 107, 0.5)', fontSize: 9, fontWeight: 'bold' },
  value: { color: COLORS.terminalGreen, fontSize: 15, fontWeight: '900' },
  valueText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  
  // Image Section Styles
  photoFrame: { flex: 0.88, position: 'relative', alignItems: 'flex-end' },
  imageWrapper: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(26, 255, 107, 0.3)',
  },
  subjectImage: { width: '100%', height: '100%', resizeMode: 'cover', opacity: 0.7 },
  imageOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: COLORS.terminalGreen, opacity: 0.15 },
  cornerTL: { position: 'absolute', top: 0, left: 35, width: 10, height: 10, borderLeftWidth: 2, borderTopWidth: 2, borderColor: COLORS.terminalGreen },
  cornerBR: { position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRightWidth: 2, borderBottomWidth: 2, borderColor: COLORS.terminalGreen },

  // Text Content Styles
  bodyText: { color: '#d6ffd9', fontSize: 13, lineHeight: 20, padding: 12 },
  logLine: {
    color: COLORS.terminalGreen,
    fontSize: 10,
    fontFamily: FONTS.mono,
    borderLeftWidth: 1,
    borderColor: 'rgba(26, 255, 107, 0.3)',
    paddingLeft: 10,
    marginBottom: 5,
  },
  noteLine: { borderLeftWidth: 2, borderColor: COLORS.warningYellow, paddingLeft: 10, margin: 12 },
  noteText: { color: COLORS.warningYellow, fontSize: 11, fontStyle: 'italic' },

  // Interactive Button Styles
  unlockButton: {
    backgroundColor: 'rgba(255, 230, 109, 0.1)',
    borderWidth: 2,
    borderColor: COLORS.warningYellow,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderStyle: 'dashed',
  },
  unlockButtonText: { color: COLORS.warningYellow, fontSize: 14, fontWeight: '900', letterSpacing: 2 },
  unlockSubtext: { color: COLORS.warningYellow, fontSize: 8, marginTop: 5, opacity: 0.7 },
  unlockedBadge: {
    backgroundColor: 'rgba(26, 255, 107, 0.1)',
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.terminalGreen,
    alignItems: 'center',
    marginBottom: 20,
  },
  unlockedText: { color: COLORS.terminalGreen, fontSize: 12, fontWeight: 'bold' },

  // Breach Utility Styles
  breachButton: {
    borderWidth: 2,
    borderColor: '#ff4444',
    padding: 15,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 68, 68, 0.05)',
    marginTop: 20,
    marginBottom: 40,
  },
  breachActive: { backgroundColor: '#ff4444' },
  breachText: { fontWeight: '900', fontSize: 14, letterSpacing: 3 },
  
  // Helpers
  textRed: { color: '#ff4444' },
  borderRed: { borderColor: '#ff4444' },
  hudFooter: { padding: 10, alignItems: 'center', borderTopWidth: 1, borderColor: 'rgba(26, 255, 107, 0.1)' },
  footerInfo: { color: 'rgba(26, 255, 107, 0.3)', fontSize: 9, fontFamily: FONTS.mono },
});