import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  @HttpCode( HttpStatus.OK )
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.create(createWalletDto);
  }

  @Get('all/:userId')
  findAll(@Param('userId', ParseMongoIdPipe) userId: string) {
    return this.walletService.findAll(userId);
  }

  @Get(':walletId')
  findOne(@Param('walletId', ParseMongoIdPipe) walletId: string) {
    return this.walletService.findOne(walletId);
  }

  @Patch(':walletId')
  update(@Param('walletId', ParseMongoIdPipe) walletId: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(walletId, updateWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletService.remove(+id);
  }
}
