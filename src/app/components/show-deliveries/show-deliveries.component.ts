import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { SharedDataService } from '../../services/shared-data.service';
import { DropdownModule } from 'primeng/dropdown';
import { TaskService } from '../../services/task.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-show-deliveries',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, DropdownModule],
  templateUrl: './show-deliveries.component.html',
  styleUrl: './show-deliveries.component.scss'
})
export class ShowDeliveriesComponent implements OnInit{
  sharedDataService = inject(SharedDataService);
  taskService = inject(TaskService);

  deliveries!: any
  selectedDelivery!:any;
  details : boolean = false;
  customer : boolean = false;
  history : boolean = false;
  customerContent !: object;
  detailsContent !: object;
  historyContent !: object;

  ngOnInit() {
    this.deliveries = this.sharedDataService.deliveries.get(this.sharedDataService.tasks[this.sharedDataService.clickedTask].task_id) || [];
    this.selectedDelivery = this.deliveries[0];
    this.onDeliverySelected();
  }

  onDeliverySelected(): void {
    this.taskService.fetchDeliveryByIdService({deliveryId:this.selectedDelivery.delivery_id})
    .pipe(
      finalize(() => {
        this.detailsTab();
        this.sharedDataService.loading = false;
      })
    )
    .subscribe({
      next:(res:any) => {
        this.sharedDataService.selectedDeliveryDetails = res[0][0];
        console.log(this.sharedDataService.selectedDeliveryDetails)
      }
    });
  }

  detailsTab(){
    this.details = true;
    this.customer = this.history = false;
    this.detailsContent = {
      'Complete Before':this.sharedDataService.selectedDeliveryDetails.deliver_before || '-',
      'Task ID':this.sharedDataService.selectedDeliveryDetails.task_id || '-',
    };
    console.log('dc',this.detailsContent);
  }
  customerTab(){
    this.customer = true;
    this.details = this.history = false;
    this.customerContent = {
      'Name':this.sharedDataService.selectedDeliveryDetails.name || '-',
      'Contact':this.sharedDataService.selectedDeliveryDetails.contact || '-',
      'Email':this.sharedDataService.selectedDeliveryDetails.email || '-',
      'Address':this.sharedDataService.selectedDeliveryDetails.delivery_address || '-',
    }
  }
  historyTab(){
    this.history = true;
    this.customer = this.details = false;
  }

  close(){
    this.sharedDataService.updateShowDeliveries(false);
    this.sharedDataService.updateShowTasks(true);
  }
}
