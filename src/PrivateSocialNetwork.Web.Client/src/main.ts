import {bootstrap, bind} from 'angular2/angular2';
import {ROUTER_PROVIDERS, HashLocationStrategy, LocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {PrivateSocialNetworkClient} from './app/social-network-client';

bootstrap(PrivateSocialNetworkClient, [
	ROUTER_PROVIDERS,
	HTTP_PROVIDERS,
	bind(LocationStrategy).toClass(HashLocationStrategy)
]);