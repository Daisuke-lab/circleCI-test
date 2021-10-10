import React from 'react'
import {Draggable} from 'react-beautiful-dnd'
import styled from 'styled-components';
import { CardProps } from './InitialData';

const CardContent = styled.div`
border 1px solid lightgrey;
padding: 8px;
margin-bottom: 8px;
border-radius: 2px;
display: flex;
height: ${(props:any) => props.columnId === "all-columns" ?'100px':''};
background-color: ${(props:any) => props.isDragging ?'lightgreen':'white'}`

interface Props {
    card: CardProps,
    index: number,
}
function UnaddedCard(props:Props) {
    return (
        <Draggable draggableId={`unaddedCard-${props.card.id}`} index={props.index}>
            {(provided:any, snapshot:any) => (
                <CardContent
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                isDragging={snapshot.isDragging}
                >
                {props.card.content}
            </CardContent>
                )} 
        </Draggable>
    )
}

export default UnaddedCard
