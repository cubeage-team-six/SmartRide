import React from 'react';
import { Linking, Pressable, Text, StyleSheet } from 'react-native';

type Props = {
  href: string;
  children?: React.ReactNode;
  style?: any;
};

export function ExternalLink({ href, children, style }: Props) {
  return (
    <Pressable
      style={style}
      onPress={() => {
        if (href) {
          Linking.openURL(href).catch((err) =>
            console.error("Failed to open URL:", err)
          );
        }
      }}
    >
      {typeof children === 'string' ? (
        <Text style={styles.text}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#0F4C81',
    textDecorationLine: 'underline',
  },
});
