import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CheckError } from '../util-service/error';
import { API_URL, UtilService } from '../util-service/util.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { closeLoad, loadPage } from '../util-service/load';

// const apiUrl = process.env.API_URL;
const apiUrl = API_URL;

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    // private newNotificationSubject = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient, public uService: UtilService) {}

    getNotifications(userId: any, next: (res: any) => any) {
        loadPage();
        this.http.get(`${apiUrl}/api/notifications/user/${userId}`).subscribe(
            CheckError((res) => {
                next(res);
                closeLoad();
                close();

            })
        );
    }

    async checkForNewNotifications(userId: any): Promise<boolean> {
        try {
            const res = await this.http.get<any>(`${apiUrl}/api/notifications/user/${userId}`)
                .toPromise();
            return res.new > 0;
        } catch (error) {
            console.error('Error checking for new notifications:', error);
            return false;
        }
      }

    markAllAsRead(userId: any, next: (res: any) => any) {
        this.http.put(`${apiUrl}/api/notifications/user/${userId}/markAllAsRead`, null).subscribe(
            CheckError((res) => {
                next(res);
            })
        );
    }
}
