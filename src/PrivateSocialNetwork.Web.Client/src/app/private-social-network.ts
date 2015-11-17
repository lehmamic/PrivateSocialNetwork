import {Component, View} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Login} from './components/login/login';
import {NAVBAR_DIRECTIVES} from './components/navbar/navbar'

@Component({
    selector: 'private-social-network-app'
})
@View({
    templateUrl: 'app/private-social-network.html',
    directives: [ROUTER_DIRECTIVES, NAVBAR_DIRECTIVES]
})
@RouteConfig([
    { path: '/login', component:Login, as: 'Login' },
    { path: '/', redirectTo: '/login' }
])
export class PrivateSocialNetworkApp {
    name:string = 'Lisa';
}