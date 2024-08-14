export interface Sold {
  ID:                  number;
  Producto_id:         number;
  Tipo:                string;
  Fecha_Registro:      Date;
  Fecha_Actualizacion: Date;
  Estatus:             boolean;
  Total_Productos:     number;
  Costo_total:         number;
}

export interface Product {
  ID:                  number;
  Nombre:              string;
  Marca:               string;
  Codigo_Barras:       string;
  Descripcion:         string;
  Presentacion:        string;
  Precio_Actual:       string;
  Fotografia:          string;
  Estatus:             boolean;
  Fecha_Registro:      Date;
  Fecha_Actualizacion: null;
}
