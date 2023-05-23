import { Header } from '../Header'
import styles from './index.module.css'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItemOption,
    MenuOptionGroup,
    Button,
    SimpleGrid,

} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import api from '../../api/api'
import { CardPokemon } from '../CardPokemon'


type PokemonType = {
    name: string;
    url: string;
}

export const Pokedex = () => {
    const [pokemonCount, setPokemonCount] = useState([]);
    const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>([]);
    const [pokemonList, setPokemonList] = useState<PokemonType[]>([]);
    const [pokemonDetails, setPokemonDetails] = useState<PokemonType[]>([]);
    const [pokemonNames, setPokemonNames] = useState<string[]>([]);



    /* 
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
            const fetchData = async () => {
                try {
                    const response = await api.get('/pokemon');
                    setPokemonCount(response.data.count);
                } catch (error) {
                    console.log(error);
                }
            };
    
            fetchData();
        }, []);
     */

    useEffect(() => {
        const getPokemon = async () => {
            try {
                const response = await api.get('/pokemon?limit=9');
                const results = response.data.results;
                setPokemonList(results);

                const names = results.map((pokemon: PokemonType) => pokemon.name);
                setPokemonNames(names);
            } catch (error) {
                console.log(error);
            }
        };

        getPokemon();
    }, []);



    useEffect(() => {
        const getPokemonDetails = async (pokemonName: string) => {
            try {
                const response = await api.get(`/pokemon/${pokemonName}`);
                const pokemonData = response.data;
                console.log(pokemonData);



            } catch (error) {
                console.log(error);
            }
        };

        // Faz uma requisição para cada nome de pokémon
        pokemonNames.forEach((name) => {
            getPokemonDetails(name);
        });
    }, [pokemonNames]);



    return (
        <>
            <Header />
            <section className={styles.section_container}>
                <main className={styles.pokedex_container}>
                    <h1 className={styles.pokemon_quantity}>
                        {pokemonCount} <strong>Pokemons</strong> for you to choose your favorite
                    </h1>

                    <input className={styles.input} type="text" placeholder='Encontre o seu pokemon' />

                    <div className={styles.filter_section}>
                        <Menu closeOnSelect={false} >
                            <MenuButton as={Button}  >
                                MenuItem
                            </MenuButton>
                            <MenuList maxHeight="15rem" overflowY="scroll">
                                <MenuOptionGroup type='checkbox'>
                                    {pokemonTypes.map((type) => (
                                        <MenuItemOption key={type.name} value={type.name}>
                                            {type.name}
                                        </MenuItemOption>
                                    ))}
                                </MenuOptionGroup>
                            </MenuList>
                        </Menu>

                    </div>


                    <SimpleGrid columns={[2, null, 3]} spacing='34px'>

                    </SimpleGrid>










                </main>
                {/*                <Footer/>
 */}            </section>

        </>
    )

}