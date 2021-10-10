import React, {useState, useEffect, createContext, useReducer} from 'react'
import {Container, Col, Row, Table, Button} from 'react-bootstrap';
import { useSpring, useSprings, animated } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'
import '../assets/css/Discussion.css'
import Group from './Group'
import Card from './Card'
import Modal from '../DataStructure/Modal'
import GroupData, {CardProps, GroupProps, initialCard, initialGroup} from './InitialData'
import { GroupOutlined } from '@material-ui/icons'
import { initialCardReducer, unaddedCardReducer, groupReducer, initialGroupReducer } from './reducer';

type Dispatch<A> = (value: A) => void;

export const UnaddedCardContext = React.createContext<{
    unaddedCardData: CardProps[] | [];
    unaddedCardDispatch: React.Dispatch<any>;
    initialCardData: CardProps[];
    initialCardDispatch: React.Dispatch<any>;
    groupData: GroupProps[] | [];
    groupDispatch: React.Dispatch<any>;
    initialGroupData: GroupProps[];
    initialGroupDispatch: React.Dispatch<any>;
    }>({
        unaddedCardData: [initialCard],
        unaddedCardDispatch: () => undefined,
        initialCardData: [initialCard],
        initialCardDispatch: () => undefined,
        groupData: [initialGroup],
        groupDispatch: () => undefined,
        initialGroupData: [initialGroup],
        initialGroupDispatch: () => undefined,
    });

function Discussion() {

    const [containerHeight, setContainerHeight] = useState<number>(0)
    useEffect(() => {
        const { innerWidth: width, innerHeight: height } = window;
        const navbar:any = document.getElementById('navbar')
        const navbarHeight:number = navbar.clientHeight
        setContainerHeight(height - navbarHeight)
      }, []);
    
    const [cardDragged, setCardDragged] = useState(false)



    const [unaddedCardData, unaddedCardDispatch] = useReducer(unaddedCardReducer, [])
    const [initialCardData, initialCardDispatch] = useReducer(initialCardReducer, Array(10).fill(0).map((_, index) => ({...initialCard, id: index})))

    const [groupData, groupDispatch] = useReducer(groupReducer, [])
    const [initialGroupData, initialGroupDispatch] = useReducer(initialGroupReducer, Array(10).fill(0).map((_, index) => ({...initialGroup, id: index})))



    const [open, setOpen] = useState(false)
    return (
        <div className='discussion_container' style={{height: containerHeight}}>
            <UnaddedCardContext.Provider
             value={{ initialCardData, initialCardDispatch, unaddedCardData, unaddedCardDispatch, 
             groupData, groupDispatch, initialGroupData, initialGroupDispatch }}>
            <Col md={8} className='drawer'>
                {groupData.map((group, i) => (
                    <Group group={group} index={i} cardDragged={cardDragged} stock={false}
                     />
                ))}
                {unaddedCardData.map((card, i) => (
                <Card card={card} setCardDragged={setCardDragged} stock={false}/>
            ))}
            </Col>
            <Col md={4} className='components'>
                <div className='stocks'>
            {initialGroupData.map((group, i) => (
                    <Group group={group} index={i} cardDragged={cardDragged} stock={true}
                      />
                ))}
                </div>
                <div className='stocks'>
            {initialCardData.map((card, i) => (
                <Card card={card} setCardDragged={setCardDragged} stock={true}/>
            ))}
            </div>
            </Col>
            <Modal open={open} setOpen={setOpen}/>
            </UnaddedCardContext.Provider>
        </div>
    )
}


export default Discussion
