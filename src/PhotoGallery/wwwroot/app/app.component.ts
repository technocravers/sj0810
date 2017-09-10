import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import 'rxjs/add/operator/map';
import { enableProdMode } from '@angular/core';

enableProdMode();
import { OperationResult } from './core/domain/operationResult';
import { MembershipService } from './core/services/membership.service';
import { NotificationService } from './core/services/notification.service';
import { User } from './core/domain/user';

@Component({
    selector: 'photogallery-app',
    templateUrl: './app/app.component.html'
})
export class AppComponent implements OnInit {
    constructor(public membershipService: MembershipService,
        public notificationService: NotificationService,
                public location: Location) { }

    ngOnInit() { }

    isUserLoggedIn(): boolean {
        return this.membershipService.isUserAuthenticated();
    }
   

    getUserName(): string {
        if (this.isUserLoggedIn()) {
            var _user = this.membershipService.getLoggedInUser();
            return _user.Username;
        }
        else
            return 'Account';
    }

    logout(): void {
        this.membershipService.logout()
            .subscribe(res => {
                localStorage.removeItem('user');
            },
            error => console.error('Error: ' + error),
            () => { });
    }

    getUserRole(): string {
        var _generalResult: OperationResult = new OperationResult(false, '');
        if (this.isUserLoggedIn()) {
            this.membershipService.getUserRole()
                .subscribe((res: any) => {
                    _generalResult.Succeeded = res.Succeeded;
                    _generalResult.Message = res.Message;
                });
            return _generalResult.Message;
        } else {
            _generalResult.Succeeded = false;
            _generalResult.Message = 'You"re not loggedin.';
        }
    }
}
