class CustomError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    static timeoutError(): CustomError {
        return new CustomError("SERVICE_UNAVAILABLE", 500);
    }
}

export default CustomError;
