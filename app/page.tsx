"use client"

import {
  Card,
  Divider,
  Subtitle,
  Text
} from "@tremor/react"

import CityPicker from "@/components/CityPicker/CityPicker"

export default function Home() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#be185d] to-[#9d174d] p-10 flex flex-col justify-center items-center"
    >
      <Card
        className="bg-white max-w-4xl mx-auto rounded-lg"
      >
        <Text
          className="text-6xl font-bold text-center mb-10"
        >
          Weather AI
        </Text>
        <Subtitle
          className="text-xl text-center"
        >
          Powered by OpenAI
        </Subtitle>
        <Divider
          className="my-10 bg-cab-sarv"
        />
        <Card
          className="bg-gradient-to-br from-[#be185d] to-[#9d174d] text-white rounded-2xl"
        >
          <CityPicker />
        </Card>
      </Card>
    </div>
  )
}
