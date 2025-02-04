import { useState, useEffect } from "react"

const Carousel = ()=>{
    const [images, setImages]= useState(['url1', 'url2', 'url3']);
    const [currentIndex, setCurrentIndex]  = useState(0);

    useEffect(()=>{
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev+1) %images.length)
        }, 5000);
        return () => clearInterval(interval)
    }, [currentIndex, images.length])

    const handleLeft = ()=>{
        setCurrentIndex(prev => (prev-1) %images.length);
    }
    const handleRight = ()=>{
        setCurrentIndex(prev => (prev+1)% images.length);
    }

    return (<>
        <div id="container" className="relative my-5 w-[95%] h-[200px] mx-auto rounded-2xl overflow-hidden">
            <div id="scroll-track" className=" min-h-full flex transition-transform duration-500 ease-in-out"
            style={{transform:`translateX(-${currentIndex * 100}%)` }}>
                {images.map((im, index)=> <p className="min-w-full min-h-full bg-stone-600 text-white text-center content-center">hello {index}</p>)
                }
            </div>
        </div>
    </>)
}

export default Carousel;