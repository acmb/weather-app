"use client"

import { 
  AreaChart,
  Card,
  Title
} from "@tremor/react"

type Props = {
  results: Root
}

export default function TempChart({
  results
}: Props) {
  const hourly = results?.hourly.time.map(
    time => new Date(time).toLocaleString("en-US", {
      hour: "numeric",
      hour12: false
    })
  ).slice(0, 24)

  const data = hourly.map((hour, index) => ({
    time: Number(hour),
    "UV Index": results.hourly.uv_index[index],
    "Temperature (C)": results.hourly.temperature_2m[index]
  }))

  const dataFormatter = (number: number) => `${number}`

  return (
    <Card>
      <Title>Temperature & UV Index</Title>
      <AreaChart
        categories={[
          "Temperature (C)",
          "UV Index"
        ]}
        className="mt-6"
        colors={[
          "yellow",
          "rose"
        ]}
        data={data}
        index="time"
        minValue={0}
        showLegend
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  )
}
