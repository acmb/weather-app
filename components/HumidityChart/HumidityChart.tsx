"use client"

import { 
  AreaChart,
  Card,
  Title
} from "@tremor/react"

type Props = {
  results: Root
}

export default function HumidityChart({
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
    "Humidity (%)": results.hourly.relativehumidity_2m[index]
  }))

  const dataFormatter = (number: number) => `${number} %`

  return (
    <Card>
      <Title>Humidity Levels</Title>
      <AreaChart
        categories={["Humidity (%)"]}
        className="mt-6"
        colors={["teal"]}
        data={data}
        index="time"
        minValue={0}
        maxValue={100}
        showLegend
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  )
}
