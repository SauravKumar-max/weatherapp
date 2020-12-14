const searchEl = document.querySelector(".search");

const proxy = 'https://cors-anywhere.herokuapp.com/';
let api = "";


function fetchingData(){
   
            fetch(api)
               .then(response => {
                    return response.json();
                })
               .then(data => {
                   if(data){
                       holder.style.display = "none";
                   }

                   const {text, code} = data.current.condition;
                   const {feelslike_c, feelslike_f, humidity, uv} = data.current;
                   const {name} = data.location;

                   const celciusTemp = Math.floor(feelslike_c);
                   const fahrenheitTemp = Math.floor(feelslike_f);
                   celciusEl.textContent = celciusTemp;
                   fahrenheitEl.textContent = "/ "+fahrenheitTemp;
                   placeName.textContent = name;
                   humidEL.textContent = `Humidity | ${humidity}%`;
                   condEL.textContent = `Condition | ${text}`;
                   uvEl.textContent = `UltraViolet | ${uv}`;
                   
                   if(code > 1278){
                       imageEl.src = './images/snow.svg';
                   }else if(code > 1272){
                       imageEl.src = './images/rain.svg';
                   }else if(code > 1248){
                       imageEl.src = './images/snow.svg';
                   }else if(code > 1239){
                       imageEl.src = './images/rain.svg';
                   }else if(code > 1203){
                       imageEl.src = './images/sleet.svg';
                   }else if(code > 1149){
                       imageEl.src = './images/rain.svg';
                   }else if(code > 1029){
                       imageEl.src = './images/fog.svg';
                   }else if(code > 1002){
                       imageEl.src = './images/cloudy.svg';
                   }else {
                       imageEl.src = './images/sunny.svg';
                   }

                   console.log(data);
                })
}

function currentLocation(){
    let long;
    let lat;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
           lat = position.coords.latitude  ;
           long = position.coords.longitude;
           console.log(lat,long);

            api = `${proxy}http://api.weatherapi.com/v1/current.json?key=abefdc922fbb46fc94a95020200611&q=${lat},${long}`;
            
            setTimeout(()=>{
                fetchingData();
            }, 1000);
            
            
        })
    }
}


function searchWeather(e){
    if(e.keyCode == 13){
        
    }
    
}

searchEl.addEventListener('keyup', searchWeather);
