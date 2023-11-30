/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CoinDetail } from './CoinDetail';
import type { OrderItem } from './OrderItem';

export type Page_CoinDetail_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<CoinDetail>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};
