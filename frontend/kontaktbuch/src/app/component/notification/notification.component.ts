import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  @Input({required:true}) updateSuccess: boolean = false;
  @Input({required:true}) updateText: string = '';
}
