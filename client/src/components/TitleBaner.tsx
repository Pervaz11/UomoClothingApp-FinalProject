import hiking from "../../../src/assets/images/hiking-slider.jpg";

export interface TitleBannerProps {
    title: string;
}


const TitleBanner = (props: TitleBannerProps) => {
    return (
        <>
            <div className='title-banner relative w-full lg:h-[65vh] h-[35vh]'>
                <img src={hiking} alt="" className='opacity-10 w-full h-full lg:object-cover object-contain' />
                <h3 className='absolute capitalize top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black z-10 lg:text-6xl text-4xl font-bold text-center'>
                    {props.title}
                </h3>
            </div>

        </>
    )
}

export default TitleBanner
