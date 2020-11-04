import * as React from "react"
import Svg, { Path, Circle, Defs } from "react-native-svg"

export function ArrowIcon({ color, ...props }) {
  return (
    <Svg viewBox="0 0 100 150" {...props} >
      <Path fill={color} d="M25 0H0l75 75-75 75h25l75-75L25 0z"
      />
    </Svg>
  )
}

export function CloseIcon({ color, ...props }) {
  return (
    <Svg viewBox="0 0 100 100" {...props}>
      <Path
        fill={color}
        d="M16.5 0L0 16.5 33.5 50 0 83.5 16.5 100 50 66.5 83.5 100 100 83.5 66.5 50 100 16.5 83.5 0 50 33.5 16.5 0z"
      />
    </Svg>
  )
}

export function BackIcon({ color, ...props }) {
  return (
    <Svg fill="none" viewBox="0 0 100 100" {...props}>
      <Path
        fill={color}
        d="M63.992 14.118L49.902 0 0 50l49.902 50 14.09-14.118-26.614-26.666H100V40.784H37.378l26.614-26.666z"
      />
    </Svg>
  )
}

export function CreditsIcon(props) {
  return (
    <Svg viewBox="0 0 512 512" {...props}>
      <Path d="M53.333 224C23.936 224 0 247.936 0 277.333V448c0 29.397 23.936 53.333 53.333 53.333h64c12.011 0 23.061-4.053 32-10.795V224h-96zM512 304c0-12.821-5.077-24.768-13.888-33.579 9.963-10.901 15.04-25.515 13.653-40.725-2.496-27.115-26.923-48.363-55.637-48.363H324.352c6.528-19.819 16.981-56.149 16.981-85.333 0-46.272-39.317-85.333-64-85.333-22.165 0-37.995 12.48-38.677 12.992A10.72 10.72 0 00234.667 32v72.341l-61.44 133.099-2.56 1.301v228.651C188.032 475.584 210.005 480 224 480h195.819c23.232 0 43.563-15.659 48.341-37.269 2.453-11.115 1.024-22.315-3.861-32.043 15.765-7.936 26.368-24.171 26.368-42.688 0-7.552-1.728-14.784-5.013-21.333C501.419 338.731 512 322.496 512 304z" />
    </Svg>
  )
}

// export function Shadow(props) {
//   return (
//     <Svg viewBox="0 0 30 10" xmlns="http://www.w3.org/2000/svg">
//       <Defs>
//         <filter id="shadow">
//           <feDropShadow dx="0.2" dy="0.4" stdDeviation="0.2" />
//         </filter>
//         <filter id="shadow2">
//           <feDropShadow dx="0" dy="0" stdDeviation="0.5"
//             flood-color="cyan" />
//         </filter>
//         <filter id="shadow3">
//           <feDropShadow dx="-0.8" dy="-0.8" stdDeviation="0"
//             flood-color="pink" flood-opacity="0.5" />
//         </filter>
//       </Defs>
//       <Circle cx="5" cy="50%" r="4" style="filter:url(#shadow);" />
//       <Circle cx="15" cy="50%" r="4" style=" filter:url(#shadow2);" />
//       <Circle cx="25" cy="50%" r="4"
//         style="filter:url(#shadow3);" />
//     </Svg>
//   )
// }