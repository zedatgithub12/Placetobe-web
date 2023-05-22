import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Poster from '../../assets/images/placetobe.png';
import { flexbox } from '@mui/system';
import Grid from '@mui/material/Grid';

const Eventcard = () => {
    return (
        <Grid>
            <Card>
                <CardActionArea>
                    <CardMedia component="img" height="250" image={Poster} alt="Poster" />
                </CardActionArea>
            </Card>
        </Grid>
    );
};

export default Eventcard;
