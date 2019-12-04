import React from 'react'
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import {makeStyles, Typography, useTheme} from "@material-ui/core";
import {Link} from "react-router-dom";


const useStyles = makeStyles({
    card: {
        display: 'flex',
        marginTop: '15px'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    content: {
        flex: '1 0 auto',
        textAlign: 'left'
    },
    cover: {
        width: 151,
        height: '100%'
    },
    link:{
        color: '#000',
        textDecoration: 'none'
    }

});
const API = 'https://blog.gkmit.co/articles';

function PostCard(props) {
    const { title, created_at, slug, freatured_image, user_details: {name}} = props.data;
    const classes = useStyles();
    const theme = useTheme();
    const data = [];
    return (
        <Card className={classes.card} mt={2}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        <Link className={classes.link} to={`/article/${slug}`} >
                            {title}
                        </Link>
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        By {name} | {created_at}
                    </Typography>
                </CardContent>
            </div>
            <Link to={`/article/${slug}`}>
                <img
                    className={classes.cover}
                    src={freatured_image}
                    alt={title}
                />
            </Link>
        </Card>
    )
}
function LoadingData() {
    const classes = useStyles();
    return (
        <Card className={classes.card} mt={2}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        Loading...
                    </Typography>
                 </CardContent>
            </div>

        </Card>
    )
}

class ArticleListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            isLoading: true
        };
    }
    componentDidMount() {
        this._isMounted = true;
        this.makeRemoteRequest();
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    makeRemoteRequest = () => {
        fetch(API)
            .then(response => response.json())
            .then(data => {
                if (this._isMounted) {
                    this.setState({
                        articles: data,
                        isLoading: false
                    })
                }
            })
            .catch((error) => {
                    console.error(error);
            });
    }

    render() {
        console.log(this.state.articles)
        const { isLoading, articles} = this.state;
        return(
            isLoading ? <LoadingData /> :
                articles.map(article => {
                    console.log(article)
                    return (
                        <PostCard key={article.id} data={article} />
                    );
                })
        )
    }
}

export default ArticleListing