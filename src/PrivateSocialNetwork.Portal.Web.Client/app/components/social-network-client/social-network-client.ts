import {Component, View} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Login} from '../login/login';
import {Navbar} from '../navbar/navbar'

@Component({
    selector: 'social-network-client'
})
@View({
    templateUrl: 'app/components/social-network-client/social-network-client.html',
    directives: [ROUTER_DIRECTIVES, Navbar]
})
@RouteConfig([
    { path: '/login', component:Login, as: 'Login' },
    { path: '/', redirectTo: '/login' }
])
export class PrivateSocialNetworkClient {
    name:string = 'Lisa';
}