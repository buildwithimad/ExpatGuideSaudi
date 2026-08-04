export interface BaseEntity {
  id: number;
}

export interface SlugEntity extends BaseEntity {
  slug: string;
}

export interface NamedEntity extends BaseEntity {
  name: string;
}