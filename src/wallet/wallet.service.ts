import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet } from './entities/wallet.entity';
import { Model, isValidObjectId } from 'mongoose';
import { validateErrors } from 'src/common/helpers/validations';
import { Transaction } from 'src/transaction/entities/transaction.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name)
    private readonly walletModel: Model<Wallet>,
    //transactionModel
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
  ) {}

  async create(createWalletDto: CreateWalletDto) {
    createWalletDto.number_wallet = createWalletDto.number_wallet.toLowerCase();

    try {
      const wallet = await this.walletModel.create(createWalletDto);
      return wallet;
    } catch (error) {
      validateErrors(error);
    }
  }

  async findAll(userId: string) {
    try {
      const wallets = await this.walletModel
        .find({ owner: userId })
        .populate('owner')
        .populate('currency')
        .populate('coin')
        .exec();

      const transactions = await this.transactionModel
        .find({ walletId: { $in: wallets } })
        .sort({ createdAt: -1 })
        .exec();

      wallets.forEach((wallet) => {
        const walletTransactions = transactions.filter(
          (transaction) =>
            transaction.walletId.toString() === wallet._id.toString(),
        );

        if (walletTransactions.length > 0) {
          wallet.balance = walletTransactions[ transactions.length - 1 ].new_balance;
          wallet.balance_crypto = wallet.balance * wallet.coin.exchange;
        }

        wallet.transactions = walletTransactions;
      });

      return wallets;
    } catch (error) {
      validateErrors(error);
    }
  }

  async findOne(walletId: string) {
    try {
      const wallet = await this.walletModel
        .findById(walletId)
        .populate('owner')
        .populate('currency')
        .populate('coin');

      // Si no existe retornamos null
      if (!wallet) {
        return null;
      }

      const transactions = await this.transactionModel
        .find({ walletId: wallet._id })
        .sort({ createdAt: -1 })
        .exec();

      if (transactions.length > 0) {
        // tomar el balance del ultimo elemento del array
        wallet.balance = transactions[ transactions.length - 1 ].new_balance;
        //transactions[0].new_balance;
        wallet.balance_crypto = wallet.balance * wallet.coin.exchange;
      }

      // le creamos una propiedad transactions a la wallet y le asignamos las transactions
      wallet.transactions = transactions;

      return wallet;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(walletId: string, updateWalletDto: UpdateWalletDto) {
    try {
      const wallet = await this.walletModel
        .findById(walletId)
        .select({
          transactions: 0,
          _id: 0,     
          __v: 0   
        });;

      const { coin, currency } = updateWalletDto;


      if (!isValidObjectId(coin) || !isValidObjectId(currency)) {
        return null;
      }

      await wallet.updateOne(updateWalletDto);

     
      return wallet;

    } catch (error) {
      console.log(error)
      validateErrors(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
