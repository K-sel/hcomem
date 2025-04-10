const BASE_URL = "https://chabloz.eu/files/horaires/";

const loadJson = (url) => fetch(url).then((response) => response.json());

const loadSchedule = () => loadJson(`${BASE_URL}/all`);

export { loadSchedule };
