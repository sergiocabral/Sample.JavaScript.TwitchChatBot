const apiRequest = require('./apiRequest');

const apiKey = 'f7e0804703cd9cb0c3f9987d78e2a7ca';

async function getCity(city) {
    const limit = 1;
    const results = await apiRequest(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${apiKey}`);
    return results?.length > 0 ? {
        description: `${results[0].name}, ${results[0].country}`,
        lat: results[0].lat,
        lon: results[0].lon,
    } : null;
}

async function getWeather(lat, lon) {
    const lang = "pt_br";
    const units = "metric";
    const result = await apiRequest(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=${lang}&units=${units}&appid=${apiKey}`);
    return result?.weather?.length > 0 ? {
        description: result.weather[0].description,
        temperature: result.main.temp,
    } : null;
}

async function weather(city) {
    const cityData = await getCity(city);
    if (!cityData) {
        return `Cidade ${city} não encontrada`;
    }
    const geoWeather = await getWeather(cityData.lat, cityData.lon);
    if (!geoWeather) {
        return `Dados não disponíveis para a cidade ${cityData.description}`;
    }
    return `Temperatura de ${geoWeather.temperature}º, ${geoWeather.description}, em ${cityData.description}.`;
}

module.exports = weather;
