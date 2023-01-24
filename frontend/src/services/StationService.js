import api from "./api"

const StationService = {
    getAllStations() {
        return api().get("/station");
    },
};

export default StationService;