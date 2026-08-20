import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = { title: string; summary: string };

const AdminPage = ({ title, summary }: Props) => (
  <View style={styles.container}>
    <Text style={styles.eyebrow}>SMART RIDE ADMIN</Text>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.summary}>{summary}</Text>
    <View style={styles.stats}>
      <Stat label="Active bookings" value="128" />
      <Stat label="Vehicles listed" value="486" />
      <Stat label="Revenue this month" value="$24.8k" />
    </View>
  </View>
);

const Stat = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.stat}>
    <Text style={styles.value}>{value}</Text>
    <Text style={styles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  eyebrow: { color: '#1C7C70', fontSize: 11, fontWeight: '800', letterSpacing: 1.2, marginTop: 12 },
  title: { color: '#14213D', fontSize: 30, fontWeight: '800', marginTop: 8 },
  summary: { color: '#687386', fontSize: 15, lineHeight: 22, marginTop: 8 },
  stats: { flexDirection: 'row', gap: 10, marginTop: 28 },
  stat: { backgroundColor: '#FFFFFF', borderColor: '#E7EAF0', borderRadius: 12, borderWidth: 1, flex: 1, padding: 14 },
  value: { color: '#14213D', fontSize: 21, fontWeight: '800' },
  label: { color: '#7B8496', fontSize: 11, lineHeight: 16, marginTop: 8 },
});

export default AdminPage;
