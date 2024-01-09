"use client";
import { Lora } from "next/font/google";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "./hero-section.css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { cn } from "@/lib/utils";
// import { lora } from "@/app/layout";

const creatures = [
  {
    id: "1",
    image: "/images/cat.png",
  },
  {
    id: "2",
    image: "/images/bird.png",
  },
  {
    id: "3",
    image: "/images/smally.png",
  },
  {
    id: "4",
    image: "/images/turtle.png",
  },
  {
    id: "5",
    image: "/images/fish.png",
  },
  {
    id: "6",
    image: "/images/dog.png",
  },
  {
    id: "7",
    image: "/images/rabbit.png",
  },
];

const lora = Lora({ subsets: ["latin"], display: "swap" });

const HsSecondPhotos = () => {
  return (
    <div className="h-full">
      <div className="hidden lg:flex lg:flex-col lg:gap-3">
        <div className="flex flex-row justify-center items-end gap-2">
          <div className="relative w-44 h-52 aspect-auto rounded-md">
            <Image
              src="/images/cat.png"
              alt=""
              fill
              className="object-cover w-full rounded-md"
            />
          </div>
          <div className="relative w-44 h-52 aspect-auto rounded-md">
            <Image
              src="/images/bird.png"
              alt=""
              fill
              className="object-cover w-full rounded-md"
            />
          </div>
        </div>

        <div className="flex flex-row justify-center items-end gap-2">
          <div className="relative w-44 h-52 aspect-auto rounded-md">
            <Image
              src="/images/smally.png"
              alt=""
              fill
              className="object-cover w-full rounded-md"
            />
          </div>
          <div className="relative w-44 h-52 aspect-auto rounded-md">
            <Image
              src="/images/turtle.png"
              alt=""
              fill
              className="object-cover w-full rounded-md"
            />
          </div>
          <div className="relative w-44 h-52 aspect-auto rounded-md">
            <Image
              src="/images/fish.png"
              alt=""
              fill
              className="object-cover w-full rounded-md [transform:rotateY(180deg)]"
            />
          </div>
        </div>

        <div className="flex flex-row justify-center items-end gap-2">
          <div className="relative w-44 h-52 aspect-auto rounded-md">
            <Image
              src="/images/dog.png"
              alt=""
              fill
              className="object-cover w-full rounded-md"
            />
          </div>
          <div className="relative w-44 h-52 aspect-auto rounded-md">
            <Image
              src="/images/rabbit.png"
              alt=""
              fill
              className="object-cover w-full rounded-md [transform:rotateY(180deg)]"
            />
          </div>
        </div>
      </div>

      <div className="block lg:hidden">
        <h1
          className={cn(
            lora.className,
            "text-3xl capitalize font-semibold leading-[1.18] text-center mb-6"
          )}
        >
          Paws Friends Shelter
        </h1>

        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper"
        >
          {creatures.map((creature) => {
            return (
              <SwiperSlide key={creature.id}>
                <div className="relative w-44 h-44">
                  <Image src={creature.image} alt="" fill />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default HsSecondPhotos;
