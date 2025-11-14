import { Date_century, Date_yymmdd } from "../../types/history/Date.ts";

/**
 * Función que permite saber si una fecha cumple con las condiciones del filtro de fechas
 * @param date Es la fecha en formato yy/mm/dd
 * @param year Es el año a partir o hasta el que se va a limitar
 * @param ac_dc Indica si el año que limita es antes o después de Cristo
 * @param filter_type Filtro que indica si la función limita hasta o a partir de una fecha en formato yy/mm/dd
 * @returns Devuelve un booleano indicando si la fecha de entrada cumple con las condiciones o no
 */
export const Limit_Date_Filter = (date: Date_yymmdd, year: number, ac_dc: string, filter_type: string): boolean => {
  if(filter_type === "Start" || filter_type === "Birth" || filter_type === "Creation"){
    if(ac_dc === "a.C"){
      if((date.ac_dc === "a.C") && (date.year <= year)){
        return true;
      }
      else if(date.ac_dc === "d.C"){
        return true;
      }
    }
    else if(ac_dc === "d.C"){
      if((date.ac_dc === "d.C") && (date.year >= year)){
        return true;
      }
    }
  }
  else if(filter_type === "End" || filter_type === "Death" || filter_type === "Dissolution"){
    if(ac_dc === "a.C"){
      if((date.ac_dc === "a.C") && (date.year >= year)){
        return true;
      }
    }
    else if(ac_dc === "d.C"){
      if(date.ac_dc === "a.C"){
        return true;
      }
      else if((date.ac_dc === "d.C") && (date.year <= year)){
        return true;
      }
    }
  }

  return false;
}

/**
 * Función que permite saber si un siglo cumple con las condiciones del filtro de fechas
 * @param date Es el siglo que se va a evaluar
 * @param century Es el siglo a partir o hasta el que se va a limitar
 * @param ac_dc Indica si el año que limita es antes o después de Cristo
 * @param filter_type Filtro que indica si la función limita hasta o a partir de un siglo
 * @returns 
 */
export const Limit_Century_Filter = (date: Date_century, century: string, ac_dc: string, filter_type: string): boolean => {
  if(filter_type === "Start" || filter_type === "Birth" || filter_type === "Creation"){
    if(ac_dc === "a.C"){
      if((date.ac_dc === "a.C") && (Century_Transformer(date.century) <= Century_Transformer(century))){
        return true;
      }
      else if(date.ac_dc === "d.C"){
        return true;
      }
    }
    else if(ac_dc === "d.C"){
      if((date.ac_dc === "d.C") && (Century_Transformer(date.century) >= Century_Transformer(century))){
        return true;
      }
    }
  }
  else if(filter_type === "End" || filter_type === "Death" || filter_type === "Dissolution"){
    if(ac_dc === "a.C"){
      if((date.ac_dc === "a.C") && (Century_Transformer(date.century) >= Century_Transformer(century))){
        return true;
      }
    }
    else if(ac_dc === "d.C"){
      if(date.ac_dc === "a.C"){
        return true;
      }
      else if((date.ac_dc === "d.C") && (Century_Transformer(date.century) <= Century_Transformer(century))){
        return true;
      }
    }
  }

  return false;
}

/**
 * Función que permite saber si un año convertido en siglo cumple con las condiciones del filtro de fechas
 * @param date Es la fecha en formato yy/mm/dd
 * @param century Es el siglo a partir o hasta el que se va a limitar
 * @param ac_dc Indica si el año que limita es antes o después de Cristo
 * @param filter_type Filtro que indica si la función limita hasta o a partir de un siglo
 * @returns 
 */
export const Limit_Century_Filter_Number = (date_number: Date_yymmdd, century: number, ac_dc: string, filter_type: string): boolean => {
  const date = (date_number.year/100)+1;
  const date_acdc = date_number.ac_dc;
  const century_2 = (century/100)+1;

  if(filter_type === "Start" || filter_type === "Birth" || filter_type === "Creation"){
    if(ac_dc === "a.C"){
      if((date_acdc === "a.C") && (date <= century_2)){
        return true;
      }
      else if(date_acdc === "d.C"){
        return true;
      }
    }
    else if(ac_dc === "d.C"){
      if((date_acdc === "d.C") && (date >= century_2)){
        return true;
      }
    }
  }
  else if(filter_type === "End" || filter_type === "Death" || filter_type === "Dissolution"){
    if(ac_dc === "a.C"){
      if((date_acdc === "a.C") && (date >= century_2)){
        return true;
      }
    }
    else if(ac_dc === "d.C"){
      if(date_acdc === "a.C"){
        return true;
      }
      else if((date_acdc === "d.C") && (date <= century_2)){
        return true;
      }
    }
  }

  return false;
}

const Century_Data = [
  {
    century_name: "Siglo I",
    century_number: 1,
  },
  {
    century_name: "Siglo II",
    century_number: 2,
  },
  {
    century_name: "Siglo III",
    century_number: 3,
  },
  {
    century_name: "Siglo IV",
    century_number: 4,
  },
  {
    century_name: "Siglo V",
    century_number: 5,
  },
  {
    century_name: "Siglo VI",
    century_number: 6,
  },
  {
    century_name: "Siglo VII",
    century_number: 7,
  },
  {
    century_name: "Siglo VIII",
    century_number: 8,
  },
  {
    century_name: "Siglo IX",
    century_number: 9,
  },
  {
    century_name: "Siglo X",
    century_number: 10,
  },
  {
    century_name: "Siglo XI",
    century_number: 11,
  },
  {
    century_name: "Siglo XII",
    century_number: 12,
  },
  {
    century_name: "Siglo III",
    century_number: 13,
  },
  {
    century_name: "Siglo XIV",
    century_number: 14,
  },
  {
    century_name: "Siglo XV",
    century_number: 15,
  },
  {
    century_name: "Siglo XVI",
    century_number: 16,
  },
  {
    century_name: "Siglo XVII",
    century_number: 17,
  },
  {
    century_name: "Siglo XVIII",
    century_number: 18,
  },
  {
    century_name: "Siglo XIX",
    century_number: 19,
  },
  {
    century_name: "Siglo XX",
    century_number: 20,
  },
  {
    century_name: "Siglo XXI",
    century_number: 21,
  },
];

/**
 * Función que transforma un siglo de cadena de texto a número
 * @param century Es el siglo a transformar
 * @returns Es el número que representa al siglo
 */
const Century_Transformer = (century: string): number => {
  Century_Data.forEach((data) => {
    if(data.century_name === century){
      return data.century_number;
    }
  });

  return 0;
}