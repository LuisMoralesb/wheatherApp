// api consumo del clima
async function fetchWeather() {
    const apiKey = "a70972d385cb252affae7559aa9729ee";
    const city = document.querySelector('#city').value;

    // validacion si city viene vacio
    if (city === "") {
        document.querySelector("#weatherInfo").innerHTML =
            `<p class=no-found>Enter a city</p>`
        document.getElementById('city').value = '';
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    try {
        const response = await fetch(url)
        const data = await response.json()

        // validamos que si haya data
        if (response.status == '404') {
            document.querySelector("#weatherInfo").innerHTML =
                `<p class=no-found>City no found: ${city}</p>`
            document.getElementById('city').value = '';
        }

        //Obtenemos la fecha y la desglozamos
        const fecha = new Date();
        const meses = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octuber', 'November', 'December'];
        const dias = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        let diaSemana = dias[fecha.getDay()];
        let dia = fecha.getDate();
        let mes = meses[fecha.getMonth()];
        let fechaTexto = `${diaSemana}, ${dia} ${mes}`;

        //desestructuramos los datos que necesitamos mostrar
        const { main: { temp, humidity, feels_like }, weather: { [0]: { icon } }, wind: { speed } } = data
        //const description = data.weather[0].description;

        //Mostramos la informacion en el DOM del navegador
        document.querySelector("#weatherInfo").innerHTML =
            `
            <p> ${fechaTexto}</p>
            <h2 class=ciudad>${city}</h2>
            <p> The temperature is: ${temp}°C</p>
            <p> Feels like: ${feels_like}°C</p>
            <p> Humedity: ${humidity}%</p>
            <p> Wind speed: ${speed}m/s</p>
            <img class="img-temp" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt='system icon'>
            `
        document.getElementById('city').value = '';
    } catch (error) {
        console.log(error)
    }
}