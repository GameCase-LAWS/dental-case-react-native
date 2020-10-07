import * as React from "react"
import Svg, { Path } from "react-native-svg"

export function ArrowIcon({color, ...props}) {
  return (
    <Svg viewBox="0 0 100 150" {...props}>
      <Path fill={color} d="M25 0H0l75 75-75 75h25l75-75L25 0z" />
    </Svg>
  )
}

export function CloseIcon({color, ...props}) {
  return (
    <Svg viewBox="0 0 100 100" {...props}>
      <Path
        fill={color}
        d="M16.5 0L0 16.5 33.5 50 0 83.5 16.5 100 50 66.5 83.5 100 100 83.5 66.5 50 100 16.5 83.5 0 50 33.5 16.5 0z"
      />
    </Svg>
  )
}

export function BackIcon({color, ...props}) {
  return (
    <Svg fill="none" viewBox="0 0 100 100" {...props}>
      <Path
        fill={color}
        d="M63.992 14.118L49.902 0 0 50l49.902 50 14.09-14.118-26.614-26.666H100V40.784H37.378l26.614-26.666z"
      />
    </Svg>
  )
}
