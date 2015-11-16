import {Component, View, Query, QueryList, CORE_DIRECTIVES} from 'angular2/angular2';
import {NavbarItem} from './navbar-item';

@Component({
    selector: 'navbar'
})
@View({
    templateUrl: 'app/components/navbar/navbar.html',
    directives: [CORE_DIRECTIVES]
})
class Navbar {
    public items: QueryList<NavbarItem>;
    
    constructor(@Query(NavbarItem)items: QueryList<NavbarItem>) {
        this.items = items;  
    }
    
    afterContentInit() {
    // contentChildren is set
    let x = this.items;
    console.log('test');
  }
}

let NAVBAR_DIRECTIVES = [Navbar, NavbarItem]; 

export {Navbar, NavbarItem, NAVBAR_DIRECTIVES}