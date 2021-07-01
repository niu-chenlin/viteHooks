
export class GlobalTool {
    static getRandomNum(min: number, max: number) {
        return Math.round(Math.random() * (max - min)) + min;
    }
}