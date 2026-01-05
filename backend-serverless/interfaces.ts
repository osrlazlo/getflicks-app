export interface ServerlessResponse {
    status?:number,
    setStatus: (status:number) => ServerlessResponse,
    msg?:string[],
    addMsg?: (msg:string) => ServerlessResponse,
    data:Object,
    addData: (object:Object) => ServerlessResponse,
}

export function createServerlessResponse() {
    const res:ServerlessResponse = {
        setStatus(status) {
            this.status = status
            return this
        },
        addData(data) {
            this.data = {...this.data, ...data}
            return this
        },
        data:[]
    }
    return res
}