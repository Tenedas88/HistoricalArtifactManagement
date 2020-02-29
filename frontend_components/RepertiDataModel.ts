export class Reperto {
  ID: number;
  Nome: string;
  Tipo: string;
  Valore: number;
  Path: string;
  PathShow: boolean;

  constructor(
    inputID: number,
    inputNome: string,
    inputTipo: string,
    inputValore: number
  ){
    this.ID = inputID;
    this.Nome = inputNome;
    this.Valore = inputValore;
    this.Tipo = inputTipo;
    this.Path = '';
    this.PathShow = false;
  }
}

export interface HttpReperto {
  ID: number;
  Nome: string;
  Tipo: string;
  Valore: number;
  Path: string;
  PathShow: boolean;
}

export class RepertoRelease {
  ID: number;
  AltriInventari: number;
  Produzione: string;
  Tecnica: string;
  Forma: string;
  StatoConservazione: string;
  LuogoConservazione: string;
  Provenienza: string;
  Collezione: string;
  LimcDigitale: string;
  Misure: number;
  DescrizioneA: string;
  DescrizioneB: string;
  Padre: boolean;
  RepertoPadre: number;
  PathShow: boolean;
  ArrayFoto: HttpFotoReperto[];

  constructor(
    inputID: number,
    inputAltriInventari: number,
    inputProduzione: string,
    inputTecnica: string,
    inputForma: string,
    inputStatoConservazione: string,
    inputLuogoConservazione: string,
    inputProvenienza: string,
    inputCollezione: string,
    inputLimcDigitale: string,
    inputMisure: number,
    inputDescrizioneA: string,
    inputDescrizioneB: string,
    inputPadre: boolean,
    inputRepertoPadre: number,
    inputPathShow: boolean
  ) {
  this.ID = inputID;
  this.AltriInventari = inputAltriInventari;
  this.Produzione = inputProduzione;
  this.Tecnica = inputTecnica;
  this.Forma = inputForma;
  this.StatoConservazione = inputStatoConservazione;
  this.LuogoConservazione = inputLuogoConservazione;
  this.Provenienza = inputProvenienza;
  this.Collezione = inputCollezione;
  this.LimcDigitale = inputLimcDigitale;
  this.Misure = inputMisure;
  this.DescrizioneA = inputDescrizioneA;
  this.DescrizioneB = inputDescrizioneB;
  this.Padre = inputPadre;
  this.RepertoPadre = inputRepertoPadre;
  this.PathShow = inputPathShow;
  }
}

export interface HttpRepertoRelease {
  ID: number;
  AltriInventari: number;
  Produzione: string;
  Tecnica: string;
  Forma: string;
  StatoConservazione: string;
  LuogoConservazione: string;
  Provenienza: string;
  Collezione: string;
  LimcDigitale: string;
  Misure: number;
  DescrizioneA: string;
  DescrizioneB: string;
  Padre: boolean;
  RepertoPadre: number;
  PathShow: boolean;
  ArrayFoto: HttpFotoReperto[];
}

export class FotoReperto{
  ID: number;
  IDReperto: number;
  Path: string;
  constructor(
    inputID: number,
    inputIDReperto: number,
    inputPath: string
  ) {
    this.ID = inputID;
    this.IDReperto = inputIDReperto;
    this.Path = inputPath;
  }
}

export interface HttpFotoReperto{
  ID: number;
  IDReperto: number;
  Path: string;
}

export class RepertoWrapper{

  FotoAssociate: HttpFotoReperto[];
  Reperto: RepertoRelease;

  constructor(
    inputID: number,
    inputAltriInventari: number,
    inputProduzione: string,
    inputTecnica: string,
    inputForma: string,
    inputStatoConservazione: string,
    inputLuogoConservazione: string,
    inputProvenienza: string,
    inputCollezione: string,
    inputLimcDigitale: string,
    inputMisure: number,
    inputDescrizioneA: string,
    inputDescrizioneB: string,
    inputPadre: boolean,
    inputRepertoPadre: number,
    inputPathShow: boolean
  ){
    this.Reperto = new RepertoRelease(
      inputID,
      inputAltriInventari,
      inputProduzione,
      inputTecnica,
      inputForma,
      inputStatoConservazione,
      inputLuogoConservazione,
      inputProvenienza,
      inputCollezione,
      inputLimcDigitale,
      inputMisure,
      inputDescrizioneA,
      inputDescrizioneB,
      inputPadre,
      inputRepertoPadre,
      inputPathShow
      );
    }
}

