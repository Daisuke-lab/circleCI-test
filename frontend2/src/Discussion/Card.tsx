import React, {useState} from 'react'
import Paper from '@material-ui/core/Paper';
import '../assets/css/Discussion.css'
import { useSpring, useSprings, animated } from '@react-spring/web'
import { useDrag, useGesture } from 'react-use-gesture'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import {CardProps} from './InitialData'
import EditCard from './EditCard'

interface Props {
    card: CardProps,
    setCardDragged: any,
    stock: boolean,
}
function Card(props:Props) {
    const AnimatedPaper = animated(Paper)
    const [open, setOpen] = useState(false)
    const [stocks, api] = useSpring(() => (
        {x: 0, y: 0}))

    const bind = useDrag(({first, last, movement:[x,y], down})  => {
        api({x:x, y:y, immediate:down})
        if (first) {
            props.setCardDragged(true)
            console.log('it grabbed')
        }
        if (last) {
            props.setCardDragged(false)
            if (x > -45 && props.stock) {
                api({x:0, y:0})
            }
        }
        }, {initial: () => [stocks.x.get(), stocks.y.get()]})

    
    const handleDragEnter = (e:any) => {
        console.log(e)
        e.preventDefault();
        e.stopPropagation();
        };

    

    return (
        <AnimatedPaper className={props.stock?'group_paper component':'group_paper'} {...bind()} style={{...stocks}} onDragEnter={e => handleDragEnter(e)}>
            <div style={{textAlign: "end"}}>
                <IconButton aria-label="settings" onClick={() => setOpen(true)}>
                    <EditIcon />
                </IconButton>
            </div>
            <EditCard open={open} setOpen={setOpen} card={props.card}/>
            <div>
            {props.card.content}
            </div>
        </AnimatedPaper>
    )
}

export default Card