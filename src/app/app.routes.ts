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
// MybookComponent
import { MybookComponent } from './sub-components/mybook/mybook.component';
import { AddComponent } from './sub-components/mybook/components/add/add.component';
import { ListComponent } from './sub-components/mybook/components/list/list.component';
// ProfileComponent
import { ProfileComponent } from './sub-components/profile/profile.component';
import { ShowProfileComponent } from './sub-components/profile/show-profile/show-profile.component';
import { EditprofileComponent } from './sub-components/profile/editprofile/editprofile.component';
import { EditPassComponent } from './sub-components/profile/edit-pass/edit-pass.component';

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
		path:'profile',
		component:ProfileComponent,
		canActivate:[AuthGaurdService],
		children: [
			{
				path:'show',
				component:ShowProfileComponent,
				canActivate:[AuthGaurdService]
			},
			{
				path:'edit',
				component:EditprofileComponent,
				canActivate:[AuthGaurdService]
			},
			{
				path:'pass',
				component:EditPassComponent,
				canActivate:[AuthGaurdService]
			}
		]
	},
	{
		path:'mybook',
		component:MybookComponent,
		canActivate:[AuthGaurdService],
		children: [
			{
				path:'add',
				component:AddComponent,
				canActivate:[AuthGaurdService]
			},
			{
				path:'list',
				component:ListComponent,
				canActivate:[AuthGaurdService]
			}
		]
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
