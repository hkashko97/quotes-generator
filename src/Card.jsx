import React, {useEffect, useState} from 'react';
import {animated, useSpring} from 'react-spring'
import './Card.css';


export default function Card() {
    const props = useSpring({opacity: 1, from: {opacity: 0}})


    const [{author, content, tags}, setQuote] = useState({author: '', content: '', tags: []});
    const [isLoading, setLoading] = useState(true);
    const [counter,setCounter] = useState(0);

    const magicNumber = Math.floor(Math.random() * 4) + 1;
    const theme = `theme-${magicNumber}`;

    useEffect(() => {
        setLoading(true)
        fetch('https://staging.quotable.io/random')
            .then(res => res.json())
            .then(res => {
                const {content, author, tags} = res;
                setLoading(false)
                setQuote({content, author, tags});
            })
    }, [counter])

    return (<animated.div
        style={props}
        className={`card ${theme || 'default-theme'}`}
    >
        <div className={'center'}>
            {
                isLoading ?
                    <h3>Loading...</h3>
                    :
                    <>
                        <h2>{author}</h2>
                        <p>{content}</p>
                        <span>{tags.join(',')}</span>
                        <button onClick={() => setCounter(counter + 1)}  className={'btn'}>+</button>
                    </>
            }
        </div>
    </animated.div>)
};
