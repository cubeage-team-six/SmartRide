import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthStackParamList } from '../../navigation/types';

type LoginNavProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const { width, height } = Dimensions.get('window');

const Login = () => {
  const navigation = useNavigation<LoginNavProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A2E" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>

          {/* ── Top hero section ───────────────────────────── */}
          <View style={styles.hero}>
            {/* Car icon illustration */}
            <View style={styles.carIconWrapper}>
              <Icon name="car-sport" size={80} color="#F5A623" />
            </View>

            <Text style={styles.brandName}>SmartRide</Text>
            <Text style={styles.tagline}>Your journey, your way</Text>
          </View>

          {/* ── Card ──────────────────────────────────────── */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Welcome Back</Text>
            <Text style={styles.cardSubtitle}>Sign in to continue</Text>

            {/* Email */}
            <View style={styles.inputWrapper}>
              <Icon name="mail-outline" size={20} color="#9B9BAD" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor="#9B9BAD"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Password */}
            <View style={styles.inputWrapper}>
              <Icon name="lock-closed-outline" size={20} color="#9B9BAD" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Password"
                placeholderTextColor="#9B9BAD"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(prev => !prev)}
                style={styles.eyeBtn}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <Icon
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#9B9BAD"
                />
              </TouchableOpacity>
            </View>

            {/* Remember me + Forgot password */}
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.rememberRow}
                onPress={() => setRememberMe(prev => !prev)}
                activeOpacity={0.7}>
                <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                  {rememberMe && <Icon name="checkmark" size={12} color="#fff" />}
                </View>
                <Text style={styles.rememberText}>Remember me</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Sign In Button */}
            <TouchableOpacity style={styles.signInBtn} activeOpacity={0.85}>
              <Text style={styles.signInText}>Sign In</Text>
              <Icon name="arrow-forward" size={18} color="#fff" style={{ marginLeft: 6 }} />
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Buttons */}
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
                <Icon name="logo-google" size={22} color="#EA4335" />
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
                <Icon name="logo-apple" size={22} color="#000" />
                <Text style={styles.socialText}>Apple</Text>
              </TouchableOpacity>
            </View>

            {/* Sign up link */}
            <View style={styles.signUpRow}>
              <Text style={styles.signUpPrompt}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.signUpLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#1A1A2E',
  },
  scroll: {
    flexGrow: 1,
  },

  // ── Hero ──────────────────────────────────────────────
  hero: {
    height: height * 0.32,
    backgroundColor: '#1A1A2E',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  carIconWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#16213E',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#F5A623',
    shadowColor: '#F5A623',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  brandName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 13,
    color: '#9B9BAD',
    letterSpacing: 0.5,
  },

  // ── Card ──────────────────────────────────────────────
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#9B9BAD',
    marginBottom: 28,
  },

  // ── Inputs ────────────────────────────────────────────
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
    borderRadius: 14,
    marginBottom: 14,
    paddingHorizontal: 14,
    height: 54,
    borderWidth: 1,
    borderColor: '#EBEBF0',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1A1A2E',
  },
  eyeBtn: {
    padding: 4,
  },

  // ── Remember / Forgot ─────────────────────────────────
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#C0C0CC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkboxActive: {
    backgroundColor: '#F5A623',
    borderColor: '#F5A623',
  },
  rememberText: {
    fontSize: 13,
    color: '#6B6B7B',
  },
  forgotText: {
    fontSize: 13,
    color: '#F5A623',
    fontWeight: '600',
  },

  // ── Sign In Button ────────────────────────────────────
  signInBtn: {
    backgroundColor: '#F5A623',
    borderRadius: 14,
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#1A1A2E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // ── Divider ───────────────────────────────────────────
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#EBEBF0',
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 12,
    color: '#9B9BAD',
  },

  // ── Social ────────────────────────────────────────────
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
    gap: 12,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#EBEBF0',
    backgroundColor: '#FAFAFA',
    gap: 8,
  },
  socialText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
  },

  // ── Sign Up ───────────────────────────────────────────
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpPrompt: {
    fontSize: 14,
    color: '#9B9BAD',
  },
  signUpLink: {
    fontSize: 14,
    color: '#F5A623',
    fontWeight: '700',
  },
});

export default Login;
