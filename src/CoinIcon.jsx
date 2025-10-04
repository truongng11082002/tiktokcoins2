export const CoinIcon = ({ size = "1em", className = "", style = {} }) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: size, height: size, display: 'inline-block', verticalAlign: 'middle', ...style }}
  >
    <circle cx="24" cy="24" r="24" fill="#FFD147"/>
    <circle cx="24" cy="24" r="21" fill="#FFEB82"/>
    <circle cx="24" cy="24" r="18" fill="#FFA500"/>
    <circle cx="24" cy="24" r="15" fill="#FF8C00"/>
    <path
      d="M30 14c0 0 1.5 0.5 2.5 2v12c0 2.8-2.2 5-5 5-2.8 0-5-2.2-5-5v-10h2.5v10c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5v-11c-0.5-0.5-1.2-1-2-1.2V14zm-10 8v6c0 1.4-1.1 2.5-2.5 2.5S15 29.4 15 28c0-1.4 1.1-2.5 2.5-2.5v-2.5c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5V22H20z"
      fill="#FFFFFF"
    />
  </svg>
)
