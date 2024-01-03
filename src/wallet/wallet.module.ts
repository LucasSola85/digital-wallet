import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from './entities/wallet.entity';
import { Transaction, TransactionSchema } from 'src/transaction/entities/transaction.entity';

@Module({
  controllers: [WalletController],
  providers: [WalletService],
  imports: [MongooseModule.forFeature([
    {
      name: Wallet.name,
      schema: WalletSchema,
    },
    {
      name: Transaction.name,
      schema: TransactionSchema,
    }
  ])],
})
export class WalletModule {}
