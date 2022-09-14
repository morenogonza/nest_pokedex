import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany(); // delete * from pokemon

    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    // const insertPromises = [];
    const pokemonToInsert: { name: string; number: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const number: number = +segments[segments.length - 2];

      // await this.pokemonModel.create({ name, number });
      // insertPromises.push(this.pokemonModel.create({ name, number }));
      pokemonToInsert.push({ name, number });
    });

    // await Promise.all(insertPromises); esto es una forma de hacer insersion de un array con promesas
    await this.pokemonModel.insertMany(pokemonToInsert);
    // insert into pokemons (name, number)
    // (name: 'pikachu', number: 4)

    return 'Seed executed';
  }
}
