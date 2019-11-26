import React from 'react';
import {AppBar, Toolbar, Typography, Container, makeStyles} from '@material-ui/core';
import './App.scss';
import ArticleListing from "./components/ArticleListing";
import ArticleDetails from "./components/ArticleDetails";
import {BrowserRouter as Router, Link, Route, Switch,} from "react-router-dom";


const useStyles = makeStyles(() => ({
    logoLink:{
        color: '#282c34',
        textDecoration: 'none'
    }

}));

export default function App() {
    const classes = useStyles();
        return (
            <Router>
                <div className="App">
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" color="#fff">
                                <Link className={classes.logoLink} to="/">GKMIT Blog</Link>
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Container maxWidth="sm">
                        <Switch>
                            <Route exact path="/" component={ArticleListing}/>
                            <Route path="/article/:slug" component={ArticleDetails}/>
                        </Switch>
                    </Container>
                </div>
            </Router>
        );

}

