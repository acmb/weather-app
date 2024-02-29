const cleanData = (data: Root, city: string) => {
  const {
    current_weather,
    hourly,
    hourly_units,
    timezone,
    timezone_abbreviation
  } = data

  const {
    temperature,
    time,
    weathercode,
    winddirection,
    windspeed
  } = current_weather

  const {
    precipitation_probability,
    rain,
    relativehumidity_2m,
    snowfall,
    temperature_2m,
    uv_index
  } = hourly

  return {
    city,
    current_weather: {
      temperature,
      time,
      weathercode,
      winddirection,
      windspeed
    },
    hourly: {
      precipitation_probability: precipitation_probability.slice(0, 24),
      rain: rain.slice(0, 24),
      relativehumidity_2m: relativehumidity_2m.slice(0, 24),
      snowfall: snowfall.slice(0, 24),
      temperature_2m: temperature_2m.slice(0, 24),
      uv_index: uv_index.slice(0, 24)
    },
    hourly_units,
    timezone,
    timezone_abbreviation
  }
}

export default cleanData
