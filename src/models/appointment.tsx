import { Clinic } from "./clinic";
import { Doctor } from "./doctor";

export type Appointment = {
    id: number;
    doctor_id: number;
    clinic_id: number;
    start_time: Date;
    end_time: Date;
    doctor: Doctor;
    clinic: Clinic;
}