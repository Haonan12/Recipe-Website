import { Document } from 'mongoose'
import { IId } from '../interface';

export interface IChartOfAccounts {

}

export default interface IChartOfAccountsDocument extends IChartOfAccounts, Document {}
