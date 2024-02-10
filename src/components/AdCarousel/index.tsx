import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Autoplay } from 'swiper/modules'

import 'swiper/css'

import Card from './Card'

export default function AdCarousel() {
  SwiperCore.use([Autoplay])

  return (
    <div className="w-full aspect-[40/15] my-6 ease-linear">
      <Swiper
        className="w-full aspect-[40/15] rounded-md"
        spaceBetween={0}
        slidesPerView={1}
        loop
        speed={5000}
        autoplay={{
          delay: 100,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        <SwiperSlide>
          <Card link="/dino.png" />
        </SwiperSlide>
        <SwiperSlide>
          <Card link="/in.png" />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
