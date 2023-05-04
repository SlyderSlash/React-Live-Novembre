import {useState, useEffect } from 'react'
import axios from 'axios'

import IconButton from '@mui/material/IconButton'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import List from '@mui/material/List'
import StarBorder from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'

const ListFavorite = ({favorite}) => {
    const listofFav = favorite.map(element => {
        (
        <ListItemButton component="a" href="#simple-list">
            <ListItemText primary="Spam">{element}</ListItemText>
        </ListItemButton>
        )
    })
    return (
        <List>
            {listofFav}
        </List>
    )
}

// import React from ('react') => React.useState
const Papillon = ({baseButterfly, aFA, gFA, rFA, favoriteAdvice}) => {
    const att = 'Magnifiques'
    //let butterfly = props.baseButterfly
    const [butterfly, setButterfly] = useState(baseButterfly)
    const [error, setError] = useState(0)
    // console.log(error) => false
    // console.log(setError) => function ( pour modifier error )
    // Tu ne peux modifier directement error, tu doit passer par la fonction setError
    const [advice, setAdvice] = useState('En chargement')
    // const [le getter, le setter] = useState('Valeur de base')
    const [loading, setLoading] = useState(1)
    //actualID
    const [actualID, setActualID] = useState(0)
    //previousAdvice
    const [previousAdvice, setPreviousAdvice] = useState(0)
    
    const butterflyNumber = () => {
        setButterfly(butterfly + 1)
    }
    const callAdviceAPI = () => {
        axios.get('https://api.adviceslip.com/advice')
            .then(response =>{
                    setAdvice(response.data.slip.advice)
                    setActualID(response.data.slip.id)
                    setLoading(0)
            })
            .catch(err => {
                console.error(err)
                setLoading(1)
                setError('Houston y\'a un probleme')
            })
    }
    // Monté => Mise A jour => Démonté
    useEffect(()=> {
        callAdviceAPI()
    }, [])
    

    return (
        <div>
            <h1>Les {butterfly} {att} papillons sont bleus</h1>
            { error 
                ? <h2 color='red'>{error}</h2>
                : loading
                    ? <h2>En chargement bébé...</h2>
                    : <>
                        <h2>
                            <IconButton onClick={()=> {favoriteAdvice.includes(actualID) ?rFA(actualID) :aFA(actualID)}} aria-label="add an star">
                                {favoriteAdvice.includes(actualID)
                                    ? <StarIcon/>
                                    : <StarBorder/>
                                }
                            </IconButton>
                            {advice}
                        </h2>
                    </>
            }
            <button onClick={callAdviceAPI}>Trouver une autre advice</button>
        </div>
    )
}

export default Papillon