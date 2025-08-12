

import {
  deleteAttendance,
  findAllAttendances,
  findAttendance,
  updateAttendance,
  upsertAttendance,
} from "../repositories/clinicAttendanceRepository";


// Mark (create or update) a patient's attendance
export const markAttendance = async (
  clinicId: number,
  sessionId: number,
  patientId: number,
  attendance: boolean
) => {
  return await upsertAttendance({
    clinicId,
    sessionId,
    patientId,
    attendance,
  });
};

// Get all attendance records
export const getAllAttendances = async (
  clinicId: number,
  sessionId: number
) => {
  return await findAllAttendances(clinicId, sessionId);
};

// Get attendance for a specific patient in a session
export const getAttendance = async (
  clinicId: number,
  sessionId: number,
  patientId: number
) => {
  return await findAttendance(clinicId, sessionId, patientId);
};

// Modify an existing attendance record
export const modifyAttendance = async (
  clinicId: number,
  sessionId: number,
  patientId: number,
  attendance: boolean
) => {
  return await updateAttendance(clinicId, sessionId, patientId, attendance);
};

// Delete a specific attendance record
export const removeAttendance = async (
  clinicId: number,
  sessionId: number,
  patientId: number
) => {
  return await deleteAttendance(clinicId, sessionId, patientId);
};
