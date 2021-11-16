let apiKey = process.env.API_KEY;
let city = document.getElementById('city');
let aqi = document.getElementById('aqi');
let health = document.getElementById('health');
let btn = document.getElementById('btn');
let geo = document.getElementById('geo');

btn.onclick = function () {
	let location = document.getElementById('input').value;
	let url = 'https://api.waqi.info/feed/' + location + '/?token=' + apiKey;

	axios.get(url).then((response) => {
		if (response.data.data.city === undefined) {
			city.innerHTML = 'Sorry, we cannot find your city!';
		} else if (response.data.data.city.name !== undefined) {
			let cityName = response.data.data.city.name;
			city.innerHTML = cityName;
		}

		if (response.data.data.iaqi === undefined) {
			aqi.innerHTML = 'n.d';
			health.innerHTML = 'n.d';
		}

		if (response.data.data.iaqi.pm25 === undefined) {
			aqi.innerHTML = 'n.d';
		}

		let airQuality = response.data.data.aqi;
		aqi.innerHTML = airQuality;
		let good =
			'Air quality is considered satisfactory, and air pollution poses little or no risk.';
		let moderate =
			'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.';
		let middle =
			'Members of sensitive groups may experience health effects. The general public is not likely to be affected.';
		let unhealthy =
			'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.';
		let very_unhealthy =
			'Health warnings of emergency conditions. The entire population is more likely to be affected.';
		let hazardous = 'Health alert';

		if (airQuality <= 50) {
			health.innerHTML = good;
			aqi.style.backgroundColor = '#8FBCBB';
		} else if (airQuality > 50 && airQuality <= 100) {
			health.innerHTML = moderate;
			aqi.style.backgroundColor = '#8FBCBB';
		} else if (airQuality > 100 && airQuality <= 150) {
			health.innerHTML = middle;
			aqi.style.backgroundColor = '#88C0D0';
		} else if (airQuality > 150 && airQuality <= 200) {
			health.innerHTML = unhealthy;
			aqi.style.backgroundColor = '#88C0D0';
		} else if (airQuality > 200 && airQuality <= 300) {
			health.innerHTML = very_unhealthy;
			aqi.style.backgroundColor = '#B48EAD';
		} else if (airQuality > 300) {
			health.innerHTML = hazardous;
			aqi.style.backgroundColor = '#B48EAD';
		}

		let lat = response.data.data.city.geo[0];
		let lng = response.data.data.city.geo[1];
		showMap(lat, lng);
	});
};

// Map

const map = L.map('mapid');

const showMap = (lat, lng) => {
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution:
			'<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	}).addTo(map);

	map.setView([lat, lng], 4);
	L.marker([lat, lng]);
};

// Geolocation

geo.onclick = function () {
	let urL = 'https://api.waqi.info/feed/here/?token=' + apiKey;
	axios.get(urL).then((response) => {
		let cityName = response.data.data.city.name;
		city.innerHTML = cityName;
		if (response.data.data.iaqi.pm25 === undefined) {
			pm.innerHTML = 'nd.';
		}

		let airQuality = response.data.data.aqi;
		aqi.innerHTML = airQuality;
		let good =
			'Air quality is considered satisfactory, and air pollution poses little or no risk.';
		let moderate =
			'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.';
		let middle =
			'Members of sensitive groups may experience health effects. The general public is not likely to be affected.';
		let unhealthy =
			'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.';
		let very_unhealthy =
			'Health warnings of emergency conditions. The entire population is more likely to be affected.';
		let hazardous =
			'Health alert: everyone may experience more serious health effects.';

		if (airQuality <= 50) {
			health.innerHTML = good;
			aqi.style.backgroundColor = '#8FBCBB';
		} else if (airQuality > 50 && airQuality <= 100) {
			health.innerHTML = moderate;
			aqi.style.backgroundColor = '#8FBCBB';
		} else if (airQuality > 100 && airQuality <= 150) {
			health.innerHTML = middle;
			aqi.style.backgroundColor = '#88C0D0';
		} else if (airQuality > 150 && airQuality <= 200) {
			health.innerHTML = unhealthy;
			aqi.style.backgroundColor = '#88C0D0';
		} else if (airQuality > 200 && airQuality <= 300) {
			health.innerHTML = very_unhealthy;
			aqi.style.backgroundColor = '#B48EAD';
		} else if (airQuality > 300) {
			health.innerHTML = hazardous;
			aqi.style.backgroundColor = '#B48EAD';
		}

		let lat = response.data.data.city.geo[0];
		let lng = response.data.data.city.geo[1];
		showMap(lat, lng);
	});
};

showMap(45.4215296, -75.6971931);
