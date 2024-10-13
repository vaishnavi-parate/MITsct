import * as React from "react";

const TriangleSprite = ({ styles, onClick, color = "#4CAF50", innerColor = "#FFF", shadowColor = "#272525" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={100}
        height={100}
        viewBox="0 0 100 100"
        style={styles}
        onClick={onClick}
    >
        <polygon points="50,5 100,95 0,95" fill={color} />
        <polygon points="50,15 90,85 10,85" fill={innerColor} />
        <circle cx="25" cy="75" r="5" fill={shadowColor} />
        <circle cx="75" cy="25" r="5" fill={shadowColor} />
    </svg>
);

export default TriangleSprite;