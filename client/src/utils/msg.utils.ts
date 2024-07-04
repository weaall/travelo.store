import dayjs from "dayjs";

/**
 * 메신저 데이트 포멧
 * @param targetDate
 */
export const msgDateFormat = (targetDate: string): string => {
    const date = dayjs(targetDate);
    const today = dayjs().format('YYYY-MM-DD');
    const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');

    const timeFormat = date.format('A h:mm');

    if (date.format('YYYY-MM-DD') === today) {
        return `${timeFormat}`;
    } else if (date.format('YYYY-MM-DD') === yesterday) {
        return `어제`;
    } else {
        return date.format("YYYY-MM-DD");
    }
};