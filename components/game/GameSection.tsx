import GameErrorBoundary from "@/components/game/GameErrorBoundary";
import SpaceImpact from "@/components/game/SpaceImpact";

export default function GameSection() {
  return (
    <section id="game" className="w-full">
      <GameErrorBoundary>
        <SpaceImpact />
      </GameErrorBoundary>
    </section>
  );
}
