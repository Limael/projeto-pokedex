import { useEffect, useState } from 'react';
import { Header } from '../Header';
import styles from './index.module.css';
import { Menu, MenuButton, MenuList, MenuItemOption, MenuOptionGroup, Button, SimpleGrid, CircularProgress, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
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
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonTypeProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
              types: data.types.map((type: { type: { name: string } } & PokemonType) => type.type.name),
              image: data.sprites.other['official-artwork'].front_default,
              onClick: () => handlePokemonClick(data) // Passando o Pokemon completo para o onClick
            };
          })
        );

        if (offset === 0) {
          setPokemonList(formattedPokemonList);
        } else {
          setPokemonList((prevList) => [...prevList, ...formattedPokemonList]);
        }

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

  const handlePokemonClick = async (pokemon: PokemonTypeProps) => {
    try {
      const response = await api.get(`/pokemon/${pokemon.name}`);
      const data = response.data;

      const additionalInfo = {
        experience: data.base_experience,
        abilities: data.abilities.map((ability: { ability: { name: string } } & PokemonType) => ability.ability.name),
        // Adicione outras informações que desejar
      };

      const selectedPokemonWithInfo = {
        ...pokemon,
        ...additionalInfo,
      };

      setSelectedPokemon(selectedPokemonWithInfo);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching additional Pokemon info:', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />
      <section className={styles.section_container}>
        <main className={styles.pokedex_container}>
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
            {pokemonList.map((pokemon: PokemonTypeProps, index: number) => (
              <CardPokemon key={index} {...pokemon} />
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

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedPokemon?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Attack: {selectedPokemon?.attack}</p>
            <p>Defense: {selectedPokemon?.defense}</p>
            <p>Types: {selectedPokemon?.types.join(', ')}</p>
            <p>Experience: {selectedPokemon?.experience}</p>
            {/* Adicione outras informações que desejar */}
            <img src={selectedPokemon?.image} alt={selectedPokemon?.name} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
