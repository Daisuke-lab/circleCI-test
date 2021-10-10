import React, {useState, createContext, useReducer} from 'react'
import Paper from '@material-ui/core/Paper';
import '../assets/css/Discussion.css'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Typography from '@material-ui/core/Typography';
import { useSpring, useSprings, animated } from '@react-spring/web'
import { useDrag, useGesture, useHover } from 'react-use-gesture'
import GroupEditor from './EditGroup'
import {CardProps, GroupProps} from './InitialData'
import { addedCardReducer } from './reducer';

interface Props {
    group: GroupProps,
    cardDragged: boolean,
    index : number,
    stock: boolean
}

export const AddedCardContext = createContext<{
    addedCardData: CardProps[] | [];
    addedCardDispatch: React.Dispatch<any>;
    }>({
        addedCardData: [],
        addedCardDispatch: () => undefined,
    })
function Group(props:Props) {
    const [addedCardData, addedCardDispatch] = useReducer(addedCardReducer, props.group.ideaCards)

    const AnimatedCard = animated(Card)
    const [open, setOpen] = useState(false)
    const width = '350px'
    const height = '200px'
    const [stocks, api] = useSpring(() => (
        {x: 0, y: 0, width, height, zIndex:0}))
    
    const bind = useDrag(({first, last, movement:[x,y], down})  => {
        api({x:x, y:y, immediate:down, zIndex:1})
        if (last) {
            console.log('grabbing finished')
            api({zIndex:0})
            if (x > -45 && props.stock) {
                api({x:0, y:0})
            }
        }
        }, {initial: () => [stocks.x.get(), stocks.y.get()]})

    const handleDragOver = (e:any) => {
        e.preventDefault();
        console.log(e)
        e.stopPropagation();
        };

    return (
        <AddedCardContext.Provider value={{ addedCardData, addedCardDispatch }}>
        <AnimatedCard className={props.stock?'component group':'group'} {...bind(props.index)} onDragOver={handleDragOver} style={{...stocks}}>
            <CardHeader
            action={
                <IconButton aria-label="settings" onClick={() => setOpen(true)}>
                    <InfoOutlinedIcon />
                </IconButton>
                    }
                    title={props.group.title}/>

            <CardContent>
            </CardContent>
            <GroupEditor open={open} setOpen={setOpen} group={props.group}/>
        </AnimatedCard>
        </AddedCardContext.Provider>
    )
}

export default Group

