import { Injectable } from '@nestjs/common';
import { CreateCoinDto } from './dto/create-coin.dto';
import { UpdateCoinDto } from './dto/update-coin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Coin } from './entities/coin.entity';
import { Model } from 'mongoose';
import { validateErrors } from 'src/common/helpers/validations';

@Injectable()
export class CoinService {

  constructor(
    @InjectModel(Coin.name)
    private readonly coinModel: Model<Coin>
  ){}


  async create(createCoinDto: CreateCoinDto) {
    
    try {
      createCoinDto.name = createCoinDto.name.toUpperCase();
  
      const coin = await this.coinModel.create(createCoinDto);
      return coin;
      
    } catch (error) {
      validateErrors(error);
    }

  }

  async findAll() {
    try {
      const coins =await this.coinModel.find().exec();
      return coins;
    }catch (error) {
      validateErrors(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} coin`;
  }

  update(id: number, updateCoinDto: UpdateCoinDto) {
    return `This action updates a #${id} coin`;
  }

  remove(id: number) {
    return `This action removes a #${id} coin`;
  }
}
