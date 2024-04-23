import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css',
})
export class AppointmentListComponent implements OnInit {
  appointmentTitle: string = '';
  appointmentDate: Date = new Date();
  appointments: Appointment[] = [];

  ngOnInit(): void {
    this.loadAppointments();
  }
  loadAppointments() {
    const data: string | null = localStorage.getItem('appointments');
    this.appointments = data ? JSON.parse(data) : [];
  }
  addAppointment() {
    if (this.appointmentTitle.trim().length && this.appointmentDate) {
      const newAppointment: Appointment = {
        id: Date.now(),
        title: this.appointmentTitle,
        date: this.appointmentDate,
      };
      this.appointments.push(newAppointment);
      this.appointmentTitle = '';
      this.appointmentDate = new Date();

      localStorage.setItem('appointments', JSON.stringify(this.appointments));
    }
  }
  deleteAppointment(index: number) {
    this.appointments.splice(index, 1);
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }
}
