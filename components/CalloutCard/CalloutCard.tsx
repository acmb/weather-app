"use client"

import { 
  CheckCircleIcon,
  ExclamationCircleIcon
} from "@heroicons/react/24/solid"
import { Callout } from "@tremor/react"

type Props = {
  message: string
  warning?: boolean
}

export default function CalloutCard({
  message,
  warning
}: Props) {
  return (
    <Callout 
      className="mt-4"
      color={warning ? "rose" : "teal"}
      icon={warning ? ExclamationCircleIcon : CheckCircleIcon}
      title={message}
    />
  )
}
