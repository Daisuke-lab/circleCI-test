import React, {useContext} from 'react'
import {UnaddedCardContext} from './Discussion'
import {Droppable} from 'react-beautiful-dnd'
import {GroupProps} from './InitialData'
import styled from 'styled-components';
import { DroppableRootProps, CardProps } from './InitialData';
import UnaddedCard from './UnaddedCard'

interface Props {
    group: GroupProps
}

const CardList = styled.div<DroppableRootProps>`
padding: 8px;
flex-grow: 1;
min-height: 100px;
max-height: 400px;
overflow-y: scroll;
background-color: ${(props:any) => props.isDraggingOver?"skyblue":"black"}`

function UnaddedCardsContainer(props:Props) {
    const { unaddedCardData, initialCardDispatch } = useContext(UnaddedCardContext)
    console.log(unaddedCardData)
    return (
        <div>
            <Droppable droppableId={`unaddedCardsContainer`}>
                {(provided, snapshot) => (
                    <CardList
                    ref={provided.innerRef}
                    isDraggingOver={snapshot.isDraggingOver}
                    {...provided.droppableProps}
                    key={`unaddedCardsContainer`}
                    className='unadded_cards_container'
                    >
                    {(unaddedCardData as Array<CardProps>).map((card, index) => (
                            <UnaddedCard key={card.id} card={card} index ={index}/>
                        ))}
                        {provided.placeholder}
                </CardList>
                    )}
            </Droppable>
        </div>
    )
}

export default UnaddedCardsContainer
