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
      d="M28.5 16.5c1.2 0.3 2 0.8 2.5 1.5v10c0 2.5-2 4.5-4.5 4.5s-4.5-2-4.5-4.5v-12h3v12c0 0.8 0.7 1.5 1.5 1.5s1.5-0.7 1.5-1.5v-10.5c-0.3-0.3-0.6-0.5-1-0.7V16.5h1.5zm-8.5 7.5v4c0 0.8-0.7 1.5-1.5 1.5s-1.5-0.7-1.5-1.5 0.7-1.5 1.5-1.5v-3c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5v-4H20z"
      fill="#FFFFFF"
      strokeWidth="0.5"
    />
  </svg>
)
