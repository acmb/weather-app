"use client"

import { 
  Card, 
  Color,
  Metric, 
  Text 
} from "@tremor/react"

type Props = {
  color?: Color
  metric: string
  title: string
}

export default function StatCard({
  color,
  metric,
  title
}: Props) {
  return (
    <Card
      decoration="top"
      decorationColor={color}
    >
      <Text>{title}</Text>
      <Metric>{metric}</Metric>
    </Card>
  )
}
