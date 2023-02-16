import api from "./api"

const IncidentsService = {

    getAllIncidents() {
        return api().get("/slot_incidents");
    },

    getIncidentsUser() {
        return api().get("/slot_incidentsUser");
    },

    createSlotIncidence(data) {
        return api().post("/slot_incidence", { 'slot_incidence': data });
    },

    createScooterIncidence(data) {
        return api().post("/scooter_incidence", { 'scooter_incidence': data });
    },

    updateSlotIncidence(id) {
        return api().delete(`slot_incidence/${id}`);
    },

    deleteSlotIncidence(id) {
        return api().delete(`slot_incidence/${id}`);
    },
    
};

export default IncidentsService;