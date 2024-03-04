import './cardsingle.css'

export default function CardSingle({card, handleChoice, flipped, disabled})
{
    const handleClick = () => 
    {
        if(!disabled)
        {
            handleChoice(card)
        }
    }

    return(
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="card front" />
                <img 
                    className="back" 
                    src="./react_memorygame_japlan/img/flagofjapan.png" 
                    onClick={handleClick} 
                    alt="card back"/>
            </div>
        </div>
    )
}