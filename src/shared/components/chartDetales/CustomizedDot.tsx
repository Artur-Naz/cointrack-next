import React from "react"

interface iCustomizedDotProps {
    cx: number
    cy: number

    [key: string]: any
}

const CustomizedDot = ({cx, cy}: iCustomizedDotProps): JSX.Element => (
    <>
        <rect
            x={cx - 20}
            y={cy - 20}
            rx="6"
            ry="6"
            width="40"
            height="40"
            fill={"rgba(128,90,213,0.15)"}
            stroke={"rgba(128,90,213,0.30)"}
            strokeWidth={1}
        />
        <rect
            x={cx - 10}
            y={cy - 10}
            rx="6"
            ry="6"
            width="20"
            height="20"
            fill={"#FFF"}
            stroke={"#805AD5"}
            strokeWidth={4}
        />
    </>
)


export default CustomizedDot
