import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  toggledValue = true;
  @Output() toggleChangeEvent = new EventEmitter<boolean>();

  toggled() {

    if (this.toggledValue === undefined) {
      this.toggledValue == true;
    }

    this.toggledValue = !this.toggledValue;
    console.log(this.toggledValue);
    this.toggleChangeEvent.emit(this.toggledValue);

  }

}
