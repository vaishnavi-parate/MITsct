import * as React from "react";

const SquareSprite = ({ styles, onClick, color = "#4CAF50", innerColor = "#FFF", shadowColor = "#272525" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={100}
        height={100}
        viewBox="0 0 100 100"
        style={styles}
        onClick={onClick}
    >
        <rect width="100" height="100" fill={color} />
        <rect x="25" y="25" width="50" height="50" fill={innerColor} />
        <circle cx="25" cy="75" r="10" fill={shadowColor} />
        <circle cx="75" cy="25" r="10" fill={shadowColor} />
    </svg>
);

export default SquareSprite;