type Props = {
  card: any;
};

export default function CardImage({ card }: Props) {
  const imagePath = `/cards/${card.id}front.png`;

  return (
    <img
      src={imagePath}
      alt={`Carte ${card.id}`}
      style={{
        width: "100px",
        border: card.isPlayable ? "5px solid limegreen" : "1px solid gray",
        boxShadow: card.isPlayable ? "0 0 10px limegreen" : "none",
        borderRadius: "8px",
      }}
    />
  );
}
