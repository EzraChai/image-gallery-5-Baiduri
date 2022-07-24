import Image from "next/image"
import { useState } from "react"
import { ImageType } from "../pages"

function cn(...classes: string[]){
    return classes.filter(Boolean).join(" ")
}

export default function Gallery({images}: {images: ImageType[]}){
    
    return (
        <div className="">
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {images.map((image) => (
                    <BlurImage key={image.id} image={image}/>
                ))}
            </div>
        </div>
    )
}

function BlurImage({image}: {image: ImageType}){
    const [isLoading, setLoading] = useState<boolean>(true);

    return(
        <a href={image.href} className="group">
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
                    src={image.imageSrc || "https://instagram.fpku1-2.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ad=z-m&_nc_ht=instagram.fpku1-2.fna.fbcdn.net&_nc_cat=1&_nc_ohc=EZUdW6JaX6YAX8xGbmQ&edm=AL4D0a4BAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AT_5eYDsyG0Fs8Ql4_yt9oopqfcH8CNFbDt1A8EWXREmtw&oe=62E4940F&_nc_sid=712cc3"}
                    alt={`${image.name}&aposs image`} 
                />
            </div>
            <h3 className="mt-4 text-sm  text-gray-700">{image.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">{image.username? `@${image.username}` : '' }</p>
        </a>
    )
}