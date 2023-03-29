import { API_CODE } from "@/constant";
import AppError from "./AppError";

/**
 * @class ApiResponse
 */
export default class ApiResponse {
    constructor(obj, { successMsg, errorMsg } = {}) {
        if (obj instanceof AppError) {
            this.code = API_CODE.FAILED;
            this.errorMsg = errorMsg ?? obj.message;
        } else if (obj instanceof Error) {
            this.code = API_CODE.FAILED;
            this.errorMsg = errorMsg ?? obj.message ?? 'Invoke Error';
        } else {
            this.code = API_CODE.SUCCESS;
            this.data = obj;
            this.successMsg = successMsg ?? 'success';
        }
    }
}