// material-ui
import { Typography, Grid, Card, CardMedia, Stack, Divider, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import profilePicture from '../../assets/images/profile/profilePicture.svg';
import profileBackground from '../../assets/images/profile/profileBackground.svg';
import { useState } from 'react';
import Following from './following/index';
import BookMark from './bookmark/index';
import InterstedIn from './interested/index';
import Ticket from './ticket/index';
import ProfileData from 'data/profile';
import { dataCounter } from './dataCounter';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import '../../App.css';
// ==============================|| SAMPLE PAGE ||============================== //
/* const FileUpload = () => {
    return <input type="file" id="upload-button" onChange={handleUpload} />;
}; */
const Profile = () => {
    const [activeButton, setActiveButton] = useState('following');
    const [editBio, setEditBio] = useState(false);
    const [bioData, setBioData] = useState('');
    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };
    const enableEditing = () => {
        setEditBio(true);
    };
    const handleBioForm = (e) => {
        e.preventDefault();
        console.log(bioData);
        setEditBio(false);
    };
    const handleUpload = (e) => {
        e.preventDefault();
        console.log(e.target.files);
    };
    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid item ml={-1}>
                    <Stack direction="row">
                        <ArrowBackIcon
                            sx={{
                                background: 'white',
                                color: 'black',
                                borderRadius: '50%',
                                width: '2rem',
                                height: '2rem',
                                padding: '0.2rem'
                            }}
                        />
                        <Typography variant="h3" ml={2} mt={0.5} style={{ display: 'inline' }}>
                            Profile
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ flexGrow: 1 }} className="profileContainer">
                <Grid item xs={12} lg={4}>
                    <Card style={{ textAlign: 'center', paddingBottom: '4rem' }}>
                        <CardMedia component="img" alt="Background Image" height="150" image={profileBackground} title="Card Background" />
                        <div className="profilePictureContainer">
                            <img alt="profile" src={profilePicture} style={{ width: '9rem', height: '9rem' }} />
                            <div className="uploadProfile">
                                <label htmlFor="photo-upload" className="custom-file-upload">
                                    <div className="img-wrap img-upload">
                                        <CameraAltOutlinedIcon for="photo-upload" />
                                    </div>
                                    <input id="photo-upload" type="file" onChange={handleUpload} />
                                </label>
                            </div>
                        </div>

                        <Typography sx={{ marginTop: '0px' }} variant="h3">
                            {ProfileData[0].first_name + ProfileData[0].middle_name}
                        </Typography>
                        <Typography sx={{ padding: '2px 2rem' }} variant="body2">
                            {ProfileData[0].email}
                        </Typography>
                        {!editBio && (
                            <Typography sx={{ padding: '2px 3.5rem' }} variant="body1">
                                {ProfileData[0].profileBio} more
                                <ModeEditOutlineIcon
                                    style={{ cursor: 'pointer' }}
                                    sx={{ fontSize: 20, color: '#ffbb00' }}
                                    onClick={enableEditing}
                                />
                            </Typography>
                        )}
                        {editBio && (
                            <form onSubmit={handleBioForm}>
                                <input
                                    className="inputProfileImage"
                                    value={bioData}
                                    onChange={(e) => setBioData(e.target.value)}
                                    type="text"
                                />
                                <button type="submit" className="saveProfilePicture">
                                    save
                                </button>
                            </form>
                        )}
                    </Card>
                </Grid>
                <Grid item xs={12} lg={8}>
                    <Grid item xs={12}>
                        <Card>
                            <Stack direction="row" divider={<Divider orientation="vertical" />} style={{ background: '#ffdd01' }}>
                                <button
                                    className="profileNavigationButton"
                                    onClick={() => handleButtonClick('following')}
                                    style={{
                                        background: activeButton == 'following' ? '#FFE090' : '#ffbb00'
                                    }}
                                >
                                    <Typography variant="h2">{dataCounter[0]}</Typography>
                                    <Typography variant="subtitle1">Following</Typography>
                                </button>
                                <button
                                    className="profileNavigationButton"
                                    onClick={() => handleButtonClick('bookmark')}
                                    style={{
                                        background: activeButton == 'bookmark' ? '#FFE090' : '#ffbb00'
                                    }}
                                >
                                    <Typography variant="h3">{dataCounter[1]}</Typography>
                                    <Typography variant="subtitle1">Bookmark</Typography>
                                </button>
                                <button
                                    className="profileNavigationButton"
                                    onClick={() => handleButtonClick('interested')}
                                    style={{
                                        background: activeButton == 'interested' ? '#FFE090' : '#ffbb00'
                                    }}
                                >
                                    <Typography variant="h3">{dataCounter[2]}</Typography>
                                    <Typography variant="subtitle1">Intersted</Typography>
                                </button>
                                <button
                                    className="profileNavigationButton"
                                    onClick={() => handleButtonClick('ticket')}
                                    style={{
                                        background: activeButton == 'ticket' ? '#FFE090' : '#ffbb00'
                                    }}
                                >
                                    <Typography variant="h3">{dataCounter[3]}</Typography>
                                    <Typography variant="subtitle1">Ticket</Typography>
                                </button>
                            </Stack>
                            {activeButton == 'following' && <Following />}
                            {activeButton == 'bookmark' && <BookMark />}
                            {activeButton == 'interested' && <InterstedIn />}
                            {activeButton == 'ticket' && <Ticket />}
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Profile;
