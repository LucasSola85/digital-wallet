import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { Currency } from './entities/currency.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { validateErrors } from 'src/common/helpers/validations';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectModel(Currency.name) private currencyModel: Model<Currency>,
  ) {}

  async create(createCurrencyDto: CreateCurrencyDto) {
    createCurrencyDto.currency.toString().toUpperCase();
    try {
      const currency = new this.currencyModel(createCurrencyDto);
      return await currency.save();
    } catch (error) {
      validateErrors(error);
    }
  }

  findAll() {
    return `This action returns all currency`;
  }

  findOne(id: number) {
    return `This action returns a #${id} currency`;
  }

  update(id: number, updateCurrencyDto: UpdateCurrencyDto) {
    return `This action updates a #${id} currency`;
  }

  remove(id: number) {
    return `This action removes a #${id} currency`;
  }
}
