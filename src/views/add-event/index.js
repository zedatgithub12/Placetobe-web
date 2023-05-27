import { useState } from 'react';
import { Container, Grid, TextField, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { DateRange, ArrowCircleDownOutlined, Schedule, ArrowDropDown } from '@mui/icons-material';
import { Button, Menu, MenuItem, Divider } from '@mui/material';
import Category from 'data/category';
import './styles.css';

const AddEvent = () => {
    const [image, setImage] = useState(null);

    const handleImageUpload = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    const handleImageSubmit = (e) => {
        e.preventDefault();
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        handleClose();
    };

    return (
        <Container>
            <MainCard title="Add Event">
                <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<ArrowCircleDownOutlined />}>
                        <Typography>Upload Event poster</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={7}>
                                <form onSubmit={handleImageSubmit}>
                                    <label htmlFor="image-upload" className="upload-button">
                                        {image ? (
                                            <img src={URL.createObjectURL(image)} alt="uploaded" className="uploaded-image" />
                                        ) : (
                                            <div className="upload-box"></div>
                                        )}
                                    </label>
                                    <input type="file" accept="image/*" id="image-upload" onChange={handleImageUpload} />
                                </form>
                            </Grid>
                            <Grid item xs={12} sm={6} md={5}>
                                <Grid>
                                    <Grid item xs={12}>
                                        <TextField label="Event Name" variant="outlined" fullWidth margin="normal" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Event Description"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            multiline
                                            rows={13}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Divider />
                <Accordion>
                    <AccordionSummary expandIcon={<ArrowCircleDownOutlined />}>
                        <Typography>Provide Event Sessions</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6} md={6}>
                                <TextField
                                    label="Start Date"
                                    type="date"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{
                                        startAdornment: <DateRange sx={{ color: 'warning.main', mr: 1, my: 0.5 }} />
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <TextField
                                    label="Start Time"
                                    type="time"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{
                                        startAdornment: <Schedule sx={{ color: 'warning.main', mr: 1, my: 0.5 }} />
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={6}>
                                <TextField
                                    label="End Date"
                                    type="date"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{
                                        startAdornment: <DateRange sx={{ color: 'warning.main', mr: 1, my: 0.5 }} />
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <TextField
                                    label="End Time"
                                    type="time"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{
                                        startAdornment: <Schedule sx={{ color: 'warning.main', mr: 1, my: 0.5 }} />
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Divider />
                <Accordion>
                    <AccordionSummary expandIcon={<ArrowCircleDownOutlined />}>
                        <Typography>Event Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={6}>
                                <TextField label="Organizer Name" variant="outlined" fullWidth margin="normal" />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Button
                                    onClick={handleClick}
                                    variant="outlined"
                                    fullWidth
                                    className="split-button"
                                    endIcon={<ArrowDropDown />}
                                >
                                    {selectedOption || 'Select Category'}
                                </Button>

                                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                                    {Category.map((category) => (
                                        <MenuItem
                                            key={category.id}
                                            onClick={() => handleOptionSelect(category.name)}
                                            className={`menu-item-${category.id}`}
                                            sx={{ px: 3, my: 1, background: category.background }}
                                        >
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <TextField label="Event Address" variant="outlined" fullWidth margin="normal" />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <TextField label="Enterance Fee" variant="outlined" fullWidth margin="normal" />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Divider />
                <Accordion>
                    <AccordionSummary expandIcon={<ArrowCircleDownOutlined />}>
                        <Typography>Additional Information</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={6}>
                                <TextField label="Event location Latitude" variant="outlined" fullWidth margin="normal" />
                            </Grid>

                            <Grid item xs={12} sm={6} md={6}>
                                <TextField label="Event location Longitude" variant="outlined" fullWidth margin="normal" />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <TextField label="Contact Phone Number" variant="outlined" fullWidth margin="normal" />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <TextField label="Link" variant="outlined" fullWidth margin="normal" />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Button> Preview </Button>
                <Button> Upload </Button>
            </MainCard>
        </Container>
    );
};

export default AddEvent;
