// material-ui
import { Grid, Box, IconButton, Typography, ListItemIcon, Skeleton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

//ant design for calendar
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import dayLocaleData from 'dayjs/plugin/localeData';
import { Calendar, Col, Radio, Row, Select } from 'antd';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import CalenderEventCard from './event-cards';

//dummy data
import EventsData from '../../data/events';
import './calendar.css';

// ==============================|| Event Calendar PAGE ||============================== //
dayjs.extend(dayLocaleData);

const EventCalendar = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const dateRender = (date) => {
        // date cell renderer function for the calender and events

        const dateString = date.format('YYYY-MM-DD');
        const eventsOnDate = EventsData.filter((event) => event.startDate === dateString);
        if (eventsOnDate.length > 0) {
            return (
                <Box>
                    {eventsOnDate.map((event) => (
                        <CalenderEventCard key={event.id} event={event} />
                    ))}
                </Box>
            );
        }

        return null;
    };
    return (
        <Box>
            <Grid container display={'flex'} alignItems={'center'} marginBottom={'20px'}>
                <Grid marginRight={'10px'}>
                    <IconButton
                        onClick={() => navigate('/')}
                        color="secondary"
                        aria-label="back"
                        sx={{ background: theme.palette.background.default, color: theme.palette.grey[800] }}
                    >
                        <ArrowBack />
                    </IconButton>
                </Grid>
                <Grid>
                    <Typography variant="h2">Calendar</Typography>
                </Grid>
            </Grid>
            <MainCard>
                <Calendar
                    headerRender={({ value, onChange }) => {
                        //header customization of calendar
                        const start = 0;
                        const end = 12;
                        const monthOptions = [];

                        let current = value.clone();
                        const localeData = value.localeData();
                        const months = [];
                        for (let i = 0; i < 12; i++) {
                            current = current.month(i);
                            months.push(localeData.monthsShort(current));
                        }

                        for (let i = start; i < end; i++) {
                            monthOptions.push(
                                <Select.Option key={i} value={i} className="month-item">
                                    {months[i]}
                                </Select.Option>
                            );
                        }

                        const year = value.year();
                        const month = value.month();
                        const options = [];
                        for (let i = year - 10; i < year + 10; i += 1) {
                            options.push(
                                <Select.Option key={i} value={i} className="year-item">
                                    {i}
                                </Select.Option>
                            );
                        }
                        return (
                            <div style={{ padding: 8 }}>
                                <Row gutter={8} style={{ display: 'flex', justifyContent: 'end' }}>
                                    <Col>
                                        <Select
                                            size="small"
                                            popupMatchSelectWidth={false}
                                            className="my-year-select"
                                            value={year}
                                            onChange={(newYear) => {
                                                const now = value.clone().year(newYear);
                                                onChange(now);
                                            }}
                                        >
                                            {options}
                                        </Select>
                                    </Col>
                                    <Col>
                                        <Select
                                            size="small"
                                            popupMatchSelectWidth={false}
                                            value={month}
                                            onChange={(newMonth) => {
                                                const now = value.clone().month(newMonth);
                                                onChange(now);
                                            }}
                                        >
                                            {monthOptions}
                                        </Select>
                                    </Col>
                                </Row>
                            </div>
                        );
                    }}
                    cellRender={dateRender}
                />
            </MainCard>
        </Box>
    );
};

export default EventCalendar;
