import React, {useEffect, useState} from 'react'
import BouncingBall from './BouncingBall'
import { useSpring, useSprings, animated } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'
import '../assets/css/Home.css'

function Expansion() {
    const [bounced, setBounced] = useState(false)
    const [initialSize, setInitialSize] = useState('150px')
    const [goalSize, setGoalSize] = useState('0px')
    const [config, setConfig] = useState({duration:5000})
    const yNum = 400
    const [balloonConfig, setBalloonConfig] = useState([
        {
            width: '100px',
            height: '100px',
            x: 0,
            y: 0
        },
        {
            width: '100px',
            height: '100px',
            x: 400,
            y: 200
        },
        {
            width: '100px',
            height: '100px',
            x: 200,
            y: 600
        },
        {
            width: '100px',
            height: '100px',
            x: -200,
            y: 500
        },
        {
            width: '100px',
            height: '100px',
            x: -300,
            y: 200
        },
    ])
    const balloons = [...Array(5)].map((value, index) => {return {x: index, y: index, index: index}})
    // const balloonStyles = useSprings(balloons.length, balloons.map(balloon => (
    //    {from: {width: '0px',height:'0px', x: 0, y:yNum},
    //    to:{width:balloonConfig[balloon.index].width, height:balloonConfig[balloon.index].height,
    //      x: balloonConfig[balloon.index].x, y: balloonConfig[balloon.index].y}, config:{duration: 500}})))
    const [balloonStyles, api] = useSprings(balloons.length, index => (
    {from: {width: '0px',height:'0px', x: 0, y:yNum, borderColor:'none',config:{duration: 1000}, } }))

    const expand = () => {
        console.log('expanded')
        setInitialSize('0px')
        setGoalSize('150px')
        setConfig({duration:100})
        api.start(index => (
            balloonConfig[index]))
    }

    const fn = (index:number, x:number, y:number) => (index:number) => 
    ({
        x:x,
        y:y
    })
    const bind = useDrag(({args: [index], down, movement: [mx, my] }) => {
        api.start(fn(index, mx, my))
      })
    

    const styles = useSpring({from: {width:initialSize, height:initialSize}, to:{width:goalSize, height:goalSize}, config:config, onRest: {width: expand}})
    return (
        <div className='parent'>
            {balloonStyles.map((balloon_style:any, i) => (
                <animated.div className='speech_balloon'key={i}
                {...bind(i)} style={balloon_style}/>))}
            <BouncingBall setBounced={setBounced} expansion={styles} bounced={bounced}/>
        </div>
    )
}

export default Expansion
