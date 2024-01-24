import { inject, Injectable } from '@angular/core';
import { apiUrls } from '../api.urls';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  http = inject(HttpClient);

  createTaskService(taskDetails: any){
    return this.http.post(`${apiUrls.authServiceApi}createTask`,taskDetails, {withCredentials: true});
  }

  fetchTasksService(){
    return this.http.get(`${apiUrls.authServiceApi}fetchTasks`,{withCredentials: true});
  }

  fetchFilteredTasksService(filteredTasks: any){
    return this.http.post(`${apiUrls.authServiceApi}fetchFilteredTasks`,filteredTasks, {withCredentials: true});
  }

  fetchDeliveryByIdService(delivery_id: any){
    return this.http.post(`${apiUrls.authServiceApi}fetchDeliveryById`,delivery_id, {withCredentials: true});
  }
}
