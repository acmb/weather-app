"use client"

import { 
  AreaChart,
  Card,
  Title
} from "@tremor/react"

type Props = {
  results: Root
}

export default function RainChart({
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
    "Rain (%)": results.hourly.precipitation_probability[index]
  }))

  const dataFormatter = (number: number) => `${number} %`

  return (
    <Card>
      <Title>Chances of Rain</Title>
      <AreaChart
        categories={["Rain (%)"]}
        className="mt-6"
        colors={["blue"]}
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
