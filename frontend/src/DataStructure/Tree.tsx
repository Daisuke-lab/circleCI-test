import React from 'react'
import '../assets/css/DataStructure.css'
interface Props {
    nums: number
}
function Tree(props:Props) {
    const balls = Array(props.nums).fill(0)
    const width = 90 / balls.length;
    const height = (width / 3) * 2;
    const start_degree = 30
    const start_left = 35
    const left = 30 /(props.nums -1)
    const degree = 60 / (props.nums - 1)
    return (
        <div>
        <label style={{textAlign:'center', width:'100%'}}>Tree</label>
        <div className='data_container w3-container'>
            <div className='ball top_ball' style={{marginRight:'auto', marginLeft:'auto', marginBottom:'70px'}}/>
            <div  className='children'>
            {balls.map((_:any, index:number) => (
                <>
                <div className='ball' style={{width:`${width}%`, height:`${height}%`}}/>
                <div className='line' style={{transform: `rotate(${start_degree - degree * index}deg)`, left: `${start_left + left * index}%`}}/>
                </>
                ))}
            </div>
        </div>
        </div>
    )
}

export default Tree
