import React, {useState, useEffect} from 'react'
import {Container, Col, Row, Table, Button} from 'react-bootstrap';
import {Link, Redirect } from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import '../assets/css//Room.css'

interface MemberProp {
  key: number,
  name: string
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  }),
);

interface roomProps {
    id: number,
    title: string,
    icon: null,
    members: any[]
}
function Rooms() {
    const classes = useStyles();
    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);
    const [rooms, setRooms] = useState([
        {
            id: 1,
            title: 'ルーム１',
            icon: null,
            members : [
              { key: 0, name: 'Angular' },
              { key: 1, name: 'jQuery' },
            ]
    
        }
    ])
    useEffect(() => {
        const nums = Array(19).fill(0);
        const example_rooms = nums.map((_, index) => {return {...rooms[0], id:index, title: 'room' + index.toString()}});
        setRooms(example_rooms);
        console.log(example_rooms)
    }, [])

    const [choosenRoom, setChoosenRoom] = useState<roomProps | undefined>(undefined)
      
    return (
        <Container>
            <Row style={{justifyContent: 'space-evenly'}}>
            <Col md={4}>
          <Typography variant="h6" className={classes.title}>
            ルーム一覧
          </Typography>
          <div className={classes.demo}>
            <List dense={dense} className='rooms'>
              {rooms.map(room => (
                <ListItem key={room.id} className='room' onClick={() => setChoosenRoom(room)}>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={room.title}
                    secondary={secondary ? 'Secondary text' : null}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
          </Col>
          <Col  md={6}>
          <Typography variant="h6" className={classes.title}>
          {choosenRoom!== undefined?choosenRoom.title:'　'}
          </Typography>
            <Table>
                <thead>
                    <tr>
                        <th>id</th>
                        <td>
                            {choosenRoom!== undefined?choosenRoom.id:''}
                        </td>
                    </tr>
                    <tr>
                        <th>ルームの名前</th>
                        <td>
                        {choosenRoom!== undefined?choosenRoom.title:''}
                        </td>
                    </tr>
                    <tr>
                        <th>ルームの目的</th>
                        <td>
                        環境問題の資本主義的解決法の模索
                        </td>
                    </tr>
                    <tr>
                        <th>ルームの結論</th>
                        <td>
                        売る代わりに寄付するアプリを作る
                        </td>
                    </tr>
                    <tr>
                        <th style={{verticalAlign: 'top'}}>メンバー</th>
                        <td>
                        <div className={classes.root}>
                            {choosenRoom!== undefined?choosenRoom.members.map((chip:MemberProp) => (
                                <li>
                                <Chip
                                icon={<FaceIcon />}
                                label={chip.name}
                                color="primary"
                                variant="outlined"
                                className={classes.chip}
                            />
                            </li>
                            )):<></>}
                        </div>
                        </td>
                    </tr>
                </thead>
            </Table>
            <div style={{float: 'right'}}>
            <Link to='discussion'>
            <Button variant="primary" type="submit" style={{}}>
                選択
            </Button>
            </Link>
            </div>
          </Col>
          </Row>
        </Container>
    )
}

export default Rooms
