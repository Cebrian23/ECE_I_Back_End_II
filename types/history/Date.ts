export type Date = {
    normal_date?: Date_yymmdd,
    century_date?: Date_century,
}

export type Date_monument = {
    normal_date?: Date_yymmdd_monument,
    century_date?: Date_century_monument,
}

export type Date_yymmdd = {
    year: number,
    month?: string,
    day?: number,
    ac_dc: "a.C" | "d.C",
}

export type Date_century = {
    century: string,
    ac_dc: "a.C" | "d.c",
}

export type Date_yymmdd_monument = {
    start: Date_yymmdd,
    end: Date_yymmdd,
}

export type Date_century_monument = {
    start: Date_century,
    end: Date_century,
}