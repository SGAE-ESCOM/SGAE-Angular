export function groupBy(list: any[], property: string): any {
    return list.reduce((prev, current) => {
        let key = current[property];
        if (!prev[key])
            prev[key] = [];
        prev[key].push(current);
        return prev;
    }, {});
}

export function groupByOnly(list: any[], property: string): any {
    return list.reduce((prev, current) => {
        let key = current[property];
        prev[key] = current;
        return prev;
    }, {});
}
