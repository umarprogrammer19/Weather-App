document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const city = document.getElementById('city').value.trim();
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    const apiKey = '2aabea5f82e14886a5e131324242408'; // Replace with your API key
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.error) {
            document.getElementById('weather-card').innerHTML = `<p>${data.error.message}</p>`;
            return;
        }

        const weatherHtml = `
            <div class='weather-card mx-auto'>
                <h1 class='text-2xl'>${data.location.name}</h1>
                <p class='text-gray-500'>${data.location.localtime}, ${data.location.country}</p>
                <div class='mt-5 d-flex justify-content-between align-items-center'>
                    <h2 class='text-4xl'>${data.current.temp_c}°C</h2>
                    <img width="160px" src=${data.current.condition.icon} alt='Weather icon' />
                </div>
                <h4>${data.current.condition.text}</h4>
            </div>
        `;
        document.getElementById('weather-card').innerHTML = weatherHtml;
    } catch (error) {
        document.getElementById('weather-card').innerHTML = `<p>Error: ${error.message}</p>`;
    }
});
