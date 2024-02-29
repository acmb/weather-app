"use client"

import { useRouter } from "next/navigation"
import {
  Children,
  FC,
  ReactNode,
  useState
} from "react"
import {
  City,
  Country
} from "country-state-city"
import {
  List,
  ListRowProps,
  ListRowRenderer
} from "react-virtualized"
import Select from "react-select"

import { GlobeAltIcon } from "@heroicons/react/24/solid"

import "./CityPicker.css"

type cityOption = {
  label: string
  value: {
    countryCode: string
    latitude: string
    longitude: string
    name: string
    stateCode: string
  }
} | null

type countryOption = {
  label: string
  value: {
    isoCode: string
    latitude: string
    longitude: string
  }
} | null

interface MenuListProps {
  children: React.ReactNode
}

const options = Country.getAllCountries().map((country) => ({
  label: country.name,
  value: {
    isoCode: country.isoCode,
    latitude: country.latitude || "",
    longitude: country.longitude || ""
  }
}))

const MenuList: FC<MenuListProps> = ({ children }) => {
  const rows: ReactNode[] = Children.toArray(children) as ReactNode[]
  const rowRenderer: ListRowRenderer = ({ key, index, style }: ListRowProps) => (
    <div
      key={key}
      style={style}
    >
      {rows[index]}
    </div>
  )

  return (
    <List
      style={{ width: "100%" }}
      width={800}
      height={150}
      rowHeight={30}
      rowCount={rows.length}
      rowRenderer={rowRenderer}
    />
  )
}

export default function CityPicker() {
  const [selectedCity, setSelectedCity] = useState<cityOption>(null)
  const [selectedCountry, setSelectedCountry] = useState<countryOption>(null)
  const router = useRouter()

  const handleSelectedCountry = (option: countryOption) => {
    setSelectedCountry(option)
    setSelectedCity(null)
  }

  const handleSelectedCity = (option: cityOption) => {
    if (option && option.value.latitude && option.value.longitude) {
      setSelectedCity(option)
      router.push(`/location/${option?.value.name}/${option?.value.latitude}/${option?.value.longitude}`)
    }
  }

  const option = City.getCitiesOfCountry(selectedCountry?.value.isoCode || "")?.map(state => ({
    label: state.name,
    value: {
      countryCode: state.countryCode,
      latitude: state.latitude || "",
      longitude: state.longitude || "",
      name: state.name,
      stateCode: state.stateCode
    }
  })) || []

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div
          className="flex items-center space-x-2 text-white/80"
        >
          <GlobeAltIcon
            className="w-5 h-5 text-white"
          />
          <label htmlFor="country">Country</label>
        </div>
        <Select
          className="text-black"
          onChange={handleSelectedCountry}
          options={options}
          value={selectedCountry}
        />
      </div>
      {selectedCountry && (
        <div className="space-y-2">
          <div
            className="flex items-center space-x-2 text-white/80"
          >
            <GlobeAltIcon
              className="w-5 h-5 text-white"
            />
            <label htmlFor="country">City</label>
          </div>
          <Select
            className="text-black"
            components={{ MenuList }}
            onChange={handleSelectedCity}
            options={option}
            value={selectedCity}
          />
        </div>
      )}
    </div>
  )
}
