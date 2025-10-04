export const CoinIcon = ({ size = "1em", className = "", style = {} }) => (
  <img
    src="/image copy.png"
    alt="TikTok Coin"
    className={className}
    style={{
      width: size,
      height: size,
      display: 'inline-block',
      verticalAlign: 'middle',
      objectFit: 'contain',
      ...style
    }}
  />
)
