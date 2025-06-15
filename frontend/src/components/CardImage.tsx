type Props = {
  cardId: number;
};

export default function CardImage({ cardId }: Props) {
  const imagePath = `/cards/${cardId}front.png`;

  return (
    <img
      src={imagePath}
      alt={`Carte ${cardId}`}
      style={{ width: "120px", height: "auto" }}
    />
  );
}
