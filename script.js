const apiKey = '4ec7e2e0c52d18a1ec8963052f9dde81';
const cityInput=document.getElementById('cityInput');
const searchBtn=document.getElementById('searchBtn');
const weatherResult=document.getElementById('weatherResult');
const locationBtn=document.getElementById('locationBtn')
const clearBtn = document.getElementById('clearBtn');

document.body.style.background = "url('https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000&auto=format&fit=crop') no-repeat center center/cover";
searchBtn.addEventListener('click',function(){
    event.preventDefault();
    const city=cityInput.value;
  document.getElementById('forecast').innerHTML='';
  if(city===''){
    weatherResult.textContent='Please enter a city name';
    return;
  
  }
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      if(data.cod==='404'){
        weatherResult.textContent='City not found!';
        return;
      }
      if(data.cod==='401'){
        weatherResult.textContent='API Key not active yet.Please wait';
        return;
      }
      const temp=data.main.temp;
      const desc=data.weather[0].description;
      const humidity=data.main.humidity;
      const weatherMain = data.weather[0].main;
let icon = "";

if (weatherMain === "Clear") {
    icon = "☀️";
    document.body.style.background = "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop') no-repeat center center/cover";
   
} else if (weatherMain === "Rain") {
    icon = "🌧️";
    document.body.style.background = "url('https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1000&auto=format&fit=crop') no-repeat center center/cover";
    
} else if (weatherMain === "Clouds") {
    icon = "☁️";
    document.body.style.background = "url('https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=80&w=1000&auto=format&fit=crop') no-repeat center center/cover";
    
} else if (weatherMain === "Snow") { // هاد يلي ضفناه
    icon = "❄️";
    document.body.style.background = "url('https://images.unsplash.com/photo-1478719059408-592965723cbc?q=80&w=1000&auto=format&fit=crop') no-repeat center center/cover";
    } else if (weatherMain === "Mist" || weatherMain === "Fog" || weatherMain === "Haze") {
    icon = "🌫️";
    
    document.body.style.background = "url('https://images.unsplash.com/photo-1487621167305-5d248087c724?q=80&w=1000&auto=format&fit=crop') no-repeat center center/cover";
} else {
    icon = "🌤️";
    document.body.style.background = "url('https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000&auto=format&fit=crop') no-repeat center center/cover";
}

weatherResult.innerHTML = `
    <h2>${icon} ${data.name}</h2>
    <p>Temperature: ${temp} °C</p>
    <p>Weather: ${desc}</p>
    <p>Humidity: ${humidity}%</p>`;
  getForecast(city);})
   .catch(function(error){
    weatherResult.textContent='Error fetching data.Check your internet.';

   });
});
locationBtn.addEventListener('click',function(){
  
    if(navigator.geolocation){
     navigator.geolocation.getCurrentPosition(function(position){
      const lat=position.coords.latitude;
      const lon = position.coords.longitude;
            
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        fetch(url)
        .then(res => res.json())
        .then(data => {
       const temp=data.main.temp;
       const desc=data.weather[0].description;
       const humidity=data.main.humidity;
         const weatherMain = data.weather[0].main; // 👈 ضفنا هاد

    
    let icon = "";
    if (weatherMain === "Clear") {
        icon = "☀️";
        document.body.style.background = "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop') no-repeat center center/cover";
    } else if (weatherMain === "Rain") {
        icon = "🌧️";
        document.body.style.background = "url('https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1000&auto=format&fit=crop') no-repeat center center/cover";
    } else if (weatherMain === "Clouds") {
        icon = "☁️";
        document.body.style.background = "url('https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=80&w=1000&auto=format&fit=crop') no-repeat center center/cover";
    } else if (weatherMain === "Snow") {
        icon = "❄️";
        document.body.style.background = "url('https://images.unsplash.com/photo-1478719059408-592965723cbc?q=80&w=1000&auto=format&fit=crop') no-repeat center center/cover";
        } else if (weatherMain === "Mist" || weatherMain === "Fog" || weatherMain === "Haze") {
    icon = "🌫️";
   
    document.body.style.background = "url('https://images.unsplash.com/photo-1487621167305-5d248087c724?q=80&w=1000&auto=format&fit=crop') no-repeat center center/cover";
    } else {
        icon = "🌤️";
        document.body.style.background = "url('https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000&auto=format&fit=crop') no-repeat center center/cover";
    }

       weatherResult.innerHTML=`
       <h2>📍 ${data.name}</h2>
       <p>Temperature: ${temp}</p>
       <p>Weather: ${desc} </p>
       <p>Humidity: ${humidity} </p>
      
       `;
       getForecast(data.name);
    });

});



     }else{
       alert("Geolocation is not supported by this browser.")
     }
});
clearBtn.addEventListener('click', function() {
    
    weatherResult.innerHTML = '';
    document.getElementById('forecast').innerHTML = '';
    
    
    cityInput.value = '';
    

    document.body.style.background = "url('https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000&auto=format&fit=crop') no-repeat center center/cover";
});
function getForecast(city){
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  const forecastDiv =document.getElementById('forecast');
  forecastDiv.innerHTML='';
  fetch(forecastUrl)
  .then(res => res.json())
  .then(data => {
   let daysDisplayed = 0;  
   let htmlContent="";

for (let i = 0; i < data.list.length; i++) {
    const dayData = data.list[i];
    const date = new Date(dayData.dt * 1000);
    
    const hour = date.getHours(); 

   
    if (hour === 12 && daysDisplayed < 5) {
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(dayData.main.temp);
        const iconCode = dayData.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
        htmlContent += `
        <div class="forecast-card">
            <p><strong>${dayName}</strong></p> 
            <img src="${iconUrl}" alt="icon" style="width:40px;">
            <p>${temp}°C</p>
        </div>
        `;
        
        daysDisplayed++; 
    }
    
    if (daysDisplayed === 5) {
        break;
    }
}
forecastDiv.innerHTML=htmlContent;
  });






}