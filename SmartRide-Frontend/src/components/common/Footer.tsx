import React from 'react';
import { View, Text } from 'react-native';

export const FooterTab = ({ title }: { title: string }) => <Text>{title}</Text>;

const Footer = ({ children }: { children?: React.ReactNode }) => {
  return <View>{children}</View>;
};

export default Footer;
