import React, { useRef, useEffect } from 'react'; // Added useRef, useEffect
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Animated, Easing } from 'react-native'; // Added Animated, Easing
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../constants/Theme';
import { RedactedText } from '../components/RedactedText';
import { useTypewriter } from '../hooks/useTypewriter'; // NEW: Import hook

const DatabaseContent = () => {
  const insets = useSafeAreaInsets();
  const [isLocked, setIsLocked] = React.useState(true);
  const [isBreach, setIsBreach] = React.useState(false);

  const triggerBreach = () => {
    setIsBreach(!isBreach);
    // Optional: Add Haptics here for a heavy "thump"
  };
  
  // Terminal log using the typewriter hook
  const terminalLog = useTypewriter(
    isLocked 
    ? "> WAITING FOR BIOMETRIC SCAN..." 
    : "> AUTH_USER: ADMIN\n> DECRYPTING: SUBJECT-2003\n> STATUS: ACCESS GRANTED", 
    25
  );

  const subject = {
    id: "SUBJECT-2003",
    name: "STEPHEN JOHN C. ALAMBAN JR.",
    age: "22",
    course: "BS INFORMATION TECHNOLOGY",
    year: "3RD YEAR",
    location: "POBLACION, OPOL",
    status: "ACTIVE"
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.scanline} pointerEvents="none" />

      {/* HEADER - Turns Red on Breach */}
      <View style={[
        styles.hudHeader, 
        isBreach && { borderColor: '#ff4444', backgroundColor: 'rgba(255, 68, 68, 0.15)' }
      ]}>
        <View>
          <Text style={[styles.glitchText, isBreach && { color: '#ff4444' }]}>
            {isBreach ? "!! BREACH DETECTED !!" : "SCIP-NET MOBILE TERMINAL"}
          </Text>
          <Text style={[styles.subHeaderText, isBreach && { color: '#ff4444' }]}>
            SITE-19 LOCKDOWN IN EFFECT
          </Text>
        </View>
      </View>

      {/* TERMINAL - Turns Red on Breach */}
      <View style={[styles.terminalWindow, isBreach && { borderColor: '#ff4444' }]}>
        <Text style={[styles.terminalText, isBreach && { color: '#ff4444' }]}>
          {isBreach ? "> ALERT: SUBJECT-2003 HAS LEFT CONTAINMENT\n> INITIATING MTF RESPONSE..." : terminalLog}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        


        {/* INTERACTIVE UNLOCK BUTTON */}
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

        {/* HIDDEN CONTENT (Only shows after unlock) */}
        {!isLocked && (
          <View>
            {/* PROFILE CARD */}
            <View style={styles.moduleFrame}>
              <View style={styles.moduleHeader}><Text style={styles.moduleTitle}>ENTITY_PROFILE</Text></View>
              <View style={styles.row}>
                <View style={styles.infoColumn}>
                  <Text style={styles.label}>ID: <Text style={styles.value}>{subject.id}</Text></Text>
                  <Text style={styles.label}>NAME: <Text style={styles.valueText}>{subject.name}</Text></Text>
                  <Text style={styles.label}>AGE: <Text style={styles.valueText}>{subject.age}</Text></Text>
                  <Text style={styles.label}>COURSE: <Text style={styles.valueText}>{subject.course}</Text></Text>
                  <Text style={styles.label}>YEAR: <Text style={styles.valueText}>{subject.year}</Text></Text>
                </View>
                <View style={styles.photoFrame}>
                  {/* Add this wrapper back! It's the box that keeps the image 100x100 */}
                  <View style={styles.imageWrapper}>
                    <Image 
                      source={require('../../assets/man.jpg')} 
                      style={styles.subjectImage} 
                    />
                    <View style={styles.imageOverlay} />
                    
                    {/* If you add the animation later, the scanBar goes here too */}
                  </View>

                  {/* These stay outside the wrapper to act as 'decorations' */}
                  <View style={styles.cornerTL} />
                  <View style={styles.cornerBR} />
                </View>
              </View>
            </View>

            {/* CONTAINMENT PARAMETERS */}
            <View style={styles.moduleFrame}>
              <View style={styles.moduleHeader}><Text style={styles.moduleTitle}>CONTAINMENT_PARAMETERS</Text></View>
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
              <View style={styles.moduleHeader}><Text style={styles.moduleTitle}>DESCRIPTION_LOG</Text></View>
              <Text style={styles.bodyText}>
                Subject is a humanoid entity classified as an IT student. Demonstrates high aptitude for digital systems but irregular sleep cycles.
                {"\n\n"}First documented at a 7/11 store exhibiting hunger-driven bargaining behavior.
              </Text>
              <View style={styles.noteLine}>
                <Text style={styles.noteText}>ANALYST NOTE: Productivity increases under imminent deadlines.</Text>
              </View>
            </View>

            {/* ACTIVITY LOG (New Tactical Style) */}
            <View style={styles.moduleFrame}>
              <View style={styles.moduleHeader}><Text style={styles.moduleTitle}>ACTIVITY_LOG</Text></View>
              <View style={{padding: 12}}>
                <Text style={styles.logLine}>02:14 — YOUTUBE CONSUMPTION DETECTED</Text>
                <Text style={styles.logLine}>03:02 — LANGUAGE ACQUISITION (JPN)</Text>
                <Text style={styles.logLine}>04:31 — CODING ACTIVITY SPIKE</Text>
                <Text style={styles.logLine}>05:10 — DEADLINE PANIC INITIATED</Text>
              </View>
            </View>
          </View>
        )}

        <TouchableOpacity 
          style={[styles.breachButton, isBreach && styles.breachActive]} 
          onPress={triggerBreach}
        >
          <Text style={[
            styles.breachText, 
            isBreach ? { color: '#000' } : { color: '#ff4444' } // Dynamic color change
          ]}>
            {isBreach ? "TERMINATE ALERT" : "REPORT CONTAINMENT BREACH"}
          </Text>
        </TouchableOpacity>

      </ScrollView>

      <View style={styles.hudFooter}>
        <Text style={[styles.footerInfo, isBreach && { color: '#ff4444' }]}>
          SYSTEM TIME: {new Date().toLocaleTimeString()} // LOG_ID: {Math.floor(Math.random() * 9000) + 1000}
        </Text>
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
  infoColumn: { flex: 1.3 },
  label: { color: 'rgba(26, 255, 107, 0.5)', fontSize: 9, fontWeight: 'bold' },
  value: { color: COLORS.terminalGreen, fontSize: 15, fontWeight: '900' },
  valueText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  photoFrame: { 
      flex: 0.88, 
      position: 'relative', 
      alignItems: 'flex-end', // Keeps the square pushed to the right
      justifyContent: 'flex-start', 
    },
    imageWrapper: {
      width: 100,
      height: 100,
      overflow: 'hidden', // This is crucial so the image doesn't bleed out
      borderWidth: 1,
      borderColor: 'rgba(26, 255, 107, 0.3)',
    },
  subjectImage: { 
    width: '100%', 
    height: '100%', 
    resizeMode: 'cover',
    opacity: 0.7
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.terminalGreen,
    opacity: 0.15,
  },
  // The actual moving green line
  scanBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: COLORS.terminalGreen,
    zIndex: 10,
    // Add a glow effect
    shadowColor: COLORS.terminalGreen,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5, // For Android glow
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
  hudFooter: { padding: 10, alignItems: 'center', borderTopWidth: 1, borderColor: 'rgba(26, 255, 107, 0.1)' },
  footerInfo: { color: 'rgba(26, 255, 107, 0.3)', fontSize: 9, fontFamily: FONTS.mono },

  logLine: {
    color: COLORS.terminalGreen,
    fontSize: 10,
    fontFamily: FONTS.mono,
    borderLeftWidth: 1,
    borderColor: 'rgba(26, 255, 107, 0.3)',
    paddingLeft: 10,
    marginBottom: 5,
  },
  noteLine: {
    borderLeftWidth: 2,
    borderColor: COLORS.warningYellow,
    paddingLeft: 10,
    margin: 12,
  },
  noteText: {
    color: COLORS.warningYellow,
    fontSize: 11,
    fontStyle: 'italic',
  },

  unlockButton: {
    backgroundColor: 'rgba(255, 230, 109, 0.1)', // Subtle yellow tint
    borderWidth: 2,
    borderColor: COLORS.warningYellow,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderStyle: 'dashed',
  },
  unlockButtonText: {
    color: COLORS.warningYellow,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
  },
  unlockSubtext: {
    color: COLORS.warningYellow,
    fontSize: 8,
    marginTop: 5,
    opacity: 0.7,
  },
  unlockedBadge: {
    backgroundColor: 'rgba(26, 255, 107, 0.1)',
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.terminalGreen,
    alignItems: 'center',
    marginBottom: 20,
  },
  unlockedText: {
    color: COLORS.terminalGreen,
    fontSize: 12,
    fontWeight: 'bold',
  },

  breachButton: {
    borderWidth: 2,
    borderColor: '#ff4444',
    padding: 15,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 68, 68, 0.05)',
    marginTop: 20,
    marginBottom: 40, // Space at the bottom
  },
  breachActive: {
    backgroundColor: '#ff4444', // Solid red when active
  },
  breachText: {
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 3,
  },
});