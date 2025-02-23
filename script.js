//global api variable
const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=36.1628&longitude=-85.5016&current=temperature_2m,relative_humidity_2m,weather_code&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago'

function getWeather() {
    fetch(apiUrl)
        .then(objResponse => objResponse.json())
        .then(objData => {
            // Update the DOM with data from the API
            document.getElementById('temperature').textContent = objData.current.temperature_2m  //loads the temperature element with the temp value from the API response
            document.getElementById('humidity').textContent = objData.current.relative_humidity_2m  //loads the humidity element with the humidity value from the API response
            getWeatherCondition(objData.current.weather_code)  //calls the getWeatherCondition function to load the condition element with the correct value from the API response

            //setting an icon for humidity
            //document.getElementById('humidity-icon').src = 'images/humidity.png'
        })
        .catch(error => console.error('Error fetching weather data:', error));
}


// Function to interpret the weather code and return a condition. Documentation for this is at the bottom of the website
function getWeatherCondition(code) {
    let icon = ''
    let description = ''
    //evaluates the code value and executes different cases depending on its value
    switch (code) {
        //different cases represent a different code variable and provides the specific string it represents
        case 0:
            icon = 'images/clear_icon.png'
            description = 'Clear Sky'  //if code is 0, return clear sky. this trend continues throughout the function so i won't comment it for every line
            break
        case 1:
        case 2:
        case 3:
            icon = 'images/overcast.png'
            description = 'Partly Cloudy/Overcast'
            break 
        case 45:
        case 48:
            icon = 'images/fog.png'
            description = 'Foggy'
            break
        case 51:
        case 53:
        case 55:
            icon = 'images/drizzle.png'
            description = 'Drizzle'
            break
        case 56:
        case 57:
            icon = 'images/freezing_drizzle'
            description = 'Freezing drizzle'
            break
        case 61:
        case 63:
        case 65:
            icon = 'images/rain.png'
            description = 'Rain'
            break
        case 66:
        case 67:
            icon = 'images/freezing_rain.png'
            description = 'Freezing Rain'
            break
        case 71:
        case 73:
        case 75:
            icon = 'images/snow.png'
            description = 'Snow fall'
            break
        
        case 95:
            icon = 'images/thunderstorm.png'
            description = 'Thunderstorm'
            break
        default:
            icon = 'images/unknown.png';  // Added a fallback icon for unknown conditions
            description = 'Condition not available';
            break;
    }
    // Set the icon and description in the DOM
    document.getElementById('condition-icon').src = icon;         // Set the image for the weather condition
    document.getElementById('condition').textContent = description;  // Set the weather condition text
}


// Call the function to fetch and display the weather
getWeather();