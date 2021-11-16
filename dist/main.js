(() => {
	var e = document.getElementById('city'),
		t = document.getElementById('aqi'),
		a = document.getElementById('health'),
		n = document.getElementById('btn'),
		o = document.getElementById('geo');
	n.onclick = function () {
		var n =
			'https://api.waqi.info/feed/' +
			document.getElementById('input').value +
			'/?token=b47774a356ecf251cfbf29b3d1591c34287ace06';
		axios.get(n).then(function (n) {
			if (void 0 === n.data.data.city)
				e.innerHTML = 'Sorry, we cannot find your city!';
			else if (void 0 !== n.data.data.city.name) {
				var o = n.data.data.city.name;
				e.innerHTML = o;
			}
			void 0 === n.data.data.iaqi &&
				((t.innerHTML = 'n.d'), (a.innerHTML = 'n.d')),
				void 0 === n.data.data.iaqi.pm25 && (t.innerHTML = 'n.d');
			var i = n.data.data.aqi;
			(t.innerHTML = i),
				i <= 50
					? ((a.innerHTML =
							'Air quality is considered satisfactory, and air pollution poses little or no risk.'),
					  (t.style.backgroundColor = '#8FBCBB'))
					: i > 50 && i <= 100
					? ((a.innerHTML =
							'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.'),
					  (t.style.backgroundColor = '#8FBCBB'))
					: i > 100 && i <= 150
					? ((a.innerHTML =
							'Members of sensitive groups may experience health effects. The general public is not likely to be affected.'),
					  (t.style.backgroundColor = '#88C0D0'))
					: i > 150 && i <= 200
					? ((a.innerHTML =
							'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.'),
					  (t.style.backgroundColor = '#88C0D0'))
					: i > 200 && i <= 300
					? ((a.innerHTML =
							'Health warnings of emergency conditions. The entire population is more likely to be affected.'),
					  (t.style.backgroundColor = '#B48EAD'))
					: i > 300 &&
					  ((a.innerHTML = 'Health alert'),
					  (t.style.backgroundColor = '#B48EAD'));
			var l = n.data.data.city.geo[0],
				s = n.data.data.city.geo[1];
			r(l, s);
		});
	};
	var i = L.map('mapid'),
		r = function (e, t) {
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution:
					'<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
			}).addTo(i),
				i.setView([e, t], 4),
				L.marker([e, t]);
		};
	(o.onclick = function () {
		axios
			.get(
				'https://api.waqi.info/feed/here/?token=b47774a356ecf251cfbf29b3d1591c34287ace06'
			)
			.then(function (n) {
				var o = n.data.data.city.name;
				(e.innerHTML = o),
					void 0 === n.data.data.iaqi.pm25 && (pm.innerHTML = 'nd.');
				var i = n.data.data.aqi;
				(t.innerHTML = i),
					i <= 50
						? ((a.innerHTML =
								'Air quality is considered satisfactory, and air pollution poses little or no risk.'),
						  (t.style.backgroundColor = '#8FBCBB'))
						: i > 50 && i <= 100
						? ((a.innerHTML =
								'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.'),
						  (t.style.backgroundColor = '#8FBCBB'))
						: i > 100 && i <= 150
						? ((a.innerHTML =
								'Members of sensitive groups may experience health effects. The general public is not likely to be affected.'),
						  (t.style.backgroundColor = '#88C0D0'))
						: i > 150 && i <= 200
						? ((a.innerHTML =
								'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.'),
						  (t.style.backgroundColor = '#88C0D0'))
						: i > 200 && i <= 300
						? ((a.innerHTML =
								'Health warnings of emergency conditions. The entire population is more likely to be affected.'),
						  (t.style.backgroundColor = '#B48EAD'))
						: i > 300 &&
						  ((a.innerHTML =
								'Health alert: everyone may experience more serious health effects.'),
						  (t.style.backgroundColor = '#B48EAD'));
				var l = n.data.data.city.geo[0],
					s = n.data.data.city.geo[1];
				r(l, s);
			});
	}),
		r(45.4215296, -75.6971931);
})();
