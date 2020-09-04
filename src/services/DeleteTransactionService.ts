import Transaction from "../models/Transaction";
import { getRepository } from "typeorm";
import AppError from "../errors/AppError";

// import AppError from '../errors/AppError';
interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({id}:Request): Promise<void> {
    
    const transactionRepository = getRepository(Transaction)

    const transaction = await transactionRepository.findOne(id)

    if(!transaction) {
      throw new AppError('Não foi possível deletar transação invalida')
    }

    await transactionRepository.remove(transaction)
  }
}

export default DeleteTransactionService;
