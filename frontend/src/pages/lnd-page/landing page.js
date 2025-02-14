import React,{useState} from "react";
import { Link } from "react-router-dom";
import "./landing page.css";
// import coffee from "../components/mixkit-one-coffee-cup-in-a-sea-of-coffee-beans-43940-4k.mp4";
import logo from "../components/Bean and Brew.png";
import croissant from "../components/pexels-valeriiamiller-2974486.jpg";

const LandingPage = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return(
        <>
            <div className="theme">
                <div className="lnd-video-container">
                    <video src="/videos/mixkit-one-coffee-cup-in-a-sea-of-coffee-beans-43940-4k.mp4" autoPlay loop muted preload="auto"/>
                        {/* <source src={coffee} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video> */}
                </div>
                
                <div className="headboard">
                    {/* Hamburger Menu */}
                    <div className="hamburger-menu" onClick={toggleMenu}>
                        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
                        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
                        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
                    </div>

                    <div className={`links-ham ${menuOpen ? "show" : ""}`}>
                        <Link to={"/menu"}>Menu</Link>
                        <Link to={"/reservation"}>Reservations</Link>
                        <Link to={"/baking-lessons"}>Baking Lessons</Link>
                        <Link to={"/rate-my-cake"}>Rate my Cake</Link>
                        <Link to={"/contact"}>Contact</Link>
                    </div>
                    <div className="head-content">
                        <header>
                            <img src={logo} alt="Bean and Brew Cafe Logo" className="lnd_logo" />
                            <h1>Bean and Brew Cafe</h1>
                        </header>
                        
                        
                        <div className="links">
                            <Link to={"/menu"}>Menu</Link>
                            <Link to={"/reservation"}>Reservations</Link>
                            <Link to={"/menu"}>Baking Lessons</Link>
                            <Link to={"/menu"}>Rate my Cake</Link>
                            <Link to={"/menu"}>Contact</Link>
                        </div>
                    </div>
                    <div className="nav">
                        <Link to="/signup"><button>Order Now</button></Link>
                        <Link to="/login"className="login-nav"><button>Login</button></Link>
                    </div>
                </div>
            </div>

            <div className="seasonal_offer1">
                <img src={croissant} alt="Croissant" />
                <h4>Nourish Your Body, Lift Your Spirits</h4>
                <p>Crafted with fresh, wholesome ingredients and bold flavours, our new menu is designed to make you feel good, every day. </p>
                <Link to="/menu">
                    <button>Discover our new menu</button>
                </Link>
            </div>
            <div className="seasonal_offer">
                <img src={croissant} alt="Croissant" />
                <h4>Handmade. Hand delivered.</h4>
                <p> Our freshly made food, delivered from our kitchen to your door.
                
                Made for important meetings, treating busy teams or entertaining friends and family at home. We deliver freshly made breakfast, lunch & sweet platters straight to your door. Order by 10am for same day delivery*.
                
                Pret Delivers is now available in even more shops near you.</p>
                <Link to="/menu">
                    <button>Find out more</button>
                </Link>
            </div>
            <div className="seasonal_offer">
                <img src={croissant} alt="Croissant" />
                <h4>Our Seasonal Pastry Rota</h4>
                <p>Pastries, wonderful pastres. Hearty, wholesome, light, bright – whatever sort you like, our famous Pastry Rota has pots packed with flavours sure to stir up your lunch.
                
                Spoons at the ready.</p>
                <Link to="/menu">
                    <button>View Rota</button>
                </Link>
            </div>
        </>
    )
};

export default LandingPage;
