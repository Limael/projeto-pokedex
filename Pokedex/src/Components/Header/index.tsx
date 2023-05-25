import logo from '../../assets/logo.svg'
import hamburger from '../../assets/BurgenBtn.svg'
import styles from './index.module.css'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,


} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export const Header = () => {
    return (
        <header className={styles.header}>

            <Link to="/"> <img className={styles.img} src={logo} alt="Logo principal do sistema" /></Link>
            <article className={styles.navbar_container}>
                <a href="#" className={styles.navbar_item_selected} > <Link to="/">Home </Link></a>
                <a href="#"> <Link to="/pokedex">Pokédex</Link></a>
                <a href="#"><Link to="/legendaries">Legendaries</Link></a>
                <a href="https://pokeapi.co/docs/v2#pokemon-section">Documentation</a>
            </article>

            <article className={styles.hamburger_container}>


                <Menu>
                    <MenuButton >
                        <img src={hamburger} alt="botao hamburger" />
                    </MenuButton>
                    <MenuList>
                        <MenuItem >
                            <a href="#">
                                <span>Home</span>
                            </a>
                        </MenuItem>
                        <MenuItem >
                            <a href="#">
                                <span>Pokedéx</span>
                            </a>
                        </MenuItem>
                        <MenuItem >
                            <a href="#">
                                <span>Legendaries</span>
                            </a>
                        </MenuItem>
                        <MenuItem >
                            <a href="#">
                                <span>Documentation</span>
                            </a>
                        </MenuItem>

                    </MenuList>
                </Menu>

            </article>

        </header>
    )

}