/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BasicInformation } from './BasicInformation';
import type { OrderItem } from './OrderItem';

export type Page_BasicInformation_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<BasicInformation>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};
