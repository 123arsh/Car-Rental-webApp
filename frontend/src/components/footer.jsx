const Footer = () => {
    return (
        <div className="flex justify-center items-center gap-10 w-full h-[400px] bg-black text-white font-serif">
            <div className="flex flex-col w-[250px] h-[300px] border border-white p-20">
                <h1>About</h1>
                <h1>Contact</h1>
                <h1>Help</h1>
                <h1>Services</h1>
            </div>
            <div className="flex flex-col w-[250px] h-[300px] border border-white p-20">
                <h1>Socials</h1>
                <h1>Policy</h1>
            </div>
            <div className="flex flex-col w-[250px] h-[300px] border border-white p-20">
                <h1>Customer Reviews</h1>
            </div>
            <div className="flex flex-col w-[250px] h-[300px] border border-white p-20">
                <h1>All Right Reserved ®️</h1>
            </div>
        </div>
    );
}
export default Footer;