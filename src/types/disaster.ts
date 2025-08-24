export interface DisasterCategory {
  id: string; 
  title: string;
}

export interface DisasterGeometry {
  date: string;
  type: string;
  coordinates: [number, number]; 
}

export interface DisasterSource {
  id: string;
  url: string;
}

export interface DisasterEvent {
  id: string;
  title: string;
  description?: string | null;
  link: string;
  closed?: string | null;
  categories: DisasterCategory[];
  sources: DisasterSource[];
  geometry: DisasterGeometry[];
}

export interface DisasterPage {
  events: DisasterEvent[];
  nextPage?: number;
}

