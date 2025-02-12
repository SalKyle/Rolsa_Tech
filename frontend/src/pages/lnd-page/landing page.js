import React,{useState} from "react";
import { Link } from "react-router-dom";
import "./landing page.css";
import coffee from "../components/mixkit-one-coffee-cup-in-a-sea-of-coffee-beans-43940-4k.mp4";
import logo from "../components/Bean and Brew.png";

const LandingPage = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return(
        <>
            <div className="theme">
                <div className="lnd-video-container">
                    <video autoPlay muted loop>
                        <source src={coffee} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
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

            <div className="seasonal_offer">
                
                <h4>Try our new, seasonal drinks and pastries inspired by the joys of Christmas</h4>
                <Link to="/signup">
                    <button>Order Now</button>
                </Link>
            </div>
        </>
    )
};

export default LandingPage;
