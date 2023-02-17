import api from "./api"

const IncidentsService = {

    getAllIncidentsSlots() {
        return api().get("/slots_incidents");
    },

    getAllIncidentsScooters() {
        return api().get("/scooters_incidents");
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

    deleteScooterIncidence(id) {
        return api().delete(`scooter_incidence/${id}`);
    },
    
};

export default IncidentsService;