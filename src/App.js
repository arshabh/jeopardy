import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, Container, Card, Grid, Typography, CardContent, Paper,
  Button, ButtonBase, IconButton } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { store } from './store'

function App() {
  const data = store.useState(s => s.data);
  const players = store.useState(s => s.players);
  return (
    <Box p={5} height="100%" display="flex" flexDirection="column">
      <Box mb={2} display="flex" justifyContent='center'>
        <Typography variant="h1">
          JEOPARDY
        </Typography>
      </Box>
      <Box flex={1}>
        <Container>
          <Grid container spacing={2}>
            {
              data.map((datum, catIndex) => {
                return (
                  <Grid item xs key={datum.category}>
                    <Grid container spacing={2} direction="column">
                      <Grid item xs>
                        <Box component={Paper} p={2} align="center" bgcolor="primary.main">
                          <Typography variant="h6">{datum.category}</Typography>
                        </Box>
                      </Grid>
                      {
                        datum.questions.map((question, idx) => {
                          return (
                            <Grid item xs key={question.question}>
                              <NavLink to={`/${catIndex}/${idx}`} style={{ textDecoration: 'none' }}>
                                <Box
                                  bgcolor={question.finished ? question.answeredBy === undefined ? "error.light" :  "success.light" : ""}
                                  component={Paper} height={60} display="flex" alignItems="center" justifyContent="center">
                                  {
                                    !question.finished &&
                                    <Typography variant="h6">{ question.points }</Typography>
                                  }
                                  {
                                    question.answeredBy !== undefined &&
                                    <img style={{borderRadius: '3px'}}
                                      src={`${process.env.PUBLIC_URL}/players/${players[question.answeredBy].name}.jpeg`}  width="40" />
                                  }
                                </Box>
                              </NavLink>
                            </Grid>
                          )
                        })
                      }
                      </Grid>
                  </Grid>
                )
              })
            }
          </Grid>
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

export default App;
