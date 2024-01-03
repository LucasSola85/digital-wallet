import { Module } from '@nestjs/common';
import { CoinService } from './coin.service';
import { CoinController } from './coin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Coin, CoinSchema } from './entities/coin.entity';

@Module({
  controllers: [CoinController],
  providers: [CoinService],
  imports: [MongooseModule.forFeature([
    {
      name: Coin.name,
      schema: CoinSchema
    }
  ])],
})
export class CoinModule {}
