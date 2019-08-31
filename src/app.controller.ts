import { Controller, Logger, Post, Body, OnModuleInit } from '@nestjs/common';
import { IGrpcService } from './grpc.interface';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { microserviceOptions } from './grpc.options';

@Controller()
export class AppController implements OnModuleInit {
  private logger = new Logger('AppController');

  @Client(microserviceOptions) // <-- Add
  private client: ClientGrpc;  // <-- this

  private grpcService: IGrpcService;

  // constructor(private mathService: MathService) {} // <-- Remove this

  onModuleInit() {                                                            // <--
    this.grpcService = this.client.getService<IGrpcService>('AppController'); // <-- Add this
  }                                                                           // <--

  @Post('add')
  async accumulate(@Body('data') data: number[])  {
    this.logger.log('Adding ' + data.toString());
    // return this.mathService.accumulate(data);  // <-- Change this
    return this.grpcService.accumulate({ data }); // <-- to this
  }
}
