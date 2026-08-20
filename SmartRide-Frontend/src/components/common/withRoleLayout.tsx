import React from 'react';
import type { ComponentType } from 'react';
import { useNavigation } from '@react-navigation/native';

import RoleLayout from './RoleLayout';
import type { Role } from './Sidebar';
import type { ShellNavigation } from './Navbar';

type NavigationProps = { navigation?: any };

const withRoleLayout = <Props extends NavigationProps>(Screen: ComponentType<Props>, role: Role, title: string) => {
  const WrappedScreen = (props: Props) => {
    const navigation = useNavigation() as unknown as ShellNavigation;
    return <RoleLayout role={role} title={title} navigation={navigation}><Screen {...props} /></RoleLayout>;
  };
  WrappedScreen.displayName = `WithRoleLayout(${Screen.displayName || Screen.name || 'Screen'})`;
  return WrappedScreen;
};

export default withRoleLayout;
