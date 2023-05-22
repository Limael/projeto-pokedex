import styles from './index.module.css'
import { Card, Image, Stack, Button, Heading, CardBody, CardFooter } from '@chakra-ui/react'
import { Badge } from '../Badge'

export const CardPokemon = () => {
    return (
        <Card
            className={styles.card}
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
        >


            <Stack>
                <CardBody className={styles.card_body}>
                    <Heading className={styles.pokemon_name}>Pikachu</Heading>

                    <article className={styles.stats_container}>
                        <article className={styles.stats_column}>
                            <div className={styles.stats}>
                                <span>419</span>
                            </div>
                            <p>Attack</p>
                        </article>

                        <article className={styles.stats_column}>
                            <div className={styles.stats}>
                                <span>419</span>
                            </div>
                            <p>Defense</p>
                        </article>
                    </article>
                <article className={styles.types_container}>
                    <Badge/>
                    <Badge/>
                </article>

                </CardBody>

            </Stack>

            <article className={styles.pokemon_container}>

            </article>


        </Card>
    )

}