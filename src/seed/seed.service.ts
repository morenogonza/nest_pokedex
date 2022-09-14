import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AxiosInstance } from 'axios';
import { PokeResponse } from '../../dist/seed/interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const number: number = +segments[segments.length - 2];
    });

    return data.results;
  }
}
