import React from 'react';
import { useSideDrawerStyles } from './SideDrawer.style';

const navigationItems: string[] = ['Dashboard', 'Accounts'];

interface SideDrawerProps {
    show: boolean;
}

export const SideDrawer: React.FC<SideDrawerProps> = (props: SideDrawerProps) => {
    const classes = useSideDrawerStyles();

    let drawerClasses = classes.siderDrawer;

    if (props.show) {
        drawerClasses = classes.siderDrawer + ' ' + classes.open;
    }

    return (
        <nav className={drawerClasses}>
            <ul>
                {navigationItems.map(item => {
                    return (
                        <li key={item}>
                            <a href="/">{item}</a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};
