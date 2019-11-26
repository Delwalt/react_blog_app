import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        marginTop: '20px'
    },
    card: {
        marginTop: '15px'
    },
    cover: {
        width: '100%',
        height: '300px',
        marginTop: '15px'
    },
    title:{
        fontWeight: 'bold',

    },
    author:{
        fontWeight: 'bold',
        marginBottom: '15px'
    },
    content: {
        textAlign: 'left',
    }
}));

function ArticleDetailCard(props) {
       const classes = useStyles();
       const { title, description, created_at, freatured_image, user_details: {name}} = props.data;

    return (
        <Paper className={classes.root}>
            <Typography variant="h5" component="h5" className={classes.title}>
               {title}
            </Typography>
            <img
                className={classes.cover}
                src={freatured_image}
                alt={title}
            />

            <Typography variant="subtitle1" color="textSecondary" component="p" className={classes.author}>
                By {name} | {created_at}
            </Typography>
            <Typography className={classes.content} component="p" dangerouslySetInnerHTML={{__html: description}}>
            </Typography>
        </Paper>
    );
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

class ArticleDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: [],
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
        const {params} = this.props.match
        fetch(`https://blog.gkmit.co/articles/${params.slug}`)
            .then(response => response.json())
            .then(data => {
                if (this._isMounted) {
                    this.setState({
                        data,
                        isLoading: false
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {

       console.log(this.state.data)
        const { isLoading, data} = this.state;
        return(
            isLoading ? <LoadingData /> : <ArticleDetailCard data={data}/>
        )
    }
}

export default ArticleDetails