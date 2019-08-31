import { Observable } from 'rxjs';

export interface IGrpcService {
  accumulate(numberArray: INumberArray): Observable<any>;
}

interface INumberArray {
  data: number[];
}
