export interface NavItem {
    name: string;
    icon?: string;
    route: string;
}

export const NavRoutes: NavItem[] = [
    { name: 'Dashboard', route: '/', icon: 'home' },
    { name: 'Reporting', route: '/', icon: 'assignment' },
    { name: 'SBA', route: '/', icon: 'view_array' },
    { name: 'Queue', route: '/', icon: 'format_list_numbered' },
    { name: 'Admin', route: '/', icon: 'account_box' }
];
