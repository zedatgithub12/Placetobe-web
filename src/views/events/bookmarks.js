import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import EventCard from 'ui-component/eventcard';
import { MiniHeader } from 'ui-component/page-header/miniHeader';

const Bookmarks = () => {
    const { bookmarks } = useSelector((state) => state.bookmark);

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
                <Grid container>
                    <MiniHeader back={true} title="Bookmarks" />
                    {bookmarks.length > 0 ? (
                        <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
                            <EventCard events={bookmarks} />
                        </Grid>
                    ) : (
                        <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
                            <Typography variant="subtitle1">No bookmarks</Typography>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Bookmarks;
