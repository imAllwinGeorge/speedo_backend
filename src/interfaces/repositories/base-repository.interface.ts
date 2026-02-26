import type { Filter } from "mongodb";

export type FilterQuery<T> = Filter<T>;


export interface IBaseRepository<T> {
  find(filter: FilterQuery<T>): Promise<T[]>;
  findAll(
    limit: number,
    skip: number,
    filter: FilterQuery<object>,
  ): Promise<{items: T[]; total: number}>;
  findOne(filter: FilterQuery<T>): Promise<T | null>;
  findById(id: string): Promise<T | null>;
  save(data: Partial<T>): Promise<T>;
  findOneAndUpdate(
    filter: FilterQuery<T>,
    value: Partial<T>,
  ): Promise<T | null>;
  findByIdAndUpdate(id: string, value: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<void>;
}
