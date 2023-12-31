'use client'

import { Button } from "@nextui-org/react"
import { Image } from "@nextui-org/react"

import Link from "next/link"

export default function TrendingArticle({ id,image, title, description }: any) {
    return (
        <div id="container-trending-article">
            <div className="ml-3 lg:ml-0 flex flex-col justify-center lg:flex-row lg:justify-center">

                <div className="flex justify-center relative mr-9 ml-5">

                    <div className="flex justify-center w-full lg:w-[45rem] h-72 select-none mb-3 lg:mb-0">
                        <img src={image} className="w-full h-full object-cover rounded-lg" alt={`img-${id}`} />
                    </div>

                    <div className="absolute bottom-0 left-0 p-6 text-white flex flex-wrap">
                        <p className="font-bold text-3xl drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,100)]">{title}</p>
                    </div>

                </div>

                <div className="flex flex-col justify-between">
                    
                    <div className="break-words text-justify ml-3 lg:ml-0 mr-8 lg:mr-6 mb-3 lg:mb-0">
                        <p className="line-clamp-[9]">{description}</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <button className="bg-[#963ED9] text-white py-2 px-3 rounded-xl" title="read-article">
                            <Link href={`article/${id}`}>
                                Read article
                            </Link>
                        </button>  
                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}