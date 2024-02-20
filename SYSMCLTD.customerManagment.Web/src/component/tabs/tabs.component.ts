// src/app/tabs/tabs.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone:true,
  imports:[CommonModule],
  selector: 'app-tabs',
  template: `
    <div class="tabs">
      <div *ngFor="let tab of tabs" class="tab" (click)="selectTab(tab)">
        {{ tab.title }}
      </div>
    </div>
    <div class="tab-content">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .tabs {
      display: flex;
      margin-bottom: 10px;
    }

    .tab {
      padding: 10px;
      cursor: pointer;
      border: 1px solid #ddd;
      background-color: #f9f9f9;
      border-radius: 5px 5px 0 0;
      margin-right: 5px;
    }

    .tab:hover {
      background-color: #e0e0e0;
    }

    .tab-content {
      border: 1px solid #ddd;
      padding: 10px;
      border-radius: 0 0 5px 5px;
    }
  `],
})
export class TabsComponent {
  @Input() tabs: Tab[] = [];
  selectedTab: Tab  =  {title: 'Customer Details'};

  selectTab(tab: Tab): void {
    
    this.selectedTab = tab;
  }
}

export interface Tab {
  title: string;
}
