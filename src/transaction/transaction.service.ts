import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from './entities/transaction.entity';
import { Model } from 'mongoose';
import { validateErrors } from 'src/common/helpers/validations';

@Injectable()
export class TransactionService {

  constructor(
    @InjectModel(Transaction.name) private readonly transactionModel: Model<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    try {
      
      // obtenemos el balance de la wallet
      const lastTransaction = await this.transactionModel
      .findOne({walletId: createTransactionDto.walletId})
      .sort({createdAt: 'desc'})
      .exec();

      let prev_balance = 0;


      if (lastTransaction) {
        prev_balance = lastTransaction.new_balance;
      }

      if(!createTransactionDto.isCredit && prev_balance < createTransactionDto.amount) {
        throw new Error('No tienes fondos suficientes para realizar esta transaccion');
      }

      const newTransaction = new this.transactionModel({
        ...createTransactionDto,
        prev_balance,
        new_balance: createTransactionDto.isCredit 
        ? (prev_balance + createTransactionDto.amount) 
        : (prev_balance - createTransactionDto.amount),
        createdAt: new Date(),
      });

      const transaction = await newTransaction.save();


      return transaction;



    } catch (error) {
      validateErrors(error);
    }

  }

  findAll() {
    return `This action returns all transaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
