import React from 'react';
import { StyleSheet, Text, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code';
  themeColor?: string;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  return (
    <Text
      style={[
        styles.default,
        type === 'title' && styles.title,
        type === 'small' && styles.small,
        type === 'smallBold' && styles.smallBold,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
        type === 'linkPrimary' && styles.linkPrimary,
        type === 'code' && styles.code,
        themeColor ? { color: themeColor } : null,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  smallBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
    color: '#111111',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600',
  },
  link: {
    lineHeight: 24,
    fontSize: 14,
  },
  linkPrimary: {
    lineHeight: 24,
    fontSize: 14,
    color: '#3c87f7',
  },
  code: {
    fontSize: 12,
  },
});
