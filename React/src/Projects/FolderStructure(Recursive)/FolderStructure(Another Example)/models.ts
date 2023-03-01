export interface Child4 {
  label: string;
  id: number;
}

export interface Child3 {
  label: string;
  children: Child4[];
  id: number;
}

export interface Child2 {
  label: string;
  children: Child3[];
  id: number;
}

export interface Child {
  label: string;
  children: Child2[];
  id: number;
}

export interface Datum {
  label: string;
  children: Child[];
  id: number;
}

export interface RootObject {
  data: Datum[];
}
