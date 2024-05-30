import Chat from "../assets/icon-chat.png";
import Money from "../assets/icon-money.png";
import Shield from "../assets/icon-security.png";

import Feature from '../components/Feature';

const Home = () => {

    
    return (
        <div className="ab-home">
            <div className="ab-home__banner">
                <div className="ab-home__banner-content">
                    <h1>No fees.<br/>No minimum deposit.<br/>High interest rates.</h1>
                    <span>Open a savings account with <strong className="ab-logo">ARGENT <span>BANK</span></strong> today !</span>
                </div>
            </div>
            <div className="ab-home__features">
                <Feature src={Chat} alt="Chat Icon" title="You are our #1 priority" text="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes." />
                <Feature src={Money} alt="Money Icon" title="More savings means higher rates" text="The more you save with us, the higher your interest rate will be!" />
                <Feature src={Shield} alt="Shield Icon" title="Security you can trust" text="We use top of the line encryption to make sure your data and money is always safe." />

            </div>
        </div>
    );
};

export default Home;