/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DailyCheckIn } from './DailyCheckIn';
import type { OrderItem } from './OrderItem';

export type Page_DailyCheckIn_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<DailyCheckIn>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};
