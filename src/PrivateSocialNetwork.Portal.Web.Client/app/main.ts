import {bootstrap, bind} from 'angular2/angular2';
import {ROUTER_PROVIDERS, HashLocationStrategy, LocationStrategy} from 'angular2/router';
import {PrivateSocialNetworkClient} from './components/social-network-client/social-network-client';

bootstrap(PrivateSocialNetworkClient, [
	ROUTER_PROVIDERS,
	bind(LocationStrategy).toClass(HashLocationStrategy)
]);