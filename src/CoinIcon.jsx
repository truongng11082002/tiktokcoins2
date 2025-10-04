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
      d="M28 17.5c1.8 0 3.5.8 4.5 2v-3h3v12c0 3.3-2.7 6-6 6s-6-2.7-6-6v-7.5h3v7.5c0 1.7 1.3 3 3 3s3-1.3 3-3v-8.5c-.8-.6-1.8-1-3-1v-1.5z"
      fill="#FFFFFF"
    />
    <path
      d="M22 22v6.5c0 1.7-1.3 3-3 3s-3-1.3-3-3c0-1.7 1.3-3 3-3h.5v-3H19c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6V22h-3z"
      fill="#FFFFFF"
    />
  </svg>
)
