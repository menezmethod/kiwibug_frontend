import * as React from 'react';

import { Issue } from '@/features/issues';
import { Project } from '@/features/projects';
import { User } from '@/features/users';

import { useAuth } from './auth';

export enum ROLES {
  ADMIN = 'ADMIN',  
  MANAGER = 'MANAGER',
  LEAD = 'LEAD',
  USER = 'USER',
}

type RoleTypes = keyof typeof ROLES;

export const POLICIES = {
  'issue:delete': (user: User, issue: Issue) => {
    if (user.role === 'ADMIN') {
      return true;
    }

    if (user.role === 'USER' && issue.id === user.id) {
      return true;
    }

    return false;
  },
};

export const useAuthorization = () => {
  const { user } = useAuth();

  if (!user) {
    throw Error('User does not exist!');
  }

  const checkAccess = React.useCallback(
    ({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
      if (allowedRoles && allowedRoles.length > 0) {
        return allowedRoles?.includes(user.role);
      }

      return true;
    },
    [user.role]
  );

  return { checkAccess, role: user.role };
};

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode;
  children: React.ReactNode;
} & (
  | {
      allowedRoles: RoleTypes[];
      policyCheck?: never;
    }
  | {
      allowedRoles?: never;
      policyCheck: boolean;
    }
);

export const Authorization = ({
  policyCheck,
  allowedRoles,
  forbiddenFallback = null,
  children,
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;

  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles });
  }

  if (typeof policyCheck !== 'undefined') {
    canAccess = policyCheck;
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};