import React, { useState } from 'react';
import { Box, Container, Card, Grid, Typography, CardContent, Paper,
  Button, ButtonBase, IconButton } from '@material-ui/core'
import { store } from './store'
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { NavLink } from 'react-router-dom'

function Question(props) {
  const king = store.useState(s => s.king);
  const data = store.useState(s => s.data);
  const { catNum, questionNum } = props.match.params
  const question = data[catNum].questions[questionNum].question
  const answer = data[catNum].questions[questionNum].answer
  const explanation = data[catNum].questions[questionNum].explanation
  const points = data[catNum].questions[questionNum].points
  const [answerShown, setAnswerShown] = useState(false)
  const players = store.useState(s => s.players);
  const increment = (idx) => {
    store.update(s => {
      s.players[idx] = { ...s.players[idx], score: s.players[idx].score + points };
      s.data[catNum].questions[questionNum].finished = true
      s.data[catNum].questions[questionNum].answeredBy = idx
    })
    setAnswerShown(true)
  }
  const decrement = (idx) => {
    store.update(s => {
      s.players[idx] = { ...s.players[idx], score: s.players[idx].score - points };
      s.data[catNum].questions[questionNum].answeredBy = undefined
    })
  }
  const noPoints = () => {
    store.update(s => {
      s.data[catNum].questions[questionNum].finished = true
      s.data[catNum].questions[questionNum].answeredBy = undefined
    })
    setAnswerShown(true)
  }
  return (
    <Box p={5} height="100%" display="flex" flexDirection="column">
      <Box>
        <NavLink to="/">
          <IconButton>
            <ArrowBackRoundedIcon></ArrowBackRoundedIcon>
          </IconButton>
        </NavLink>
      </Box>
      <Box flex={1}>
        <Container>
          <Box height="100%" display="flex" flexDirection="column" justifyContent="space-between">
            <Box onClick={noPoints}  align="center" flex={1}>
              <Typography variant="h3">
                { question }
              </Typography>
              { answerShown &&
                <Box>
                  <Box my={5}>
                    <Typography variant="h2" color="secondary">
                      { answer }
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" color="secondary">
                      { explanation }
                    </Typography>
                  </Box>
                </Box>
              }
            </Box>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="md">
        <Grid container spacing={10}>
          {
            players.map((player, idx) => {
              return (
                <Grid item xs key={player.name}>
                  <Box height="100%" display="flex" flexDirection="column" justifyContent="flex-end">
                    {
                      player.king &&
                      <Box align="center" mb={1} color="secondary.main">
                        <i className="fas fa-crown fa-2x"></i>
                      </Box>
                    }
                    <Box align="center">
                      <ButtonBase focusRipple>
                        <Box position="absolute" bottom="0">
                          <Typography variant="h5">{player.score}</Typography>
                        </Box>
                        <Box position="absolute" display="flex" height="100%" width="100%">
                          <Box flex={1} onClick={() => { decrement(idx) }}></Box>
                          <Box flex={1} onClick={() => { increment(idx) }}></Box>
                        </Box>
                        <img style={{borderRadius: '3px'}}
                          src={`${process.env.PUBLIC_URL}/players/${player.name}.jpeg`} width="100%" />
                      </ButtonBase>
                    </Box>
                  </Box>
                </Grid>
              )
            })
          }
        </Grid>
      </Container>
    </Box>
  );
}

export default Question;
