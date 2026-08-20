import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Navbar from './Navbar';
import Sidebar, { Role } from './Sidebar';
import { navigationItems } from './navigationConfig';
import type { ShellNavigation } from './Navbar';

type Props = { role: Role; title: string; navigation: ShellNavigation; children: React.ReactNode };

const RoleLayout = ({ role, title, navigation, children }: Props) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  return <View style={styles.container}>
    <Navbar role={role} title={title} navigation={navigation} onMenuPress={() => setSidebarVisible(true)} />
    <View style={styles.content}>{children}</View>
    <Sidebar role={role} items={navigationItems[role]} navigation={navigation} visible={sidebarVisible} onClose={() => setSidebarVisible(false)} />
  </View>;
};

const styles = StyleSheet.create({ container: { backgroundColor: '#F6F8FA', flex: 1 }, content: { flex: 1 } });
export default RoleLayout;
