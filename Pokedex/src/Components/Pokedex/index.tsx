import { Header } from '../Header'
import styles from './index.module.css'
import {
    Menu,
    MenuButton,
    MenuList,  
    MenuItemOption,
    MenuOptionGroup,
    Button,

} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { CardPokemon } from '../CardPokemon'


export const Pokedex = () => {
    return (
        <>
            <Header />
            <section className={styles.section_container}>
                <main>
                    <h1>
                        800 Pokemons for you to choose your favorite
                    </h1>

                    <input type="text" placeholder='Encontre o seu pokemon' />

                    <div>
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


                        <CardPokemon/>
        

                </main>
                {/*                <Footer/>
 */}            </section>

        </>
    )

}