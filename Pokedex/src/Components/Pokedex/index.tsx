import { useEffect, useState } from 'react';
import { Header } from '../Header';
import styles from './index.module.css';
import { Menu, MenuButton, MenuList, Button, SimpleGrid, CircularProgress, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, MenuItem, Checkbox } from '@chakra-ui/react';
import api from '../../api/api';
import { CardPokemon, PokemonTypeProps } from '../CardPokemon';
import { ChevronDownIcon } from '@chakra-ui/icons';

type PokemonType = {
  name: string;
  url: string;
};

const PAGE_SIZE = 9;

export const Pokedex = () => {
  const [pokemonCount, setPokemonCount] = useState<number>(0);
  const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>([]);
  const [pokemonList, setPokemonList] = useState<PokemonTypeProps[]>([]);
  const [pokemonSearchList, setPokemonSearchList] = useState<PokemonTypeProps[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


  const [selectedPokemon, setSelectedPokemon] = useState<PokemonTypeProps | null>(null);



  const [searchValue, setSearchValue] = useState('')
  useEffect(() => {
    const fetchPokemonList = async () => {
      if (searchValue.trim() === '') {
        setPokemonSearchList([])
        return;
      }

      setLoading(true);

      try {
        const response = await api.get(`/pokemon/${searchValue}`);
        const data = response.data;

        const pokemon: PokemonTypeProps = {
          name: data.name,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          types: data.types.map((type: { type: { name: string } } & PokemonType) => type.type.name),
          image: data.sprites.other['official-artwork'].front_default,
          onClick: () => handlePokemonClick(pokemon),
          hp: data.stats[0].base_stat,
          spAttack: data.stats[3].base_stat,
          spDefense: data.stats[4].base_stat,
          experience: data.base_experience,
          generation: data.game_indices[0].version.url.split('/').slice(-2, -1)[0],
          index: data.id,

        };


        setPokemonSearchList([pokemon]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, [searchValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };


  /*     const handleTypeSelect = (type: string) => {
          setSelectedTypes((prevSelectedTypes) => {
              if (prevSelectedTypes.includes(type)) {
                  return prevSelectedTypes.filter((selectedType) => selectedType !== type);
              } else {
                  return [...prevSelectedTypes, type];
              }
          });
      };
  
      useEffect(() => {
          const lastSelectedType = selectedTypes[selectedTypes.length - 1];
          console.log('Último tipo selecionado:', lastSelectedType);
      }, [selectedTypes]);
  
   */

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

  /* 
      useEffect(() => {
          const fetchPokemonTypeName = async () => {
              try {
                  const lastSelectedType = selectedTypes[selectedTypes.length - 1];
                  const response = await api.get(`/type/${lastSelectedType}`);
                  setFilteredList(response.data.pokemon);
              } catch (error) {
                  console.log(error);
              }
          };
  
          fetchPokemonTypeName();
      }, [selectedTypes]); */







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
            const formattedPokemon: PokemonTypeProps = {
              name: data.name,
              attack: data.stats[1].base_stat,
              defense: data.stats[2].base_stat,
              types: data.types.map((type: { type: { name: string } } & PokemonType) => type.type.name),
              image: data.sprites.other['official-artwork'].front_default,
              onClick: () => handlePokemonClick(formattedPokemon),
              hp: data.stats[0].base_stat,
              spAttack: data.stats[3].base_stat,
              spDefense: data.stats[4].base_stat,
              experience: data.base_experience,
              generation: data.game_indices[0].version.url.split('/').slice(-2, -1)[0],
              index: data.id,

            };
            return formattedPokemon;
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

  const handlePokemonClick = (pokemon: PokemonTypeProps) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {

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

          <input className={styles.input} type="text" value={searchValue} onChange={handleInputChange} placeholder="Encontre o seu pokemon" />

          <div className={styles.filter_section}>
            <Menu closeOnSelect={false}>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Tipo
              </MenuButton>
              <MenuList maxHeight="15rem" overflowY="scroll">
                {pokemonTypes.map((type) => (
                  <MenuItem key={type.name}>
                    <Checkbox
                    /*                 isChecked={selectedTypes.includes(type.name)}
                                    onChange={() => handleTypeSelect(type.name)} */
                    >
                      {type.name}
                    </Checkbox>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </div>

          <SimpleGrid columns={[1, null, 2, 3]} spacing={[0, null, '34px']}>
            {searchValue === '' ? (
              pokemonList.map((pokemon: PokemonTypeProps, index: number) => (
                <CardPokemon key={index} {...pokemon} onClick={() => handlePokemonClick(pokemon)} />
              ))
            ) : (
              pokemonSearchList.map((pokemon: PokemonTypeProps, index: number) => (
                <CardPokemon key={index} {...pokemon} onClick={() => handlePokemonClick(pokemon)} />
              ))
            )}
          </SimpleGrid>

          {searchValue !== '' ? (<></>) : !loading && pokemonList.length < pokemonCount && (
            <Button onClick={handleLoadMore} my="4" >
              Load More
            </Button>
          )}

          {loading && <CircularProgress mt="4" isIndeterminate color='yellow.300' />}


        </main>
      </section>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedPokemon && (
              <>
                <strong>{selectedPokemon.index}</strong>
                <h2>{selectedPokemon.name}</h2>
                <p>Attack: {selectedPokemon.attack}</p>
                <p>Defense: {selectedPokemon.defense}</p>
                <p>SpAttack: {selectedPokemon.spAttack}</p>
                <p>SpDefense: {selectedPokemon.spDefense}</p>
                <p>Types: {selectedPokemon.types.join(', ')}</p>
                <img src={selectedPokemon.image} alt={selectedPokemon.name} />
              </>
            )}
          </ModalBody>


        </ModalContent>
      </Modal>

    </>
  );
};
