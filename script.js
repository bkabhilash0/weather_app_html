const form = document.getElementById("search__form");
const detailBox = document.getElementById("climate__details-box");
const loader = document.getElementById("loader");
const myLocation = document.getElementById("location");
const date = document.getElementById("date");
const deg = document.getElementById("deg");
const ctype = document.getElementById("ctype");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  document.getElementById("default__msg").style.display = "none";
  console.log("Submitting");
  loader.style.display = "flex";
  detailBox.style.display = "none";
  const fData = new FormData(form);
  const place = fData.get("place");

  console.log("Running...");
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=a1e1ff22a7934e169ca93651231907&q=${place}&aqi=no`
  )
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      myLocation.innerText = `${result.location.name}, ${result.location.region}`;
      deg.innerHTML = `${result.current.temp_c}<span>&deg;C</span>`;
      ctype.innerText = result.current.condition.text;
      date.innerText = result.location.localtime.split(" ")[0];
      loader.style.display = "none";
      detailBox.style.display = "block";
    })
    .catch((err) => {
      loader.style.display = "none";
      detailBox.style.display = "block";
      alert("Something went Wrong");
    });
});

/*

{
    "location": {
        "name": "Kochi",
        "region": "Kerala",
        "country": "India",
        "lat": 9.97,
        "lon": 76.23,
        "tz_id": "Asia/Kolkata",
        "localtime_epoch": 1689760792,
        "localtime": "2023-07-19 15:29"
    },
    "current": {
        "last_updated_epoch": 1689759900,
        "last_updated": "2023-07-19 15:15",
        "temp_c": 28,
        "temp_f": 82.4,
        "is_day": 1,
        "condition": {
            "text": "Light rain",
            "icon": "//cdn.weatherapi.com/weather/64x64/day/296.png",
            "code": 1183
        },
        "wind_mph": 16.1,
        "wind_kph": 25.9,
        "wind_degree": 280,
        "wind_dir": "W",
        "pressure_mb": 1007,
        "pressure_in": 29.74,
        "precip_mm": 0.6,
        "precip_in": 0.02,
        "humidity": 84,
        "cloud": 75,
        "feelslike_c": 32.2,
        "feelslike_f": 90,
        "vis_km": 4,
        "vis_miles": 2,
        "uv": 6,
        "gust_mph": 21,
        "gust_kph": 33.8
    }
}
*/
