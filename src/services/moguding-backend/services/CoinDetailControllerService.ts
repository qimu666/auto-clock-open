/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_CoinDetail_ } from '../models/BaseResponse_CoinDetail_';
import type { BaseResponse_Page_CoinDetail_ } from '../models/BaseResponse_Page_CoinDetail_';
import type { CoinDetailQueryRequest } from '../models/CoinDetailQueryRequest';
import type { DeleteRequest } from '../models/DeleteRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CoinDetailControllerService {

    /**
     * deleteCoinDetail
     * @param requestBody 
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteCoinDetailUsingPost(
requestBody?: DeleteRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/coinDetail/delete',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getCoinDetailById
     * @param id id
     * @returns BaseResponse_CoinDetail_ OK
     * @throws ApiError
     */
    public static getCoinDetailByIdUsingGet(
id?: string,
): CancelablePromise<BaseResponse_CoinDetail_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/coinDetail/get',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listCoinDetailByPage
     * @param requestBody 
     * @returns BaseResponse_Page_CoinDetail_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listCoinDetailByPageUsingPost(
requestBody?: CoinDetailQueryRequest,
): CancelablePromise<BaseResponse_Page_CoinDetail_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/coinDetail/list/page',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
