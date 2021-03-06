import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import ExpenseMonth from '../infra/typeorm/entities/ExpenseInMonth';
import IExpensesInMonthRepository from '../repositories/IExpensesInMonthRepository';

@injectable()
class ListAllExpensesInMonth {
  private expensesMonthRepository: IExpensesInMonthRepository;

  constructor(
    @inject('ExpensesMonthRepository')
    expensesMonthRepository: IExpensesInMonthRepository,
  ) {
    this.expensesMonthRepository = expensesMonthRepository;
  }

  public async execute(month: number): Promise<ExpenseMonth[]> {
    if (month < 0 || month > 12)
      throw new AppError(
        '[ERROR]: Month number invalid, try a number between 1 and 12',
      );

    console.log(month);
    const expenses = this.expensesMonthRepository.findByMonth(month);

    return expenses;
  }
}

export default ListAllExpensesInMonth;
