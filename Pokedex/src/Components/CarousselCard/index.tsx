import pokeball from '../../assets/pokeball.svg'

export type LegendaryCardProps = {
  image: string;
  pokemonName: string;
}

export const CarousselCard = ({ image, pokemonName }: LegendaryCardProps) => {

  return (
    <main>
      <img src={image} alt="Pokemon lendário" />
      <div>
        <section>
          <h1>{pokemonName}</h1>
          <img src={pokeball} alt="Ultra ball" />
        </section>
      </div>
    </main>

  );
};
