import Image from "next/image"
import { useState } from "react"
import { ImageType } from "../pages"

function cn(...classes: string[]){
    return classes.filter(Boolean).join(" ")
}

export default function Gallery({images}: {images: ImageType[]}){
    
    return (
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {images.map((image) => (
                    <BlurImage key={image.id} image={image}/>
                ))}
            </div>
    )
}

function BlurImage({image}: {image: ImageType}){
    const [isLoading, setLoading] = useState<boolean>(true);

    return(
        <a href={image.href} rel={"noreferrer"} target={"_blank"} className="group">
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
                <Image 
                    onLoadingComplete={() => setLoading(false)}
                    layout="responsive" 
                    width={"300px"} 
                    height={"300px"} 
                    objectFit="cover" 
                    className={
                        cn(
                            'group-hover:opacity-75 duration-700 ease-in-out',
                            isLoading?
                            'grayscale blur-2xl scale-110'
                            :'grayscale-0 blur-0 scale-100' 
                        )
                    }
                    src={image.username ? `/images/${image.username}.jpg`: ""}
                    alt={`${image.name}'s image`} 
                />
            </div>
            <h3 className="mt-4 text-sm  text-gray-700">{image.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">{image.username? `@${image.username}` : '' }</p>
        </a>
    )
}