import bannerBg from '../../assets/banner/courier-man-delivering-cardboard.jpg';

const Banner = () => {
    return (
        <div className='font-primary'>
            <div className="hero min-h-screen bg-fixed" style={{ backgroundImage: `url(${bannerBg})`, backgroundPosition: 'top', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 font-secondary text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">Where Imagination Meets Execution</h1>
                        <p className="mb-5 text-sm md:text-base">Our creative team merges visionary concepts with flawless execution, bringing your wildest event ideas to life.</p>
                        <button className="bg-primary text-white px-5 py-2 rounded font-medium active:scale-95 transition-transform">Read More</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;