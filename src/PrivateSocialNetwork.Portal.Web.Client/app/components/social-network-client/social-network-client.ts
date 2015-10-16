import {Component, View} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Login} from '../login/login';

@Component({
    selector: 'social-network-client'
})
@View({
    template: `<h1>Hello {{ name }}</h1>
    <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    { path: '/login', component:Login, as: 'Login' },
    { path: '/', redirectTo: '/login' }
])
export class PrivateSocialNetworkClient {
    name:string = 'Lisa';
}