import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
        path: '/dashboard',
        title: 'Home',
        type: 'link',
        icontype: 'dashboard'
    },{
        path: '/tables',
        title: 'Goal Matrix',
        type: 'sub',
        icontype: 'grid_on',
        collapse: 'tables',
        children: [
            {path: 'regular', title: 'Create Matrix', ab:'CM'},
            {path: 'extended', title: 'Edit Matrix', ab:'EM'},
            {path: 'datatables.net', title: 'View Matrix', ab:'VM'}
        ]
    },{
        path: '/components',
        title: 'Theory',
        type: 'sub',
        icontype: 'school',
        collapse: 'components',
        children: [
            {path: '/', title: 'Subject 1', ab:'S1'},
            {path: '/', title: 'Subject 2', ab:'S2'},
            {path: '/', title: 'Subject 3', ab:'S3'},
            {path: '/', title: 'Subject 4', ab:'S4'},
        ]
    },{
        path: '/pages',
        title: 'Pages',
        type: 'sub',
        icontype: 'image',
        collapse: 'pages',
        children: [
            {path: 'login', title: 'Login', ab:'LP'},
            {path: 'register', title: 'Register', ab:'RP'},
            {path: 'user', title: 'User Profile', ab:'UP'}
        ]
    }
];
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ps: any;
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            this.ps = new PerfectScrollbar(elemSidebar);
        }
    }
    updatePS(): void  {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            this.ps.update();
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
}
