export const ChequeIcon = ({
  size = 24,
  borderColor = "black",
  lineColor = "#0C2134",
  strokeWidth = 2,
  className = "",
  fill = "none",
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M20 3.97205V20.014L18.004 21.014L16 20.014L14.004 21.005L12 20.014L10.003 21.014L8 20.014L5.999 21.005L4 20.014V3.97205L6 2.97205L8 3.97205L10 2.97205L12 3.97205L14 2.97205L16 3.97205L18 2.97205L20 3.97205Z"
        stroke={borderColor}
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 8H16"
        stroke={lineColor}
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 12H16"
        stroke={lineColor}
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 16H14"
        stroke={lineColor}
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
