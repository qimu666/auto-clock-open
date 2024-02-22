/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BasicErrorControllerService {

    /**
     * error
     * @returns any OK
     * @throws ApiError
     */
    public static errorUsingGet(): CancelablePromise<Record<string, Record<string, any>>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/error',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * error
     * @returns any OK
     * @throws ApiError
     */
    public static errorUsingPut(): CancelablePromise<Record<string, Record<string, any>>> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/error',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * error
     * @returns any OK
     * @throws ApiError
     */
    public static errorUsingPost(): CancelablePromise<Record<string, Record<string, any>>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/error',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * error
     * @returns any OK
     * @throws ApiError
     */
    public static errorUsingDelete(): CancelablePromise<Record<string, Record<string, any>>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/error',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * error
     * @returns any OK
     * @throws ApiError
     */
    public static errorUsingOptions(): CancelablePromise<Record<string, Record<string, any>>> {
        return __request(OpenAPI, {
            method: 'OPTIONS',
            url: '/api/error',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * error
     * @returns any OK
     * @throws ApiError
     */
    public static errorUsingHead(): CancelablePromise<Record<string, Record<string, any>>> {
        return __request(OpenAPI, {
            method: 'HEAD',
            url: '/api/error',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * error
     * @returns any OK
     * @throws ApiError
     */
    public static errorUsingPatch(): CancelablePromise<Record<string, Record<string, any>>> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/error',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
