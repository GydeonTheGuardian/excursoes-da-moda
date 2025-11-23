// src/types.ts
export type Excursion = {
  id: string;
  nome: string;
  vaga: string;
  setor?: 'Amarelo' | 'Azul' | 'Verde' | 'Vermelho' | 'Laranja' | 'Branco';
  tipo?: 'Van' | 'Ônibus';
  lugar?: 'Moda Center' | 'Calçadão' | 'Altas Horas';
};
