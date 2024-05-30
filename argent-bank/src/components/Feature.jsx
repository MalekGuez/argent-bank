const Feature = ({src, alt, title, text}) => {
    return (
        <div className="ab-feature">
            <img src={src} alt={alt} className="ab-feature__image"/>
            <h3 className="ab-feature__title">{title}</h3>
            <p className="ab-feature__text">{text}</p>
        </div>
    );
};

export default Feature;