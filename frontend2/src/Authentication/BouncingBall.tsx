import React, {useEffect, useState} from 'react'
import { useSpring, animated } from 'react-spring'
import { easeQuadInOut, easeCircleOut } from "d3-ease";
import BezierEasing from 'bezier-easing'
import '../assets/css/Home.css'

interface Props {
    bounced: boolean,
    setBounced: any,
    expansion: any
}
const BouncingBall = ({setBounced, bounced, expansion}:Props) => {
    const lastLocation = 350
    const [config, setConfig] = useState({ duration: 300, easing: (t:any) => t})
    const [primitive, setPrimitive] = useState(-100)
    const [goal, setGoal] = useState(lastLocation)
    const [count, setCount] = useState(0)
    const bounce = () => {
        setCount(count + 1)
        var ratio = 1.3
        if (count%2 === 1) {
            if (goal <= 0) {
                setPrimitive(goal+200)
            } else if (goal < lastLocation && goal > lastLocation- 100) {
                setPrimitive(goal + 10)
            } else if (goal < lastLocation) {
                setPrimitive(goal*ratio)
            }
            setGoal(lastLocation)
            setConfig({...config, duration:300, easing: (t:any) => t})
            if (lastLocation <= goal && lastLocation <= primitive) {
                setBounced(true)
            }
        } else {
            if (primitive <= 0) {
                setGoal(primitive+200)
            } else if (primitive < lastLocation && primitive > lastLocation - 100 ) {
                setGoal(primitive + 10)
            } else if (primitive < lastLocation) {
                setGoal(primitive*ratio)
            }

            setPrimitive(lastLocation)
            var easing = BezierEasing(0.8, 1, 0.8, 0.5);
            var easing = easeCircleOut
            setConfig({...config, duration:400, easing: easing})
            if (lastLocation <= goal && lastLocation <= primitive) {
                console.log('it bounced')
                setBounced(true)
            }
        }
    }
    const styles = useSpring({ from: {y: primitive}, to: {y:goal}, config:config,onRest: {
        y: bounce} })
    return (
          <animated.div className="bounce_ball" style={bounced?{...expansion, y:lastLocation}:{...styles, width:'100px', height:'100px',}} />
    )
}
export default BouncingBall