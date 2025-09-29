
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import Logo from '@/components/logo';
import {
  LayoutDashboard,
  Users,
  Trophy,
  UserCircle,
  Settings,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getUserById } from '@/lib/data';
import { useTranslation } from 'react-i18next';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, labelKey: 'nav.dashboard' },
  { href: '/groups', icon: Users, labelKey: 'nav.groups' },
  { href: '/leaderboard', icon: Trophy, labelKey: 'nav.leaderboard' },
  { href: '/profile', icon: UserCircle, labelKey: 'nav.profile' },
];

export default function AppSidebar() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const { state } = useSidebar();
  const currentUser = getUserById('user-1');

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarMenu className="flex-1">
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href}>
              <SidebarMenuButton
                isActive={pathname.startsWith(item.href)}
                tooltip={t(item.labelKey)}
              >
                <item.icon className="h-5 w-5" />
                <span>{t(item.labelKey)}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarFooter
        className={cn(
          'p-4 border-t transition-opacity duration-200',
          state === 'collapsed' && 'opacity-0'
        )}
      >
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={currentUser?.avatarUrl} alt={currentUser?.name} />
            <AvatarFallback>{currentUser?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="truncate font-semibold">{currentUser?.name}</p>
            <p className="truncate text-xs text-muted-foreground">{t('header.logout')}</p>
          </div>
          <button>
            <LogOut className="h-5 w-5 text-muted-foreground hover:text-foreground" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
