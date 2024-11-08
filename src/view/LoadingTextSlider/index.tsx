import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Typography } from '@mui/material';
import 'swiper/css/pagination';
import 'swiper/css';
import style from './textSwiper.module.css';

const swiperText = [
  { id: 1, text: 'Finalizing your Everlink URL.' },
  { id: 2, text: 'This may take a few minutes.' },
  { id: 3, text: 'Finalizing your Everlink URL.' },
  { id: 4, text: 'This may take a few minutes.' },
];

const styles = {
  sliderText: {
    fontSize: { sm: 20, xs: 14 },
    lineHeight: 1.3,
  },
};
export default function index() {
  return (
    <>
      <Swiper
        direction={'vertical'}
        loop={true}
        autoplay={{
          delay: 1000,
        }}
        modules={[Autoplay]}
        className={style.swiper}
      >
        {swiperText.map((item) => (
          <SwiperSlide key={item.id}>
            <Typography sx={styles.sliderText}>{item.text}</Typography>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
