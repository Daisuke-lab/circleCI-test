import React from 'react'
import Expansion from './Expansion'
import {Link } from 'react-router-dom'
import {Container, Col, Row, Table, Button} from 'react-bootstrap';
function Home() {
    return (
        <Container>
            <Link to='choose_room'>
            <button><span>Login</span></button>
            </Link>
            <Expansion />
        </Container>
    )
}

export default Home
