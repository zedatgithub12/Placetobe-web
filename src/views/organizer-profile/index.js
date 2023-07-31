// material-ui
import { Typography, Grid, Card, CardMedia, Stack, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import profilePicture from '../../assets/images/profile/profilePicture.svg';
import profileBackground from '../../assets/images/profile/profileBackground.svg';
import { useState } from 'react';
import Followers from './followers/index';
import Events from './events/index';
import Intersted from './interested/index';
import Rating from './rating/index';
import ProfileData from 'data/profile';
import { dataCounter } from './dataCounter';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import StarIcon from '@mui/icons-material/Star';
import '../../App.css';
// ==============================|| SAMPLE PAGE ||============================== //
/* const FileUpload = () => {
    return <input type="file" id="upload-button" onChange={handleUpload} />;
}; */
const Profile = () => {
    const [activeButton, setActiveButton] = useState('events');
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
        <>
            <MainCard style={{ background: 'none' }} pr={0} pl={0}>
                <Grid container spacing={{ xs: 1, sm: 5 }}>
                    <Grid item xs={12}>
                        <Grid item ml={{ xs: -2.5, lg: -1 }}>
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
                                    Organizer Profile
                                </Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ flexGrow: 1 }} className="profileContainer">
                        <Grid item xs={12} lg={4}>
                            <Card style={{ textAlign: 'center', paddingBottom: '4rem' }}>
                                <CardMedia
                                    component="img"
                                    alt="Background Image"
                                    height="150"
                                    image={profileBackground}
                                    title="Card Background"
                                />
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
                                {!editBio && (
                                    <Stack
                                        direction="vertical"
                                        style={{
                                            width: '80%',
                                            justifyContent: 'center',
                                            margin: 'auto',
                                            paddingTop: '0.8rem'
                                        }}
                                    >
                                        <LocalPhoneOutlinedIcon sx={{ fontSize: '2rem', color: '#ffbb00', marginTop: '0.8rem' }} />
                                        <button
                                            style={{
                                                background: '#FDB910',
                                                width: '10rem',
                                                border: 'none',
                                                borderRadius: '30px',
                                                height: '3rem',
                                                margin: '0 10%'
                                            }}
                                        >
                                            <Typography variant="h4">Follow</Typography>
                                        </button>
                                        <LanguageOutlinedIcon sx={{ marginTop: '0.5rem', fontSize: '2rem' }} />
                                    </Stack>
                                )}
                            </Card>
                        </Grid>
                        <Grid item xs={12} lg={8}>
                            <Grid item xs={12}>
                                <Card>
                                    <Stack direction="row" divider={<Divider orientation="vertical" />} style={{ background: '#ffdd01' }}>
                                        <button
                                            className="profileNavigationButton"
                                            onClick={() => handleButtonClick('events')}
                                            style={{
                                                background: activeButton == 'events' ? '#FFE090' : '#ffbb00'
                                            }}
                                        >
                                            <Typography variant="h2">{dataCounter[0]}</Typography>
                                            <Typography variant="subtitle1">Events</Typography>
                                        </button>
                                        <button
                                            className="profileNavigationButton"
                                            onClick={() => handleButtonClick('followers')}
                                            style={{
                                                background: activeButton == 'followers' ? '#FFE090' : '#ffbb00'
                                            }}
                                        >
                                            <Typography variant="h3">{dataCounter[1]}</Typography>
                                            <Typography variant="subtitle1">Followers</Typography>
                                        </button>
                                        <button
                                            className="profileNavigationButton"
                                            onClick={() => handleButtonClick('rating')}
                                            style={{
                                                background: activeButton == 'rating' ? '#FFE090' : '#ffbb00'
                                            }}
                                        >
                                            <Typography variant="h3">
                                                5.0
                                                <sup>
                                                    <StarIcon sx={{ fontSize: '0.8rem', marginRight: '-0.7rem' }} />
                                                </sup>
                                            </Typography>
                                            <Typography variant="subtitle1">Rating</Typography>
                                        </button>
                                        <button
                                            className="profileNavigationButton"
                                            onClick={() => handleButtonClick('interested')}
                                            style={{
                                                background: activeButton == 'interested' ? '#ffcd4d' : '#ffbb00'
                                            }}
                                        >
                                            <Typography variant="h3">{dataCounter[3]}</Typography>
                                            <Typography variant="subtitle1">Interested</Typography>
                                        </button>
                                    </Stack>
                                    {activeButton == 'events' && <Events />}
                                    {activeButton == 'followers' && <Followers />}
                                    {activeButton == 'rating' && <Rating />}
                                    {activeButton == 'interested' && <Intersted />}
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>{' '}
        </>
    );
};

export default Profile;
