import Transaction from '../models/Transaction';
import csvparse from 'csv-parse'
import fs from 'fs'
interface CSVTransaction {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class ImportTransactionsService {
  async execute(filePath:string): Promise<Transaction[]> {
    const contactsReadStream = fs.createReadStream(filePath);

    const parsers = csvparse({
      from_line: 2,
    })

    const parseCSV = contactsReadStream.pipe(parsers)

    const transactions:CSVTransaction[] = []

    const categories: string[] = []

    parseCSV.on('data', async line => {
      console.log(line)
      const [title, type, value, category] = line.map((cell: string) =>
        cell.trim(),
      );
      if ( !title || !type || !value) return;

      categories.push(category)

      transactions.push({title, type, value, category})

    })

    await new Promise(resolve => parseCSV.on('end', resolve))
    console.log(categories)
  }
}

export default ImportTransactionsService;
