import { Module } from '@nestjs/common';
import { WalletModule } from './wallet/wallet.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CurrencyModule } from './currency/currency.module';
import { CoinModule } from './coin/coin.module';
import { TransactionModule } from './transaction/transaction.module';
import { ConfigModule } from '@nestjs/config';
import { JoiValidateEnvConfig } from './config/joi-validate-env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: JoiValidateEnvConfig
    }),
    MongooseModule.forRoot( process.env.MONGODB, {
      dbName: 'digitalWallet',
    }),
    WalletModule,
    UserModule,
    CurrencyModule,
    CoinModule,
    TransactionModule,
  ],
})
export class AppModule {}
