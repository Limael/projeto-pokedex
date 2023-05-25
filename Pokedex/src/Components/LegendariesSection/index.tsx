import styles from './index.module.css';
import { Progress, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import api from "../../api/api";
import { CarousselCard } from "../CarousselCard";

import arrowRight from '../../assets/arrowRight.svg'
import arrowLeft from '../../assets/arrowLeft.svg'
export type PokemonProps = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      dream_world: {
        front_default: string;
        front_female: null | string;
      };
      home: {
        front_default: string;
        front_female: null | string;
        front_shiny: string;
        front_shiny_female: null | string;
      };
      'official-artwork': {
        front_default: string;
        front_shiny: string;
      };
    };
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  url: string;
  base_experience: number;
};


export type LegendariesSectionProps = {
  title: string;
  img?: string;
  pokemonName?: string;
  pokemonDescription?: string;
  hp?: number;
  experience?: number;
  attack?: number;
  defense?: number;
  spAttack?: number;
  spDefense?: number;
};


export const LegendariesSection = ({ title, img, pokemonName, pokemonDescription, hp, experience, attack, defense, spAttack, spDefense }: LegendariesSectionProps) => {
  const [legendaryPokemon, setLegendaryPokemon] = useState<PokemonProps[]>([]);

  const carousel = useRef<HTMLDivElement>(null);

  const handleLeftClick = () => {
    if (carousel.current) {
      carousel.current.scrollLeft -= 538;
    }
  }

  const handleRightClick = () => {
    if (carousel.current) {
      carousel.current.scrollLeft += 538;
    }
  }

  useEffect(() => {
    const fetchLegendaryPokemon = async () => {
      try {
        const response = await api.get('/pokemon?limit=10000');
        const results = response.data.results;

        const legendaryResults = await Promise.all(
          results.map(async (pokemon: PokemonProps) => {
            const pokemonResponse = await api.get(pokemon.url);
            const pokemonData = pokemonResponse.data;

            try {
              const speciesResponse = await api.get(`/pokemon-species/${pokemonData.id}`);
              const speciesData = speciesResponse.data;

              if (speciesData.is_legendary) {
                return pokemonData;
              }
            } catch (error) {
              console.log(`Error fetching species for Pokemon with ID ${pokemonData.id}:`, error);
            }

            return null;
          })
        );

        const filteredPokemon = legendaryResults.filter(
          (pokemon) => pokemon !== null
        );

        setLegendaryPokemon(filteredPokemon);
      } catch (error) {
        console.log('Error fetching legendary Pokemon:', error);
      }
    };

    fetchLegendaryPokemon();
  }, []);

  return (
    <>
      <section className={styles.section_legendaries}>
        <h1 className={styles.title}>{title}</h1>
        <hr className={styles.divider} />

        <div className={styles.legendary_information_container}>
          <img src={img} alt="" />

          <article>
            <h1 className={styles.legendary_name}>{pokemonName}</h1>
            <p className={styles.legendary_description}>{pokemonDescription}</p>
            <SimpleGrid columns={[1, null, 2, 2]} spacing={[0, null, '34px']}>

              <article className={styles.stats_container}>
                <span className={styles.legendary_stats}>Healthy Points</span>
                <span><strong className={styles.legendary_stats_number}>{hp}</strong></span>
                <Progress className={styles.progresso} colorScheme='yellow' value={hp} />
              </article>
              <article className={styles.stats_container}>
                <span className={styles.legendary_stats}>Experience</span>
                <span><strong className={styles.legendary_stats_number}>{experience}</strong></span>
                <Progress className={styles.progresso} colorScheme='yellow' value={experience} />
              </article>
              <article className={styles.stats_container}>
                <span className={styles.legendary_stats}>Attack</span>
                <span><strong className={styles.legendary_stats_number}>{attack}</strong></span>
                <Progress className={styles.progresso} colorScheme='yellow' value={attack} />
              </article>
              <article className={styles.stats_container}>
                <span className={styles.legendary_stats}>Defense</span>
                <span><strong className={styles.legendary_stats_number}>{defense}</strong></span>
                <Progress className={styles.progresso} colorScheme='yellow' value={defense} />
              </article>
              <article className={styles.stats_container}>
                <span className={styles.legendary_stats}>SpAttack</span>
                <span><strong className={styles.legendary_stats_number}>{spAttack}</strong></span>
                <Progress className={styles.progresso} colorScheme='yellow' value={spAttack} />
              </article>
              <article className={styles.stats_container}>
                <span className={styles.legendary_stats}>SpDefense</span>
                <span><strong className={styles.legendary_stats_number}>{spDefense}</strong></span>
                <Progress className={styles.progresso} colorScheme='yellow' value={spDefense} />
              </article>


            </SimpleGrid>
          </article>
        </div>

        <div>
          <button onClick={handleLeftClick}><img src={arrowLeft} alt="" /></button>
          <div>
            <div ref={carousel}>
              {/* Renderizar os Pokémon lendários no carrossel */}
              {legendaryPokemon.map((pokemon) => (
                <CarousselCard key={pokemon.id} image={pokemon.sprites.other['official-artwork'].front_default} pokemonName={pokemon.name} />
              ))}
            </div>
          </div>
          <button onClick={handleRightClick}><img src={arrowRight} alt="" /></button>
        </div>
      </section>
    </>
  );
};
