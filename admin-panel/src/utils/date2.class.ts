export class Date2 extends Date {
    toMysqlDate() {
        return super.toUTCString().slice(0, 19).replace(/T/g, ' ')
    }
}
