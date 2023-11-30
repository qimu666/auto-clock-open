/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClockReport } from './ClockReport';
import type { OrderItem } from './OrderItem';

export type Page_ClockReport_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<ClockReport>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};
