export interface IPayload {
  x: number;
  y: number;
  height: number;
  width: number;
  id: string;
  shape: string;
  fillStyle: string;
  strokeStyle: string;
}

export interface IPencilPayload {
  id: string;
  path: IPosition[];
  shape: string;
  fillStyle: string;
  strokeStyle: string;
}
export interface IPosition {
  x: number;
  y: number;
}
