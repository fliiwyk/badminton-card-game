import CardImage from "./CardImage";

type Props = {
  player: any;
};

export default function PlayerHand({ player }: Props) {
  console.log("player:", player);

  return (
    <div style={{ border: "1px solid gray", padding: "1rem", marginTop: "2rem" }}>
      <h2>Main de {player.name}</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        {player.hand.map((card: any, index: number) => (
          <CardImage key={index} card={card} />
        ))}
      </div>
    </div>
  );
}
