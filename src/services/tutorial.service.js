import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/all.json");
  }

  get(id) {
    return http.get(`/id/${id}.json`);
  }

  create(data) {
    return http.post("/tutorials", data);
  }

  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get("/all.json");
  }
}

export default new TutorialDataService();