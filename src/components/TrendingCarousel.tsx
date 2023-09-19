'use client'
import { carrouselData } from "./carrouselData";
import TrendingArticle from './TrendingArticle';
import { BsFire } from 'react-icons/bs'
import { MdArrowBackIosNew } from 'react-icons/md'
import { MdArrowForwardIos } from 'react-icons/md'
import CarouselEmbla from './CarouselEmbla';

export default function TrendingCarousel() {


    return (

        <div>
            <div className="mb-10 overflow-hidden">
                <CarouselEmbla loop>
                    {carrouselData.map((slide, index) => {
                        return (
                            <div className='flex-[0_0_100%]'>
                                <TrendingArticle key={index} image={slide.image} title={slide.title} description={slide.description} />
                            </div>
                            
                        )
                    })}
                </CarouselEmbla>
            </div>
        </div>



    )
}