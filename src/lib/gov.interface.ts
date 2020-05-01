export namespace GovNamespace {
  export interface IDataResponse {
    id_de_caso: string;
    fecha_de_notificaci_n: Date;
    codigo_divipola: string;
    ciudad_de_ubicaci_n: string;
    departamento: string;
    atenci_n: string;
    edad: string;
    sexo: string;
    tipo: string;
    estado: string;
    pa_s_de_procedencia: string;
    fis: Date;
    fecha_de_muerte: Date;
    fecha_diagnostico: Date;
    fecha_recuperado: Date;
    fecha_reporte_web: Date;
  }

  export enum ATTENTION_TYPES {
    HOME = 'Casa',
    RECOVERED = 'Recuperado',
    DEATHS = 'Fallecido',
    HOSPITAL = 'Hospital',
    HOSPITAL_UCI = 'Hospital UCI',
  }

  export enum FIELD_TYPES {
    CITY = 'ciudad_de_ubicaci_n',
    STATE = 'departamento',
  }
}

export namespace GovResponseNamespace {
  export interface IDataResponse {
    city: string;
    state: string;
    attention: string;
    age: string;
    gender: string;
    type: string;
    statePerson: string;
    originCountry: string;
    deathDate: Date;
    fis: Date;
    recoveredDate: Date;
    dateReport: Date;
    dateNotification: Date;
    dateDiagnostic: Date;
  }
}
