import bannerBg from '../../assets/banner/courier-man-delivering-cardboard.jpg';

const Banner = () => {

    const handleSearch = e => {
        e.preventDefault();
    }
    
    return (
        <div className='font-primary'>
            <div className="hero min-h-screen bg-fixed" style={{ backgroundImage: `url(${bannerBg})`, backgroundPosition: 'top', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 font-secondary text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold"> Where Speed Meets Reliability</h1>
                        <p className="mb-5 text-sm md:text-base">Our commitment to delivering swift logistics solutions without compromising on the trust and dependability our customers expect</p>
                        <form onSubmit={handleSearch} className="flex w-full max-w-sm mx-auto md:mb-16 mb-8">
                            <input placeholder="Search here..." className="w-full text-slate-700 outline-none border border-dark3 px-3 py-2" type="text" name="search" id="search" />
                            <button className="bg-primary px-5 font-bold text-white border-primary">Search</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;