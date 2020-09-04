import { Router } from 'express';
import CreateTransactionService from '../services/CreateTransactionService';
import multer from 'multer'
import TransactionsRepository from '../repositories/TransactionsRepository';
import { getRepository, getCustomRepository } from 'typeorm';
import DeleteTransactionService from '../services/DeleteTransactionService';
import uploadConfig from '../config/upload';
import ImportTransactionsService from '../services/ImportTransactionsService';

const upload = multer(uploadConfig)

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {

  const transactionsRepository = getCustomRepository(TransactionsRepository)

  const transactions = await transactionsRepository.find()
  const {total,income,outcome} = await transactionsRepository.getBalance()

  return response.status(200).json({transactions: transactions, balance: {
    income,
    outcome,
    total
  } })
});

transactionsRouter.post('/', async (request, response) => {
  const {title, value, type, category} = request.body
  console.log(request.body)
  const createTransaction = new CreateTransactionService()

  const transaction = await createTransaction.execute({title, value, type, category})

  return response.json(transaction)
});

transactionsRouter.delete('/:id', async (request, response) => {
  const {id} = request.params

  const deleteTransaction = new DeleteTransactionService()
  
  const deleted = await deleteTransaction.execute({id})
   

  return response.json(deleted)
});

transactionsRouter.post('/import', upload.single('file'), async (request, response) => {
  const importTransactions = new ImportTransactionsService()

  const transactions = await importTransactions.execute(request.file.path);

  return response.json(transactions)
});

export default transactionsRouter;
