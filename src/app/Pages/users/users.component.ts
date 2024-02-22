import { Component, ElementRef, OnInit, QueryList, ViewChildren, inject, signal } from '@angular/core';
import { HlmAlertDialogComponent, HlmAlertDialogModule } from '@spartan-ng/ui-alertdialog-helm';
import { HlmTabsListComponent, HlmTabsModule } from '@spartan-ng/ui-tabs-helm';

import { BrnAlertDialogModule } from '@spartan-ng/ui-alertdialog-brain';
import { BrnMenuModule } from '@spartan-ng/ui-menu-brain';
import { BrnTabsModule } from '@spartan-ng/ui-tabs-brain';
import { CommonModule } from '@angular/common';
import { HlmDialogModule } from '@spartan-ng/ui-dialog-helm';
import { HlmIconModule } from '@spartan-ng/ui-icon-helm';
import { HlmMenuModule } from '@spartan-ng/ui-menu-helm';
import { HlmSeparatorModule } from '@spartan-ng/ui-separator-helm';
import { HlmSkeletonModule } from '@spartan-ng/ui-skeleton-helm';
import { HlmTableModule } from '@spartan-ng/ui-table-helm';
import { RouterModule } from '@angular/router';
import { UserDto } from '../shared/auth/dto/user.dto';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [HlmTableModule, HlmSeparatorModule, BrnTabsModule, HlmTabsListComponent, HlmTabsModule, HlmDialogModule, HlmAlertDialogModule, HlmIconModule, HlmMenuModule, RouterModule, BrnMenuModule, HlmSkeletonModule, CommonModule, BrnAlertDialogModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  @ViewChildren("images") imageRef!: QueryList<ElementRef<HTMLImageElement>>;
  imageLoaded = signal(false);
  state = signal<"open" | "closed">("closed");
  @ViewChildren("dialogs") dialogs!: QueryList<HlmAlertDialogComponent>;
  usersService = inject(UsersService);
  users: UserDto[] = [];

  ngOnInit(): void {
    this.getAllUsers();

  }

  getAllUsers() {
    this.usersService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id).subscribe({
      next: () => {
        console.log('User deleted successfully');
        this.getAllUsers();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  toggleDialogByName(name: string, state: "open" | "closed") {
    this.dialogs.toArray().forEach((dialog) => {
      if (name == dialog?._contentTemplate?.elementRef.nativeElement.parentNode.id) {
        dialog.newState = state;
      }
    })
  }
  private checkImageLoadStatus(): void {
    this.imageRef.toArray().forEach((image) => {
      if (!image.nativeElement.complete) {
        image.nativeElement.addEventListener("load",
          () => {
            setTimeout(() => this.imageLoaded.set(true), 1000)
          }
        )
      }
      else {
        this.imageLoaded.set(true)
      }
    });
  }


}
