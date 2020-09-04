// import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import { getCustomRepository, getRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Categories from '../models/Category';
import AppError from '../errors/AppError';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}
class CreateTransactionService {
  public async execute({title, value, type, category}:Request): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionsRepository)

    const categoryRepository = getRepository(Categories)
    
    const { total } = await transactionRepository.getBalance()

    if (type === 'outcome') {
      if ((total - value) < 0){
        throw new AppError('Transação Invalidada')}
    }
      

    let transactionCategory = await categoryRepository.findOne({
      where: {
        title: category
      }
    })

    console.log(transactionCategory)
    if (!transactionCategory){

      transactionCategory = categoryRepository.create({
        title: category
      })

      await categoryRepository.save(transactionCategory)
      
    }
    const transaction = await transactionRepository.create({
      title,
      value,
      type,
      category: transactionCategory
    })


    await transactionRepository.save(transaction)

    return transaction

      
  }
}

export default CreateTransactionService;
