import {Component, View} from 'angular2/angular2';

@Component({
    selector: 'social-network-client'
})
@View({
    template: '<h1>Hello {{ name }}</h1>'
})
export class PrivateSocialNetworkClient {
    name:string = 'Lisa';
}