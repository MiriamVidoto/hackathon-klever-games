import './Card.css';

function Card(props) {
  function handleChoice() {
    if (!props.disabled) props.handleChoice(props.card);
  }

  return (
    <div className="cardMemory">
      <div className={props.flipped ? 'flipped' : ''}>
        <img
          className={`front ${props.card.matched ? 'matched' : ''}`}
          src={props.card.src}
          alt="card front"
        />
        <img
          className="back"
          src="https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F65120980%3Fs%3D280%26v%3D4"
          alt="card back"
          onClick={() => handleChoice()}
        />
      </div>
    </div>
  );
}

export default Card;
