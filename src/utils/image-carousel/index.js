import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Autoplay, Pagination]);

function ImageCarousel() {
    const isXsSmMd = useMediaQuery('(max-width:960px)');
    const isXl = useMediaQuery('(min-width:1920px)');

    const settings = {
        slidesPerView: isXsSmMd ? 1 : isXl ? 3 : 2,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 7000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    };
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch('https://app.p2b-ethiopia.com/placetobe/Images.php', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((response) => {
                setImages(response[0].images);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <Box>
            <Grid container>
                <Grid item xs={12}>
                    <Swiper {...settings}>
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={'https://app.p2b-ethiopia.com/placetobe/assets' + image.image}
                                    alt=""
                                    className="img-fluid rounded-4"
                                    style={{ width: '100%', borderRadius: 2 }}
                                />
                            </SwiperSlide>
                        ))}
                        <div className="swiper-pagination"></div>
                    </Swiper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ImageCarousel;
