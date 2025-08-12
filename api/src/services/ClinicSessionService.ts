import sessionRepository from "../repositories/ClinicSessionRepositary";

const createSession = async (data: any) => {
  return await sessionRepository.createSession(data);
};

const getAllSessions = async () => {
  return await sessionRepository.getAllSessions();
};

const getSessionById = async (id: number) => {
  return await sessionRepository.getSessionById(id);
};

const updateSession = async (id: number, data: any) => {
  return await sessionRepository.updateSession(id, data);
};

const deleteSession = async (id: number) => {
  return await sessionRepository.deleteSession(id);
};
async function getSessionsByClinicId(clinicId: number) {
  return sessionRepository.findAll({ where: { clinicId } });
};

export default {
  createSession,
  getAllSessions,
  getSessionById,
  updateSession,
  deleteSession,
  getSessionsByClinicId
};
