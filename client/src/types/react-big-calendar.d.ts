declare module "react-big-calendar" {
    import * as React from "react";

    export interface CalendarProps {
        localizer: any;
        events: any[];
        startAccessor?: string | ((event: any) => Date);
        endAccessor?: string | ((event: any) => Date);
        titleAccessor?: string | ((event: any) => string);
        selectable?: boolean;
        onSelectEvent?: (event: any) => void;
        onSelectSlot?: (slotInfo: any) => void;
        style?: React.CSSProperties;
        popup?: boolean;
        views?: string[] | { [key: string]: boolean };
        eventPropGetter?: (event: any) => { style?: React.CSSProperties };
    }

    export const Calendar: React.FC<CalendarProps>;

    export function dateFnsLocalizer(config: {
        format: Function;
        parse: Function;
        startOfWeek: Function;
        getDay: Function;
        locales: any;
    }): any;
}
