import React, {useState, useEffect} from 'react'
import {Container, Col, Row, Table, Button, Form} from 'react-bootstrap';
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
import '../assets/css/Room.css'


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


function AddFriend() {
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
    const [choosenRoom, setChoosenRoom] = useState<roomProps | undefined>(undefined)
    useEffect(() => {
        const nums = Array(19).fill(0);
        const example_rooms = nums.map((_, index) => {return {...rooms[0], id:index, title: 'friend' + index.toString()}});
        setRooms(example_rooms);
        console.log(example_rooms)
    }, [])
    return (
        <Container>
            <Row style={{justifyContent: 'space-evenly'}}>
            <Col md={4}>
          <Typography variant="h6" className={classes.title}>
            友達一覧
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
              <Form>
              <Form.Row>
                <Form.Group  as={Col}>
                    <Form.Label>新しく友達を追加</Form.Label>
                    <Form.Control type="email" placeholder="新しい友達のメールアドレス" />
                </Form.Group>
                </Form.Row>
              </Form>
            <div style={{float: 'right'}}>
            <Link to='discussion'>
            <Button variant="primary" type="submit" style={{}}>
                検索
            </Button>
            </Link>
            </div>
          </Col>
          </Row>
        </Container>
    )
}

export default AddFriend
