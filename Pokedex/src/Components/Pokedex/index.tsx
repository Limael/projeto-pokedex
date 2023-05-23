import { Header } from '../Header';
import styles from './index.module.css';
import { Menu, MenuButton, MenuList, MenuItemOption, MenuOptionGroup, Button, SimpleGrid, CircularProgress } from '@chakra-ui/react';
import { useEffect, useState, useRef } from 'react';
import api from '../../api/api';
import { CardPokemon, PokemonTypeProps } from '../CardPokemon';

type PokemonType = {
  name: string;
  url: string;
};

const PAGE_SIZE = 9;

export const Pokedex = () => {
  const [pokemonCount, setPokemonCount] = useState<number>(0);
  const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>([]);
  const [pokemonList, setPokemonList] = useState<PokemonTypeProps[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPokemonTypes = async () => {
      try {
        const response = await api.get('/type');
        setPokemonTypes(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemonTypes();
  }, []);

  useEffect(() => {
    const fetchPokemonList = async () => {
      setLoading(true);

      try {
        const response = await api.get(`/pokemon?limit=${PAGE_SIZE}&offset=${offset}`);
        setPokemonCount(response.data.count);

        const results: PokemonType[] = response.data.results;

        const formattedPokemonList: PokemonTypeProps[] = await Promise.all(
          results.map(async (pokemon: PokemonType) => {
            const response = await api.get(`/pokemon/${pokemon.name}`);
            const data = response.data;
            return {
              name: data.name,
              attack: data.stats[1].base_stat,
              defense: data.stats[2].base_stat,
              types: data.types.map((type: { type: { name: string } }) => type.type.name),
              image: data.sprites.other['official-artwork'].front_default,
            };
          })
        );

        setPokemonList((prevList) => [...prevList, ...formattedPokemonList]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
      }
    };

    fetchPokemonList();
  }, [offset]);

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + PAGE_SIZE);
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;

      if (scrollHeight - scrollTop === clientHeight && !loading) {
        handleLoadMore();
      }
    }
  };

  return (
    <>
      <Header />
      <section className={styles.section_container}>
        <main className={styles.pokedex_container} ref={containerRef} onScroll={handleScroll}>
          <h1 className={styles.pokemon_quantity}>
            {pokemonCount} <strong>Pokemons</strong> for you to choose your favorite
          </h1>

          <input className={styles.input} type="text" placeholder="Encontre o seu pokemon" />

          <div className={styles.filter_section}>
            <Menu closeOnSelect={false}>
              <MenuButton as={Button}>MenuItem</MenuButton>
              <MenuList maxHeight="15rem" overflowY="scroll">
                <MenuOptionGroup type="checkbox">
                  {pokemonTypes.map((type) => (
                    <MenuItemOption key={type.name} value={type.name}>
                      {type.name}
                    </MenuItemOption>
                  ))}
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </div>

          <SimpleGrid columns={[2, null, 3]} spacing="34px">
            {pokemonList.map((pokemon: PokemonTypeProps) => (
              <CardPokemon
                key={pokemon.name}
                name={pokemon.name}
                attack={pokemon.attack}
                defense={pokemon.defense}
                types={pokemon.types}
                image={pokemon.image}
              />
            ))}
          </SimpleGrid>

          {loading && <CircularProgress mt="4" isIndeterminate color='yellow.300' />}

          {!loading && pokemonList.length < pokemonCount && (
            <Button onClick={handleLoadMore} mt="4">
              Load More
            </Button>
          )}
        </main>
      </section>
    </>
  );
};
