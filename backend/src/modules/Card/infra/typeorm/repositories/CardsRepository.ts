import { getRepository, Repository } from 'typeorm';

import ICreateCard from '../../../dtos/ICreateCard';
import ICardRepository from '../../../repositories/ICardRepository';
import Card from '../entities/Card';

class CardsRepository implements ICardRepository {
  private repository: Repository<Card>;

  constructor() {
    this.repository = getRepository(Card);
  }

  public async create({
    name,
    due_day,
    flag,
    user_id,
  }: ICreateCard): Promise<Card> {
    const newCard = this.repository.create({
      name,
      due_day,
      flag,
      user_id,
    });

    await this.repository.save(newCard);

    return newCard;
  }

  public async findByName(name: string): Promise<Card | undefined> {
    const cardFound = await this.repository.findOne({
      where: {
        name,
      },
    });

    return cardFound;
  }
}

export default CardsRepository;
