import {Component, Directive, View} from 'angular2/angular2';

@Directive({
    selector: 'navbar-item',
	properties: ['title']
})
export class NavbarItem {
	public title: string;
}