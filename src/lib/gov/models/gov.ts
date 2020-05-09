import { GovNamespace } from '../../gov.interface';

import IGovResponse = GovNamespace.IDataResponse;

export class Gov {
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
	constructor(values: IGovResponse) {
		let gender: string;
		({
			ciudad_de_ubicaci_n: this.city,
			departamento: this.state,
			atenci_n: this.attention,
			edad: this.age,
			sexo: gender,
			tipo: this.type,
			fis: this.fis,
			estado: this.statePerson,
			pa_s_de_procedencia: this.originCountry,
			fecha_de_muerte: this.deathDate,
			fecha_reporte_web: this.dateReport,
			fecha_de_notificaci_n: this.dateNotification,
			fecha_diagnostico: this.dateDiagnostic,
			fecha_recuperado: this.recoveredDate,
		} = values);
		this.gender = this.getGender(gender);
	}

	private getGender(value: string): string {
		return {
			F: 'Femenino',
			M: 'Masculino',
		}[value];
	}
}
