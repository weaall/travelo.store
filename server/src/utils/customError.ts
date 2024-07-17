class CustomError extends Error {
    status: number;
    data?: any;

    constructor(message: string, status: number, data?: any) {
        super(message);
        this.status = status;
        this.data = data;
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    static timeoutError(): CustomError {
        return new CustomError("SERVICE_UNAVAILABLE", 500);
    }
}

export default CustomError;