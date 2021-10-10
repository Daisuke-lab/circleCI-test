import React, {useContext} from 'react'
import styled from 'styled-components';
import {Droppable} from 'react-beautiful-dnd'
import { DroppableRootProps } from './InitialData';
import {GroupProps, CardProps} from './InitialData'
import AddedCard from './AddedCard'
import { AddedCardContext } from './Group';
const CardList = styled.div<DroppableRootProps>`
padding: 8px;
flex-grow: 1;
min-height: 100px;
max-height: 400px;
display: flex;
flex-direction: row;
background-color: ${(props:any) => props.isDraggingOver?"skyblue":"black"}`

interface Props {
    group: GroupProps
}

function AddedCardsContainer(props:Props) {

    const {addedCardData} = useContext(AddedCardContext) 
    return (
        <div>
           <Droppable droppableId={`addedCardsContainer-${props.group.id}`} direction="horizontal">
                {(provided, snapshot) => (
                    <CardList
                    ref={provided.innerRef}
                    isDraggingOver={snapshot.isDraggingOver}
                    {...provided.droppableProps}
                    key={`addedCardsContainer-${props.group.id}`}
                    className='added_cards_container'
                    >
                    {(addedCardData as Array<CardProps>).map((card, index) => 
                        <AddedCard key={card.id} card={card} index ={index} groupId={props.group.id}/>)
                        }
                        {provided.placeholder}
                </CardList>
                    )}
            </Droppable>
        </div>
    )
}

export default AddedCardsContainer
