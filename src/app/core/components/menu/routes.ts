export interface NavItem {
    name: string;
    icon?: string;
    route: string;
}

export const NavRoutes: NavItem[] = [
    { name: 'Dashboard', route: '/', icon: 'home' },
    { name: 'Reporting', route: '/demo-input-table/edit', icon: 'assignment' },
    { name: 'SBA', route: '/demo-input-table/edit', icon: 'view_array' },
    { name: 'Queue', route: '/demo-input-table/edit', icon: 'format_list_numbered' },
    { name: 'Admin', route: '/demo-input-table/edit', icon: 'account_box' }
];
