import logo from '../../assets/logo.svg'
import hamburger from '../../assets/BurgenBtn.svg'
import styles from './index.module.css'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,


} from '@chakra-ui/react'

export const Header = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <img className={styles.img} src={logo} alt="Logo principal do sistema" />
                <article className={styles.navbar_container}>
                    <a href="#" className={styles.navbar_item_selected} >Home</a>
                    <a href="#">Pokédex</a>
                    <a href="#">Legendaries</a>
                    <a href="#">Documentation</a>
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
            </nav>
        </header>
    )

}