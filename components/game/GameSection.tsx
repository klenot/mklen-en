import GameErrorBoundary from "@/components/game/GameErrorBoundary";
import SpaceImpact from "@/components/game/SpaceImpact";

export default function GameSection() {
  return (
    <section
      id="game"
      className="flex w-full min-h-dvh items-center justify-center max-md:py-0 md:block md:min-h-0"
    >
      <GameErrorBoundary>
        <SpaceImpact />
      </GameErrorBoundary>
    </section>
  );
}
