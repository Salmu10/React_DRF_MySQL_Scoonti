import api from "./api"

const StationService = {

    getAllStations() {
        return api().get("/station");
    },

    getOneStation(slug) {
        return api().get(`station/${slug}`);
    },

    createStation(data) {
        return api().post("/station", data);
    },

    deleteStation(slug) {
        return api().delete(`station/${slug}`);
    },
};

export default StationService;