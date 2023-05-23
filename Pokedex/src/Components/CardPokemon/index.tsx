import styles from './index.module.css';
import { Card, Stack, Heading, CardBody } from '@chakra-ui/react';
import { Badge } from '../Badge';

export type PokemonTypeProps = {
  name: string;
  attack: string;
  defense: string;
  types: string[];
  image: string;
};

export const CardPokemon = ({ name, attack, defense, types, image }: PokemonTypeProps) => {
  return (
    <Card
      className={styles.card}
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
    >
      <Stack>
        <CardBody className={styles.card_body}>
          <Heading className={styles.pokemon_name}>{name}</Heading>

          <article className={styles.stats_container}>
            <article className={styles.stats_column}>
              <div className={styles.stats}>
                <span>{attack}</span>
              </div>
              <p>Attack</p>
            </article>

            <article className={styles.stats_column}>
              <div className={styles.stats}>
                <span>{defense}</span>
              </div>
              <p>Defense</p>
            </article>
          </article>

          <article className={styles.types_container}>
            {types.map((type, index) => (
              <Badge key={index} type={[type]} />
            ))}
          </article>
        </CardBody>
      </Stack>

      <article className={styles.pokemon_container}>
        <img src={image} alt={name} />
      </article>
    </Card>
  );
};
