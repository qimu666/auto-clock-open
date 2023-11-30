/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClockInInfo } from './ClockInInfo';
import type { OrderItem } from './OrderItem';

export type Page_ClockInInfo_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<ClockInInfo>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};
