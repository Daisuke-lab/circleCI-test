import React, {useContext} from 'react'
import Modal from '@material-ui/core/Modal';
import { Form, Button, Col, Container } from 'react-bootstrap';
import {DragDropContext} from 'react-beautiful-dnd'
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {useStyles} from './EditGroup'
import {GroupProps} from './InitialData'
import AddedCardsContainer from './AddedCardsContainer'
import UnaddedCardsContainer from './UnaddedCardsContainer'
import {UnaddedCardContext} from './Discussion'
import {AddedCardContext} from './Group'

interface Props {
    open: boolean,
    setOpen: any,
    group: GroupProps
}


function Grouping(props:Props) {
    const classes = useStyles();
    const { initialCardData, initialCardDispatch, unaddedCardDispatch, unaddedCardData } = useContext(UnaddedCardContext)
    const {addedCardData, addedCardDispatch} = useContext(AddedCardContext)

  const onDragEnd = (result:any) => {
      const {destination, source, draggableId} = result
      console.log('source::', source)
      console.log('destination::', destination)
      console.log('draggableId',draggableId)
      if (!destination) {
          return;
      } else if (
          destination.drooppableId === source.droppableId &&
          destination.index === source.index
      ) {
          return;
      } else {
          if (destination.droppableId === source.droppableId) {
            if (source.droppableId.includes('unaddedCardsContainer')) {
              unaddedCardDispatch({type: 'changeOrder', payload: {source, destination, draggableId}}) 
            } else {
              addedCardDispatch({type: 'changeOrder', payload: {source, destination, draggableId}})
            }
          } else {
            console.log(draggableId.split('-'))
            const deletingId = parseInt(draggableId.split('-')[1])
            if (source.droppableId.includes('unaddedCardsContainer')) {
              var addingCard = unaddedCardData.filter(card => card.id === deletingId)[0];
              unaddedCardDispatch({type: 'delete', payload: {deletingId: deletingId}})
              addedCardDispatch({type: 'add', payload: {source, destination, addingCard}})
            } else {
              console.log(deletingId)
              var addingCard = addedCardData.filter(card => card.id === deletingId)[0]
              console.log(addingCard)
              addedCardDispatch({type: 'delete', payload: {deletingId: deletingId}}) 
              unaddedCardDispatch({type: 'addToContainer', payload: {source, destination, addingCard}})
            }
          }
      }
  }
    return (
        <DragDropContext  onDragEnd={onDragEnd}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={() => props.setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.addIdeaCard}>
                <div className='left_side'>
                    <h3>{props.group.title}</h3>
                    <div className="ideacards_in_group">
                      <AddedCardsContainer group={props.group}/>
                    </div>
                </div>

                <div className='right_side'>
                    <IconButton aria-label="settings" onClick={() => props.setOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                    <div className='ideacard_scroll'>
                        <div className="ideacards_in_scroll">
                          <UnaddedCardsContainer group={props.group}/>
                        </div>
                    </div>
                    <Button style={{margin: '5px'}} onClick={() => props.setOpen(false)}>保存</Button>
                </div>
          </div>
        </Fade>
      </Modal>
    </DragDropContext>
    )
}

export default Grouping
