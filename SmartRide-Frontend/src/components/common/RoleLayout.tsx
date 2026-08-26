import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Navbar from './Navbar';
import Sidebar, { Role } from './Sidebar';
import { navigationItems } from './navigationConfig';

type Props = {
  role: Role;
  title: string;
  navigation: any;
  children: React.ReactNode;
};

const RoleLayout = ({ role, title, navigation, children }: Props) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Navbar
        role={role}
        title={title}
        onMenuPress={() => setSidebarVisible(true)}
        onNotificationsPress={() => navigation?.navigate?.('Notifications')}
      />
      <View style={styles.content}>{children}</View>
      {sidebarVisible && (
        <Sidebar
          role={role}
          items={navigationItems[role]}
          onNavigate={(route) => {
            setSidebarVisible(false);
            navigation?.navigate?.(route);
          }}
          onClose={() => setSidebarVisible(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#F6F8FA', flex: 1 },
  content: { flex: 1 },
});

export default RoleLayout;
