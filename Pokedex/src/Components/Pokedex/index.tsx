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
import { ChevronDownIcon } from '@chakra-ui/icons'
import { CardPokemon } from '../CardPokemon'


export const Pokedex = () => {
    return (
        <>
            <Header />
            <section className={styles.section_container}>
                <main className={styles.pokedex_container}>
                    <h1 className={styles.pokemon_quantity}>
                         800 <strong>Pokemons</strong> for you to choose your favorite
                    </h1>

                    <input className={styles.input} type="text" placeholder='Encontre o seu pokemon' />

                    <div className={styles.filter_section}>
                        <Menu closeOnSelect={false}>
                            <MenuButton as={Button} >
                                MenuItem
                            </MenuButton>
                            <MenuList minWidth='240px'>
                                <MenuOptionGroup type='checkbox'>
                                    <MenuItemOption value='email'>Email</MenuItemOption>
                                    <MenuItemOption value='phone'>Phone</MenuItemOption>
                                    <MenuItemOption value='country'>Country</MenuItemOption>
                                </MenuOptionGroup>
                            </MenuList>
                        </Menu>
                        <Menu closeOnSelect={false}>
                            <MenuButton as={Button} >
                                MenuItem
                            </MenuButton>
                            <MenuList minWidth='240px'>
                                <MenuOptionGroup type='checkbox'>
                                    <MenuItemOption value='email'>Email</MenuItemOption>
                                    <MenuItemOption value='phone'>Phone</MenuItemOption>
                                    <MenuItemOption value='country'>Country</MenuItemOption>
                                </MenuOptionGroup>
                            </MenuList>
                        </Menu>
                        <Menu closeOnSelect={false}>
                            <MenuButton as={Button} >
                                MenuItem
                            </MenuButton>
                            <MenuList minWidth='240px'>
                                <MenuOptionGroup type='checkbox'>
                                    <MenuItemOption value='email'>Email</MenuItemOption>
                                    <MenuItemOption value='phone'>Phone</MenuItemOption>
                                    <MenuItemOption value='country'>Country</MenuItemOption>
                                </MenuOptionGroup>
                            </MenuList>
                        </Menu>
                    </div>


                    <SimpleGrid columns={[2, null, 3]} spacing='34px'>
                        <CardPokemon />
                        <CardPokemon />
                        <CardPokemon />


                        <CardPokemon />
                        <CardPokemon />
                        <CardPokemon />
                    </SimpleGrid>










                </main>
                {/*                <Footer/>
 */}            </section>

        </>
    )

}