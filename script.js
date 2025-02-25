//global api variable
const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=36.1628&longitude=-85.5016&current=temperature_2m,relative_humidity_2m,weather_code&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago'

function getWeather() {
    fetch(apiUrl) //makes an html request to the api link
        .then(objResponse => objResponse.json())  //then is called because fetch returns a promise. objResponse extracts the json using .json
        .then(objData => { //runs after json has been parsed. objData then contains the actual weather data retrieved from the api
            
            // fecthed data from the api and updated the webpage's content to show the correct temperature and humidity levels that were taken from the api link.
            document.getElementById('temperature').textContent = objData.current.temperature_2m  //loads the temperature element with the temp value from the API response
            document.getElementById('humidity').textContent = objData.current.relative_humidity_2m  //loads the humidity element with the humidity value from the API response
            document.getElementById('temperature').setAttribute('aria-label', `Current temperature: ${objData.current.temperature_2m} degrees Fahrenheit`); //accessibility for temperature. handled in JS because we are pulling from an api so the values could change over time
            document.getElementById('humidity').setAttribute('aria-label', `Current humidity: ${objData.current.relative_humidity_2m} percent`); //accessibility for humidity. handled in JS because we are pulling from an api so the values could change over time
            getWeatherCondition(objData.current.weather_code)  //calls the getWeatherCondition function to load the condition element with the correct value from the API response

            //setting an icon for humidity
            //document.getElementById('humidity-icon').src = 'images/humidity.png'
        })
        .catch(error => console.error('Error fetching weather data:', error)); //error for if something goes wrong with the api request
}


// Function to interpret the weather code and return a condition. Documentation for this is at the bottom of the  weather website
function getWeatherCondition(code) {
    let icon = ''
    let description = ''
    //evaluates the code value and executes different cases depending on its value
    switch (code) {
        //different cases represent a different code variable and provides the specific string it represents
        case 0:
            icon = 'images/clear_icon.png'
            description = 'Clear Sky'  //if code is 0, return clear sky. 
            break
        case 1:
        case 2:
        case 3:
            icon = 'images/overcast.png'
            description = 'Partly Cloudy/Overcast' //if code is 1, 2 or 3, return partly cloudy/overcast
            break 
        case 45:
        case 48:
            icon = 'images/fog.png' //if code is 45 or 48, return foggy
            description = 'Foggy'
            break
        case 51:
        case 53:
        case 55:
            icon = 'images/drizzle.png' //if code is 51, 53, 55, return drizzle
            description = 'Drizzle'
            break
        case 56:
        case 57:
            icon = 'images/freezing_drizzle'
            description = 'Freezing drizzle' //if code is 56 or 57, return freezing drizzle
            break
        case 61:
        case 63:
        case 65:
            icon = 'images/rain.png'
            description = 'Rain' //if code is 61, 63, 65, return rain
            break
        case 66:
        case 67:
            icon = 'images/freezing_rain.png' //if code is 66, 67, return freezing rain
            description = 'Freezing Rain'
            break
        case 71:
        case 73:
        case 75:
            icon = 'images/snow.png' //if code is 71, 73, 75, return snow fall
            description = 'Snow fall'
            break
        
        case 95:
            icon = 'images/thunderstorm.png'  //if code is 95, return thunderstorm
            description = 'Thunderstorm'
            break
        default:
            icon = 'images/unknown.png';  // Added a fallback icon for unknown conditions
            description = 'Condition not available';
            break;
    }
    // Set the icon and description in the webpage for the condition
    document.getElementById('condition-icon').src = icon;         // finds the element where the weather condition icon should be displayed. the src is used to set the source of an image and icon is the variable that holds the path to the URL of the image that is supposed to be displayed
    document.getElementById('condition').textContent = description;  // finds the element where the weather description should be displayed and sets the text inside the condition element to the value in the description variable.
    document.getElementById('condition-icon').alt = `Weather condition: ${description}`; //describes the weather icon shown
    document.getElementById('condition').setAttribute('aria-label', `Current weather condition: ${description}`); //enhances accessibility for the condition
}


// Call the function to fetch and display the weather
getWeather();



//Used Generative AI to help troubleshoot errors I was getting with the icons. Also used it to explain what a manifest does.