import { Routes } from '@angular/router';

import { ErrorComponent } from './sub-components/error/error.component';
import { SearchComponent } from './sub-components/search/search.component';
import { BodyComponent } from './components/body/body.component';
import { HomeComponent } from './sub-components/home/home.component';
import { FilterComponent } from './sub-components/filter/filter.component';
import { HelpComponent } from './sub-components/help/help.component';
import { DetailComponent } from './sub-components/detail/detail.component';
import { LoginComponent } from './sub-components/login/login.component';
import { LogoutComponent } from './sub-components/logout/logout.component';
import { CartComponent } from './sub-components/cart/cart.component';
import { AuthGaurdService } from './services/auth-gaurd.service';
import { RegisterComponent } from './sub-components/register/register.component';
import { BuyComponent } from './sub-components/buy/buy.component';
import { ContactComponent } from './sub-components/contact/contact.component';

export const appRouter: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{
		path:'home',
		component:HomeComponent,
		runGuardsAndResolvers: 'always'
	},
	{
		path:'book',
		component:FilterComponent
	},
	{
		path:'help',
		component:HelpComponent
	},
	{
		path:'detail',
		component:DetailComponent
	},
	{
		path:'question',
		component:ContactComponent
	},
	{
		path:'search',
		component:SearchComponent
	},
	{
		path:'login',
		component:LoginComponent
	},
	{
		path:'logout',
		component:LogoutComponent,
		canActivate:[AuthGaurdService]
	},
	{
		path:'signup',
		component:RegisterComponent
	},
	{
		path:'cart',
		component:CartComponent,
		canActivate:[AuthGaurdService]
	},
	{
		path:'buy',
		component:BuyComponent,
		canActivate:[AuthGaurdService]
	},
	{
		path:'**',
		component:ErrorComponent
	}
];
